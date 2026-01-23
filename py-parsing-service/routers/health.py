import time
import psutil
from fastapi import APIRouter

router = APIRouter()

START_TIME = time.time()

def check_ocr():
    try:
        import paddleocr
        return True
    except Exception:
        return False

def check_pdf():
    try:
        import pdfplumber
        return True
    except Exception:
        return False
    
@router.get("/health")
def health():
    return {
        "system": "parsing-service",
        "status": "running",
        "uptime_sec": int(time.time() - START_TIME),
        "cpu_percent": psutil.cpu_percent(interval=0.1),
        "memory": {
            "used_mb": int(psutil.virtual_memory().used / 1024 / 1024),
            "total_mb": int(psutil.virtual_memory().total / 1024 / 1024),
            "percent": psutil.virtual_memory().percent,
        },
        "engines": {
            "pdf": "ok" if check_pdf() else "error",
            "ocr": "ok" if check_ocr() else "error",
        }
    }