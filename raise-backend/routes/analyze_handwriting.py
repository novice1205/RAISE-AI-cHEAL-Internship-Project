from fastapi import APIRouter, UploadFile, File, Form
from fastapi.responses import FileResponse
from yolo_model.predict_yolo import run_detection
from reports.generate_report import create_pdf_report
from utils.analysis_utils import analyze_results
from utils.preprocess_handwriting import preprocess_real_handwriting
import os

router = APIRouter()

@router.post("/analyze-handwriting/")
async def analyze_handwriting(
    file: UploadFile = File(...),
    image_type: str = Form(...)  # "synthetic" or "custom"
):
    # Save uploaded image
    raw_path = "temp_upload.jpg"
    with open(raw_path, "wb") as f:
        f.write(await file.read())

    # Preprocess if it's a custom (real handwriting) image
    if image_type == "custom":
        processed_path = preprocess_real_handwriting(raw_path)
    else:
        processed_path = raw_path  # No changes for synthetic

    # Run detection
    results, annotated_img_path = run_detection(processed_path)

    # Analyze + Report
    analysis = analyze_results(results)
    suggestions = analysis.get("suggestions", [])
    report_path = create_pdf_report(
        results, analysis=analysis,
        username="Demo User",
        output_path="output_images/handwriting_report.pdf"
    )

    return {
        "analysis": analysis,
        "suggestions": suggestions,
        "annotated_img_url": f"/static/{os.path.basename(annotated_img_path)}",
        "report_url": f"/static/{os.path.basename(report_path)}"
    }
