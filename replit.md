# TathaGat - CAT Exam Preparation Platform

## Overview
TathaGat is a comprehensive online learning platform for competitive exam preparation, particularly focused on CAT (Common Admission Test), XAT, SNAP, and other MBA entrance exams. The platform provides courses, mock tests, study materials, and live classes.

## Project Structure
```
.
├── backend/          # Node.js/Express API server
│   ├── controllers/  # Route handlers
│   ├── models/       # Mongoose schemas
│   ├── routes/       # API route definitions
│   ├── middleware/   # Authentication & other middleware
│   └── index.js      # Main server entry point
├── frontend/         # React frontend (Create React App)
│   ├── public/       # Static assets
│   └── src/
│       ├── components/   # React components
│       ├── pages/        # Page components
│       ├── context/      # React context providers
│       └── utils/        # API utilities and helpers
└── .gitignore
```

## Tech Stack
- **Frontend**: React 18, React Router, Axios, Chart.js, Framer Motion
- **Backend**: Node.js, Express.js, Mongoose
- **Database**: MongoDB (requires MONGO_URI environment variable)
- **Authentication**: JWT tokens

## Running the Project
The project uses two workflows:
1. **Backend API**: Runs on port 3001 (`npm run dev` in backend/)
2. **Frontend**: Runs on port 5000 (`npm start` in frontend/)

The frontend proxies API requests to the backend via the `proxy` setting in package.json.

## Environment Variables
Required for full functionality:
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token signing
- `RAZORPAY_KEY_ID` - Razorpay payment gateway key (optional)
- `RAZORPAY_KEY_SECRET` - Razorpay secret (optional)

The application runs in development mode without a database, using mock data fallbacks.

## Key Features
- Course management and enrollment
- Mock test series with detailed analytics
- Study materials and resources
- Live classes integration
- Discussion forums
- IIM Predictor tool
- Admin panel for content management

## Recent Changes
- 2025-12-31: Initial Replit setup
  - Renamed directories to remove spaces
  - Configured workflows for frontend (port 5000) and backend (port 3001)
  - Updated axios config to use local backend proxy
  - Added HOST=0.0.0.0 for Replit compatibility
