# CORS errors on Firebase callable functions

## Symptom

```
Access to fetch at 'https://us-west1-plaster-calculator.cloudfunctions.net/<functionName>'
from origin 'https://plastercalculator.com' has been blocked by CORS policy:
Response to preflight request doesn't pass access control check:
No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

The affected function works from the emulator or from the same domain, but fails in
production from a cross-origin client. Other callable functions on the same project are
unaffected.

## Root cause

Each Firebase Functions v2 callable is its own Cloud Run service. Cloud Run has a separate
IAM layer that controls whether unauthenticated requests are allowed to reach the service
at all — independent of Firebase Auth.

The browser's CORS preflight is an OPTIONS request with no auth headers. If the Cloud Run
service does not have `allUsers: roles/run.invoker` in its IAM policy, Cloud Run rejects
the preflight with a 403 before the function code runs. The 403 has no CORS headers, so
the browser reports it as a CORS error rather than an auth error.

This mismatch can appear after redeploying a single function: Firebase CLI may not
re-grant the public invoker binding on update, so the service silently loses public access.

### How to confirm

Check the Cloud Run IAM policy for the affected function:

```bash
gcloud run services get-iam-policy <function-name-lowercase> \
  --region us-west1 \
  --project plaster-calculator
```

A healthy function shows:

```yaml
bindings:
    - members:
          - allUsers
      role: roles/run.invoker
```

A broken function shows only `etag: ...` with no bindings.

Also look for this warning in Cloud Logging (`run.googleapis.com/requests`):

```
The request was not authenticated. Either allow unauthenticated invocations or
set the proper Authorization header. Empty Authorization header value.
```

## Fix

### Immediate (no redeploy required)

Delete the Cloud Run service from the Cloud Console or via gcloud, then redeploy. Firebase
CLI will recreate the service and restore the correct IAM policy.

Alternatively, add the binding directly:

```bash
gcloud run services add-iam-policy-binding <function-name-lowercase> \
  --member="allUsers" \
  --role="roles/run.invoker" \
  --region us-west1 \
  --project plaster-calculator
```

### Permanent (prevents recurrence)

Add `invoker: "public"` to `setGlobalOptions` in
`functions/plaster-calculator-functions/src/index.ts` so every deployment explicitly
grants the binding:

```typescript
setGlobalOptions({
    maxInstances: 5,
    region: "us-west1",
    invoker: "public",
});
```

## What does NOT fix it

- Adding or removing the `cors` option on `onCall` — CORS middleware in function code
  never runs if Cloud Run rejects the preflight first.
- Changing origin allowlists or regex patterns.
- Redeploying without deleting — may leave the missing IAM binding in place.
