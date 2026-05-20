# plaster-calculator

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
