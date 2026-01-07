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
- 2026-01-02: Email Notifications on Signup/Login
  - Created authEmailService.js with sendWelcomeEmail and sendLoginNotificationEmail functions
  - Integrated email notifications into OTP verification routes (both email and phone)
  - New users receive a welcome email upon successful signup
  - Returning users receive a login notification email
  - Uses EMAIL and EMAIL_PASSWORD secrets for Gmail SMTP

- 2026-01-01: Mock Test Navigation & Email Requirement
  - Fixed "Attempt Now" button on free mock tests to navigate directly to the test instructions page
  - Users now go to /student/mock-test/:id/instructions instead of generic study-zone section
  - Made email required during new user signup in onboarding step 1
  - Added email validation (format check) before proceeding to next onboarding step

- 2026-01-01: Free Mock Tests Category & Type Assignment
  - Added downloadType (PREVIOUS_YEAR/TOPIC_WISE) and downloadCategoryId fields to MockTest model
  - Admin Downloads page now shows Section and Category dropdowns for each free mock test
  - Admin can assign each free mock test to Previous Year or Topic Wise section
  - Admin can assign a category within the selected section for proper grouping
  - Frontend MockTest page filters and displays tests in correct sections based on assigned type
  - Fixed validation errors by using findByIdAndUpdate to avoid schema conflicts

- 2026-01-01: Backend Route Fixes
  - Fixed invoiceRoutes.js: Changed import from Course to course/Course path
  - Fixed notificationRoutes.js: Changed userAuth to authMiddleware

- 2026-01-01: Free Mock Tests in Downloads Section
  - Added downloadStatus field (PUBLISHED/COMING_SOON) to MockTest model
  - Free mock tests (created without course) now appear in Admin Downloads section
  - Admin can toggle Published/Coming Soon status for free mock tests
  - Frontend MockTest page now fetches and displays free mock tests alongside other tests
  - Clicking "Attempt Now" on free mock tests redirects to dashboard mock-tests section
  - Added validation: only free tests without a course can be toggled in downloads

- 2026-01-01: Removed Notification Settings from User Profile
  - Removed the Notification Settings section from student Dashboard profile
  - Removed Email Notifications, SMS Reminders, and Performance Reports toggles

- 2026-01-01: Test Feedback Admin Sidebar Fix
  - Added AdminLayout to MockTestFeedback.jsx for consistent sidebar navigation

- 2026-01-01: Consistent Admin Sidebar Navigation
  - Added AdminLayout wrapper to all 20+ admin pages for consistent sidebar
  - Pages updated: PracticeTestManagement, MockTestManagement, StudentPerformance, ImageGalleryManagement, Announcements, BlogManagement, BulkUpload, DemoVideoManagement, DiscussionManagement, DownloadsManagement, HierarchyManagement, LiveClasses, PdfManagement, ScoreCardManagement, StudyMaterials, SuccessStoryManagement, TopperFeedbackManagement, TopPerformerManagement, ZoomManagement, CoursePurchaseContentManagement
  - All admin pages now have unified sidebar, topbar, and theming

- 2026-01-01: Receipt Billing Details Fix
  - Added logo and website fields to Receipt model's companyDetails schema
  - Updated receipt creation to include companyLogo and website from BillingSettings
  - Fixed downloadReceipt to always fetch fresh billing settings (logo, website) for HTML receipts
  - Now user-side receipts display admin-configured company logo and website

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
  
- 2026-01-07: OTP Input and Registration Flow Fixes
  - Added OTP paste functionality: can now paste full 6-digit OTP code and it fills all fields
  - Fixed OTP backspace behavior: first backspace clears current field, second backspace moves to previous field
  - Fixed OTP input to only accept numeric digits
  - Changed new user registration redirect: now goes to /user-details page instead of /student/onboarding (exam category flow)

- 2026-01-07: Student LMS Mobile View Fixes (Part 2)
  - Increased student sidebar item sizes: font-size 16px, padding 14px 16px, gap 12px for better touch targets
  - Fixed hamburger menu alignment on mobile: now left-aligned with justify-content: flex-start

- 2026-01-07: Student LMS Mobile View Fixes
  - Fixed overflow issues on mobile by adding overflow-x: hidden to .student-lms, .lms-main, and .lms-content
  - Enhanced media queries for 768px and 480px breakpoints with improved stat cards, search box, and header layout
  - Fixed NextStep card (.ns-card) mobile styles - added width: 100%, box-sizing: border-box, and mobile-specific styles
  - Updated StudentTopbar.css with mobile responsive styles - hiding search box, back button on small screens
  - Fixed dashboard header, stats grid, course cards, and notifications dropdown for better mobile experience

- 2026-01-06: Replit Environment Setup
  - Migrated all sensitive credentials from .env to Replit Secrets (MONGO_URI, JWT_SECRET, RAZORPAY keys, EMAIL credentials, KARIX SMS keys)
  - Configured workflows: Frontend (port 5000 with webview), Backend (port 3001 with console)
  - Frontend configured with HOST=0.0.0.0 and DANGEROUSLY_DISABLE_HOST_CHECK=true for Replit proxy compatibility
  - Backend CORS configured to allow all origins in development mode

- 2025-12-31: Initial Replit setup
  - Renamed directories to remove spaces
  - Configured workflows for frontend (port 5000) and backend (port 3001)
  - Updated axios config to use local backend proxy
  - Added HOST=0.0.0.0 for Replit compatibility
  - Connected to MongoDB Atlas with production credentials
