# Project: LeetCode 1v1 Coding Duel

## Overview

Build a real-time platform where two users race to solve the same coding problem. The first to submit a correct solution wins.

Inspired by LeetCode-style online judges, this platform will support matchmaking, real-time interaction, secure code execution, and live feedback.

---

## Core Features

- **1v1 Matchmaking:** Users can create or join a match via link or queue.
- **Shared Problem View:** Both users receive the same coding problem.
- **Real-Time Timer & Status:** Countdown and live match updates (opponent submitted, verdict, etc.)
- **Code Submission & Judging:** Secure sandboxed code runner (Judge0).
- **Winner Determination:** Based on correct submission time.
- **Match Results Page:** Display winner, time taken, and submission status.

---

## Tech Stack

### Front-End
- **Next.js** with **Tailwind CSS**
- **Socket.IO Client**
- UI Components generated via [V0.dev](https://v0.dev)
- Optional: `shadcn/ui` component library

### Back-End
- **Node.js + Express** server
- **Socket.IO** for real-time events
- **REST API** for creating/joining matches, fetching problems
- **Redis** for pub/sub and job queueing
- **BullMQ** for managing async judge jobs
- **Judge0 API** in Docker for code execution
- **PostgreSQL** for user, match, and submission data
- Optional: Use Prisma ORM

---

## System Design Overview

1. **REST API** (Express)
   - `POST /api/matches`: Create or join match
   - `GET /api/problems/:id`: Get problem info
   - `POST /api/submissions`: Record submission (if not handled fully by socket)

2. **WebSocket Events** (Socket.IO)
   - `join`, `start`, `submit`, `verdict`, `result`

3. **Match Lifecycle**
   - Match created or joined
   - Problem is sent to both users
   - Countdown begins
   - Users code and submit
   - Code is sent to Judge0 via BullMQ
   - Verdicts returned → winner decided

4. **Code Judging**
   - Submissions queued with BullMQ
   - Worker sends to Judge0
   - On result, emits verdict to players

5. **Database Tables**
   - Users: id, name, auth
   - Matches: id, status, problem_id, timestamps
   - Submissions: user_id, match_id, verdict, execution_time

---

## Dev Environment

- Each side (`frontend`, `backend`) has separate dependencies
- Use `nvm` for managing Node.js versions
- Local dev runs Judge0 in Docker
- `.env` files used to configure API keys and secrets

---

## Optional Features

- Spectator mode
- Leaderboards
- Chat during match
- Curated problem packs
