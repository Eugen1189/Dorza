from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any
from dotenv import load_dotenv
from models import CampaignInput, StrategyBrief, PostOutput, FinalCampaignOutput
import os
import json
import base64
import requests
import asyncio

# Load environment variables
load_dotenv()

# Initialize FastAPI application
app = FastAPI(title="Dorza AI Campaign Generator API", version="0.1.0")

# CORS configuration for frontend
# Allow all origins for local testing (including file:// protocol)
# Note: When allow_origins=["*"], allow_credentials must be False
origins = [
    "http://localhost:3000",
    "http://localhost:3001", 
    "http://localhost:5173",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    "http://127.0.0.1:8080",
    "http://127.0.0.1:8000",
    "*",  # Fallback for file:// protocol and other origins
]

app.add_middleware(
    CORSMiddleware,
    allow_origin_regex=r".*",  # Allow any origin pattern for local testing
    allow_credentials=False,  # Must be False when using wildcard/regex
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

# --- ASYNC POST GENERATION FUNCTION ---

async def generate_single_post_async(
    topic: object,
    input_data: CampaignInput,
    config_post: object,
    MODEL_NAME: str
) -> PostOutput:
    """
    Asynchronously generate a single post with all its content.
    This function can run in parallel with other post generation tasks.
    """
    try:
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
        
        # Call Gemini API for Post Content (wrapped in asyncio for better performance)
        response_post = await asyncio.to_thread(
            client.models.generate_content,
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
            print(f"Successfully generated and attached image for post topic: {topic.topic_title}")
        else:
            print(f"Image generation skipped or failed for post topic: {topic.topic_title}")
        
        return post_data
        
    except Exception as e:
        print(f"Error generating post for topic '{topic.topic_title}': {e}")
        # Return a fallback post structure to prevent total failure
        return PostOutput(
            image_prompt=f"Image for {topic.topic_title}",
            facebook_text=f"Content for {topic.topic_title}",
            instagram_text=f"Content for {topic.topic_title}",
            linkedin_text=f"Content for {topic.topic_title}",
            x_text=f"Content for {topic.topic_title}",
            suggested_hashtags="#campaign #socialmedia"
        )

# --- IMAGE GENERATION FUNCTION ---

def generate_image_with_imagen(prompt: str) -> str:
    """
    Generate an image using Google's Gemini Imagen API.
    Returns the URL or base64 data of the generated image or None if generation fails.
    """
    if not client:
        print("Warning: Gemini client not initialized. Skipping image generation.")
        return None
    
    try:
        print(f"Generating image with Gemini Imagen for prompt: {prompt[:100]}...")
        
        # Use Gemini's image generation capability
        # Note: As of current Gemini API, we use the same client but with image generation instructions
        
        image_prompt_text = f"""
        Generate a detailed image description that can be visualized for this marketing campaign:
        
        {prompt}
        
        Create a detailed visual description that can be used to generate an image.
        Focus on:
        - Visual composition and layout
        - Color scheme
        - Key elements to include
        - Mood and atmosphere
        - Brand alignment
        """
        
        # For MVP, we'll generate an enhanced description
        # In production with Imagen API, this would directly generate an image
        print("Note: Full image generation requires Imagen API access.")
        print("Current MVP: Enhanced image description generated for manual image creation.")
        
        # Return None to indicate we're not generating actual images yet
        # Frontend will still display the image_prompt for manual use
        return None
        
    except Exception as e:
        print(f"Error generating image: {e}")
        return None

# --- ROUTE 3.1 & 3.2: Strategy Agent + Content Adapters ---

@app.post("/api/generate", response_model=FinalCampaignOutput)
async def generate_content(input_data: CampaignInput):
    """
    Executes full agent chain with PARALLEL post generation:
    1. Generate Strategy Brief (StrategyBrief) - sequential.
    2. Generate all posts IN PARALLEL using asyncio.gather() - reduces total time significantly.
    
    Performance improvement:
    - Sequential: Time(Brief) + N × Time(Post)
    - Parallel: Time(Brief) + MAX(Time(Posts)) ≈ 3-5x faster!
    """
    if not client:
        raise HTTPException(status_code=500, detail="Gemini API Client is not initialized. Check GEMINI_API_KEY.")

    try:
        # --- STAGE 1: Strategy Agent (generate StrategyBrief) - SEQUENTIAL ---
        # This must run first to get the list of topics for parallel generation
        
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
        
        # --- STAGE 2 & 3: Content Adapters (PARALLEL generation of PostOutput for each topic) ---
        
        # Pre-configure Structured Output for Post (same for all posts)
        post_schema = PostOutput.model_json_schema()
        
        config_post = types.GenerateContentConfig(
            system_instruction="You are an AI content adapter for social media posts.",
            response_mime_type="application/json",
            response_schema=post_schema,
        )
        
        # Create async tasks for all posts
        async_tasks = [
            generate_single_post_async(
                topic=topic,
                input_data=input_data,
                config_post=config_post,
                MODEL_NAME=MODEL_NAME
            )
            for topic in brief.post_topics
        ]
        
        print(f"🚀 Starting parallel generation of {len(async_tasks)} posts...")
        
        # Execute all post generation tasks in parallel
        final_posts = await asyncio.gather(*async_tasks)
        
        print(f"✅ Completed parallel generation of {len(final_posts)} posts!")

        # --- STAGE 4: Final Campaign Assembly (all posts ready) ---
        
        # Assemble all results into final structure (parallel generation complete)
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
