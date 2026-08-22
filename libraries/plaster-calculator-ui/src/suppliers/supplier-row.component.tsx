import type { Supplier } from "@libraries/plaster-calculator-web-core";
import { Avatar, Badge, Box, ProgressBar, Text } from "@libraries/uikit-web";
import type { ReactElement } from "react";

import { useSuppliersTranslation } from "./i18n/index.ts";

export type SupplierRowProps = {
    readonly supplier: Supplier;
    /**
     * Total enabled `QuoteItemTemplate` count the coverage bar measures
     * `supplier.pricedItemCount` against -- computed by the host page, the
     * same split `CompanyPricingCard` uses for its own `rateItems`.
     */
    readonly totalItemCount: number;
};

/**
 * One row in the suppliers list: an initials tile, name, default badge,
 * contact person/phone, and a coverage bar of how many priceable items this
 * supplier has a cost estimate for.
 */
export function SupplierRow({
    supplier,
    totalItemCount,
}: SupplierRowProps): ReactElement {
    const { t } = useSuppliersTranslation();
    const coverageLabel =
        supplier.pricedItemCount > 0
            ? t("supplierRow.coverage", {
                  estimated: supplier.pricedItemCount,
                  total: totalItemCount,
              })
            : t("supplierRow.notEstimatedYet");

    return (
        <Box direction="row" align="center" gap="md">
            <Avatar initials={initialsFor(supplier.name)} />
            <Box direction="column" gap="xs" grow>
                <Box direction="row" align="center" gap="sm">
                    <Text weight="semibold">{supplier.name}</Text>
                    {supplier.isDefault && (
                        <Badge color="indigo" variant="pill">
                            {t("supplierRow.defaultBadge")}
                        </Badge>
                    )}
                </Box>
                <Text size="sm" variant="muted" truncate>
                    {supplier.contactName ?? t("supplierRow.noContactName")}
                    {" · "}
                    {supplier.phoneNumber ?? t("supplierRow.noPhoneNumber")}
                </Text>
            </Box>
            <Box basis="1/3">
                <ProgressBar
                    value={supplier.pricedItemCount}
                    max={Math.max(totalItemCount, 1)}
                    label={coverageLabel}
                />
            </Box>
        </Box>
    );
}

function initialsFor(name: string): string {
    const initials = name
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase() ?? "")
        .join("");
    return initials || "?";
}
