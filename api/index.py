"""
Vercel serverless handler for FastAPI application
"""
from app.main import app

# Export the FastAPI app as handler for Vercel
handler = app