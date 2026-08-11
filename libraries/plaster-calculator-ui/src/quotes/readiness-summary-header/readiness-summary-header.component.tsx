import type { ReadinessResult } from "@libraries/plaster-calculator-common";
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

export type ReadinessSummaryHeaderProps = {
    readonly results: readonly ReadinessResult[];
    readonly onGenerateQuote: () => void;
};

/**
 * The quote readiness gate's panel header. Presentational only — it derives
 * "blocked" vs. "ready" from `results` and renders the Generate quote
 * action, but owns no data fetching; a connected container (later ticket)
 * supplies `results` from `useQuoteReadiness()`. v1 has no `WARN`-severity
 * checks, so there are only two states here rather than a third "warning"
 * state. An empty `results` array (e.g. before the readiness query has
 * loaded) is treated as blocked, matching `QuoteReadinessUtils.isReady()`'s
 * "missing result counts as unmet" rule in `plaster-calculator-web-core`.
 */
export function ReadinessSummaryHeader({
    results,
    onGenerateQuote,
}: ReadinessSummaryHeaderProps): ReactElement {
    const { t } = useQuotesTranslation();
    const unmetCount = results.filter((result) => !result.isMet).length;
    const isReady = results.length > 0 && unmetCount === 0;

    return (
        <Card>
            <Box direction="column" gap="md">
                <Box direction="row" justify="between" align="center" wrap>
                    <Box direction="column" gap="xs">
                        <Card.Title>
                            {isReady
                                ? t("readinessSummaryHeader.readyTitle")
                                : t("readinessSummaryHeader.notReadyTitle")}
                        </Card.Title>
                        <Paragraph textSize="sm" variant="muted">
                            {isReady
                                ? t("readinessSummaryHeader.readyDescription")
                                : t(
                                      "readinessSummaryHeader.notReadyDescription",
                                      { count: unmetCount },
                                  )}
                        </Paragraph>
                    </Box>
                    <Badge
                        color={isReady ? "green" : "red"}
                        variant="pill-with-border"
                    >
                        {isReady
                            ? t("readinessSummaryHeader.readyBadge")
                            : t("readinessSummaryHeader.unmetBadge", {
                                  count: unmetCount,
                              })}
                    </Badge>
                </Box>
                <Box direction="row" gap="sm" align="center" wrap>
                    <Button
                        type="button"
                        disabled={!isReady}
                        onClick={onGenerateQuote}
                    >
                        {t("readinessSummaryHeader.generateQuote")}
                    </Button>
                    {!isReady && (
                        <Text size="sm" variant="muted">
                            {t("readinessSummaryHeader.disabledReason")}
                        </Text>
                    )}
                </Box>
            </Box>
        </Card>
    );
}
