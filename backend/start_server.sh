#!/bin/bash
echo "Starting Dorza AI Backend Server..."
echo ""
cd "$(dirname "$0")"
python -m uvicorn main:app --reload --port 8000

