import { Badge, Box, Card, Text } from "@libraries/uikit-web";
import type { BadgeColor } from "@libraries/uikit-web";
import { centsToAudDisplayText } from "@libraries/utilities";
import type { ReactElement } from "react";

import { useCompaniesTranslation } from "./i18n/index.ts";
import type { CompanyRateItemSummary } from "./use-company-rate-item-summaries.hook.ts";

export type CompanyRateItemCardProps = {
    readonly item: CompanyRateItemSummary;
};

const deltaBadgeColors: Record<"decrease" | "increase", BadgeColor> =
    Object.freeze({
        decrease: "green",
        increase: "red",
    });

/** One priced catalog item on the company page's Pricing card: its name/unit, price, and a %-vs-default badge when it differs from the team's default rate. */
export function CompanyRateItemCard({
    item,
}: CompanyRateItemCardProps): ReactElement {
    const { t } = useCompaniesTranslation();
    const delta = item.percentDelta;

    return (
        <Card>
            <Box direction="column" gap="xs">
                <Text size="sm" variant="muted">
                    {t("companyRateItemCard.caption", {
                        name: item.name,
                        unit: item.unit ?? "",
                    })}
                </Text>
                <Box direction="row" align="center" gap="sm">
                    <Text size="lg" weight="semibold">
                        {centsToAudDisplayText(item.unitPriceCents)}
                    </Text>
                    {delta !== undefined && delta.kind !== "same" && (
                        <Badge color={deltaBadgeColors[delta.kind]} size="sm">
                            {t(
                                delta.kind === "decrease"
                                    ? "companyRateItemCard.percentDeltaDecrease"
                                    : "companyRateItemCard.percentDeltaIncrease",
                                { amount: delta.percentDisplayText },
                            )}
                        </Badge>
                    )}
                </Box>
            </Box>
        </Card>
    );
}
