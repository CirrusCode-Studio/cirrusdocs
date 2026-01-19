import fitz  # PyMuPDF
from uuid import uuid4
from typing import List, Dict, Any
import re

def parse_pdf_text(buffer: bytes, preserve_layout: bool = True, extract_metadata: bool = True):
    """
    Enhanced PDF text parser with better text extraction and structure detection.
    
    Args:
        buffer: PDF file as bytes
        preserve_layout: Whether to maintain spatial layout information
        extract_metadata: Whether to extract font and style metadata
    """
    doc = fitz.open(stream=buffer, filetype="pdf")
    blocks = []
    errors = []

    try:
        for page_index, page in enumerate(doc):
            page_number = page_index + 1
            
            if preserve_layout:
                # Use dict mode for better structure preservation
                text_data = page.get_text("dict")
                blocks.extend(_process_structured_text(text_data, page_number, extract_metadata))
            else:
                # Use blocks mode for simpler extraction
                text_blocks = page.get_text("blocks")
                blocks.extend(_process_simple_blocks(text_blocks, page_number))

    except Exception as e:
        errors.append(f"PDF text parsing failed: {str(e)}")
    finally:
        doc.close()

    # Post-process blocks
    blocks = _merge_fragmented_blocks(blocks)
    blocks = _detect_structure(blocks)
    blocks = _clean_blocks(blocks)

    return {
        "engine": "pdf-text",
        "ocr_used": False,
        "blocks": blocks,
        "errors": errors
    }


def _process_structured_text(text_data: Dict, page_number: int, extract_metadata: bool) -> List[Dict]:
    """Process text with detailed structure and formatting information."""
    blocks = []
    
    for block in text_data.get("blocks", []):
        # Skip non-text blocks (images, etc.)
        if block.get("type") != 0:
            continue
        
        lines = block.get("lines", [])
        if not lines:
            continue
        
        # Extract text and metadata from all spans
        full_text = []
        fonts = []
        sizes = []
        colors = []
        flags = []
        
        for line in lines:
            for span in line.get("spans", []):
                text = span.get("text", "")
                if text and text.strip():
                    full_text.append(text)
                    
                    if extract_metadata:
                        fonts.append(span.get("font", ""))
                        sizes.append(span.get("size", 0))
                        colors.append(span.get("color", 0))
                        flags.append(span.get("flags", 0))
        
        if not full_text:
            continue
        
        combined_text = "".join(full_text)
        
        # Calculate block bbox
        bbox = block.get("bbox", [0, 0, 0, 0])
        
        block_data = {
            "id": str(uuid4()),
            "source_engine": "pdf-text",
            "page_number": page_number,
            "text": combined_text.strip(),
            "bbox": {
                "x1": float(bbox[0]),
                "y1": float(bbox[1]),
                "x2": float(bbox[2]),
                "y2": float(bbox[3]),
                "unit": "pt"
            },
            "confidence": 0.98  # High confidence for native PDF text
        }
        
        if extract_metadata and fonts:
            # Determine dominant formatting
            dominant_font = max(set(fonts), key=fonts.count) if fonts else None
            avg_size = sum(sizes) / len(sizes) if sizes else 0
            
            block_data["metadata"] = {
                "font": dominant_font,
                "font_size": round(avg_size, 2),
                "is_bold": _is_bold(flags),
                "is_italic": _is_italic(flags),
                "num_lines": len(lines)
            }
            
            # Detect structural elements
            block_data["block_type"] = _classify_block_type(
                combined_text, avg_size, sizes, flags
            )
        
        blocks.append(block_data)
    
    return blocks


def _process_simple_blocks(text_blocks: List, page_number: int) -> List[Dict]:
    """Process text blocks in simple mode."""
    blocks = []
    
    for tb in text_blocks:
        x1, y1, x2, y2, text, block_no, block_type = tb
        
        if not text or not text.strip():
            continue
        
        blocks.append({
            "id": str(uuid4()),
            "source_engine": "pdf-text",
            "page_number": page_number,
            "text": text.strip(),
            "bbox": {
                "x1": float(x1),
                "y1": float(y1),
                "x2": float(x2),
                "y2": float(y2),
                "unit": "pt"
            },
            "confidence": 0.95,
            "block_number": block_no
        })
    
    return blocks


