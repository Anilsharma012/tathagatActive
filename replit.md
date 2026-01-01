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
- 2026-01-01: Admin Gallery Redesign
  - Modernized gallery design with gradients, shadows, and improved colors
  - Added visible Edit and Delete buttons with text labels
  - Changed button layout from grid to flex for better responsiveness
  - Added hover effects and visual feedback on action buttons
  - Improved modal styling and form inputs

- 2026-01-01: User Profile Update Fix
  - Added missing fields to allowed update list: gender, dob, selectedCategory, selectedExam, targetYear, isOnboardingComplete
  - Now onboarding completion properly saves all user data

- 2026-01-01: Course display fixes
  - Removed static/hardcoded courses from Mycourse component - now shows only admin-created courses
  - Fixed course description parsing to handle HTML `<li>` tags and display as proper bullet points
  - Fixed image path handling for course thumbnails (supports full URLs, /uploads paths, and filenames)
  - Fixed HTML entity decoding (`&amp;` → `&`, etc.)
  - Added "No courses available" message when no admin courses exist

- 2026-01-01: Login redirect fix
  - Fixed issue where existing users were shown "Complete Profile" page on re-login
  - Added `isOnboardingComplete` flag check in OTP verification endpoints
  - Now users who completed onboarding are redirected directly to dashboard (`/study-zone`)
  - Auto-fix for existing users: sets `isOnboardingComplete=true` when all profile fields exist
  
- 2025-12-31: Initial Replit setup
  - Renamed directories to remove spaces
  - Configured workflows for frontend (port 5000) and backend (port 3001)
  - Updated axios config to use local backend proxy
  - Added HOST=0.0.0.0 for Replit compatibility
  - Connected to MongoDB Atlas with production credentials
