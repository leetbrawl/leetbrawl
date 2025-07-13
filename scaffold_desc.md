# LeetBrawl Project Scaffold Description

## Current Code Structure & Functionality

### Project Overview
LeetBrawl is a real-time 1v1 coding duel platform where two users race to solve the same coding problem. The first to submit a correct solution wins.

---

## Frontend (`frontend/`)

### Technology Stack
- **Next.js 15** with TypeScript
- **Tailwind CSS v4** for styling
- **shadcn/ui** component library
- **Socket.IO Client** for real-time communication

### Directory Structure
```
frontend/
├── src/
│   ├── app/                 # Next.js App Router
│   ├── components/
│   │   └── ui/             # shadcn/ui components (button, card, input)
│   ├── lib/
│   │   ├── api.ts          # REST API client with TypeScript interfaces
│   │   ├── socket.ts       # Socket.IO client with event typing
│   │   └── utils.ts        # shadcn/ui utilities
│   └── pages/
│       └── index.tsx       # Placeholder lobby UI
├── .env.example            # Environment variables template
└── package.json            # Dependencies: socket.io-client, shadcn/ui
```

### Current Functionality
- **API Client** (`lib/api.ts`): TypeScript interfaces and HTTP client for:
  - Creating/joining matches
  - Fetching problems
  - Match management
- **Socket Client** (`lib/socket.ts`): Real-time communication for:
  - Match events (join, start, submit, verdict)
  - Connection management
- **UI Components**: Basic shadcn/ui setup with button, card, input
- **Lobby Page**: Simple placeholder with create/join match buttons

---

## Backend (`backend/`)

### Technology Stack
- **Node.js** with TypeScript
- **Express.js** for REST API
- **Socket.IO** for real-time events
- **BullMQ** for job queueing
- **Redis** for pub/sub and job storage

### Directory Structure
```
backend/
├── src/
│   ├── api/
│   │   └── matches.ts      # Express router for match endpoints
│   ├── sockets/
│   │   └── index.ts        # Socket.IO server setup
│   ├── jobs/
│   │   └── submissionWorker.ts  # BullMQ worker for code judging
│   ├── utils/
│   │   └── judge0.ts       # Judge0 API client placeholder
│   └── index.ts            # Main Express server entry point
├── .env.example            # Environment variables template
└── package.json            # Dependencies: express, socket.io, bullmq, ioredis
```

### Current Functionality
- **Express Server**: Basic setup with CORS, JSON parsing
- **Match API** (`/api/matches`): Dummy POST endpoint returning mock match data
- **Socket.IO Setup**: Basic connection handling with CORS configuration
- **Job Worker**: BullMQ worker placeholder for processing code submissions
- **Judge0 Client**: Placeholder for code execution service integration

---

## Database (`prisma/`)

### Technology Stack
- **Prisma ORM** with PostgreSQL
- **TypeScript** for type safety

### Schema Structure
```prisma
model User {
  id          String        @id @default(uuid())
  name        String
  email       String        @unique
  matches     Match[]       @relation("UserMatches")
  submissions Submission[]
  createdAt   DateTime      @default(now())
}

model Match {
  id          String        @id @default(uuid())
  status      String        # waiting, active, completed
  problemId   String
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
  users       User[]        @relation("UserMatches")
  submissions Submission[]
}

model Submission {
  id            String   @id @default(uuid())
  user          User     @relation(fields: [userId], references: [id])
  userId        String
  match         Match    @relation(fields: [matchId], references: [id])
  matchId       String
  verdict       String   # Accepted, Wrong Answer, etc.
  executionTime Int?
  createdAt     DateTime @default(now())
}
```

### Current Functionality
- **Database Schema**: Complete data model for users, matches, and submissions
- **Relationships**: Proper foreign key relationships between entities
- **Migration Ready**: Schema is ready for Prisma migrations

---

## Infrastructure (`docker-compose.yml`)

### Services
- **Redis 7**: Message broker for BullMQ and Socket.IO
- **PostgreSQL 15**: Primary database for Prisma
- **Judge0 1.13.0**: Code execution service for testing submissions

### Configuration
- All services exposed on standard ports for local development
- Persistent volume for PostgreSQL data
- Proper service dependencies and networking

---

## Environment Configuration

### Frontend (`.env.example`)
```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

### Backend (`.env.example`)
```
PORT=3001
REDIS_URL=redis://localhost:6379
JUDGE0_URL=http://localhost:2358
```

### Prisma (`.env.example`)
```
DATABASE_URL=postgresql://user:password@localhost:5432/leetbrawl
```

---

## Current Limitations & Placeholders

### Frontend
- Socket.IO client has TypeScript import issues (functional but with linter warnings)
- No authentication system
- No real-time match state management
- No code editor integration

### Backend
- Dummy API responses (no real business logic)
- No authentication middleware
- No real Judge0 integration
- No match state management
- No error handling

### Database
- No seed data
- No database migrations run
- No connection pooling configuration

### Infrastructure
- No production-ready configuration
- No health checks
- No backup strategies

---

## Development Readiness

### ✅ Ready For Development
- Project structure is complete
- Dependencies are installed
- Basic server/client communication setup
- Database schema is defined
- Docker services are configured

### ⚠️ Needs Implementation
- Real business logic
- Authentication system
- Code editor integration
- Real-time match flow
- Error handling
- Testing setup 