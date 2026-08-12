import type { SalesStatus } from "@libraries/plaster-calculator-common";
import type { BadgeColor } from "@libraries/uikit-web";

/**
 * Maps each {@link SalesStatus} to the `Badge`/column accent color that
 * represents it. Kept as a lookup table so the status → presentation mapping
 * is the single thing this file is responsible for.
 */
export const salesStatusAccentColors: Readonly<
    Record<SalesStatus, BadgeColor>
> = Object.freeze({
    QUOTING: "blue",
    QUOTE_SUBMITTED: "indigo",
    WON: "green",
    LOST: "red",
});
