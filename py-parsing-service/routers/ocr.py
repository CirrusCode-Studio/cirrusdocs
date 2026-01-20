from fastapi import APIRouter, UploadFile, File
from parsers.ocr_engine import OCREngine

router = APIRouter()
# Initialize OCR engine once(not per request)
ocr_engine: OCREngine | None = None

def get_ocr_engine():
    global ocr_engine
    if ocr_engine is None: 
        ocr_engine = OCREngine()
    return ocr_engine

@router.post("/ocr")
async def parse(file: UploadFile = File(...)):
    engine = get_ocr_engine()
    pdf_bytes = await file.read()
    return engine.parse(pdf_bytes)
