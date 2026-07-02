# Service Architecture

Applies to shared domain contracts, infrastructure implementations, domain UI consumers, and Storybook stubs.

- Platform-neutral service interfaces live in `plaster-calculator-common` and describe capabilities using domain data,
  not transport payloads, React state, or presentation labels.
- Implementations live in consuming apps or infrastructure libraries such as `plaster-calculator-node-core`. Keep
  Firebase, HTTP, storage, auth, and environment access out of Common and shared UI.
- `plaster-calculator-ui` may inject common services through React context. Keep raw contexts private; export typed
  providers and hooks that fail clearly without a provider. Providers receive stable service instances.
- Keep presentational components independently usable where practical. Connected patterns handle relevant loading,
  empty, error, success, retry, and cancellation states.
- Storybook uses deterministic local stubs injected through the same providers. Never call live services or include
  credentials in stories.
