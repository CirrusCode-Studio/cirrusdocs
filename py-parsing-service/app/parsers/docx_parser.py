# app/parsers/docx_parser.py

from docx import Document
from app.models.block import create_block
from app.utils.file_loader import download_file


def parse_docx(file_url: str):
    file_path = download_file(file_url)

    doc = Document(file_path)

    blocks = []

    for i, para in enumerate(doc.paragraphs):
        text = para.text.strip()

        if text:
            blocks.append(
                create_block(
                    "paragraph",
                    {"text": text},
                    page=1
                )
            )

    return blocks