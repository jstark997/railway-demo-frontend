# Railway Demo Frontend (React + Vite)

A simple React frontend for testing Railway deployment with a FastAPI backend.

## Features

- Status check endpoint
- Echo message functionality
- Display items from backend API

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file from the example:
```bash
cp .env.example .env
```

3. Update the `VITE_API_URL` in `.env` to point to your backend (default: http://localhost:8000)

4. Run the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Railway Deployment

This app is configured to deploy automatically to Railway. 

### Important: Environment Variables

After deploying both frontend and backend to Railway:

1. Get your backend Railway URL (e.g., `https://your-backend.railway.app`)
2. In Railway frontend service settings, add environment variable:
   - `VITE_API_URL=https://your-backend.railway.app`
3. Redeploy the frontend for the environment variable to take effect

### Build Configuration

The app uses Vite's build command and serves the production build using `vite preview`.
