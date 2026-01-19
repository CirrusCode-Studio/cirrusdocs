from uuid import uuid4
from typing import Dict, Any, List


def parse_formula(buffer: bytes) -> Dict[str, Any]:
    """
    Formula parsing is intentionally NOT implemented.

    Reason:
    - Formula OCR is a hard ML problem
    - Open-source solutions are unreliable
    - Industry standard uses Mathpix API or custom ML models

    Policy:
    UNKNOWN > WRONG
    """

    return {
        "engine": "formula-parser",
        "ocr_used": False,
        "blocks": [],
        "errors": [
            "Formula parser not implemented.",
            "Accurate formula extraction requires Mathpix API or a trained ML model.",
            "This parser intentionally returns no blocks to avoid incorrect data."
        ]
    }