# CustomIQ

CustomIQ is a full-stack prototype for an AI-assisted avatar companion. The repository combines the Flutter mobile client and the Node.js API that manages users, avatars, conversations, messages, and backend-mediated AI flows.

## Why This Project Matters

This project shows end-to-end product delivery across mobile UI, backend API design, authentication, MongoDB persistence, media/avatar workflows, and AI integration boundaries. The public version intentionally routes AI capability through the backend architecture instead of exposing provider keys in the mobile client.

## Repository Structure

```text
frontend/   Flutter client for onboarding, dashboards, profile, avatar, and chat-oriented screens
backend/    Express and MongoDB API for users, avatars, conversations, messages, and assistant flows
```

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

## Security Notes

- Secrets are not committed.
- Mobile code does not require an OpenAI key.
- AI provider credentials belong in the backend `.env` file.
- The old split repositories are retained only as historical/private sources.

## Current Status

CustomIQ is a portfolio prototype. It demonstrates product breadth and full-stack integration, but it is not presented as production-ready. The next improvements would be automated tests, stronger request validation, consolidated API contracts, and screenshots or demo media.
