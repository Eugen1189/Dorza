from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional
from dotenv import load_dotenv
from models import CampaignInput
import os

# Load environment variables
load_dotenv()

# Initialize FastAPI application
app = FastAPI(title="Dorza AI Campaign Generator")

# CORS configuration for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite and other ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Response model
class CampaignResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None

# Basic endpoint for testing
@app.get("/")
async def root():
    return {"message": "Dorza AI Campaign Generator API is running"}

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "campaign-generator"}

# Social media generation endpoint (placeholder for Phase 2)
@app.post("/api/generate")
async def generate_social_media_content(input_data: CampaignInput):
    """
    Basic route that receives input data and returns OK.
    (Gemini logic will be integrated here in Phase 2)
    """
    print(f"Received data: {input_data.model_dump()}")
    
    # Temporary response for testing (Sub-phase 1.2)
    return {
        "status": "OK",
        "message": "Data received successfully. Preparing AI agents for launch.",
        "data_received": input_data.model_dump()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
