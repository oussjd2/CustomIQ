# Project evidence and visual sources

The recovered **Presentation_customiq.pdf** has 19 slides. It is a historical product presentation, combining application screenshots, technical descriptions, and commercial ambitions. This repository uses selected screenshots and source-backed descriptions rather than republishing its market comparisons or security claims.

## Original images

Images below were extracted directly from embedded PDF image objects, without the slide backgrounds. They are not synthetic interface reconstructions, and no private conversations were added.

| Asset | Slide | What it shows |
|---|---|---|
| `assets/screens/avatar-customization.jpeg` | 12 | Avatar appearance/clothing customization |
| `assets/screens/chess-persona.jpeg` | 13 | Historical chess-persona conversation |
| `assets/screens/interview-persona.jpeg` | 13 | Historical interviewer-persona conversation |
| `assets/screens/rendering-settings.jpeg` | 14 | Quality, texture, pose, size and format controls |
| `assets/screens/model-loader.jpeg` | 14 | GLB loading and model display |

The deck's other branding/character illustrations are not presented as original CustomIQ artwork. Ready Player Me provides the embedded avatar-creation experience; its interface and assets retain their respective ownership.

## Feature mapping

| Presentation material | Public source evidence | Public description |
|---|---|---|
| Avatar customization, slides 8–12 | `frontend/assets/iframe.html`, `frontend/lib/screens/PlayerReadyMeScreen.dart` | Embedded Ready Player Me creation flow |
| GLB model loading, slide 14 | `frontend/lib/screens/DisplayModelScreen.dart` | URL and local-file model-loading implementation |
| Advanced quality controls, slide 14 | `frontend/lib/screens/AdvancedSettingsScreen.dart` | Parameters appended to model URLs; not automatic hardware optimization |
| Persona conversations, slide 13 | `frontend/lib/screens/chat_page.dart` | Persona prompt definitions and historical demo screenshots; current inference responses are placeholders |
| Voice output, slide 13 | `FlutterTts` in `chat_page.dart` | Playback configuration and toggle; device voices determine available languages |
| AR/VR technologies, slide 18 | `ModelViewer(ar: true)` in display/chat screens | AR-enabled viewer configuration; no headset runtime validation claimed |
| Immersive scene, slide 11 | No Unity project identified in the public tree | Historical Unity/VR exploration |
| Additional camera feature | `frontend/lib/screens/CameraAnalysisScreen.dart` | Camera and ML Kit object-detection module; no accuracy benchmark claimed |

## Architecture boundaries

The Express API exposes persistence modules for users, avatars, conversations and messages. An OpenAI integration generates avatar **images**, which are distinct from GLB models. The avatar-chat screen's direct provider calls have been removed and replaced with explanatory messages. The architecture graphic reflects that separation rather than depicting an already connected live chat-inference service.

The original presentation's adaptive-learning, end-to-end-encryption and business-service claims are not carried into the current feature list. In particular, bcrypt password hashing is not end-to-end message encryption.

## Rebuilding graphics

`python docs/build-visuals.py` regenerates the three SVGs using Python's standard library. The SVGs use text, shapes and connectors rather than fabricated application UI. Screenshot extraction is separate from diagram generation; original screenshots remain unchanged.
