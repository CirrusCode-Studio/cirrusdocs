# app/parsers/txt_parser.py

from app.models.block import create_block
from app.utils.file_loader import download_file


def parse_txt(file_url: str):
    file_path = download_file(file_url)

    blocks = []

    with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
        lines = f.readlines()

        for line in lines:
            text = line.strip()

            if text:
                blocks.append(
                    create_block(
                        "paragraph",
                        {"text": text},
                        page=1
                    )
                )

    return blocks