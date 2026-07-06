import { HttpsError } from "firebase-functions/https";

import type { ReminderStatus, SalesStatus } from "./types.js";

export function readRequiredString(value: unknown, field: string) {
    if (typeof value !== "string" || value.trim().length === 0) {
        throw new HttpsError("invalid-argument", `${field} is required.`);
    }

    return value.trim();
}

export function readRequiredNumber(value: unknown, field: string) {
    if (typeof value !== "number" || !Number.isFinite(value)) {
        throw new HttpsError("invalid-argument", `${field} is required.`);
    }

    return value;
}

export function readPdfPageCount(value: unknown) {
    if (typeof value !== "number" || !Number.isInteger(value) || value < 1) {
        throw new HttpsError(
            "invalid-argument",
            "PDF page count must be a positive integer.",
        );
    }

    return value;
}

export function readOptionalString(value: unknown) {
    if (value == null || value === "") {
        return undefined;
    }

    if (typeof value !== "string") {
        throw new HttpsError("invalid-argument", "Expected a string value.");
    }

    return value.trim();
}

export function readOptionalNullableString(value: unknown, field: string) {
    if (value == null) {
        return null;
    }

    if (typeof value !== "string") {
        throw new HttpsError("invalid-argument", `${field} must be a string.`);
    }

    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
}

export function readDueAt(value: unknown, field: string) {
    const dueAt = readRequiredString(value, field);
    const timestamp = Date.parse(dueAt);
    if (Number.isNaN(timestamp)) {
        throw new HttpsError(
            "invalid-argument",
            `${field} must be a valid timestamp.`,
        );
    }

    return new Date(timestamp).toISOString();
}

export function readNullableNumber(value: unknown, field: string) {
    if (value == null || value === "") {
        return null;
    }

    if (typeof value !== "number" || !Number.isFinite(value)) {
        throw new HttpsError("invalid-argument", `${field} must be a number.`);
    }

    return value;
}

export function hasField(data: object, field: string) {
    return Object.prototype.hasOwnProperty.call(data, field);
}
export function readSalesStatus(value: unknown): SalesStatus {
    if (typeof value !== "string") {
        throw new HttpsError(
            "invalid-argument",
            "Sales status must be a string.",
        );
    }

    const status = toSalesStatus(value);
    if (status !== value) {
        throw new HttpsError(
            "invalid-argument",
            "Sales status must be QUOTING, QUOTE_SUBMITTED, WON, or LOST.",
        );
    }

    return status;
}

export function toSalesStatus(value: string): SalesStatus {
    if (
        value === "QUOTING" ||
        value === "QUOTE_SUBMITTED" ||
        value === "WON" ||
        value === "LOST"
    ) {
        return value;
    }

    return "QUOTING";
}

export function readReminderStatus(value: unknown): ReminderStatus {
    if (typeof value !== "string") {
        throw new HttpsError(
            "invalid-argument",
            "Reminder status must be a string.",
        );
    }

    const status = toReminderStatus(value);
    if (status !== value) {
        throw new HttpsError(
            "invalid-argument",
            "Reminder status must be OPEN, DONE, or CANCELLED.",
        );
    }

    return status;
}

export function toReminderStatus(value: string): ReminderStatus {
    if (value === "OPEN" || value === "DONE" || value === "CANCELLED") {
        return value;
    }

    return "OPEN";
}

export function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
