# LeetBrawl: LeetCode 1v1 Coding Duel

## Overview

LeetBrawl is a real-time platform where two users race to solve the same coding problem. The first to submit a correct solution wins.

---

## Getting Started

### Prerequisites
- [Node.js 20+](https://nodejs.org/) (use [nvm](https://github.com/nvm-sh/nvm))
- [Docker](https://www.docker.com/)

---

## 1. Clone and Install Dependencies

```bash
git clone <repo-url>
cd leetbrawl
```

### Frontend
```bash
cd frontend
nvm use 20
npm install
npm run dev
```

### Backend
```bash
cd backend
nvm use 20
npm install
npx tsc
npm run start # or: node dist/index.js
```

---

## 2. Environment Variables

Copy `.env.example` to `.env` in each of the following:
- `frontend/`
- `backend/`
- `prisma/`

Edit as needed for your local setup.

---

## 3. Start Redis, PostgreSQL, and Judge0 with Docker

```bash
docker-compose up -d
```

- Redis: `localhost:6379`
- PostgreSQL: `localhost:5432` (user: `user`, password: `password`, db: `leetbrawl`)
- Judge0: `localhost:2358`

---

## 4. Prisma Setup

```bash
cd prisma
nvm use 20
npm install
npx prisma generate
npx prisma migrate dev --name init
```

---

## 5. Development
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:3001](http://localhost:3001)

---

## Tech Stack
- Next.js, Tailwind CSS, shadcn/ui, Socket.IO (frontend)
- Node.js, Express, Socket.IO, BullMQ, Redis, Judge0, PostgreSQL, Prisma (backend)

---

## Notes
- Each folder (`frontend`, `backend`, `prisma`) can run independently in development.
- Use `nvm use 20` in each folder before running Node.js commands. 