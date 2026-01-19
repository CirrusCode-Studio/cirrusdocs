from fastapi import APIRouter, UploadFile, File
from parsers.pdf_text_engine import parse_pdf_text

router = APIRouter()

@router.post("/pdf-text")
async def parse(file: UploadFile = File(...)):
    result = parse_pdf_text(await file.read(), preserve_layout=True, extract_metadata=True)
    return result
