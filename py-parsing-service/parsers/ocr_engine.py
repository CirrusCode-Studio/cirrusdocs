import fitz
import pytesseract
from PIL import Image
from uuid import uuid4
import io

def parse_ocr(buffer: bytes):
    doc = fitz.open(stream=buffer, filetype="pdf")
    blocks = []

    for page_index, page in enumerate(doc):
        page_number = page_index + 1
        pix = page.get_pixmap(dpi=300)

        img = Image.open(io.BytesIO(pix.tobytes("png")))
        data = pytesseract.image_to_data(img, output_type=pytesseract.Output.DICT)

        for i, text in enumerate(data["text"]):
            if not text.strip():
                continue

            x, y, w, h = (
                data["left"][i],
                data["top"][i],
                data["width"][i],
                data["height"][i]
            )

            blocks.append({
                "id": str(uuid4()),
                "source_engine": "ocr-parser",
                "page_number": page_number,
                "text": text,
                "bbox": {
                    "x1": x,
                    "y1": y,
                    "x2": x + w,
                    "y2": y + h,
                    "unit": "px"
                },
                "confidence": 0.7
            })

    return {
        "engine": "ocr-parser",
        "ocr_used": True,
        "blocks": blocks,
        "errors": []
    }
