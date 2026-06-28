# CustomIQ Frontend

Flutter client for CustomIQ. The app includes onboarding, authentication screens, dashboards, profile views, avatar flows, chat-oriented screens, and embedded 3D/web content.

## Features

- User onboarding and login screens
- Dashboard and profile views
- Avatar viewing and generation flows
- Chat and voice-oriented interfaces
- Local token storage for authenticated sessions
- Runtime API base URL configuration

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

## Main App Areas

- splash and onboarding
- login and registration
- dashboard and home interface
- profile and avatar pages
- assistant and chat-related flows

AI provider keys are not configured in the Flutter client. Assistant and avatar-generation requests should go through the backend API.
