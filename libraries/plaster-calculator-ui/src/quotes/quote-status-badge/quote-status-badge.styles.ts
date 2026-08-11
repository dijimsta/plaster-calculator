import type { QuoteStatus } from "@libraries/plaster-calculator-common";
import type { BadgeColor } from "@libraries/uikit-web";

/**
 * Maps each {@link QuoteStatus} to the `Badge` color that represents it.
 * Kept as a lookup table (rather than a `switch` inline in the component) so
 * the status → presentation mapping is the single thing this file is
 * responsible for.
 */
export const quoteStatusBadgeColors: Readonly<Record<QuoteStatus, BadgeColor>> =
    Object.freeze({
        draft: "gray",
        sent: "blue",
        accepted: "green",
    });
