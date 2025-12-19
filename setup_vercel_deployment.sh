#!/bin/bash

echo "🚀 Setting up Vercel deployment configuration..."

# Create vercel.json
echo "📄 Creating vercel.json..."
cat > vercel.json << 'EOF'
{
  "version": 2,
  "builds": [
    {
      "src": "app/frontend/package.json",
      "use":  "@vercel/static-build",
      "config": {
        "distDir": "app/frontend/dist"
      }
    },
    {
      "src": "app/main.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "app/main.py"
    },
    {
      "src": "/(.*)",
      "dest": "app/frontend/dist/$1"
    }
  ]
}
EOF

# Create api directory and index.py
echo "📄 Creating api/index.py..."
mkdir -p api
cat > api/index. py << 'EOF'
"""
Vercel serverless handler for FastAPI application
"""
from app.main import app

# Export the FastAPI app as handler for Vercel
handler = app
EOF

# Update requirements.txt
echo "📄 Updating requirements.txt..."
cat >> requirements.txt << 'EOF'

# JWT dependencies for Vercel deployment
pyjwt==2.9.0
cryptography==42.0.5
EOF

# Update env.example
echo "📄 Updating env.example..."
cat > env.example << 'EOF'
ANILIST_CLIENT_ID=your_client_id_here
ANILIST_CLIENT_SECRET=your_client_secret_here
SECRET_KEY=your_super_secret_jwt_key_here_make_it_long_and_random
REDIRECT_URL=http://localhost:8000/auth/callback
FRONTEND_URL=http://localhost:5173

# For production (Vercel), use:
# REDIRECT_URL=https://your-app.vercel.app/auth/callback
# FRONTEND_URL=https://your-app.vercel.app
EOF

# Create docs directory
mkdir -p docs

# Create DEPLOYMENT.md
echo "📄 Creating docs/DEPLOYMENT.md..."
cat > docs/DEPLOYMENT.md << 'EOF'
# Vercel Deployment Guide

This guide will help you deploy your Anilist application to Vercel.

## Prerequisites

- Vercel account (sign up at https://vercel.com)
- Anilist OAuth application (https://anilist.co/settings/developer)
- Git repository pushed to GitHub

## Step 1: Prepare Your Anilist OAuth App

1. Go to https://anilist.co/settings/developer
2. Create a new OAuth client or edit existing one
3. Add your Vercel redirect URI:  `https://your-app-name.vercel.app/auth/callback`
4. Note your `Client ID` and `Client Secret`

## Step 2: Deploy to Vercel

### Option A:  Using Vercel Dashboard (Easiest)

1. Go to https://vercel.com/new
2. Import your GitHub repository: `jla690/unofficial_anilist_program`
3. Configure your project:
   - **Framework Preset**: Other
   - **Root Directory**: `./`
   - **Build Command**: Leave empty (handled by vercel. json)
   - **Output Directory**: Leave empty

4. Add Environment Variables: