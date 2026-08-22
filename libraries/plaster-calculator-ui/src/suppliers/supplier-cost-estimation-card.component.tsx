"use client";

import {
    Badge,
    Box,
    Card,
    EmptyState,
    Input,
    Table,
    Text,
} from "@libraries/uikit-web";
import { centsToDollarsText, dollarsTextToCents } from "@libraries/utilities";
import { Boxes } from "lucide-react";
import { useState } from "react";
import type { ReactElement } from "react";

import { useSuppliersTranslation } from "./i18n/index.ts";

export type SupplierCostEstimationItem = {
    readonly templateId: string;
    readonly templateName: string;
    readonly unit: string | null;
    /**
     * `null` when this supplier has no `SupplierQuoteItemPrice` for this
     * template yet -- renders as a blank, "No estimate"-marked row.
     */
    readonly estimatedCostCents: number | null;
};

export type SupplierCostEstimationCardProps = {
    /**
     * One row per enabled `QuoteItemTemplate` -- computed by the host page,
     * the same split `CompanyPricingCard` uses for its own `rateItems`.
     */
    readonly items: readonly SupplierCostEstimationItem[];
    readonly disabled?: boolean;
    readonly onChange: (templateId: string, costCents: number | null) => void;
};

/**
 * The supplier detail page's "Material cost estimation" table: this
 * supplier's per-unit cost estimate for every enabled catalog item, editable
 * in place. Naming every price an "estimate" throughout -- title, column,
 * and blank-row copy -- is deliberate: it's what stops the number being read
 * as an order total.
 */
export function SupplierCostEstimationCard({
    items,
    disabled = false,
    onChange,
}: SupplierCostEstimationCardProps): ReactElement {
    const { t } = useSuppliersTranslation();
    const estimatedCount = items.filter(
        (item) => item.estimatedCostCents !== null,
    ).length;

    return (
        <Card>
            <Box direction="row" align="center" justify="between">
                <Card.Title>{t("supplierCostEstimationCard.title")}</Card.Title>
                {items.length > 0 && (
                    <Text size="sm" variant="muted">
                        {t("supplierCostEstimationCard.coverage", {
                            estimated: estimatedCount,
                            total: items.length,
                        })}
                    </Text>
                )}
            </Box>
            {items.length > 0 ? (
                <Table label={t("supplierCostEstimationCard.title")}>
                    <Table.Head>
                        <Table.Row>
                            <Table.Header>
                                {t("supplierCostEstimationCard.columnItem")}
                            </Table.Header>
                            <Table.Header fit>
                                {t("supplierCostEstimationCard.columnUnit")}
                            </Table.Header>
                            <Table.Header fit>
                                {t("supplierCostEstimationCard.columnEstimate")}
                            </Table.Header>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {items.map((item) => (
                            <Table.Row key={item.templateId}>
                                <Table.Cell>
                                    <Text size="base">{item.templateName}</Text>
                                </Table.Cell>
                                <Table.Cell fit>
                                    {item.unit ? (
                                        <Text size="sm">{item.unit}</Text>
                                    ) : (
                                        <Text size="sm" variant="muted">
                                            {t(
                                                "supplierCostEstimationCard.noUnit",
                                            )}
                                        </Text>
                                    )}
                                </Table.Cell>
                                <Table.Cell fit>
                                    <Box direction="column" gap="xs">
                                        <SupplierEstimateInput
                                            id={`supplier-cost-estimation-${item.templateId}`}
                                            label={t(
                                                "supplierCostEstimationCard.estimateLabel",
                                                { name: item.templateName },
                                            )}
                                            value={item.estimatedCostCents}
                                            disabled={disabled}
                                            onChange={(costCents) =>
                                                onChange(
                                                    item.templateId,
                                                    costCents,
                                                )
                                            }
                                        />
                                        {item.estimatedCostCents === null && (
                                            <Badge color="yellow" size="sm">
                                                {t(
                                                    "supplierCostEstimationCard.noEstimate",
                                                )}
                                            </Badge>
                                        )}
                                    </Box>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            ) : (
                <EmptyState
                    icon={<Boxes />}
                    title={t("supplierCostEstimationCard.emptyStateTitle")}
                />
            )}
        </Card>
    );
}

type SupplierEstimateInputProps = {
    readonly id: string;
    readonly label: string;
    readonly value: number | null;
    readonly disabled: boolean;
    readonly onChange: (costCents: number | null) => void;
};

/**
 * One row's editable cost input. Local text state mirrors
 * `EditableQuotePriceInput` (`quotes/editable-quote-form`), extended to allow
 * a blank, not-yet-estimated value instead of always parsing to a number.
 */
function SupplierEstimateInput({
    id,
    label,
    value,
    disabled,
    onChange,
}: SupplierEstimateInputProps): ReactElement {
    const [text, setText] = useState(() => costTextFor(value));

    return (
        <Input
            id={id}
            label={label}
            type="text"
            inputMode="decimal"
            leadingAddon="$"
            value={text}
            disabled={disabled}
            onChange={(event) => {
                setText(event.target.value);
                onChange(
                    event.target.value.trim() === ""
                        ? null
                        : dollarsTextToCents(event.target.value),
                );
            }}
            onBlur={() => setText(costTextFor(value))}
        />
    );
}

function costTextFor(cents: number | null): string {
    return cents === null ? "" : centsToDollarsText(cents);
}
