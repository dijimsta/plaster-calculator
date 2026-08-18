import {
    gstCents as computeGstCents,
    lineAmountCents,
    subtotalCents as computeSubtotalCents,
    totalIncGstCents,
} from "@libraries/plaster-calculator-common";

import type { useQuotesTranslation } from "../i18n/index.ts";

import type {
    QuoteDetailDocumentLineItem,
    QuoteDetailDocumentQuantitySource,
} from "./quote-detail-document.types.ts";

type QuotesTFunction = ReturnType<typeof useQuotesTranslation>["t"];

export type QuoteDetailDocumentTotals = {
    readonly subtotalCents: number;
    readonly gstCents: number;
    readonly totalIncGstCents: number;
};

/**
 * Rolls `lineItems` up into subtotal/GST/total using the quote-totals
 * helpers (`quote-totals.utils.ts`).
 */
export function totals(
    lineItems: readonly QuoteDetailDocumentLineItem[],
): QuoteDetailDocumentTotals {
    const lineAmountsCents = lineItems.map((item) =>
        lineAmountCents(item.quantity, item.unitPriceCents),
    );
    const subtotalCents = computeSubtotalCents(lineAmountsCents);
    const gstCents = computeGstCents(subtotalCents);
    return {
        subtotalCents,
        gstCents,
        totalIncGstCents: totalIncGstCents(subtotalCents, gstCents),
    };
}

/**
 * Describes how a line's quantity was derived, e.g.
 * "Wall area — 10mm plasterboard". `measurementSource` and
 * `measurementPlasterType` are free-text columns on the `QuantitySource`
 * table rather than a closed union this library can see, so this
 * humanizes the raw value instead of translating it through a fixed key
 * map.
 * Falls back to a translated label for a manually-entered line with no
 * recorded provenance.
 */
export function provenanceLabel(
    quantitySource: QuoteDetailDocumentQuantitySource | null,
    t: QuotesTFunction,
): string {
    if (quantitySource === null) {
        return t("quoteDetailDocument.manualLineItem");
    }
    const source = humanize(quantitySource.measurementSource);
    return quantitySource.measurementPlasterType
        ? `${source} — ${humanize(quantitySource.measurementPlasterType)}`
        : source;
}

/**
 * Formats a line item's quantity with its unit folded into the same string
 * (e.g. "128 m²"), rather than the pricing table's own separate Unit
 * column this replaced -- the printed document's target design has no room
 * for a fifth column, and the unit reads naturally beside the number it
 * measures. Omits the unit entirely when the item doesn't have one (a
 * manually-entered line with no recorded `unit`).
 */
export function quantityWithUnit(
    quantity: number,
    unit: string | null,
): string {
    return unit ? `${quantity} ${unit}` : `${quantity}`;
}

/**
 * Joins the letterhead's ABN and licence number into one line (e.g.
 * "ABN 12 345 678 901 · Licence 123456"), omitting whichever of the two
 * `appearance` leaves `null` ("not filled in yet" — see
 * `QuoteAppearanceSchema`'s doc comment). Returns `null` when neither is
 * set, so the caller can omit the line entirely rather than render an
 * empty one.
 */
export function abnLicenceLine(
    abn: string | null,
    licenceNumber: string | null,
    t: QuotesTFunction,
): string | null {
    const parts: readonly (string | null)[] = [
        abn ? t("quoteDetailDocument.abnLabel", { abn }) : null,
        licenceNumber
            ? t("quoteDetailDocument.licenceLabel", { licenceNumber })
            : null,
    ];
    const presentParts = parts.filter((part): part is string => part !== null);
    return presentParts.length > 0 ? presentParts.join(" · ") : null;
}

/**
 * Joins the letterhead's phone number and email onto one line (e.g.
 * "0412 884 209 · quotes@fone.com.au"), omitting whichever `appearance`
 * leaves `null`. Same "not filled in yet" and single-line-join shape as
 * `abnLicenceLine`, kept as its own function since the two lines have
 * unrelated content (contact details vs. registration numbers) that just
 * happen to share this formatting.
 */
export function phoneEmailLine(
    phoneNumber: string | null,
    email: string | null,
): string | null {
    const parts: readonly (string | null)[] = [phoneNumber, email];
    const presentParts = parts.filter((part): part is string => part !== null);
    return presentParts.length > 0 ? presentParts.join(" · ") : null;
}

/**
 * Derives the quote's valid-until date from `issuedAt` plus
 * `appearance.validForDays` at render time -- `Quote` has no stored
 * expiry field, and none should be added for this (see WORK-204's
 * ticket description); the letterhead always computes it fresh from
 * these two existing values.
 */
export function validUntilLabel(
    issuedAt: string,
    validForDays: number,
    t: QuotesTFunction,
): string {
    const validUntil = new Date(issuedAt);
    validUntil.setDate(validUntil.getDate() + validForDays);
    return t("quoteDetailDocument.validUntil", {
        date: validUntil.toLocaleDateString(),
    });
}

function humanize(value: string): string {
    return value
        .toLowerCase()
        .split("_")
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}
