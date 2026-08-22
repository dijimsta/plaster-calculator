"use client";

import {
    SupplierCostEstimationCard,
    SupplierDetailCard,
} from "@libraries/plaster-calculator-ui";
import { Box, EmptyState, Paragraph, Text } from "@libraries/uikit-web";
import { LoaderCircle, Truck } from "lucide-react";

import { useAppTranslation } from "../../../i18n/index.ts";

import { SupplierDetailHeader } from "./supplier-detail-header.js";
import { useSupplierDetail } from "./use-supplier-detail.hook.ts";

type SupplierDetailViewProps = {
    readonly supplierId: string;
    readonly onSupplierDeleted: () => void;
};

export function SupplierDetailView({
    supplierId,
    onSupplierDeleted,
}: SupplierDetailViewProps) {
    const { t } = useAppTranslation();
    const detail = useSupplierDetail(supplierId, onSupplierDeleted);

    if (detail.isLoading) {
        return (
            <Box direction="column" padding="md">
                <Box direction="row" align="center" justify="center" gap="sm">
                    <LoaderCircle className="animate-spin" size={24} />
                    <Text size="sm" variant="muted">
                        {t("suppliers.detail.loading")}
                    </Text>
                </Box>
            </Box>
        );
    }

    return (
        <>
            <SupplierDetailHeader supplier={detail.supplier ?? null} />
            <Box direction="column" gap="lg" padding="md">
                {detail.message && (
                    <Paragraph textSize="sm" variant="muted">
                        {detail.message}
                    </Paragraph>
                )}
                {detail.supplier && detail.draft ? (
                    <SupplierDetailSections
                        detail={detail}
                        supplier={detail.supplier}
                        draft={detail.draft}
                    />
                ) : (
                    <EmptyState
                        icon={<Truck />}
                        title={t("suppliers.detail.notFound")}
                    />
                )}
            </Box>
        </>
    );
}

type SupplierDetailHookResult = ReturnType<typeof useSupplierDetail>;

type SupplierDetailSectionsProps = {
    readonly detail: SupplierDetailHookResult;
    readonly supplier: NonNullable<SupplierDetailHookResult["supplier"]>;
    readonly draft: NonNullable<SupplierDetailHookResult["draft"]>;
};

/** The two loaded-state cards, split out of `SupplierDetailView` to keep that component's own JSX branching within this workspace's complexity limit. */
function SupplierDetailSections({
    detail,
    supplier,
    draft,
}: SupplierDetailSectionsProps) {
    return (
        <Box direction="column" gap="lg">
            <SupplierDetailCard
                supplierName={supplier.name}
                isDefault={supplier.isDefault}
                values={draft}
                hasChanges={detail.hasChanges}
                isDeleting={detail.isDeleting}
                onChange={(patch) => detail.setDraft({ ...draft, ...patch })}
                onSave={detail.saveSupplier}
                onSetAsDefault={detail.setAsDefault}
                onDelete={detail.removeSupplier}
            />
            <SupplierCostEstimationCard
                items={detail.items}
                disabled={detail.isSavingEstimate}
                onChange={detail.changeItemEstimate}
            />
        </Box>
    );
}
