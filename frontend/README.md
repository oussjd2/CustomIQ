# FrontendCustomIQ

Flutter client for the `CustomIQ` prototype. The app combines authentication, onboarding, dashboard views, avatar-related flows, chat-oriented features, and embedded 3D/web content.

## What It Does

- user onboarding and login
- dashboard and profile views
- avatar viewing and generation flows
- chat and voice-oriented interfaces
- local token storage for authenticated sessions

## Tech Stack

- Flutter
- Dart
- Provider
- GetX
- `model_viewer_plus`
- `flutter_secure_storage`
- `dash_chat_2`
- Google ML Kit

## Getting Started

### 1. Install dependencies

```bash
flutter pub get
```

### 2. Run with runtime configuration

The app defaults to `http://localhost:3001/api`, but you can override it at runtime:

```bash
flutter run ^
  --dart-define=CUSTOMIQ_API_BASE_URL=http://127.0.0.1:3001/api
```

The public portfolio version does not call OpenAI directly from the mobile client. AI-assisted flows should be routed through the backend API.

## Main App Areas

- splash and onboarding
- login and registration
- dashboard and home interface
- profile and avatar pages
- assistant and chat-related flows

## Current Status

This is a prototype frontend with useful breadth. It already demonstrates multi-screen Flutter work, state management, and media integration. The next improvements should be:

- feature-by-feature screenshots
- backend contract documentation
- widget and integration tests
- cleanup of unused dependencies
- stronger naming consistency

## Related Repository

- `BackendCustomIQ` provides the API used by this client.
