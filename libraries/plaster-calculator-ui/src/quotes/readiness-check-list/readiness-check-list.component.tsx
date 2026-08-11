import type {
    ReadinessAffectedItem,
    ReadinessCheck,
    ReadinessResult,
} from "@libraries/plaster-calculator-common";
import { Badge, Box, Button, StackedList, Text } from "@libraries/uikit-web";
import type { ReactElement, ReactNode } from "react";
import { useState } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

import { ReadinessCheckListUtils } from "./readiness-check-list.utils.ts";

/**
 * Renders the fix control for one affected item of one check. A row never
 * knows how to fix anything itself — this is its only hook into the actual
 * fix controls, which are built in a later ticket (WORK-134). Returning a
 * falsy value renders nothing for that slot rather than crashing, so a row
 * degrades gracefully before WORK-134 lands.
 */
export type ReadinessCheckListRenderFixControl = (
    item: ReadinessAffectedItem,
    check: ReadinessCheck,
) => ReactNode;

export type ReadinessCheckListProps = {
    readonly checks: readonly ReadinessCheck[];
    readonly results: readonly ReadinessResult[];
    readonly renderFixControl?: ReadinessCheckListRenderFixControl;
};

/**
 * Renders the readiness-check registry as a list, one row per check.
 * Presentational only: it derives each row's met/unmet state from `results`
 * and hands `renderFixControl` whatever affected item needs a fix, but owns
 * no data fetching and imports neither the web-core hook nor the connector
 * SDK. Mapping over `checks` — instead of a row hardcoded per known check
 * id — is what lets a new `READINESS_CHECKS` entry (any later ticket) show
 * up here with no change to this component.
 */
export function ReadinessCheckList({
    checks,
    results,
    renderFixControl,
}: ReadinessCheckListProps): ReactElement {
    return (
        <StackedList bordered>
            {checks.map((check) => (
                <StackedList.Item key={check.id}>
                    <ReadinessCheckRow
                        check={check}
                        result={results.find(
                            (result) => result.checkId === check.id,
                        )}
                        renderFixControl={renderFixControl}
                    />
                </StackedList.Item>
            ))}
        </StackedList>
    );
}

type ReadinessCheckRowProps = {
    readonly check: ReadinessCheck;
    readonly result: ReadinessResult | undefined;
    readonly renderFixControl: ReadinessCheckListRenderFixControl | undefined;
};

/**
 * One check's row. An unmet check with more than one affected item starts
 * collapsed behind a "Show N affected items" toggle — a check with zero or
 * one affected item has nothing worth collapsing, so its item (or its
 * check-level fix control, for a check with no location to report) renders
 * directly.
 */
function ReadinessCheckRow({
    check,
    result,
    renderFixControl,
}: ReadinessCheckRowProps): ReactElement {
    const isMet = result?.isMet ?? false;
    const affectedItems = result?.affectedItems ?? [];
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Box direction="column" gap="sm">
            <ReadinessCheckRowHeader
                check={check}
                isMet={isMet}
                affectedItemCount={result?.affectedItemCount ?? 0}
            />
            <ReadinessCheckRowItems
                check={check}
                isMet={isMet}
                affectedItems={affectedItems}
                isExpanded={isExpanded}
                onToggleExpanded={() => setIsExpanded((expanded) => !expanded)}
                renderFixControl={renderFixControl}
            />
        </Box>
    );
}

type ReadinessCheckRowHeaderProps = {
    readonly check: ReadinessCheck;
    readonly isMet: boolean;
    readonly affectedItemCount: number;
};

function ReadinessCheckRowHeader({
    check,
    isMet,
    affectedItemCount,
}: ReadinessCheckRowHeaderProps): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <Box direction="row" justify="between" align="center" wrap>
            <Box direction="column" gap="xs">
                <Text size="base">
                    {ReadinessCheckListUtils.checkTitle(check.id, t)}
                </Text>
                {!isMet && (
                    <Text size="sm" variant="muted">
                        {check.fixMode === "INLINE"
                            ? t("readinessCheckList.fixInline")
                            : t("readinessCheckList.fixDeepLink")}
                    </Text>
                )}
            </Box>
            <Badge color={isMet ? "green" : "red"} variant="pill-with-border">
                {isMet
                    ? t("readinessCheckList.metBadge")
                    : t("readinessCheckList.unmetBadge", {
                          count: affectedItemCount,
                      })}
            </Badge>
        </Box>
    );
}

type ReadinessCheckRowItemsProps = {
    readonly check: ReadinessCheck;
    readonly isMet: boolean;
    readonly affectedItems: readonly ReadinessAffectedItem[];
    readonly isExpanded: boolean;
    readonly onToggleExpanded: () => void;
    readonly renderFixControl: ReadinessCheckListRenderFixControl | undefined;
};

/**
 * The unmet-only part of a row: the expand/collapse toggle (only shown once
 * there's more than one affected item to collapse) and the affected-item
 * rows themselves.
 */
function ReadinessCheckRowItems({
    check,
    isMet,
    affectedItems,
    isExpanded,
    onToggleExpanded,
    renderFixControl,
}: ReadinessCheckRowItemsProps): ReactNode {
    const { t } = useQuotesTranslation();

    if (isMet) return null;

    const hasMultipleAffectedItems = affectedItems.length > 1;
    const itemsToRender = affectedItems.length > 0 ? affectedItems : [{}];

    return (
        <>
            {hasMultipleAffectedItems && (
                <Button
                    type="button"
                    variant="link"
                    size="small"
                    onClick={onToggleExpanded}
                >
                    {isExpanded
                        ? t("readinessCheckList.hideAffectedItems")
                        : t("readinessCheckList.showAffectedItems", {
                              count: affectedItems.length,
                          })}
                </Button>
            )}
            {(!hasMultipleAffectedItems || isExpanded) && (
                <Box direction="column" gap="xs">
                    {itemsToRender.map((item, index) => (
                        <ReadinessAffectedItemRow
                            key={ReadinessCheckListUtils.affectedItemKey(
                                item,
                                index,
                            )}
                            item={item}
                            check={check}
                            renderFixControl={renderFixControl}
                        />
                    ))}
                </Box>
            )}
        </>
    );
}

type ReadinessAffectedItemRowProps = {
    readonly item: ReadinessAffectedItem;
    readonly check: ReadinessCheck;
    readonly renderFixControl: ReadinessCheckListRenderFixControl | undefined;
};

function ReadinessAffectedItemRow({
    item,
    check,
    renderFixControl,
}: ReadinessAffectedItemRowProps): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <Box direction="row" justify="between" align="center" gap="sm" wrap>
            <Text size="sm">
                {ReadinessCheckListUtils.affectedItemLocation(item, t)}
            </Text>
            {renderFixControl?.(item, check)}
        </Box>
    );
}
