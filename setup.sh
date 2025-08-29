#!/bin/bash

# Sign2Speech Setup Script
echo "🤟 Setting up Sign2Speech development environment..."

# Check Python version
python_version=$(python3 --version 2>&1)
if [[ $? -eq 0 ]]; then
    echo "✅ Python found: $python_version"
else
    echo "❌ Python 3 is required but not found."
    exit 1
fi

# Create virtual environment
echo "📦 Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "🔌 Activating virtual environment..."
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    source venv/Scripts/activate
else
    source venv/bin/activate
fi

# Install backend dependencies
echo "⬇️ Installing backend dependencies..."
cd backend
pip install -r requirements.txt
cd ..

# Initialize database
echo "🗄️ Initializing database..."
cd backend
python -c "from app import init_database; init_database()"
cd ..

# Create directories
echo "📁 Creating project directories..."
mkdir -p models/tfjs_model
mkdir -p demo/screenshots
mkdir -p logs

echo "✨ Setup complete! 🎉"
echo "To start: cd backend && python app.py"
