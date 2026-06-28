# CustomIQ

CustomIQ is a full-stack avatar assistant application with a Flutter client and a Node.js API. The app covers user accounts, onboarding, avatar flows, conversations, messages, and backend-mediated assistant features.

## Repository Structure

```text
frontend/   Flutter application for onboarding, dashboard, profile, avatar, and chat screens
backend/    Express and MongoDB API for users, avatars, conversations, messages, and assistant flows
```

## Features

- User registration and login with JWT-backed API flows
- Avatar viewing and generation workflows
- Conversation and message endpoints
- Profile and dashboard screens in Flutter
- Runtime backend URL configuration for local and deployed environments
- Server-side provider configuration for assistant and avatar-generation features

## Tech Stack

- Flutter and Dart
- Node.js and Express
- MongoDB and Mongoose
- JWT authentication
- OpenAI API integration from the backend
- Text-to-speech and 3D model rendering in the client

## Run Locally

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm start
```

Default API URL: `http://127.0.0.1:3001`

### Frontend

```bash
cd frontend
flutter pub get
flutter run --dart-define=CUSTOMIQ_API_BASE_URL=http://127.0.0.1:3001/api
```

## Configuration

Backend configuration is read from `.env`. The Flutter app reads the API base URL from `CUSTOMIQ_API_BASE_URL`.

Secrets are not stored in the mobile client. Provider keys such as `OPENAI_API_KEY` belong in the backend environment.
