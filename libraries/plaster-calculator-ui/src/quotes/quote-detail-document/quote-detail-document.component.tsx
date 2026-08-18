import type { QuoteAppearance } from "@libraries/plaster-calculator-common";
import {
    Box,
    Card,
    Divider,
    Grid,
    Paragraph,
    Text,
} from "@libraries/uikit-web";
import type { ReactElement } from "react";

import { useQuotesTranslation } from "../i18n/index.ts";
import { QuoteAppearanceCaption } from "../quote-appearance-panel/quote-appearance-caption.component.tsx";
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
                <Divider
                    color={appearance.accentColor ?? undefined}
                    thickness="thick"
                />
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

/**
 * Who the quote is for -- the company (or "no company" when unset) and the
 * project, side by side under uppercase "PREPARED FOR"/"PROJECT" captions
 * (`Text`'s `uppercase` prop).
 */
function QuoteDetailDocumentRecipient({
    projectName,
    companyName,
}: QuoteDetailDocumentRecipientProps): ReactElement {
    const { t } = useQuotesTranslation();

    return (
        <Grid columns={{ xs: 1, sm: 2 }} gap="lg">
            <QuoteDetailDocumentRecipientColumn
                caption={t("quoteDetailDocument.preparedForLabel")}
                value={companyName ?? t("quoteDetailDocument.noCompany")}
            />
            <QuoteDetailDocumentRecipientColumn
                caption={t("quoteDetailDocument.projectLabel")}
                value={projectName}
            />
        </Grid>
    );
}

type QuoteDetailDocumentRecipientColumnProps = {
    readonly caption: string;
    readonly value: string;
};

function QuoteDetailDocumentRecipientColumn({
    caption,
    value,
}: QuoteDetailDocumentRecipientColumnProps): ReactElement {
    return (
        <Box direction="column" gap="xs">
            <Text size="xs" weight="semibold" variant="muted" uppercase>
                {caption}
            </Text>
            <Text weight="semibold">{value}</Text>
        </Box>
    );
}

type QuoteDetailDocumentTextBlockProps = {
    readonly title: string;
    readonly text: string;
};

/** A captioned paragraph -- shared by the scope-of-work, take-off summary, and terms blocks. */
function QuoteDetailDocumentTextBlock({
    title,
    text,
}: QuoteDetailDocumentTextBlockProps): ReactElement {
    return (
        <Box direction="column" gap="xs">
            <QuoteAppearanceCaption>{title}</QuoteAppearanceCaption>
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

/**
 * Below the totals, gated by `appearance.showTakeoffSummary`. Set off in
 * its own shaded `Card` (`variant="subtle"`) rather than sitting flush with
 * the rest of the document -- it's measured/derived content, not something
 * the team wrote, so it reads as a distinct block.
 */
function QuoteDetailDocumentTakeoffSummary({
    appearance,
    text,
}: QuoteDetailDocumentOptionalTextBlockProps): ReactElement | null {
    const { t } = useQuotesTranslation();

    if (!appearance.showTakeoffSummary || !text) {
        return null;
    }
    return (
        <Card variant="subtle">
            <QuoteDetailDocumentTextBlock
                title={t("quoteDetailDocument.takeoffSummaryTitle")}
                text={text}
            />
        </Card>
    );
}

/**
 * Printed under the totals from `appearance.terms`. Omitted entirely when
 * there's no terms text -- empty or whitespace-only counts as none, per
 * `QuoteAppearanceSchema`'s doc comment on why `terms` defaults to `""`
 * rather than placeholder copy. Carries its own leading `Divider` (rather
 * than one placed unconditionally between this and the take-off summary
 * above it) so the rule only appears when there's actually a terms block
 * to separate from whatever precedes it, regardless of whether that's the
 * take-off summary, the totals, or the pricing table.
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
        <Box direction="column" gap="lg">
            <Divider />
            <QuoteDetailDocumentTextBlock
                title={t("quoteDetailDocument.termsTitle")}
                text={termsText}
            />
        </Box>
    );
}
