import type { QuoteAppearance } from "@libraries/plaster-calculator-common";
import { Box, Card, Divider, Paragraph, Text } from "@libraries/uikit-web";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";
import { QuoteTotalsBlock } from "../quote-totals-block/index.ts";

import { QuoteDetailDocumentLetterhead } from "./quote-detail-document-letterhead.component.tsx";
import { QuoteDetailDocumentPricingTable } from "./quote-detail-document-pricing-table.component.tsx";
import { QuoteDetailDocumentSignatureBlock } from "./quote-detail-document-signature-block.component.tsx";
import type { QuoteDetailDocumentLineItem } from "./quote-detail-document.types.ts";
import { totals as computeTotals } from "./quote-detail-document.utils.ts";

/**
 * DOM id of the document's root `Card`. The print stylesheet (WORK-118)
 * isolates exactly this element via an `#id` selector when printing, so
 * this constant is the single source of truth both sides coordinate on.
 */
export const QUOTE_DETAIL_DOCUMENT_PRINT_ROOT_ID =
    "quote-detail-document-print-root";

export type QuoteDetailDocumentProps = {
    readonly reference: string | null;
    readonly projectName: string;
    readonly companyName: string | null;
    /** ISO 8601 timestamp shown as the document date. */
    readonly issuedAt: string;
    readonly lineItems: readonly QuoteDetailDocumentLineItem[];
    /** The team's letterhead, output detail, and terms settings (WORK-202). */
    readonly appearance: QuoteAppearance;
    /**
     * Resolved download URL for `appearance.logoStoragePath`. Resolving a
     * Firebase Storage path into a fetchable URL is infrastructure work this
     * framework-agnostic library must not perform itself (see this
     * package's README's "Services and React context" section) -- a
     * connected call site resolves it (WORK-207). `undefined`/`null` omits
     * the logo entirely rather than rendering a placeholder.
     */
    readonly logoUrl?: string | null;
    /**
     * Scope-of-work copy shown above the pricing table when
     * `appearance.showScopeOfWork` is set. Sourcing real content for this is
     * WORK-207's job -- this ticket only wires the toggle into rendering, so
     * the block is omitted whenever no text is supplied even if the toggle
     * is on.
     */
    readonly scopeOfWorkText?: string;
    /**
     * Take-off summary copy shown below the totals when
     * `appearance.showTakeoffSummary` is set. Same placeholder-content
     * caveat as `scopeOfWorkText` -- WORK-207 sources the real structured
     * summary.
     */
    readonly takeoffSummaryText?: string;
    /** Keeps the document mounted for printing without duplicating it on screen. */
    readonly printOnly?: boolean;
};

/**
 * The printable quote document: letterhead, an optional scope-of-work block,
 * priced line items at the team's chosen pricing detail level, a
 * subtotal/GST/total block, an optional take-off summary, terms, and an
 * optional acceptance signature block. Presentational only -- no action
 * buttons or breadcrumb; those belong to the route that hosts this
 * component. Deliberately carries no quote status: a document sent to a
 * builder has no business showing this team's internal workflow state (see
 * `QuoteStatusBadge`, still used elsewhere, e.g. the quotes table).
 */
