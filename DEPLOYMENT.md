# DayFlow HRMS - Render Deployment Guide

This guide will help you deploy DayFlow HRMS to Render.com for free.

## Prerequisites

1. A GitHub account with this repository
2. A MongoDB Atlas account (free tier available)
3. A Render account (free tier available)

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist IP address `0.0.0.0/0` (allows all IPs)
5. Get your connection string (format: `mongodb+srv://username:password@cluster.mongodb.net/dayflow?retryWrites=true&w=majority`)

## Step 2: Generate JWT Secrets

Run these commands locally to generate secure secrets:

```bash
cd backend
node generate-jwt-secrets.js
```

Copy the generated secrets.

## Step 3: Deploy to Render

### Option A: Using render.yaml (Recommended)

1. Push your code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Click "New +" → "Blueprint"
4. Connect your GitHub repository
5. Render will automatically detect `render.yaml` and configure the service
6. Add environment variables in Render dashboard:
   - `MONGODB_URI` - Your MongoDB Atlas connection string
   - `JWT_ACCESS_SECRET` - Generated access secret
   - `JWT_REFRESH_SECRET` - Generated refresh secret
   - `FRONTEND_URL` - Your Render app URL (e.g., `https://dayflow-hrms.onrender.com`)
   - `NODE_ENV` - Set to `production`
   - `PORT` - Will be set automatically by Render

### Option B: Manual Setup

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `dayflow-hrms`
   - **Environment**: `Node`
   - **Build Command**: `npm run install:all && cd backend && npm install && cd ../frontend && npm run build`
   - **Start Command**: `cd backend && npm start`
5. Add environment variables (same as Option A)

## Step 4: Environment Variables

Add these in Render dashboard under "Environment":

```
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
FRONTEND_URL=https://your-app-name.onrender.com
```

## Step 5: Deploy

1. Click "Create Web Service"
2. Wait for the build to complete (5-10 minutes)
3. Your app will be live at `https://your-app-name.onrender.com`

## Important Notes

- **Free Tier Limitations**: 
  - Services spin down after 15 minutes of inactivity
  - First request after spin-down may take 30-60 seconds
  - Consider upgrading for production use

- **Build Time**: First build takes longer as it installs all dependencies

- **CORS**: The backend automatically allows your Render frontend URL

- **Static Files**: The backend serves the React app in production, so you only need one service

## Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Database Connection Issues
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check connection string format
- Ensure database user has proper permissions

### CORS Errors
- Verify `FRONTEND_URL` matches your Render app URL exactly
- Check browser console for specific CORS errors

### 404 on Page Refresh
- This is handled by the backend serving `index.html` for all non-API routes

## Local Development

For local development, create `.env` files:

**backend/.env**:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
FRONTEND_URL=http://localhost:5173
```

**frontend/.env**:
```
VITE_API_BASE_URL=
```

Leave `VITE_API_BASE_URL` empty for development (uses Vite proxy).

## Support

For issues, check:
1. Render build logs
2. Render service logs
3. Browser console
4. Network tab in browser DevTools