def _is_bold(flags: List[int]) -> bool:
    """Check if text is bold based on font flags."""
    if not flags:
        return False
    # Flag 16 indicates bold in PyMuPDF
    return any(flag & 16 for flag in flags)


def _is_italic(flags: List[int]) -> bool:
    """Check if text is italic based on font flags."""
    if not flags:
        return False
    # Flag 2 indicates italic in PyMuPDF
    return any(flag & 2 for flag in flags)


def _classify_block_type(text: str, avg_size: float, sizes: List[float], flags: List[int]) -> str:
    """Classify block type based on content and formatting."""
    text_stripped = text.strip()
    
    # Check for headers (larger font, short text, often bold)
    if sizes and avg_size > max(sizes) * 0.8:  # Near maximum size
        if len(text_stripped) < 100:
            return "heading"
    
    # Check for list items
    if re.match(r'^[\d\-•●○■□▪▫→⇒]\s+', text_stripped):
        return "list_item"
    
    # Check for page numbers
    if re.match(r'^\d+$', text_stripped) and len(text_stripped) <= 4:
        return "page_number"
    
    # Check for captions (often italic or smaller)
    if _is_italic(flags) and len(text_stripped) < 200:
        if re.match(r'^(Figure|Table|Chart|Image|Diagram)\s+\d+', text_stripped, re.IGNORECASE):
            return "caption"
    
    # Check for footnotes (smaller font, starts with number)
    if sizes and avg_size < min(sizes) * 1.2:
        if re.match(r'^\d+\s+', text_stripped):
            return "footnote"
    
    return "paragraph"


def _merge_fragmented_blocks(blocks: List[Dict]) -> List[Dict]:
    """Merge blocks that were incorrectly split."""
    if not blocks:
        return blocks
    
    merged = []
    current_block = None
    
    for block in sorted(blocks, key=lambda b: (b['page_number'], b['bbox']['y1'], b['bbox']['x1'])):
        if current_block is None:
            current_block = block.copy()
            continue
        
        # Check if blocks should be merged
        if _should_merge_blocks(current_block, block):
            # Merge text
            current_text = current_block['text']
            new_text = block['text']
            
            # Add space if needed
            if current_text and not current_text[-1].isspace() and not new_text[0].isspace():
                current_block['text'] = current_text + " " + new_text
            else:
                current_block['text'] = current_text + new_text
            
            # Expand bbox
            current_block['bbox']['x2'] = max(current_block['bbox']['x2'], block['bbox']['x2'])
            current_block['bbox']['y2'] = max(current_block['bbox']['y2'], block['bbox']['y2'])
            current_block['bbox']['x1'] = min(current_block['bbox']['x1'], block['bbox']['x1'])
            
        else:
            merged.append(current_block)
            current_block = block.copy()
    
    if current_block:
        merged.append(current_block)
    
    return merged


def _should_merge_blocks(block1: Dict, block2: Dict) -> bool:
    """Determine if two blocks should be merged."""
    # Must be on same page
    if block1['page_number'] != block2['page_number']:
        return False
    
    # Check vertical proximity (same line or very close)
    y_overlap = abs(block1['bbox']['y1'] - block2['bbox']['y1']) < 5
    
    # Check horizontal continuity
    x_gap = block2['bbox']['x1'] - block1['bbox']['x2']
    horizontal_close = x_gap < 20  # Less than 20pt gap
    
    # Check if text ends mid-word
    text1_incomplete = block1['text'] and not block1['text'][-1] in '.!?;:,\n'
    
    # Merge if on same line and close together
    return y_overlap and horizontal_close and text1_incomplete


def _detect_structure(blocks: List[Dict]) -> List[Dict]:
    """Add reading order and structural information."""
    for i, block in enumerate(blocks):
        block['reading_order'] = i
    
    return blocks


def _clean_blocks(blocks: List[Dict]) -> List[Dict]:
    """Clean and normalize block text."""
    cleaned = []
    
    for block in blocks:
        text = block['text']
        
        # Remove excessive whitespace
        text = re.sub(r'\s+', ' ', text)
        
        # Remove soft hyphens and zero-width characters
        text = text.replace('\u00ad', '').replace('\u200b', '')
        
        # Skip if empty after cleaning
        if not text.strip():
            continue
        
        block['text'] = text.strip()
        cleaned.append(block)
    
    return cleaned