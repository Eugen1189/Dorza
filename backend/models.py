from pydantic import BaseModel, Field
from typing import Literal, Optional

class CampaignInput(BaseModel):
    """Модель Pydantic для валідації вхідних даних від користувача."""

    business_name: str = Field(..., description="Назва компанії або бренду.")
    product_service: str = Field(..., description="Короткий опис продукту чи послуги.")
    target_audience: str = Field(..., description="Детальний опис цільової аудиторії.")

    # Використовуємо Literal для фіксованих, валідованих значень
    campaign_goal: Literal['sales', 'engagement', 'traffic', 'awareness'] = Field(..., description="Головна мета маркетингової кампанії.")
    desired_tone: Literal['professional', 'friendly', 'sarcastic', 'inspirational', 'humorous'] = Field(..., description="Бажаний тон контенту.")

    # Опціональні поля
    campaign_theme: Optional[str] = Field(None, description="Конкретна тема або подія (наприклад, 'Spring Sale').")
    num_posts: Literal[3, 4, 5] = Field(3, description="Кількість постів для генерації.")

    class Config:
        # Дозволяє використовувати Pydantic як джерело схеми для OpenAPI
        schema_extra = {
            "example": {
                "business_name": "ProForma Labs",
                "product_service": "Кастомні 3D-прототипи з біопластику",
                "target_audience": "Інженери та дизайнери 30-45 років, які цінують екологічність",
                "campaign_goal": "awareness",
                "desired_tone": "professional",
                "campaign_theme": "Запуск нової лінійки біопластику PLA-Pro",
                "num_posts": 3
            }
        }
