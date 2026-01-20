from uuid import uuid4
from paddleocr import PaddleOCR
from pdf2image import convert_from_bytes
import cv2
import numpy as np
from typing import List, Dict, Any, Optional
from PIL import Image, ImageEnhance
import re

class OCREngine:
    def __init__(self, lang="en", use_gpu=False):
        """
        Initialize OCR engine with optimized settings.
        
        Args:
            lang: Language code (en, ch, fr, etc.)
            use_gpu: Whether to use GPU acceleration
        """
        self.model = PaddleOCR(
            use_angle_cls=True,
            lang=lang,
            det_db_thresh=0.3,  # Detection threshold
            det_db_box_thresh=0.5,  # Box threshold
            rec_batch_num=6,  # Batch size for recognition
        )

    def parse(self, pdf_bytes: bytes, dpi: int = 300, preprocess: bool = True):
        """
        Enhanced OCR parsing with image preprocessing and text refinement.
        
        Args:
            pdf_bytes: PDF file as bytes
            dpi: Resolution for PDF to image conversion (higher = better quality)
            preprocess: Whether to apply image preprocessing
        """
        blocks = []
        errors = []

        try:
            # Convert PDF to images with higher DPI for better OCR
            images = convert_from_bytes(
                pdf_bytes,
                dpi=dpi,
                fmt='png',
                thread_count=4
            )

            for page_idx, image in enumerate(images, start=1):
                try:
                    # Preprocess image for better OCR results
                    if preprocess:
                        processed_image = self._preprocess_image(image)
                    else:
                        processed_image = np.array(image)

                    # Run OCR
                    result = self.model.ocr(processed_image)
                                        
                    if not result or result[0] is None:
                        continue

                    # Process OCR results
                    page_blocks = self._process_ocr_results(
                        result[0], 
                        page_idx, 
                        image.size
                    )
                    
                    # Post-process text
                    page_blocks = self._post_process_blocks(page_blocks)
                    
                    # Merge nearby blocks into lines/paragraphs
                    page_blocks = self._merge_blocks_into_lines(page_blocks)
                    
                    blocks.extend(page_blocks)

                except Exception as e:
                    errors.append(f"OCR failed on page {page_idx}: {str(e)}")

        except Exception as e:
            errors.append(f"PDF conversion failed: {str(e)}")

        return {
            "engine": "ocr-parser",
            "ocr_used": True,
            "blocks": blocks,
            "errors": errors
        }

    def _preprocess_image(self, image: Image.Image) -> np.ndarray:
        """
        Apply image preprocessing techniques to improve OCR accuracy.
        """
        # Convert PIL to OpenCV format
        img_array = np.array(image)
        
        # Convert to grayscale if needed
        if len(img_array.shape) == 3:
            gray = cv2.cvtColor(img_array, cv2.COLOR_RGB2GRAY)
        else:
            gray = img_array

        # Apply adaptive thresholding for better text contrast
        # This works well for documents with varying lighting
        binary = cv2.adaptiveThreshold(
            gray,
            255,
            cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
            cv2.THRESH_BINARY,
            11,  # Block size
            2    # Constant subtracted from mean
        )

        # Denoise the image
        denoised = cv2.fastNlMeansDenoising(binary, None, 10, 7, 21)

        # Optional: Deskew the image
        denoised = self._deskew_image(denoised)

        # Sharpen the image
        kernel = np.array([[-1,-1,-1],
                          [-1, 9,-1],
                          [-1,-1,-1]])
        sharpened = cv2.filter2D(denoised, -1, kernel)

        return sharpened

    def _deskew_image(self, image: np.ndarray) -> np.ndarray:
        """
        Correct skewed/rotated text for better OCR.
        """
        # Find all white pixels
        coords = np.column_stack(np.where(image > 0))
        
        if len(coords) < 10:
            return image
        
        # Calculate the angle of skew
        angle = cv2.minAreaRect(coords)[-1]
        
        # Adjust angle
        if angle < -45:
            angle = -(90 + angle)
        else:
            angle = -angle

        # Only deskew if angle is significant
        if abs(angle) < 0.5:
            return image

        # Rotate the image to deskew
        (h, w) = image.shape[:2]
        center = (w // 2, h // 2)
        M = cv2.getRotationMatrix2D(center, angle, 1.0)
        rotated = cv2.warpAffine(
            image, 
            M, 
            (w, h),
            flags=cv2.INTER_CUBIC,
            borderMode=cv2.BORDER_REPLICATE
        )

        return rotated

    def _process_ocr_results(
        self, 
        ocr_result: List, 
        page_idx: int,
        image_size: tuple
    ) -> List[Dict]:
        """
        Process raw OCR results into structured blocks.
        """
        blocks = []
        img_width, img_height = image_size

        for item in ocr_result:
            if not item or len(item) < 2:
                continue

            bbox = item[0]
            text_info = item[1]
            
            if not text_info or len(text_info) < 2:
                continue

            text = text_info[0]
            confidence = float(text_info[1])

            # Skip low confidence results
            if confidence < 0.5:
                continue

            # Skip empty or whitespace-only text
            if not text or not text.strip():
                continue

            # Calculate normalized bbox coordinates
            x_coords = [point[0] for point in bbox]
            y_coords = [point[1] for point in bbox]
            
            x1, x2 = min(x_coords), max(x_coords)
            y1, y2 = min(y_coords), max(y_coords)

            blocks.append({
                "id": str(uuid4()),
                "source_engine": "ocr-parser",
                "page_number": page_idx,
                "bbox": {
                    "x1": float(x1),
                    "y1": float(y1),
                    "x2": float(x2),
                    "y2": float(y2),
                    "unit": "px",
                    "image_width": img_width,
                    "image_height": img_height
                },
                "text": text,
                "raw_text": text,  # Keep original for reference
                "confidence": round(confidence, 4),
                "warnings": [] if confidence > 0.8 else ["low-confidence-ocr"]
            })

        return blocks

    def _post_process_blocks(self, blocks: List[Dict]) -> List[Dict]:
        """
        Clean and correct OCR text using various techniques.
        """
        for block in blocks:
            text = block['text']
            
            # Fix common OCR errors
            text = self._fix_common_ocr_errors(text)
            
            # Remove excessive whitespace
            text = re.sub(r'\s+', ' ', text)
            
            # Fix spacing around punctuation
            text = re.sub(r'\s+([.,!?;:])', r'\1', text)
            text = re.sub(r'([.,!?;:])\s*([a-zA-Z])', r'\1 \2', text)
            
            # Remove zero-width characters
            text = text.replace('\u200b', '').replace('\ufeff', '')
            
            block['text'] = text.strip()

        return blocks

    def _fix_common_ocr_errors(self, text: str) -> str:
        """
        Fix common OCR misrecognitions.
        """
        # Common character substitutions
        replacements = {
            r'\b0\b': 'O',  # Zero to O in words
            r'\bl\b': 'I',  # Lowercase l to I in isolation
            r'rn': 'm',     # rn often misread as m
            r'\|': 'I',     # Pipe to I
            r'~': '-',      # Tilde to dash
            r'°': 'o',      # Degree to o
        }
        
        for pattern, replacement in replacements.items():
            text = re.sub(pattern, replacement, text)
        
        return text

    def _merge_blocks_into_lines(self, blocks: List[Dict]) -> List[Dict]:
        """
        Merge nearby text blocks that belong to the same line.
        """
        if not blocks:
            return blocks

        # Sort blocks by position (top to bottom, left to right)
        sorted_blocks = sorted(
            blocks,
            key=lambda b: (b['bbox']['y1'], b['bbox']['x1'])
        )

        merged = []
        current_line = None

        for block in sorted_blocks:
            if current_line is None:
                current_line = block.copy()
                continue

            # Check if blocks are on the same line
            y_overlap = abs(current_line['bbox']['y1'] - block['bbox']['y1'])
            height = current_line['bbox']['y2'] - current_line['bbox']['y1']
            
            # If vertical overlap is small (same line) and horizontal gap is reasonable
            if y_overlap < height * 0.5:
                x_gap = block['bbox']['x1'] - current_line['bbox']['x2']
                
                # Merge if gap is reasonable (less than 2x character width estimate)
                avg_char_width = (current_line['bbox']['x2'] - current_line['bbox']['x1']) / max(len(current_line['text']), 1)
                
                if x_gap < avg_char_width * 2:
                    # Merge the blocks
                    space = ' ' if x_gap > avg_char_width * 0.3 else ''
                    current_line['text'] = current_line['text'] + space + block['text']
                    
                    # Expand bbox
                    current_line['bbox']['x2'] = block['bbox']['x2']
                    current_line['bbox']['y2'] = max(current_line['bbox']['y2'], block['bbox']['y2'])
                    
                    # Average confidence
                    current_line['confidence'] = (
                        current_line['confidence'] + block['confidence']
                    ) / 2
                    
                    continue

            # Start new line
            merged.append(current_line)
            current_line = block.copy()

        if current_line:
            merged.append(current_line)

        return merged