from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any
from dotenv import load_dotenv
from models import CampaignInput, StrategyBrief, PostOutput, FinalCampaignOutput
import os
import json
import base64
import requests

# Load environment variables
load_dotenv()

# Initialize FastAPI application
app = FastAPI(title="Dorza AI Campaign Generator API", version="0.1.0")

# CORS configuration for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:3001", "http://localhost:5173"],  # Next.js, Vite and other ports
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Gemini API
try:
    API_KEY = os.getenv("GEMINI_API_KEY")
    if not API_KEY:
        raise ValueError("GEMINI_API_KEY not found in environment variables.")
    
    # Use powerful model for strategic planning
    MODEL_NAME = "gemini-2.0-flash-exp"
    
    # Initialize client
    from google import genai
    from google.genai import types
    from google.genai.errors import APIError
    
    client = genai.Client(api_key=API_KEY)
except (ValueError, ImportError) as e:
    print(f"API initialization error: {e}")
    print("Gemini API will not be available. Install google-genai package.")
    client = None
    types = None
    APIError = Exception

# --- HEALTH CHECK and ROOT ---

@app.get("/")
def root():
    return {"message": "Dorza AI Campaign Generator API is running"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "campaign-generator"}

# --- IMAGE GENERATION FUNCTION ---

def generate_image_with_imagen(prompt: str) -> str:
    """
    Generate an image using Google's Imagen 3 API.
    Returns the URL of the generated image or None if generation fails.
    """
    if not API_KEY:
        print("Warning: API_KEY not available for image generation")
        return None
    
    try:
        # Use Imagen 3 via Vertex AI (requires different setup)
        # For now, we'll use a placeholder approach
        # In production, you would use Google Cloud Vertex AI SDK
        
        # Alternative: Use DALL-E 3 via OpenAI (requires OpenAI API key)
        # For MVP, we'll return None and keep image_url as optional
        
        print(f"Image generation requested for prompt: {prompt[:100]}...")
        print("Note: Image generation requires additional API setup (OpenAI DALL-E or Google Imagen)")
        
        # Placeholder: Return None to indicate image generation is not yet implemented
        return None
        
    except Exception as e:
        print(f"Error generating image: {e}")
        return None

# --- ROUTE 3.1 & 3.2: Strategy Agent + Content Adapters ---

@app.post("/api/generate", response_model=FinalCampaignOutput)
async def generate_content(input_data: CampaignInput):
    """
    Executes full agent chain:
    1. Generate Strategy Brief (StrategyBrief).
    2. Loop through topics and generate final content (PostOutput) for each.
    """
    if not client:
        raise HTTPException(status_code=500, detail="Gemini API Client is not initialized. Check GEMINI_API_KEY.")

    try:
        # --- STAGE 1: Strategy Agent (generate StrategyBrief) ---
        
        # Create System Prompt for Strategy Agent
        system_prompt_brief = f"""
        You are a highly qualified AI agent specializing in developing marketing strategies for social media. 
        Your task is to analyze user input and create a structured Strategy Brief.
        
        Consider the following requirements:
        1. Output format must STRICTLY match the provided JSON schema StrategyBrief.
        2. Number of post topics (post_topics) must exactly equal {input_data.num_posts} from input data.
        3. Strategy should maximally match the desired TONE ('{input_data.desired_tone}') and CAMPAIGN GOAL ('{input_data.campaign_goal}').
        4. Each topic should be unique and clearly focus on sales, engagement, traffic or awareness, according to the overall goal.
        """

        # Create User Prompt for Strategy Agent
        user_prompt_brief = f"""
        Please generate a Strategy Brief using the provided input data:
        - Business Name: {input_data.business_name}
        - Product/Service: {input_data.product_service}
        - Target Audience: {input_data.target_audience}
        - Campaign Goal: {input_data.campaign_goal}
        - Desired Tone: {input_data.desired_tone}
        - Campaign Theme: {input_data.campaign_theme if input_data.campaign_theme else 'Not provided, create new.'}
        - Required number of topics: {input_data.num_posts}
        """
        
        # Configure Structured Output for Strategy Brief
        strategy_schema = StrategyBrief.model_json_schema()

        config_brief = types.GenerateContentConfig(
            system_instruction=system_prompt_brief,
            response_mime_type="application/json",
            response_schema=strategy_schema,
        )

        # Call Gemini API for Strategy Brief
        response_brief = client.models.generate_content(
            model=MODEL_NAME,
            contents=[user_prompt_brief],
            config=config_brief,
        )

        # Parse StrategyBrief from JSON response
        brief = StrategyBrief.model_validate_json(response_brief.text)
        
        # --- STAGE 2 & 3: Content Adapters (generate PostOutput for each topic) ---
        
        final_posts = []
        
        # Loop through each topic from Strategy Agent
        for topic in brief.post_topics:
            
            # Create specialized prompt for content adaptation
            prompt_adapter = f"""
            You are an AI content adapter. Your task is to transform the provided topic into 
            ready-to-publish texts for 4 different social networks and create a detailed 
            prompt for an image generator.
            
            Input data for the post:
            - General Topic: {topic.topic_title}
            - Main Message: {topic.primary_message}
            - Business: {input_data.business_name} ({input_data.product_service})
            - Audience: {input_data.target_audience}
            - Desired Tone: {input_data.desired_tone}
            
            Output requirements:
            - Texts must be unique and adapted to the limits and style of each platform.
            - X/Twitter: Very short, max 280 characters.
            - LinkedIn: Professional, B2B-oriented.
            - Instagram: Short, visually oriented, with emojis.
            - Facebook: Medium length, discussion-oriented.
            - Create an image prompt that perfectly illustrates the message.
            - STRICTLY follow the final JSON schema PostOutput.
            """
            
            # Configure Structured Output for Post
            post_schema = PostOutput.model_json_schema()
            
            config_post = types.GenerateContentConfig(
                system_instruction=prompt_adapter,
                response_mime_type="application/json",
                response_schema=post_schema,
            )
            
            # Call Gemini API for Post Content
            response_post = client.models.generate_content(
                model=MODEL_NAME,
                contents=[prompt_adapter],
                config=config_post,
            )
            
            # Parse PostOutput from JSON response
            post_data = PostOutput.model_validate_json(response_post.text)
            
            # Generate image for this post (optional, may return None)
            image_url = generate_image_with_imagen(post_data.image_prompt)
            
            # Update post with generated image URL if available
            if image_url:
                post_data.image_url = image_url
            
            # Add final post to list
            final_posts.append(post_data)

        # --- STAGE 4: Final Campaign Assembly ---
        
        # Assemble all results into final structure
        final_campaign = FinalCampaignOutput(
            strategy_summary=brief.campaign_summary,
            posts=final_posts
        )
        
        return final_campaign.model_dump()

    except APIError as e:
        print(f"Gemini API Error during generation: {e}")
        raise HTTPException(status_code=502, detail="Error executing request to Gemini API.")
    except Exception as e:
        print(f"Unknown error: {e}")
        raise HTTPException(status_code=500, detail=f"Internal server error: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
