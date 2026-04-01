# app/utils/file_loader.py

import requests
import tempfile


def download_file(file_url: str) -> str:
    response = requests.get(file_url)
    response.raise_for_status()

    temp_file = tempfile.NamedTemporaryFile(delete=False)
    temp_file.write(response.content)
    temp_file.flush()

    return temp_file.name