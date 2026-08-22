"use client";

import {
    NewSupplierPanel as NewSupplierPanelCard,
    type NewSupplierFormValues,
} from "@libraries/plaster-calculator-ui";
import { useCreateSupplier } from "@libraries/plaster-calculator-web-core";
import { Box, Paragraph } from "@libraries/uikit-web";
import { useRouter } from "next/navigation.js";
import { useState } from "react";

import { useAppTranslation } from "../../../i18n/index.ts";

import { EMPTY_SUPPLIER_DRAFT } from "./supplier.types.js";
import { optionalValue } from "./supplier.utils.js";

type NewSupplierPanelProps = {
    /** Seeds the supplier name field, e.g. from a Suppliers-page search that
     * found no match. Applied once, on mount -- callers that want to seed a
     * new value should remount this component (e.g. via a changing `key`). */
    readonly initialName?: string;
};

/**
 * Creates a supplier and navigates straight to its detail page -- unlike
 * `NewCompanyPanel`, which stays on the list and resets/refreshes, per
 * WORK-385's "creating one from the panel opens its detail page". No manual
 * list refresh is needed either way: `useCreateSupplier` already invalidates
 * every cached suppliers list on success.
 */
export function NewSupplierPanel({ initialName = "" }: NewSupplierPanelProps) {
    const { t } = useAppTranslation();
    const router = useRouter();
    const { createSupplier, isCreating } = useCreateSupplier();
    const [draft, setDraft] = useState<NewSupplierFormValues>({
        ...EMPTY_SUPPLIER_DRAFT,
        name: initialName,
    });
    const [message, setMessage] = useState("");

    async function handleCreate(): Promise<void> {
        const name = draft.name.trim();
        if (!name) return;
        try {
            const created = await createSupplier({
                name,
                phoneNumber: optionalValue(draft.phoneNumber),
                accountNumber: optionalValue(draft.accountNumber),
            });
            router.push(`/suppliers/${created.id}`);
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : t("suppliers.newSupplier.unableToCreate"),
            );
        }
    }

    return (
        <Box direction="column" gap="sm">
            <NewSupplierPanelCard
                values={draft}
                disabled={isCreating}
                onChange={(patch) => setDraft({ ...draft, ...patch })}
                onCreate={() => void handleCreate()}
            />
            {message && (
                <Paragraph textSize="sm" variant="muted">
                    {message}
                </Paragraph>
            )}
        </Box>
    );
}
