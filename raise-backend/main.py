from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"   
from fastapi.staticfiles import StaticFiles
from routes.analyze_handwriting import router as handwriting_router
from routes.gamify_characters import router as gamify_router

app = FastAPI(title="RAISE-AI Backend")
    
# Allow frontend access (adjust origin in production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Replace "*" with Vercel domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Mount static directory
os.makedirs("output_images", exist_ok=True)
app.mount("/static", StaticFiles(directory="output_images"), name="static")

# ✅ Include your route
app.include_router(handwriting_router)
app.include_router(gamify_router)

@app.get("/")
def root():
    return {"message": "RAISE-AI API is running"}