import type { ReadinessCheck } from "./readiness-check.types.ts";

/**
 * The quote readiness gate, in the order the UI renders it. Each entry is a
 * self-contained `ReadinessCheck`; adding a check means appending one entry
 * here (with its resolver) — no change to the code that consumes the
 * registry.
 *
 * Empty until WORK-129 implements the v1 resolvers.
 */
export const READINESS_CHECKS: readonly ReadinessCheck[] = [];
