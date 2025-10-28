#!/usr/bin/env python3
"""
Quick startup check script for Dorza AI Backend.
Verifies that all dependencies are installed and API keys are configured.
"""

import sys
import os

def check_dependencies():
    """Check if all required packages are installed."""
    required = [
        'fastapi',
        'uvicorn',
        'pydantic',
        'dotenv',
        'google.genai',
    ]
    
    missing = []
    for package in required:
        try:
            if package == 'dotenv':
                __import__('dotenv')
            elif package == 'google.genai':
                from google import genai
            else:
                __import__(package)
        except ImportError:
            missing.append(package)
    
    if missing:
        print(f"[ERROR] Missing packages: {', '.join(missing)}")
        print("Run: pip install -r requirements.txt")
        return False
    
    print("[OK] All dependencies installed")
    return True

def check_api_key():
    """Check if GEMINI_API_KEY is configured."""
    from dotenv import load_dotenv
    load_dotenv()
    
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("[WARNING] GEMINI_API_KEY not found in environment variables")
        print("Create backend/.env file with: GEMINI_API_KEY=your_key_here")
        return False
    
    print("[OK] GEMINI_API_KEY configured")
    return True

def main():
    print("Checking Dorza AI Backend Setup...")
    print("-" * 50)
    
    deps_ok = check_dependencies()
    api_ok = check_api_key()
    
    print("-" * 50)
    
    if deps_ok and api_ok:
        print("[OK] Backend is ready to start!")
        print("Run: uvicorn main:app --reload --port 8000")
        return 0
    else:
        print("[ERROR] Backend setup incomplete")
        return 1

if __name__ == "__main__":
    sys.exit(main())

