import type {
    ReadinessAffectedItem,
    ReadinessCheck,
    ReadinessResult,
} from "@libraries/plaster-calculator-common";
import {
    Alert,
    Badge,
    Box,
    Button,
    Label,
    StackedList,
    Text,
    Toggle,
} from "@libraries/uikit-web";
import type { ReactElement, ReactNode } from "react";
import { useId, useState } from "react";

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
    readonly variant?: "stacked" | "alerts";
};

/**
 * Renders the readiness-check registry as a list. Completed checks start
 * hidden behind a compact toggle so attention stays on the unmet rows.
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
    variant = "stacked",
}: ReadinessCheckListProps): ReactElement {
    const toggleId = useId();
    const { t } = useQuotesTranslation();
    const [showMetChecks, setShowMetChecks] = useState(false);
    const metCheckCount = checks.filter((check) =>
        results.some((result) => result.checkId === check.id && result.isMet),
    ).length;
    const visibleChecks = showMetChecks
        ? checks
        : checks.filter(
              (check) =>
                  !results.some(
                      (result) => result.checkId === check.id && result.isMet,
                  ),
          );
    const checkRows =
        variant === "alerts" ? (
            <Box direction="column" gap="sm">
                {visibleChecks.map((check) => (
                    <ReadinessCheckAlert
                        key={check.id}
                        check={check}
                        result={results.find(
                            (result) => result.checkId === check.id,
                        )}
                        renderFixControl={renderFixControl}
                    />
                ))}
            </Box>
        ) : (
            <StackedList bordered>
                {visibleChecks.map((check) => (
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

    return (
        <Box direction="column" gap="sm">
            {metCheckCount > 0 && (
                <Box direction="row" align="center" gap="sm">
                    <Toggle
                        id={toggleId}
                        size="sm"
                        checked={showMetChecks}
                        onChange={(event) =>
                            setShowMetChecks(event.target.checked)
                        }
                    />
                    <Label htmlFor={toggleId}>
                        {showMetChecks
                            ? t("readinessCheckList.hideCompletedChecks")
                            : t("readinessCheckList.showCompletedChecks", {
                                  count: metCheckCount,
                              })}
                    </Label>
                </Box>
            )}
            {checkRows}
        </Box>
    );
}

type ReadinessCheckRowProps = {
    readonly check: ReadinessCheck;
    readonly result: ReadinessResult | undefined;
    readonly renderFixControl: ReadinessCheckListRenderFixControl | undefined;
};

function ReadinessCheckAlert({
    check,
    result,
    renderFixControl,
}: ReadinessCheckRowProps): ReactElement {
    return (
        <Alert
            intent={checkStatusIntent(result?.isMet ?? false, check.severity)}
            variant="light-with-border"
        >
            <ReadinessCheckRow
                check={check}
                result={result}
                renderFixControl={renderFixControl}
            />
        </Alert>
    );
}

/**
 * Maps a check's met/unmet state and severity onto the `Alert`/`Badge`
 * intent that reads as blocking vs. advisory: unmet `WARN` checks (e.g.
 * `COMPANY_CONTACT_DETAILS`, WORK-221/223) read as a nudge rather than a
 * blocker, the same "warn" treatment used elsewhere in the app (e.g.
 * `save-questionnaire-template-from-project-modal`'s `Alert`) rather than
 * `error`'s.
 */
function checkStatusIntent(
    isMet: boolean,
    severity: ReadinessCheck["severity"],
): "success" | "warn" | "error" {
    if (isMet) return "success";
    return severity === "WARN" ? "warn" : "error";
}

/** Same mapping as `checkStatusIntent`, onto `Badge`'s color palette. */
function checkStatusBadgeColor(
    isMet: boolean,
    severity: ReadinessCheck["severity"],
): "green" | "yellow" | "red" {
    if (isMet) return "green";
    return severity === "WARN" ? "yellow" : "red";
}

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
            <Badge
                color={checkStatusBadgeColor(isMet, check.severity)}
                variant="pill-with-border"
            >
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
