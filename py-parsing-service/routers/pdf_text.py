from fastapi import APIRouter, UploadFile, File
from parsers.pdf_text_engine import parse_pdf_text

router = APIRouter()

@router.post("/pdf-text")
async def parse(file: UploadFile = File(...)):
    result = parse_pdf_text(await file.read())
    return result
