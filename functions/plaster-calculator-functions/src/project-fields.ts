import { hasField, toSalesStatus } from "./validation.js";

import type { SalesStatus } from "./types.js";

export interface ProjectUpdateFields {
    name?: string;
    accountId?: string | null;
    address?: string | null;
    salesStatus?: SalesStatus;
}

export function nextNullableProjectField(
    updates: ProjectUpdateFields,
    field: "accountId" | "address",
    current: string | null | undefined,
) {
    return hasField(updates, field)
        ? (updates[field] ?? null)
        : (current ?? null);
}

export function nextSalesStatusFor(
    updates: ProjectUpdateFields,
    current: string,
) {
    return hasField(updates, "salesStatus")
        ? (updates.salesStatus ?? toSalesStatus(current))
        : toSalesStatus(current);
}
