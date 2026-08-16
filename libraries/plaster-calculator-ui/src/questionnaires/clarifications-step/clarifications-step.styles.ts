import type { BadgeColor } from "@libraries/uikit-web";

import type { ClarificationRowStatus } from "./clarifications-step.types.ts";

/**
 * Maps each {@link ClarificationRowStatus} to the `Badge` color that
 * represents it. Kept as a lookup table (rather than a `switch` inline in
 * the component) so the status → presentation mapping is the single thing
 * this file is responsible for, matching `quoteStatusBadgeColors`'s
 * precedent (`quotes/quote-status-badge/quote-status-badge.styles.ts`).
 */
export const clarificationRowStatusBadgeColors: Readonly<
    Record<ClarificationRowStatus, BadgeColor>
> = Object.freeze({
    ON_PLAN: "green",
    UNCHECKED: "yellow",
    ASK_BUILDER: "red",
});

/** Sentinel `SelectMenuOption` value for the template picker's "start from scratch" option — `SelectMenuOption.value` must be a string, so `null` can't be used directly. */
export const START_FROM_SCRATCH_OPTION_VALUE = "__start-from-scratch__";
