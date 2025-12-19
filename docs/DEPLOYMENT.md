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
