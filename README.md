# Book Recommendation Shelf

Full-stack college project using HTML/CSS/JavaScript + Node.js/Express + MongoDB.

## Features
- Register/login with bcrypt password hashing and JWT authentication
- 26-book catalog
- 14 Srinivas subject books + 12 original general books
- Exactly 20 pages per book
- Want to Read / Reading / Completed statuses
- Automatic reading progress through Reader page turns
- Reaching page 20 automatically marks the book Completed
- Personal shelf isolated by logged-in user
- Reading history
- Ratings and reviews
- Rule-based recommendations (NO AI/ML)
- Dashboard and analytics
- Development admin dashboard
- Search and genre filtering

## Run on Windows PowerShell
cd backend
npm install
copy .env.example .env
npm run seed
npm start

Open http://localhost:5000

Make sure MongoDB is running first.

Default .env:
MONGO_URI=mongodb://127.0.0.1:27017/book_recommendation_shelf
JWT_SECRET=change_this_secret_2026
PORT=5000
ADMIN_EMAILS=admin@example.com

For an admin account, register using the email configured in ADMIN_EMAILS.

## Important
The project contains original sample reading content. It does not reproduce copyrighted novels.
