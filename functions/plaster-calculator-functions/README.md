# Plaster Calculator Functions

`@functions/plaster-calculator-functions` is the Node.js 24 Firebase Functions backend for Plaster Calculator. It exposes
callable operations for projects, floorplan processing, reminders, and exports. Account CRUD and user settings CRUD are
accessed directly from the web app through Firebase Data Connect.

## Runtime

Function bootstrap configures:

- Firebase Admin initialization.
- Region `us-west1`.
- A maximum of five instances.
- App Check enforcement.

The package uses the generated Firebase Data Connect Admin SDK at `@generated/data-connector-admin` for relational
data operations.

## AI (Genkit)

The questionnaire auto-fill flow (`src/ai/flows/answer-questionnaire.ts`) runs on [Genkit](https://genkit.dev/).
Genkit has no local emulator for a hosted model, so `src/ai/genkit.ts` switches provider based on
`FUNCTIONS_EMULATOR`:

- **Production**: Vertex AI (`gemini-2.5-flash`), authenticated via Application Default Credentials.
- **Functions emulator**: a local [LM Studio](https://lmstudio.ai/) server at `http://localhost:1234/v1` (LM
  Studio's OpenAI-compatible API, via `@genkit-ai/compat-oai`), so `pnpm start` works offline with no GCP credentials
  or cost.

The default local model is `google/gemma-4-26b-a4b` — [Gemma](https://ai.google.dev/gemma) is Gemini's open-weight
sibling (Gemma 4 is built on Gemini 3 research), so it's the closest free local equivalent to the Vertex AI model
used in production.

To use the AI auto-fill flow locally:

```bash
lms get google/gemma-4-26b-a4b   # download the default model (~18GB); override with GENKIT_LM_STUDIO_MODEL
lms server start                 # start LM Studio's local server (default port 1234)
lms load google/gemma-4-26b-a4b  # load the model so the server can serve it
```

(`lms` is LM Studio's CLI, installed alongside the [LM Studio](https://lmstudio.ai/download) app.) Set
`GENKIT_LM_STUDIO_MODEL` before `pnpm start` to use a different local model.

## Commands

From the repository root:

```bash
pnpm --filter @functions/plaster-calculator-functions build
pnpm --filter @functions/plaster-calculator-functions bundle
pnpm --filter @functions/plaster-calculator-functions logs
```

The bundle command prepares the package for Firebase deployment and rewrites deployment-related package metadata. The
repository's Firebase configuration runs it as a predeploy step.

Deploy through the repository Firebase workflow or, when intentionally targeting the configured project:

```bash
pnpm --filter @functions/plaster-calculator-functions deploy
```

## Verification

Before committing, run:

```bash
pnpm build
pnpm lint
pnpm format
```
