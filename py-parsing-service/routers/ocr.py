from fastapi import APIRouter, UploadFile, File
from parsers.ocr_engine import parse_ocr

router = APIRouter()

@router.post("/ocr")
async def parse(file: UploadFile = File(...)):
    result = parse_ocr(await file.read())
    return result
