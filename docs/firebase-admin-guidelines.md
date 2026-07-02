# Firebase Admin Guidelines

Applies to server and administrative packages that use the Firebase Admin SDK.

- Use Application Default Credentials or the deployment runtime identity. Never embed credentials, tokens, secrets,
  or local credential paths; make project selection explicit.
- Authenticate callers where applicable, validate external input, and enforce authorization or ownership before data
  access.
- Do not log credentials, tokens, custom claims, sensitive documents, or unnecessary personal data.
- Inject Firebase Admin dependencies into reusable services so they remain testable, and validate returned data with
  shared schemas.
- Prefer emulators for local work. Deploy or perform destructive administration only with explicit authorization and a
  known target project.
