from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
from models.handwriting_cnn import predict_dysgraphia

router = APIRouter()

@router.post("/predict")
async def predict_dysgraphia_route(file: UploadFile = File(...)):
    image_bytes = await file.read()
    result, heatmap = predict_dysgraphia(image_bytes)

    return JSONResponse(content={
        "label": result,
        "heatmap": heatmap
    })
