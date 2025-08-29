from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import sqlite3
import json
from typing import Optional
import os
from datetime import datetime
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Sign2Speech API", 
    description="AI-powered sign language to speech translation API",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database setup
DATABASE_PATH = "sign2speech.db"

def init_database():
    """Initialize SQLite database with required tables"""
    conn = sqlite3.connect(DATABASE_PATH)
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS gesture_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            gesture_name TEXT NOT NULL,
            confidence REAL NOT NULL,
            timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            session_id TEXT
        )
    """)

    conn.commit()
    conn.close()
    logger.info("Database initialized successfully")

# Initialize database on startup
init_database()

# Pydantic models
class ContactForm(BaseModel):
    name: str
    email: str
    message: str

class GestureLog(BaseModel):
    gesture_name: str
    confidence: float
    session_id: Optional[str] = None

@app.get("/")
async def root():
    return {
        "message": "Sign2Speech API is running",
        "status": "healthy",
        "version": "1.0.0"
    }

@app.post("/api/contact")
async def submit_contact_form(contact: ContactForm):
    """Handle contact form submissions"""
    try:
        conn = sqlite3.connect(DATABASE_PATH)
        cursor = conn.cursor()

        cursor.execute("""
            INSERT INTO contacts (name, email, message)
            VALUES (?, ?, ?)
        """, (contact.name, contact.email, contact.message))

        conn.commit()
        contact_id = cursor.lastrowid
        conn.close()

        return {
            "success": True,
            "message": "Thank you for your message! We'll get back to you soon.",
            "contact_id": contact_id
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "version": "1.0.0"
    }

@app.get("/api/features")
async def get_features():
    """Get application features"""
    features = [
        {
            "title": "Real-time Gesture Recognition",
            "description": "Advanced AI-powered hand gesture detection",
            "icon": "hand"
        },
        {
            "title": "Speech Synthesis", 
            "description": "Convert gestures into natural speech",
            "icon": "volume-2"
        },
        {
            "title": "Speech-to-Text",
            "description": "Real-time speech recognition",
            "icon": "mic"
        },
        {
            "title": "Privacy First",
            "description": "All processing happens locally",
            "icon": "shield-check"
        }
    ]
    return {"features": features}

if __name__ == "__main__":
    import uvicorn
    print("🤟 Starting Sign2Speech API server...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
