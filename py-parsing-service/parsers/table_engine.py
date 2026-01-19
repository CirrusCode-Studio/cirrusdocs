import camelot
import tabula
from uuid import uuid4
import tempfile
import pandas as pd
from typing import List, Dict, Any

def parse_tables(buffer: bytes, use_fallback: bool = True):
    """
    Enhanced table parser with multiple strategies and fallback options.
    
    Args:
        buffer: PDF file as bytes
        use_fallback: Whether to use tabula as fallback for tables with low confidence
    """
    blocks = []
    errors = []

    with tempfile.NamedTemporaryFile(suffix=".pdf", delete=False) as tmp:
        tmp.write(buffer)
        tmp.flush()
        tmp_path = tmp.name

        try:
            # Strategy 1: Try lattice mode first (for tables with clear borders)
            tables_lattice = camelot.read_pdf(
                tmp_path, 
                pages="all",
                flavor="lattice",
                line_scale=40,  # Adjust sensitivity to table lines
                shift_text=['l', 't', 'r']  # Better text alignment
            )

            # Strategy 2: Try stream mode (for tables without clear borders)
            tables_stream = camelot.read_pdf(
                tmp_path,
                pages="all", 
                flavor="stream",
                edge_tol=50,  # Tolerance for table edges
                row_tol=10,   # Tolerance for row detection
                column_tol=10  # Tolerance for column detection
            )

            # Combine and deduplicate tables
            all_tables = _merge_table_results(tables_lattice, tables_stream)

            for table_index, table in enumerate(all_tables):
                page_number = int(table.page)
                accuracy = table.accuracy if hasattr(table, 'accuracy') else 0
                
                # Clean and process the dataframe
                df = _clean_dataframe(table.df)
                
                # Calculate confidence score
                confidence = _calculate_confidence(table, df, accuracy)
                
                # If confidence is low and fallback is enabled, try tabula
                if confidence < 0.5 and use_fallback:
                    try:
                        tabula_df = _extract_with_tabula(tmp_path, page_number)
                        if tabula_df is not None and not tabula_df.empty:
                            df = tabula_df
                            confidence = 0.7  # Moderate confidence for tabula results
                    except Exception as e:
                        errors.append(f"Tabula fallback failed for page {page_number}: {str(e)}")

                blocks.append({
                    "id": str(uuid4()),
                    "source_engine": "table-parser",
                    "page_number": page_number,
                    "table": {
                        "rows": df.values.tolist(),
                        "headers": df.columns.tolist() if not df.columns.equals(pd.RangeIndex(len(df.columns))) else None,
                        "num_rows": len(df),
                        "num_cols": len(df.columns)
                    },
                    "bbox": {
                        "x1": float(table._bbox[0]),
                        "y1": float(table._bbox[1]),
                        "x2": float(table._bbox[2]),
                        "y2": float(table._bbox[3]),
                        "unit": "pt"
                    },
                    "confidence": confidence,
                    "parsing_report": table.parsing_report if hasattr(table, 'parsing_report') else None
                })

        except Exception as e:
            errors.append(f"Table parsing failed: {str(e)}")

    return {
        "engine": "table-parser",
        "ocr_used": False,
        "blocks": blocks,
        "errors": errors
    }


def _merge_table_results(lattice_tables, stream_tables) -> List:
    """Merge results from different parsing strategies, removing duplicates."""
    all_tables = []
    seen_regions = set()
    
    # Prioritize lattice results (usually more accurate for bordered tables)
    for table in lattice_tables:
        bbox_key = (table.page, tuple(table._bbox))
        if bbox_key not in seen_regions:
            all_tables.append(table)
            seen_regions.add(bbox_key)
    
    # Add stream results that don't overlap significantly
    for table in stream_tables:
        bbox_key = (table.page, tuple(table._bbox))
        if not _has_significant_overlap(table, all_tables):
            all_tables.append(table)
    
    return all_tables


def _has_significant_overlap(table, existing_tables, threshold=0.5) -> bool:
    """Check if table overlaps significantly with existing tables."""
    for existing in existing_tables:
        if table.page != existing.page:
            continue
        
        # Calculate IoU (Intersection over Union)
        x1 = max(table._bbox[0], existing._bbox[0])
        y1 = max(table._bbox[1], existing._bbox[1])
        x2 = min(table._bbox[2], existing._bbox[2])
        y2 = min(table._bbox[3], existing._bbox[3])
        
        if x2 > x1 and y2 > y1:
            intersection = (x2 - x1) * (y2 - y1)
            area1 = (table._bbox[2] - table._bbox[0]) * (table._bbox[3] - table._bbox[1])
            area2 = (existing._bbox[2] - existing._bbox[0]) * (existing._bbox[3] - existing._bbox[1])
            union = area1 + area2 - intersection
            
            if intersection / union > threshold:
                return True
    
    return False


def _clean_dataframe(df: pd.DataFrame) -> pd.DataFrame:
    """Clean and preprocess the extracted dataframe."""
    # Remove completely empty rows and columns
    df = df.dropna(how='all').dropna(axis=1, how='all')
    
    # Strip whitespace from all string cells
    df = df.applymap(lambda x: x.strip() if isinstance(x, str) else x)
    
    # Remove rows where all cells are empty strings
    df = df[~df.apply(lambda row: all(cell == '' for cell in row), axis=1)]
    
    # Try to detect and set proper headers
    if len(df) > 0:
        first_row = df.iloc[0]
        # If first row looks like headers (mostly non-numeric)
        if sum(isinstance(val, str) and val != '' for val in first_row) / len(first_row) > 0.5:
            df.columns = first_row
            df = df[1:].reset_index(drop=True)
    
    return df


def _calculate_confidence(table, df: pd.DataFrame, accuracy: float) -> float:
    """Calculate a more nuanced confidence score."""
    base_confidence = accuracy / 100 if accuracy else 0.5
    
    # Penalize if too many empty cells
    total_cells = df.shape[0] * df.shape[1]
    empty_cells = df.isna().sum().sum() + (df == '').sum().sum()
    emptiness_penalty = (empty_cells / total_cells) * 0.3 if total_cells > 0 else 0
    
    # Boost if table has reasonable dimensions
    dimension_bonus = 0.1 if (3 <= df.shape[0] <= 1000 and 2 <= df.shape[1] <= 50) else 0
    
    confidence = base_confidence - emptiness_penalty + dimension_bonus
    
    return max(0.0, min(1.0, confidence))


def _extract_with_tabula(pdf_path: str, page_number: int) -> pd.DataFrame:
    """Fallback extraction using tabula-py."""
    try:
        dfs = tabula.read_pdf(
            pdf_path,
            pages=page_number,
            multiple_tables=False,
            pandas_options={'header': None}
        )
        
        if dfs and len(dfs) > 0:
            return _clean_dataframe(dfs[0])
        return None
    except:
        return None