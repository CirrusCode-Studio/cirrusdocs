# app/core/dispatcher.py

from app.parsers.pdf_parser import parse_pdf
from app.parsers.docx_parser import parse_docx
from app.parsers.txt_parser import parse_txt


def dispatch(file_url: str):
    file_url = file_url.lower()

    if file_url.endswith(".pdf"):
        return parse_pdf(file_url)

    if file_url.endswith(".docx"):
        return parse_docx(file_url)

    if file_url.endswith(".txt"):
        return parse_txt(file_url)

    # fallback
    return parse_txt(file_url)