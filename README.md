# HRMS Lite – Frontend (React)

React + Vite single-page admin for managing employees and attendance with connected backend API.

## Stack
- React 18
- Vite build tooling
- Vanilla CSS styling

## Environment
Optional `.env` (copy `.env.example`):
```
VITE_API_URL=https://your-backend.onrender.com
```
Defaults to `http://localhost:8000` if not set.

## Local Setup
```bash
cd frontend
npm install
npm run dev
```
App serves on `http://localhost:5173`. Ensure backend is running and CORS-enabled.

## Available Scripts
- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run preview` – preview production build

## Deployment (Vercel example)
- Framework preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`
- Env Vars: `VITE_API_URL` pointing to the deployed backend

## Features Covered
- Employee CRUD (create/list/delete)
- Attendance mark/view with date filter
- Dashboard summary with daily counts
- Present-day totals per employee
