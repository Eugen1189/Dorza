from pydantic import BaseModel, Field
from typing import Literal, Optional

class CampaignInput(BaseModel):
    """Pydantic model for validating user input data."""

    business_name: str = Field(..., description="Company or brand name.")
    product_service: str = Field(..., description="Brief description of product or service.")
    target_audience: str = Field(..., description="Detailed description of target audience.")

    # Use Literal for fixed, validated values
    campaign_goal: Literal['sales', 'engagement', 'traffic', 'awareness'] = Field(..., description="Main marketing campaign goal.")
    desired_tone: Literal['professional', 'friendly', 'sarcastic', 'inspirational', 'humorous'] = Field(..., description="Desired content tone.")

    # Optional fields
    campaign_theme: Optional[str] = Field(None, description="Specific theme or event (e.g., 'Spring Sale').")
    num_posts: Literal[3, 4, 5] = Field(3, description="Number of posts to generate.")

    class Config:
        # Allow using Pydantic as schema source for OpenAPI
        json_schema_extra = {
            "example": {
                "business_name": "ProForma Labs",
                "product_service": "Custom 3D prototypes from bioplastic",
                "target_audience": "Engineers and designers aged 30-45 who value sustainability",
                "campaign_goal": "awareness",
                "desired_tone": "professional",
                "campaign_theme": "Launch of new bioplastic PLA-Pro line",
                "num_posts": 3
            }
        }
