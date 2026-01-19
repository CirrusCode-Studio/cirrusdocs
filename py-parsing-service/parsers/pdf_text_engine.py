import fitz  # PyMuPDF
from uuid import uuid4

def parse_pdf_text(buffer: bytes):
    doc = fitz.open(stream=buffer, filetype="pdf")
    blocks = []

    for page_index, page in enumerate(doc):
        page_number = page_index + 1
        text_blocks = page.get_text("blocks")

        for tb in text_blocks:
            x1, y1, x2, y2, text, *_ = tb

            if not text or not text.strip():
                continue

            blocks.append({
                "id": str(uuid4()),
                "source_engine": "pdf-text",
                "page_number": page_number,
                "text": text.strip(),
                "bbox": {
                    "x1": x1,
                    "y1": y1,
                    "x2": x2,
                    "y2": y2,
                    "unit": "pt"
                },
                "confidence": 0.95
            })

    return {
        "engine": "pdf-text",
        "ocr_used": False,
        "blocks": blocks,
        "errors": []
    }