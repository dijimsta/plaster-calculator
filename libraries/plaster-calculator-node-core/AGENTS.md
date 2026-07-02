# plaster-calculator-node-core

Inherits the [repository guidelines](../../AGENTS.md), [TypeScript guidelines](../../docs/typescript-guidelines.md),
[service architecture](../../docs/service-architecture.md), and
[Firebase Admin guidelines](../../docs/firebase-admin-guidelines.md).

- Keep reusable Node.js and Firebase Admin adapters here; handlers, CLI UI, and app orchestration stay in consumers.
- Do not import React, UIKit, Next.js, or browser-only APIs.
- Surface invalid security data and infrastructure failures clearly.
