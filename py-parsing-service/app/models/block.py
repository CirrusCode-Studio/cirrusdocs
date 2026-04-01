# app/models/block.py
from typing import Dict, Any

def create_block(block_type: str, content: Dict[str, Any], page: int = 1):
    return {
        "type": block_type,
        "page": page,
        **content
    }