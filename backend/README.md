# CineCraft Media - Backend (Stage 2)

Node.js + Express + PostgreSQL backend for CineCraft Media. This stage scaffolds the API, sets up the database schema, and implements basic REST endpoints with JWT authentication.

## Tech Stack
- Node.js
- Express.js
- PostgreSQL (`pg`)
- JWT (`jsonwebtoken`)
- Password hashing (`bcrypt`)
- Environment variables (`dotenv`)
- Dev server (`nodemon`)
- CORS (`cors`)

## Project Structure
```
/backend
  /config
    db.js
  /controllers
    authController.js
    bookingController.js
    serviceController.js
    portfolioController.js
  /models
    userModel.js
    bookingModel.js
    serviceModel.js
    portfolioModel.js
  /routes
    authRoutes.js
    bookingRoutes.js
    serviceRoutes.js
    portfolioRoutes.js
  /middleware
    authMiddleware.js
    errorMiddleware.js
  db.sql
  server.js
  package.json
  .env.example
  README.md
```

## Environment Variables
Copy `.env.example` to `.env` and adjust values:
```
PORT=5000
DATABASE_URL=postgres://username:password@localhost:5432/cinecraft
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

## Setup Instructions
1. Install dependencies
```
cd backend
npm install
```

2. Setup PostgreSQL database
- Create a database named `cinecraft` (or change `DATABASE_URL` accordingly)
- Run the SQL schema and seed data
```
psql "postgres://username:password@localhost:5432/cinecraft" -f db.sql
```

3. Start the dev server
```
npm run dev
```
Server should start on `http://localhost:5000`. Health check at `GET /health`.

## API Endpoints
- Auth
  - POST `/api/auth/register`
  - POST `/api/auth/login`
- Services
  - GET `/api/services`
  - POST `/api/services` (admin only)
  - PUT `/api/services/:id` (admin only)
  - DELETE `/api/services/:id` (admin only)
- Portfolio
  - GET `/api/portfolio`
  - POST `/api/portfolio` (admin only)
  - PUT `/api/portfolio/:id` (admin only)
  - DELETE `/api/portfolio/:id` (admin only)
- Bookings
  - POST `/api/bookings`
  - GET `/api/bookings` (admin only)
  - PUT `/api/bookings/:id` (admin only)
  - DELETE `/api/bookings/:id` (admin only)

## Notes
- Ensure PostgreSQL is running and `DATABASE_URL` is reachable.
- The seed data includes an admin user:
  - Email: `admin@cinecraft.com`
  - Password: `Admin@123`
- Update CORS origin in `.env` if your frontend runs on a different port.
