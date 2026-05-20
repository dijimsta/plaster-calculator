import type { SalesStatus } from "../types.js";

export const salesStatusLabels: Record<SalesStatus, string> = {
    QUOTING: "Quoting",
    QUOTE_SUBMITTED: "Quote Submitted",
    WON: "Won",
    LOST: "Lost",
};

export function salesStatusLabel(status: SalesStatus): string {
    return salesStatusLabels[status];
}
