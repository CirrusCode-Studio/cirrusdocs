from fastapi import APIRouter, UploadFile, File
from parsers.formula_engine import parse_formula

router = APIRouter()

@router.post("/formula")
async def parse(file: UploadFile = File(...)):
    result = parse_formula(await file.read())
    return result
