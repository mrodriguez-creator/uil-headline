# UIL Headline Writing Trainer - Deployment Guide

## Files You Need

Your GitHub repository should have this structure:

```
your-repo/
├── index.html              (rename uil-headline-trainer-v2.html to this)
├── api/
│   ├── generate-story.js
│   └── evaluate-headlines.js
└── vercel.json
```

## Step-by-Step Deployment to Vercel

### 1. Prepare Your GitHub Repository

1. Rename `uil-headline-trainer-v2.html` to `index.html`
2. Upload these files to your GitHub repo:
   - `index.html` (in root directory)
   - `api/generate-story.js` (in api folder)
   - `api/evaluate-headlines.js` (in api folder)
   - `vercel.json` (in root directory)

### 2. Get Anthropic API Key

1. Go to https://console.anthropic.com/
2. Create an account or log in
3. Go to API Keys section
4. Create a new API key
5. Copy the key (starts with `sk-ant-`)

### 3. Deploy to Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Import Project"
4. Select your GitHub repository
5. **IMPORTANT:** Before deploying, add environment variable:
   - Click "Environment Variables"
   - Add variable:
     - Name: `ANTHROPIC_API_KEY`
     - Value: (paste your API key from step 2)
   - Make sure it's set for Production, Preview, and Development
6. Click "Deploy"

### 4. Test Your App

Once deployed, Vercel will give you a URL like `your-app.vercel.app`

Test:
1. Click "Generate New Story" - should create a story
2. Write headlines
3. Click "Submit for Feedback" - should get AI evaluation

## Troubleshooting

**Error: "API key not configured"**
- Go to Vercel dashboard → Your project → Settings → Environment Variables
- Make sure `ANTHROPIC_API_KEY` is set correctly
- Redeploy after adding the key

**Error: "Error generating story"**
- Check browser console (F12) for detailed errors
- Make sure API files are in the `api/` folder
- Check Vercel function logs in dashboard

**Error: "Module not found"**
- Make sure folder structure is correct
- Vercel expects serverless functions in `api/` folder

## Cost Information

- Vercel: Free tier includes 100GB bandwidth/month
- Anthropic API: Pay-per-use (very affordable for classroom use)
  - Generating a story: ~$0.003 (less than a penny)
  - Evaluating headlines: ~$0.01 per submission
  - For a class of 30 students practicing 5 times: ~$1.50 total

## Security Notes

- Never commit your API key to GitHub
- Only add it as an environment variable in Vercel
- The API key is kept secure on the server
- Students cannot see or steal your API key
