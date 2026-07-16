import type { SalesStatus } from "@libraries/plaster-calculator-common";

export const salesStatusLabels: Record<SalesStatus, string> = {
    QUOTING: "Quoting",
    QUOTE_SUBMITTED: "Quote Submitted",
    WON: "Won",
    LOST: "Lost",
};

export function salesStatusLabel(status: SalesStatus): string {
    return salesStatusLabels[status];
}
