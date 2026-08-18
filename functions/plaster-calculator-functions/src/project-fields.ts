import type { SalesStatus } from "@libraries/plaster-calculator-common";

import { hasField, toSalesStatus } from "./validation.js";

export type ProjectUpdateFields = {
    name?: string;
    companyId?: string | null;
    address?: string | null;
    assignee?: string | null;
    scope?: string | null;
    salesStatus?: SalesStatus;
};

export function nextNullableProjectField(
    updates: ProjectUpdateFields,
    field: "companyId" | "address" | "assignee" | "scope",
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
