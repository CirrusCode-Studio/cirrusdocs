# app/parsers/pdf_parser.py

import fitz  # pymupdf
from app.models.block import create_block
from app.utils.file_loader import download_file


def parse_pdf(file_url: str):
    file_path = download_file(file_url)

    doc = fitz.open(file_path)

    blocks = []

    for page_num, page in enumerate(doc, start=1):
        text = page.get_text()

        if text and text.strip():
            blocks.append(
                create_block(
                    "paragraph",
                    {"text": text.strip()},
                    page=page_num
                )
            )

    return blocks