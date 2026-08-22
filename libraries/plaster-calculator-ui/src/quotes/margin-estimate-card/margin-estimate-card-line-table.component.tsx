import { lineAmountCents } from "@libraries/plaster-calculator-common";
import { Table, Text } from "@libraries/uikit-web";
import { centsToAudDisplayText } from "@libraries/utilities";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

import type { MarginEstimateCardLine } from "./margin-estimate-card.types.ts";
import {
    centsCellText,
    marginRatioCellText,
} from "./margin-estimate-card.utils.ts";

export type MarginEstimateCardLineTableProps = {
    readonly lines: readonly MarginEstimateCardLine[];
};

/**
 * The margin estimate card's per-line table: item, sell, estimated cost per
 * unit, line cost, and line margin. Every quote line renders a row, covered
 * and uncovered alike -- an uncovered line's derived cells read "No
 * estimate" (`centsCellText`/`marginRatioCellText`) instead of `$0`, per
 * `QuoteLineMarginEstimate`'s doc comment on why unresolved cost stays
 * `null` end-to-end rather than defaulting to free.
 */
export function MarginEstimateCardLineTable({
    lines,
}: MarginEstimateCardLineTableProps): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <Table bordered label={t("marginEstimateCard.tableLabel")}>
            <Table.Head>
                <Table.Row>
                    <Table.Header>
                        {t("marginEstimateCard.columnItem")}
                    </Table.Header>
                    <Table.Header align="end">
                        {t("marginEstimateCard.columnSell")}
                    </Table.Header>
                    <Table.Header align="end">
                        {t("marginEstimateCard.columnEstimatedCostPerUnit")}
                    </Table.Header>
                    <Table.Header align="end">
                        {t("marginEstimateCard.columnLineCost")}
                    </Table.Header>
                    <Table.Header align="end">
                        {t("marginEstimateCard.columnLineMargin")}
                    </Table.Header>
                </Table.Row>
            </Table.Head>
            <Table.Body>
                {lines.map((line) => (
                    <MarginEstimateCardLineTableRow key={line.id} line={line} />
                ))}
            </Table.Body>
        </Table>
    );
}

type MarginEstimateCardLineTableRowProps = {
    readonly line: MarginEstimateCardLine;
};

function MarginEstimateCardLineTableRow({
    line,
}: MarginEstimateCardLineTableRowProps): ReactElement {
    const { t } = useQuotesTranslation();
    const sellCents = lineAmountCents(line.quantity, line.unitPriceCents);

    return (
        <Table.Row avoidBreakInside>
            <Table.Cell wrap>
                <Text size="base">{line.name}</Text>
            </Table.Cell>
            <Table.Cell align="end">
                {centsToAudDisplayText(sellCents)}
            </Table.Cell>
            <Table.Cell align="end">
                {centsCellText(line.estimatedMaterialUnitPriceCents, t)}
            </Table.Cell>
            <Table.Cell align="end">
                {centsCellText(line.lineCostCents, t)}
            </Table.Cell>
            <Table.Cell align="end">
                {marginRatioCellText(line.marginRatio, t)}
            </Table.Cell>
        </Table.Row>
    );
}
