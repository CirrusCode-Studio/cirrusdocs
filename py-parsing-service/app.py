from fastapi import FastAPI
from routers import pdf_text, table, formula, ocr

app = FastAPI(title="CirrusDocs Parsing Service")

app.include_router(pdf_text.router, prefix="/parse")
app.include_router(table.router, prefix="/parse")
app.include_router(formula.router, prefix="/parse")
app.include_router(ocr.router, prefix="/parse")