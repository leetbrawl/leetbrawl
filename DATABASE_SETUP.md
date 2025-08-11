# Database Setup Guide

## Current Status ✅
- Environment files created (`.env` in backend/ and prisma/)
- Prisma client generated for both backend and prisma projects
- Database schema ready in `prisma/prisma/schema.prisma`

## Next Steps to Complete Database Setup

### Option 1: Using Docker (Recommended)
1. **Install Docker Desktop** if not already installed
2. **Start PostgreSQL service:**
   ```bash
   cd leetbrawl/
   docker compose up -d postgres
   ```
3. **Run database migrations:**
   ```bash
   cd prisma/
   npx prisma migrate dev --name init
   ```

### Option 2: Local PostgreSQL Installation
1. **Install PostgreSQL 15+** locally
2. **Create database:**
   ```sql
   CREATE DATABASE leetbrawl;
   CREATE USER user WITH PASSWORD 'password';
   GRANT ALL PRIVILEGES ON DATABASE leetbrawl TO user;
   ```
3. **Update DATABASE_URL** in both `.env` files if needed
4. **Run migrations:**
   ```bash
   cd prisma/
   npx prisma migrate dev --name init
   ```

## Verification Commands

After database is running:

```bash
# Test database connection
cd prisma/
npx prisma db push

# Open Prisma Studio to view data
npx prisma studio

# Start backend server
cd ../backend/
npm run dev
```

## Environment Variables Set ✅

**Backend (.env):**
- `JWT_SECRET`: Configured for authentication
- `DATABASE_URL`: Points to local PostgreSQL
- `PORT`: Set to 3001

**Prisma (.env):**
- `DATABASE_URL`: Same as backend

## Database Schema Overview

The schema includes:
- **User**: Authentication, ELO ratings (starts at 1200)
- **Match**: Game sessions (RANKED/CASUAL/PRIVATE)
- **Problem**: Coding challenges with test cases
- **Submission**: Code submissions with verdicts
- **RatingHistory**: ELO rating changes

## Troubleshooting

**Connection refused:**
- Ensure PostgreSQL is running on port 5432
- Check DATABASE_URL in .env files

**Prisma generate errors:**
- Run `npm run prisma:generate` from backend/
- Ensure Prisma dependencies are installed

**Migration errors:**
- Drop and recreate database if needed
- Ensure user has sufficient privileges