# Example Data Connector SDK

`@generated/example-data-connector` is the Firebase Data Connect Admin SDK generated for the `example` connector of
the `plaster-calculator` service in `us-west1`.

It provides generated operation functions and TypeScript declarations consumed by the Firebase Functions package.

## Generation

Regenerate the SDK from repository Data Connect schemas and connector operations:

```bash
pnpm generate:dataconnect
```

Do not manually edit generated JavaScript, declarations, package metadata, or connector configuration. Make changes in
the Data Connect schema or connector source and regenerate instead.

Because regeneration may replace files in this directory, confirm that this README and `AGENTS.md` remain present
after updating the generated SDK.