export function QuoteDetailDocument({
    reference,
    projectName,
    companyName,
    issuedAt,
    lineItems,
    appearance,
    logoUrl,
    scopeOfWorkText,
    takeoffSummaryText,
    printOnly = false,
}: QuoteDetailDocumentProps): ReactElement {
    const totals = computeTotals(lineItems);

    return (
        <Card
            id={QUOTE_DETAIL_DOCUMENT_PRINT_ROOT_ID}
            visibility={printOnly ? "print-only" : "visible"}
        >
            <Box direction="column" gap="lg">
                <QuoteDetailDocumentLetterhead
                    appearance={appearance}
                    logoUrl={logoUrl}
                    reference={reference}
                    issuedAt={issuedAt}
                />
                <Divider color={appearance.accentColor ?? undefined} />
                <QuoteDetailDocumentRecipient
                    projectName={projectName}
                    companyName={companyName}
                />
                <QuoteDetailDocumentScopeOfWork
                    appearance={appearance}
                    text={scopeOfWorkText}
                />
                <QuoteDetailDocumentPricingTable
                    pricingDetail={appearance.pricingDetail}
                    lineItems={lineItems}
                    lumpSumTotalCents={totals.subtotalCents}
                />
                <QuoteTotalsBlock
                    subtotalCents={totals.subtotalCents}
                    gstCents={totals.gstCents}
                    totalIncGstCents={totals.totalIncGstCents}
                />
                <QuoteDetailDocumentTakeoffSummary
                    appearance={appearance}
                    text={takeoffSummaryText}
                />
                <QuoteDetailDocumentTerms appearance={appearance} />
                <QuoteDetailDocumentSignatureBlock appearance={appearance} />
            </Box>
        </Card>
    );
}

type QuoteDetailDocumentRecipientProps = {
    readonly projectName: string;
    readonly companyName: string | null;
};

/** Who the quote is for -- the project and, when known, the company. */
function QuoteDetailDocumentRecipient({
    projectName,
    companyName,
}: QuoteDetailDocumentRecipientProps): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <Box direction="column" gap="xs">
            <Text weight="semibold">{projectName}</Text>
            <Text size="sm" variant="muted">
                {companyName ?? t("quoteDetailDocument.noCompany")}
            </Text>
        </Box>
    );
}

type QuoteDetailDocumentTextBlockProps = {
    readonly title: string;
    readonly text: string;
};

/** A titled paragraph -- shared by the scope-of-work, take-off summary, and terms blocks. */
function QuoteDetailDocumentTextBlock({
    title,
    text,
}: QuoteDetailDocumentTextBlockProps): ReactElement {
    return (
        <Box direction="column" gap="xs">
            <Text weight="semibold">{title}</Text>
            <Paragraph textSize="sm" variant="muted">
                {text}
            </Paragraph>
        </Box>
    );
}

type QuoteDetailDocumentOptionalTextBlockProps = {
    readonly appearance: QuoteAppearance;
    readonly text?: string;
};

/** Above the pricing table, gated by `appearance.showScopeOfWork`. */
function QuoteDetailDocumentScopeOfWork({
    appearance,
    text,
}: QuoteDetailDocumentOptionalTextBlockProps): ReactElement | null {
    const { t } = useQuotesTranslation();

    if (!appearance.showScopeOfWork || !text) {
        return null;
    }
    return (
        <QuoteDetailDocumentTextBlock
            title={t("quoteDetailDocument.scopeOfWorkTitle")}
            text={text}
        />
    );
}

/** Below the totals, gated by `appearance.showTakeoffSummary`. */
function QuoteDetailDocumentTakeoffSummary({
    appearance,
    text,
}: QuoteDetailDocumentOptionalTextBlockProps): ReactElement | null {
    const { t } = useQuotesTranslation();

    if (!appearance.showTakeoffSummary || !text) {
        return null;
    }
    return (
        <QuoteDetailDocumentTextBlock
            title={t("quoteDetailDocument.takeoffSummaryTitle")}
            text={text}
        />
    );
}

/**
 * Printed under the totals from `appearance.terms`. Omitted entirely when
 * there's no terms text -- empty or whitespace-only counts as none, per
 * `QuoteAppearanceSchema`'s doc comment on why `terms` defaults to `""`
 * rather than placeholder copy.
 */
function QuoteDetailDocumentTerms({
    appearance,
}: {
    readonly appearance: QuoteAppearance;
}): ReactElement | null {
    const { t } = useQuotesTranslation();
    const termsText = appearance.terms?.trim();

    if (!termsText) {
        return null;
    }
    return (
        <QuoteDetailDocumentTextBlock
            title={t("quoteDetailDocument.termsTitle")}
            text={termsText}
        />
    );
}
