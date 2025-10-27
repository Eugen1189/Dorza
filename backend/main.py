from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional
from dotenv import load_dotenv
from models import CampaignInput
import os

# Завантажуємо змінні оточення
load_dotenv()

# Ініціалізуємо FastAPI додаток
app = FastAPI(title="Dorza AI Campaign Generator")

# Налаштування CORS для фронтенду
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite та інші порти
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Модель для відповіді
class CampaignResponse(BaseModel):
    success: bool
    message: str
    data: Optional[dict] = None

# Базовий ендпоінт для перевірки роботи
@app.get("/")
async def root():
    return {"message": "Dorza AI Campaign Generator API is running"}

# Health check ендпоінт
@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "campaign-generator"}

# Ендпоінт для генерації соціальних медіа (заготовка для Фази 2)
@app.post("/api/generate")
async def generate_social_media_content(input_data: CampaignInput):
    """
    Базовий маршрут, що приймає вхідні дані та повертає OK.
    (На Фазі 2 тут буде інтегрована логіка Gemini)
    """
    print(f"Отримані дані: {input_data.model_dump()}")
    
    # Тимчасова відповідь для тестування (Під-фаза 1.2)
    return {
        "status": "OK",
        "message": "Дані успішно отримано. Готуємося до запуску AI-агентів.",
        "data_received": input_data.model_dump()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
