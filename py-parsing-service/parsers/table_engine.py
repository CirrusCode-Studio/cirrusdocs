import camelot
from uuid import uuid4
import tempfile

def parse_tables(buffer: bytes):
    blocks = []

    with tempfile.NamedTemporaryFile(suffix=".pdf") as tmp:
        tmp.write(buffer)
        tmp.flush()

        tables = camelot.read_pdf(tmp.name, pages="all")

        for table_index, table in enumerate(tables):
            page_number = int(table.page)

            blocks.append({
                "id": str(uuid4()),
                "source_engine": "table-parser",
                "page_number": page_number,
                "table": {
                    "rows": table.df.values.tolist()
                },
                "bbox": {
                    "x1": table._bbox[0],
                    "y1": table._bbox[1],
                    "x2": table._bbox[2],
                    "y2": table._bbox[3],
                    "unit": "pt"
                },
                "confidence": table.accuracy / 100 if table.accuracy else 0.8
            })

    return {
        "engine": "table-parser",
        "ocr_used": False,
        "blocks": blocks,
        "errors": []
    }
