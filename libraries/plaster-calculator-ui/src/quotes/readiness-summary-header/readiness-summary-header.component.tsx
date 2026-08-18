import type {
    ReadinessCheck,
    ReadinessResult,
} from "@libraries/plaster-calculator-common";
import {
    Badge,
    Box,
    Button,
    Card,
    Paragraph,
    Text,
} from "@libraries/uikit-web";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";
import type {
    ReadinessCheckListRenderCheckFooter,
    ReadinessCheckListRenderFixControl,
} from "../readiness-check-list/index.ts";
import { ReadinessCheckList } from "../readiness-check-list/index.ts";

export type ReadinessSummaryHeaderProps = {
    readonly results: readonly ReadinessResult[];
    readonly onGenerateQuote: () => void;
    /**
     * The full readiness-check registry (e.g. `READINESS_CHECKS`), in
     * registry order. Doubles as the summary checklist's row source (see
     * `ReadinessCheckList` below) and as the severity lookup this header
     * needs to tell a blocking check from a `WARN` one — see `isReady()`.
     */
    readonly summaryChecks: readonly ReadinessCheck[];
    readonly renderFixControl?: ReadinessCheckListRenderFixControl;
    readonly renderCheckFooter?: ReadinessCheckListRenderCheckFooter;
    /**
     * Set while a generation request (`useGenerateQuote()`,
     * `@libraries/plaster-calculator-web-core`) is in flight — WORK-151's
     * "Button only enabled when readiness passes" plus a pending state.
     * Disables the action alongside `!isReady` and swaps its label to
     * `generateQuote.pending`, without introducing a third visual state:
     * the ready/not-ready title, description, and badge above are
     * unaffected, since generating a quote doesn't change whether the plan
     * itself is ready.
     */
    readonly isGenerating?: boolean;
};

/**
 * The quote readiness gate's panel header. Presentational only — it derives
 * "blocked" vs. "ready" from `results` and renders the Generate quote
 * action, but owns no data fetching; a connected container (WORK-151)
 * supplies `results` from `useQuoteReadiness()` and `isGenerating` from
 * `useGenerateQuote()`. Still only two header states (ready/not-ready)
 * rather than a third "warning" one — an unmet `WARN` check (e.g.
 * `COMPANY_CONTACT_DETAILS`, WORK-221/223) shows as an advisory row in the
 * checklist below, but never flips this header's ready/not-ready state or
 * its unmet count; see `isReady`/`unmetCount` below, which mirror
 * `isReady()` (`quote-readiness.utils.ts`, `plaster-calculator-web-core`)
 * rather than importing it, since that util isn't part of that package's public
 * surface. A check missing from `results` entirely counts as unmet, same
 * as that util's rule, so the header starts blocked before the readiness
 * query has loaded.
 */
export function ReadinessSummaryHeader({
    results,
    onGenerateQuote,
    summaryChecks,
    renderFixControl,
    renderCheckFooter,
    isGenerating = false,
}: ReadinessSummaryHeaderProps): ReactElement {
    const isReady = summaryChecks.every((check) => {
        if (check.severity !== "BLOCK") return true;
        const result = results.find((entry) => entry.checkId === check.id);
        return result?.isMet ?? false;
    });
    const unmetCount = summaryChecks.filter((check) => {
        if (check.severity !== "BLOCK") return false;
        const result = results.find((entry) => entry.checkId === check.id);
        return !(result?.isMet ?? false);
    }).length;

    return (
        <Card>
            <Box direction="column" gap="md">
                <ReadinessSummaryStatus
                    isReady={isReady}
                    unmetCount={unmetCount}
                />
                {summaryChecks.length > 0 && (
                    <ReadinessCheckList
                        checks={summaryChecks}
                        results={results}
                        renderFixControl={renderFixControl}
                        renderCheckFooter={renderCheckFooter}
                        variant="alerts"
                    />
                )}
                <GenerateQuoteAction
                    isReady={isReady}
                    isGenerating={isGenerating}
                    onGenerateQuote={onGenerateQuote}
                />
            </Box>
        </Card>
    );
}

type ReadinessSummaryStatusProps = {
    readonly isReady: boolean;
    readonly unmetCount: number;
};

function ReadinessSummaryStatus({
    isReady,
    unmetCount,
}: ReadinessSummaryStatusProps): ReactElement {
    const { t } = useQuotesTranslation();

    if (isReady) {
        return (
            <ReadinessSummaryStatusLayout
                title={t("readinessSummaryHeader.readyTitle")}
                description={t("readinessSummaryHeader.readyDescription")}
                badgeLabel={t("readinessSummaryHeader.readyBadge")}
                badgeColor="green"
            />
        );
    }

    return (
        <ReadinessSummaryStatusLayout
            title={t("readinessSummaryHeader.notReadyTitle")}
            description={t("readinessSummaryHeader.notReadyDescription", {
                count: unmetCount,
            })}
            badgeLabel={t("readinessSummaryHeader.unmetBadge", {
                count: unmetCount,
            })}
            badgeColor="red"
        />
    );
}

type ReadinessSummaryStatusLayoutProps = {
    readonly title: string;
    readonly description: string;
    readonly badgeLabel: string;
    readonly badgeColor: "green" | "red";
};

function ReadinessSummaryStatusLayout({
    title,
    description,
    badgeLabel,
    badgeColor,
}: ReadinessSummaryStatusLayoutProps): ReactElement {
    return (
        <Box direction="row" justify="between" align="center" wrap>
            <Box direction="column" gap="xs">
                <Card.Title>{title}</Card.Title>
                <Paragraph textSize="sm" variant="muted">
                    {description}
                </Paragraph>
            </Box>
            <Badge color={badgeColor} variant="pill-with-border">
                {badgeLabel}
            </Badge>
        </Box>
    );
}

type GenerateQuoteActionProps = {
    readonly isReady: boolean;
    readonly isGenerating: boolean;
    readonly onGenerateQuote: () => void;
};

function GenerateQuoteAction({
    isReady,
    isGenerating,
    onGenerateQuote,
}: GenerateQuoteActionProps): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <Box direction="row" gap="sm" align="center" wrap>
            <Button
                type="button"
                disabled={!isReady || isGenerating}
                onClick={onGenerateQuote}
            >
                {isGenerating
                    ? t("generateQuote.pending")
                    : t("readinessSummaryHeader.generateQuote")}
            </Button>
            {!isReady && (
                <Text size="sm" variant="muted">
                    {t("readinessSummaryHeader.disabledReason")}
                </Text>
            )}
        </Box>
    );
}
