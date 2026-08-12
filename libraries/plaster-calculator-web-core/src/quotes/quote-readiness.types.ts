import type { ReadinessResult } from "@libraries/plaster-calculator-common";
import type { FirebaseError } from "firebase/app";

/**
 * Return shape of `useQuoteReadiness()`. `results` is always in
 * `READINESS_CHECKS` registry order — the hook never re-sorts them.
 * `isReady` is true once every `severity: "BLOCK"` check in `results` is
 * met; `WARN` checks (none exist yet) never block it. `refresh()` re-runs
 * `GetQuoteReadiness` and re-evaluates the registry against the fresh
 * response — it's what the inline-fix controls (WORK-140) call after a
 * successful write.
 */
export type UseQuoteReadinessResult = {
    readonly results: readonly ReadinessResult[];
    readonly isReady: boolean;
    readonly loading: boolean;
    readonly error: FirebaseError | null;
    readonly refresh: () => Promise<void>;
};
