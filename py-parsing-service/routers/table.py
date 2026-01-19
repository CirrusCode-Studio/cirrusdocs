from fastapi import APIRouter, UploadFile, File
from parsers.table_engine import parse_tables

router = APIRouter()

@router.post("/tables")
async def parse(file: UploadFile = File(...)):
    content = await file.read()
    return parse_tables(content)
