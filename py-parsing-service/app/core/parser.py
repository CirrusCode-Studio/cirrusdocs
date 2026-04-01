# app/core/parser.py

from app.core.dispatcher import dispatch


def parse_document(file_url: str):
    blocks = dispatch(file_url)

    return {
        "blocks": blocks
    }