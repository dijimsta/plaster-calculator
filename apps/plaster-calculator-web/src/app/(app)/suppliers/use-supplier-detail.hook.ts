"use client";

import type { SupplierCostEstimationItem } from "@libraries/plaster-calculator-ui";
import {
    useClearSupplierItemEstimate,
    useDeleteSupplier,
    useSetDefaultSupplier,
    useSupplier,
    useSupplierEstimates,
    useUpdateSupplier,
    useUpsertSupplierItemEstimate,
} from "@libraries/plaster-calculator-web-core";
import { useNotificationsManager } from "@libraries/uikit-web";
import { useEffect, useState } from "react";

import { useAppTranslation } from "../../../i18n/index.ts";
import type { Supplier } from "../../../types.js";

import type { SupplierDetailDraft } from "./supplier.types.js";
import {
    isSupplierDetailDraftChanged,
    optionalValue,
    toSupplierCostEstimationItems,
    toSupplierDetailDraft,
} from "./supplier.utils.js";
import { useQuoteItemTemplateCatalog } from "./use-quote-item-template-catalog.hook.ts";

export type UseSupplierDetailResult = {
    readonly supplier: Supplier | undefined;
    readonly draft: SupplierDetailDraft | null;
    readonly items: readonly SupplierCostEstimationItem[];
    readonly hasChanges: boolean;
    readonly isLoading: boolean;
    readonly isDeleting: boolean;
    readonly isSavingEstimate: boolean;
    readonly message: string;
    readonly setDraft: (draft: SupplierDetailDraft) => void;
    readonly saveSupplier: () => void;
    readonly removeSupplier: () => void;
    readonly setAsDefault: () => void;
    readonly changeItemEstimate: (
        templateId: string,
        costCents: number | null,
    ) => void;
};

/** Owns every stateful concern of the supplier detail page, so `SupplierDetailView` stays a thin rendering shell. */
export function useSupplierDetail(
    supplierId: string,
    onSupplierDeleted: () => void,
): UseSupplierDetailResult {
    const { notify } = useNotificationsManager();
    const { t } = useAppTranslation();
    const { supplier, loading: isLoadingSupplier } = useSupplier(supplierId);
    const { estimates, loading: isLoadingEstimates } =
        useSupplierEstimates(supplierId);
    const { itemTemplates, isLoading: isLoadingCatalog } =
        useQuoteItemTemplateCatalog();
    const { updateSupplier } = useUpdateSupplier();
    const { deleteSupplier, isDeleting } = useDeleteSupplier();
    const { setDefaultSupplier } = useSetDefaultSupplier();
    const { upsertSupplierItemEstimate, isSaving: isUpserting } =
        useUpsertSupplierItemEstimate();
    const { clearSupplierItemEstimate, isClearing } =
        useClearSupplierItemEstimate();
    // Holds the user's in-progress edits only; `null` means "no local edits
    // yet", so `draft` below falls back to deriving straight from `supplier`
    // on the very render it arrives -- unlike `useCompanyDetail`'s
    // effect-driven draft, that avoids a one-frame "not found" flash between
    // `useSupplier`'s loading flag clearing and a separate effect catching up.
    const [localDraft, setLocalDraft] = useState<SupplierDetailDraft | null>(
        null,
    );
    const [message, setMessage] = useState("");

    useEffect(() => {
        setLocalDraft(null);
    }, [supplierId]);

    const draft =
        localDraft ?? (supplier ? toSupplierDetailDraft(supplier) : null);

    async function saveSupplier(): Promise<void> {
        if (!draft) return;
        try {
            await updateSupplier({
                supplierId,
                payload: {
                    contactName: optionalValue(draft.contactName),
                    phoneNumber: optionalValue(draft.phoneNumber),
                    email: optionalValue(draft.email),
                    address: optionalValue(draft.address),
                    accountNumber: optionalValue(draft.accountNumber),
                },
            });
        } catch (error) {
            setMessage(errorMessage(error, t("suppliers.detail.unableToSave")));
        }
    }

    async function removeSupplier(): Promise<void> {
        try {
            await deleteSupplier(supplierId);
            onSupplierDeleted();
        } catch (error) {
            setMessage(
                errorMessage(error, t("suppliers.detail.unableToDelete")),
            );
        }
    }

    async function setAsDefault(): Promise<void> {
        try {
            await setDefaultSupplier(supplierId);
            notify({
                intent: "success",
                title: t("suppliers.detail.setDefaultNotification"),
            });
        } catch (error) {
            notify({
                intent: "error",
                title: t("suppliers.detail.unableToSetDefault"),
                description: error instanceof Error ? error.message : undefined,
            });
        }
    }

    async function changeItemEstimate(
        templateId: string,
        costCents: number | null,
    ): Promise<void> {
        try {
            if (costCents === null) {
                await clearSupplierItemEstimate({ supplierId, templateId });
            } else {
                await upsertSupplierItemEstimate({
                    supplierId,
                    templateId,
                    materialUnitPriceCents: costCents,
                });
            }
        } catch (error) {
            notify({
                intent: "error",
                title: t("suppliers.detail.unableToSaveEstimate"),
                description: error instanceof Error ? error.message : undefined,
            });
        }
    }

    return {
        supplier,
        draft,
        items: toSupplierCostEstimationItems(itemTemplates, estimates ?? []),
        hasChanges: resolveHasChanges(supplier, draft),
        isLoading: isLoadingSupplier || isLoadingEstimates || isLoadingCatalog,
        isDeleting,
        isSavingEstimate: isUpserting || isClearing,
        message,
        setDraft: setLocalDraft,
        saveSupplier: () => void saveSupplier(),
        removeSupplier: () => void removeSupplier(),
        setAsDefault: () => void setAsDefault(),
        changeItemEstimate: (templateId, costCents) =>
            void changeItemEstimate(templateId, costCents),
    };
}

function resolveHasChanges(
    supplier: Supplier | undefined,
    draft: SupplierDetailDraft | null,
): boolean {
    if (!supplier || !draft) return false;
    return isSupplierDetailDraftChanged(supplier, draft);
}

function errorMessage(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
}
