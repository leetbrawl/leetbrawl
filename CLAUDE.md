# LeetBrawl - Project Documentation for Claude

## Project Overview
LeetBrawl is a real-time competitive coding platform where users face off in head-to-head coding duels. Think "LeetCode meets multiplayer gaming" - users race to solve the same coding problem, with the first correct solution winning the match.

## Technology Stack

### Backend
- **Node.js + TypeScript** - Server runtime and type safety
- **Express.js** - Web framework for REST API
- **Socket.IO** - Real-time communication for live matches
- **Prisma** - Database ORM and type-safe client
- **PostgreSQL** - Primary database
- **Redis** - Caching and job queues (via BullMQ)
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **shadcn/ui** - Component library
- **Socket.IO Client** - Real-time communication

### Infrastructure
- **Docker Compose** - Local development environment
- **Judge0** - Code execution service
- **BullMQ** - Background job processing

## Project Structure

```
leetbrawl/
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── auth/           # Authentication system
│   │   │   ├── authService.ts      # Business logic (JWT, bcrypt)
│   │   │   └── authController.ts   # HTTP handlers
│   │   ├── middleware/     # Express middleware
│   │   │   └── auth.ts            # JWT authentication middleware
│   │   ├── routes/         # API route definitions
│   │   │   ├── auth.ts            # Auth endpoints (/auth/*)
│   │   │   └── protected.ts       # Protected route examples
│   │   ├── config/         # Configuration
│   │   │   └── database.ts        # Prisma client setup
│   │   ├── api/            # Legacy API routes
│   │   ├── sockets/        # Socket.IO setup
│   │   ├── jobs/           # Background job workers
│   │   └── utils/          # Shared utilities
│   └── package.json
├── frontend/                # Next.js React app
├── prisma/                  # Database schema and migrations (CENTRALIZED)
│   ├── prisma/
│   │   └── schema.prisma           # Database schema
│   └── package.json
├── docker-compose.yml       # Local development services
└── CLAUDE.md               # This file
```

## Database Schema

**Key Models:**
- **User** - Authentication, ELO ratings, match history
- **Match** - Game sessions (RANKED/CASUAL/PRIVATE)
- **Problem** - Coding challenges with test cases
- **Submission** - User code submissions with verdicts
- **RatingHistory** - ELO rating changes over time

**Important Fields:**
- Users start with 1200 ELO rating
- Passwords are bcrypt hashed (never stored plain text)
- JWT tokens expire after 7 days
- Matches support 2+ players (extensible for tournaments)

## Authentication System

**Architecture:** 3-layer system
1. **AuthService** - Business logic (JWT, bcrypt, user management)
2. **AuthController** - HTTP request handlers
3. **Middleware** - Route protection

**Security Features:**
- bcrypt password hashing (salt rounds: 12)
- JWT tokens with 7-day expiry
- Environment variable validation (JWT_SECRET required)
- Input validation (email format, username rules)
- Protected routes require valid tokens

**API Endpoints:**
- `POST /auth/register` - User registration
- `POST /auth/login` - User login  
- `GET /auth/profile` - Get user profile (protected)
- `GET /api/protected/dashboard` - Example protected route

## Development Workflow

### Environment Setup
1. **Database:** `cd leetbrawl && docker compose up -d postgres`
2. **Prisma:** `cd prisma && npm run generate && npm run migrate`
3. **Backend:** `cd backend && npm run dev`
4. **Frontend:** `cd frontend && npm run dev`

### Important Commands
```bash
# Database operations (run from prisma/)
npm run generate    # Generate Prisma client
npm run migrate     # Run database migrations
npm run studio      # Open Prisma Studio GUI

# Backend operations (run from backend/)
npm run dev         # Start development server
npm run prisma:generate  # Generate Prisma client for backend

# Environment variables needed:
JWT_SECRET=your-secret-key-here
DATABASE_URL=postgresql://user:password@localhost:5432/leetbrawl
```

## Current Implementation Status

### ✅ Completed Features
- **Database schema** - Complete user/match/problem models
- **Authentication system** - Registration, login, JWT tokens
- **Route protection** - Middleware for protected endpoints
- **Type safety** - Full TypeScript integration
- **Password security** - bcrypt hashing, secure storage
- **Project structure** - Clean separation of concerns

### 🚧 In Progress
- Database migrations (need PostgreSQL running)
- Testing authentication endpoints

### 📋 TODO (Future Features)
- **Matchmaking system** - ELO-based player matching
- **Real-time match flow** - Socket.IO match events
- **Problem management** - CRUD for coding problems
- **Judge0 integration** - Code execution and testing
- **ELO rating system** - Rating calculations after matches
- **Private matches** - Invite-only games with codes

## Key Design Decisions

### Why Centralized Prisma?
- Single source of truth for database schema
- Shared types between frontend and backend  
- Clean separation between database and application code
- Easier team collaboration on schema changes

### Why JWT over Sessions?
- Stateless authentication (no server memory needed)
- Works well with mobile apps and SPAs
- Can include user data in token payload
- Easy horizontal scaling

### Why TypeScript Everywhere?
- Catch errors at compile time
- Better IDE support and autocomplete
- Self-documenting code with interfaces
- Safer refactoring

## Security Considerations

- **Never store plain text passwords** - Always use bcrypt
- **Environment variables** - JWT_SECRET must be set
- **Token expiry** - 7-day limit prevents indefinite access
- **Input validation** - All user inputs are validated
- **CORS enabled** - Allows frontend-backend communication
- **SQL injection prevention** - Prisma provides protection

## Common Issues & Solutions

### Prisma Client Not Found
```bash
# Run from backend directory:
npm run prisma:generate
```

### Database Connection Errors
```bash
# Ensure PostgreSQL is running:
cd leetbrawl && docker compose up -d postgres
```

### JWT Secret Missing
```bash
# Add to backend/.env:
JWT_SECRET=your-very-secure-secret-key-here
```

### TypeScript Errors in Auth
- Check that Prisma client is generated
- Verify JWT_SECRET environment variable is set
- Ensure all imports point to correct paths

## Testing the Authentication System

```bash
# Register a new user
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","email":"alice@example.com","password":"secret123"}'

# Login 
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"secret123"}'

# Access protected route (use token from login response)
curl -H "Authorization: Bearer <token>" \
  http://localhost:3001/auth/profile
```

## Future Architecture Notes

- **Microservices ready** - Clear service boundaries
- **Horizontal scaling** - Stateless JWT design
- **Multi-tenant capable** - User isolation in place
- **Tournament support** - Match system supports 2+ players
- **Real-time ready** - Socket.IO infrastructure in place

---

**Last Updated:** December 2024  
**Status:** Authentication system complete, ready for matchmaking development