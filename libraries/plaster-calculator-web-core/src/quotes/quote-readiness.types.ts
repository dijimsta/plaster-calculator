import type { GetQuoteReadinessData } from "@generated/data-connector-web";
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
 *
 * `data` and `quoteTemplateId` (WORK-191) are the raw query response and
 * the template id it was fetched with, exposed so a caller that needs more
 * than the evaluated `results` — `useGenerateQuote()`, an inline-fix
 * control reading a starting value — doesn't run a second, independent
 * `GetQuoteReadiness`/template-resolution round trip.
 */
export type UseQuoteReadinessResult = {
    readonly results: readonly ReadinessResult[];
    readonly isReady: boolean;
    readonly loading: boolean;
    readonly error: FirebaseError | null;
    readonly refresh: () => Promise<void>;
    readonly data: GetQuoteReadinessData | undefined;
    readonly quoteTemplateId: string | undefined;
};
