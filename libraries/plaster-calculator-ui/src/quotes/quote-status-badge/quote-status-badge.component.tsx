import type { QuoteStatus } from "@libraries/plaster-calculator-common";
import { Badge } from "@libraries/uikit-web";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";

import { quoteStatusBadgeColors } from "./quote-status-badge.styles.ts";

export type QuoteStatusBadgeProps = {
    readonly status: QuoteStatus;
};

/**
 * A coloured-dot pill naming a quote's current status. Generic enough to be
 * reused by both the all-quotes table row and the quote detail header.
 */
export function QuoteStatusBadge({
    status,
}: QuoteStatusBadgeProps): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <Badge dot color={quoteStatusBadgeColors[status]}>
            {t(`quoteStatusBadge.${status}`)}
        </Badge>
    );
}
