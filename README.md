# plaster-calculator

## Getting Started

New to the repo? This gets a full local environment running with one command: `pnpm start`.

### Prerequisites

| Tool         | Version                                         | Notes                                                                                                 |
| ------------ | ----------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Node.js      | 24.15.0 (see `.nvmrc`)                          | `nvm use`                                                                                             |
| pnpm         | 11.1.3 (see `packageManager` in `package.json`) | `corepack enable` picks up the pinned version automatically                                           |
| Firebase CLI | latest                                          | `npm install -g firebase-tools`                                                                       |
| uv           | latest                                          | Manages the Python venv for the `floorplan-analyzer` function; `brew install uv`                      |
| LM Studio    | latest                                          | Runs the questionnaire AI flow locally instead of Vertex AI; [download](https://lmstudio.ai/download) |

### First-time setup

```bash
nvm use                          # or install Node 24.15.0 another way
corepack enable                  # installs the pinned pnpm version
pnpm install
lms get google/gemma-4-26b-a4b   # default local model for the Genkit AI flow; see below
lms server start                 # start LM Studio's local server (default port 1234)
lms load google/gemma-4-26b-a4b
```

### Running everything

```bash
pnpm start
```

This builds the `floorplan-analyzer` Python function, builds all TypeScript packages, then starts the Firebase
Emulator Suite (Auth, Functions, Storage, Tasks, Data Connect, and App Hosting, which runs the Next.js dev server).
Everything runs locally: no GCP project access, billing, or `firebase login` is required for day-to-day development.

- Emulator UI: http://localhost:4000
- Web app: http://localhost:5050

See [Firebase Emulators](#firebase-emulators) below for port details, [floorplan-analyzer local setup](#floorplan-analyzer-local-setup)
for the Python/OCR function, and [App Check on localhost](#app-check-on-localhost) for auth debug tokens.

### AI flow (Genkit) without cloud credentials

The questionnaire auto-fill flow uses [Genkit](https://genkit.dev/), which has no local emulator for a hosted model.
Instead, `functions/plaster-calculator-functions/src/ai/genkit.ts` detects the Functions emulator and routes to a
local [LM Studio](https://lmstudio.ai/) server (its OpenAI-compatible API, via `@genkit-ai/compat-oai`) rather than
Vertex AI, so it works offline and free of cost. The default, `google/gemma-4-26b-a4b`, is
[Gemma](https://ai.google.dev/gemma) — Gemini's open-weight sibling, built on Gemini 3 research — the closest free
local equivalent to the production model. Download and load it once as shown above; override the model with the
`GENKIT_LM_STUDIO_MODEL` environment variable if you want a different local model. Details in
[functions/plaster-calculator-functions/README.md](./functions/plaster-calculator-functions/README.md#ai-genkit).

## Firebase Emulators

The project uses the Firebase Local Emulator Suite for local development. The following emulators are configured:

| Emulator    | Port           |
| ----------- | -------------- |
| Auth        | 9099           |
| App Hosting | 5050           |
| Tasks       | 9499           |
| Emulator UI | 4000 (default) |

### Prerequisites

Install the Firebase CLI if you haven't already:

```bash
npm install -g firebase-tools
```

### Starting the emulators

From the repo root:

```bash
firebase emulators:start
```

This will start the Auth and Tasks emulators alongside the App Hosting emulator, which runs the Next.js dev server (`pnpm dev`) on port 5050. The Emulator UI is available at http://localhost:4000.

### App Check on localhost

The web app uses Firebase App Check with reCAPTCHA v3. For local development, do not add `localhost` as an allowed reCAPTCHA domain. Instead, use Firebase's App Check debug provider flow:

1. Make sure the web app is running with `NEXT_PUBLIC_ENVIRONMENT=development`. The local `apps/plaster-calculator-web/.env.development` file sets this for the Next.js dev server.
2. Open the app in the browser and check the developer console for the App Check debug token logged by Firebase.
3. In Firebase Console, open **Build > App Check**, select the web app, then add the debug token under **Manage debug tokens**.
4. Refresh the local app. App Check token requests from this local browser should now succeed.

Debug tokens are development credentials. Keep them out of committed source, and remove old tokens from Firebase Console when they are no longer needed. See Firebase's App Check debug provider guide for the full flow: https://firebase.google.com/docs/app-check/web/debug-provider?authuser=0#localhost.

## floorplan-analyzer local setup

### macOS SSL fix (python.org installer only)

If you installed Python from [python.org](https://www.python.org/downloads/) and see an `ssl.SSLCertVerificationError` when hitting the `ocr_flood_fill_smoothed` function locally, the python.org installer ships without SSL certificates wired up. Fix it once by running:

```bash
open "/Applications/Python 3.13/Install Certificates.command"
```

This creates a symlink to the `certifi` bundle so Python can verify HTTPS connections. Devs on Homebrew or pyenv are not affected.

## Firebase Storage CORS

The production Firebase Storage bucket needs a CORS policy so the web app can load uploaded images directly from `firebasestorage.googleapis.com`. The allowed origins live in [`storage.cors.json`](./storage.cors.json).

Apply (or re-apply, after editing the file) with:

```bash
gcloud storage buckets update gs://plaster-calculator.firebasestorage.app \
  --cors-file=storage.cors.json
```

Verify with:

```bash
gcloud storage buckets describe gs://plaster-calculator.firebasestorage.app \
  --format="value(cors_config)"
```

Add any new web origin (custom domain, preview deploy) to `storage.cors.json` and re-run the update command — changes can take a minute or two to propagate.

## CI Firebase Authentication

GitHub Actions uses two Firebase authentication paths:

| Secret                     | Used by                         | Notes                                                                                           |
| -------------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------- |
| `FIREBASE_SERVICE_ACCOUNT` | Data Connect dry-run and deploy | Full Google service account JSON. Required for Application Default Credentials.                 |
| `FIREBASE_TOKEN`           | Storage and Functions deploys   | Legacy Firebase CLI token. Replace with service account auth when those workflows are migrated. |

Data Connect deploy validation requires Application Default Credentials, so the Data Connect workflows authenticate with `google-github-actions/auth` before running `firebase deploy --only dataconnect`. Do not add `--token` back to those commands.
