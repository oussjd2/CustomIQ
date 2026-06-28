# BackendCustomIQ

Backend API for the `CustomIQ` prototype. This service handles user accounts, authentication, avatar persistence, conversations, messages, and AI-assisted avatar generation for the Flutter client in `FrontendCustomIQ`.

## What It Does

- Registers and authenticates users with JWT
- Stores user profiles and generated avatar URLs in MongoDB
- Exposes routes for conversations, messages, and chatbot-related flows
- Supports avatar generation through the OpenAI Images API

## Tech Stack

- Node.js
- Express
- MongoDB + Mongoose
- JWT authentication
- Nodemailer
- OpenAI API
- Swagger tooling

## Project Structure

```text
backend/
  controllers/
  models/
  routes/
  public/
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and update the values:

```env
JWT_SECRET=replace-with-a-long-random-secret
DATABASE_URL=mongodb://localhost:27017/backend
PORT=3001
HOST=127.0.0.1
OPENAI_API_KEY=replace-with-your-openai-api-key
```

### 3. Start the API

```bash
npm start
```

The server runs by default at `http://127.0.0.1:3001`.

## Main Routes

- `POST /api/users/login`
- `POST /api/users`
- `GET /api/users`
- `POST /api/avatars/generate`
- `GET /api/conversations`
- `GET /api/messages`

## Current Status

This repository is a prototype backend. Core flows are present, but production hardening is still needed:

- route-level validation
- automated tests
- auth middleware coverage
- centralized error handling
- Swagger setup polish

## Notes

- Secrets are no longer stored in source files. Use `.env`.
- This backend is designed to pair with `FrontendCustomIQ`.
