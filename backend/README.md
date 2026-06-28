# CustomIQ Backend

Express API for the CustomIQ Flutter application. The service handles user accounts, authentication, avatar persistence, conversations, messages, and server-side avatar generation.

## Features

- User registration and login
- JWT-based authentication flow
- MongoDB persistence through Mongoose models
- Avatar generation endpoint
- Conversation and message routes
- Email support through Nodemailer

## Tech Stack

- Node.js
- Express
- MongoDB and Mongoose
- JWT
- Nodemailer
- OpenAI API
- Swagger tooling

## Project Structure

```text
controllers/
models/
routes/
public/
server.js
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
DATABASE_URL=mongodb://localhost:27017/customiq
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

## Security

Secrets are loaded from environment variables. Do not commit `.env` files or provider credentials.
