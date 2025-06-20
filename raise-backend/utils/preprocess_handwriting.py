import cv2
import numpy as np
import os

def preprocess_real_handwriting(img_path: str, output_size=(640, 640)) -> str:
    img = cv2.imread(img_path)

    # Step 1: Convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # Step 2: Gaussian blur to reduce noise
    blurred = cv2.GaussianBlur(gray, (5, 5), 0)

    # Step 3: Use morphological operations to remove horizontal lines
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (100, 1))
    detect_horizontal = cv2.morphologyEx(blurred, cv2.MORPH_OPEN, kernel, iterations=1)
    no_lines = cv2.subtract(blurred, detect_horizontal)

    # Step 4: CLAHE to enhance character contrast
    clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
    enhanced = clahe.apply(no_lines)

    # Step 5: Adaptive thresholding (invert so characters are white)
    binary = cv2.adaptiveThreshold(
        enhanced,
        255,
        cv2.ADAPTIVE_THRESH_MEAN_C,
        cv2.THRESH_BINARY_INV,
        blockSize=25,
        C=15
    )

    # Step 6: Morphological closing to fix broken characters
    close_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 3))
    closed = cv2.morphologyEx(binary, cv2.MORPH_CLOSE, close_kernel, iterations=1)

    # Step 7: Remove small noise (keep components of valid area)
    contours, _ = cv2.findContours(closed, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    filtered = np.zeros_like(closed)
    for cnt in contours:
        area = cv2.contourArea(cnt)
        if 100 < area < 5000:
            cv2.drawContours(filtered, [cnt], -1, 255, -1)

    # Step 8: Resize to match expected model input
    result = cv2.resize(filtered, output_size, interpolation=cv2.INTER_AREA)

    # Step 9: Save output
    out_path = img_path.replace(".jpg", "_processed.jpg").replace(".png", "_processed.png")
    cv2.imwrite(out_path, result)

    return out_path
