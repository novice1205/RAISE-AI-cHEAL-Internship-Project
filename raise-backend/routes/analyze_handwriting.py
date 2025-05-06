from fastapi import APIRouter, UploadFile, File
from fastapi.responses import FileResponse
import os
from yolo_model.predict_yolo import run_detection
from reports.generate_report import create_pdf_report
from utils.analysis_utils import analyze_results

router = APIRouter()

@router.post("/analyze-handwriting/")
async def analyze_handwriting(file: UploadFile = File(...)):
    upload_path = "temp_upload.jpg"
    with open(upload_path, "wb") as f:
        f.write(await file.read())

    results, annotated_img_path = run_detection(upload_path)

    analysis = analyze_results(results)
    suggestions = analysis.get("suggestions", [])

    report_path = create_pdf_report(
        results,
        analysis=analysis,
        username="Demo User",
        output_path="output_images/handwriting_report.pdf"
    )

    return {
        "analysis": analysis,
        "suggestions": suggestions,
        "annotated_img_url": f"/static/{os.path.basename(annotated_img_path)}",
        "report_url": f"/static/{os.path.basename(report_path)}"
    }