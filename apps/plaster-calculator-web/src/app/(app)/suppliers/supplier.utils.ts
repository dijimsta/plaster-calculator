import type { SupplierCostEstimationItem } from "@libraries/plaster-calculator-ui";

import type { Supplier, SupplierItemEstimate } from "../../../types.js";

import type { SupplierDetailDraft } from "./supplier.types.js";
import type { QuoteItemTemplateSummary } from "./use-quote-item-template-catalog.hook.ts";

export function optionalValue(value: string): string | null {
    return value.trim() || null;
}

export function toSupplierDetailDraft(supplier: Supplier): SupplierDetailDraft {
    return {
        contactName: supplier.contactName ?? "",
        phoneNumber: supplier.phoneNumber ?? "",
        email: supplier.email ?? "",
        address: supplier.address ?? "",
        accountNumber: supplier.accountNumber ?? "",
    };
}

export function isSupplierDetailDraftChanged(
    supplier: Supplier,
    draft: SupplierDetailDraft,
): boolean {
    return (
        optionalValue(draft.contactName) !== (supplier.contactName ?? null) ||
        optionalValue(draft.phoneNumber) !== (supplier.phoneNumber ?? null) ||
        optionalValue(draft.email) !== (supplier.email ?? null) ||
        optionalValue(draft.address) !== (supplier.address ?? null) ||
        optionalValue(draft.accountNumber) !== (supplier.accountNumber ?? null)
    );
}

/**
 * One row per catalog item, joined against this supplier's priced items --
 * `estimatedCostCents` is `null` for any item the supplier has no
 * `SupplierItemEstimate` for yet, which `SupplierCostEstimationCard` renders
 * as a blank, "No estimate" row.
 */
export function toSupplierCostEstimationItems(
    itemTemplates: readonly QuoteItemTemplateSummary[],
    estimates: readonly SupplierItemEstimate[],
): SupplierCostEstimationItem[] {
    const priceByTemplateId = new Map(
        estimates.map((estimate) => [
            estimate.templateId,
            estimate.materialUnitPriceCents,
        ]),
    );
    return itemTemplates.map((itemTemplate) => ({
        templateId: itemTemplate.id,
        templateName: itemTemplate.name,
        unit: itemTemplate.unit,
        estimatedCostCents: priceByTemplateId.get(itemTemplate.id) ?? null,
    }));
}
