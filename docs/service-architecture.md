# Service Architecture

Applies to shared domain contracts, infrastructure implementations, domain UI consumers, and Storybook stubs.

- Platform-neutral service interfaces live in `plaster-calculator-common` and describe capabilities using domain data,
  not transport payloads, React state, or presentation labels.
- Implementations live in consuming apps or infrastructure libraries such as `plaster-calculator-node-core` and
  `plaster-calculator-web-core`. Keep Firebase, HTTP, storage, auth, and environment access out of Common and shared
  UI.
- Infrastructure libraries own the business-logic layer end to end: a service's implementation lives alongside its
  React context, provider, and hook in the same library. Keep raw contexts private; export typed providers and hooks
  that fail clearly without a provider. Providers receive stable service instances.
- `plaster-calculator-ui` stays presentation-focused: it consumes hooks exported from infrastructure libraries but
  does not own service instances, contexts, or providers itself.
- Validate data crossing a trust boundary (callable function responses, Data Connect results, external APIs) with
  shared Zod schemas from `plaster-calculator-common` rather than trusting type-only generics.
- Keep presentational components independently usable where practical. Connected patterns handle relevant loading,
  empty, error, success, retry, and cancellation states.
- Storybook uses deterministic local stubs injected through the same providers. Never call live services or include
  credentials in stories.
