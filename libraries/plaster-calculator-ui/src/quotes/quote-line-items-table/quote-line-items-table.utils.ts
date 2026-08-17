import { formatQuantityText } from "@libraries/utilities";

import type { useQuotesTranslation } from "../i18n/index.ts";

import type {
    QuoteLineItemsTableQuantitySource,
    QuoteLineItemsTableRow,
} from "./quote-line-items-table.types.ts";

type QuotesTFunction = ReturnType<typeof useQuotesTranslation>["t"];

/**
 * Formats the numeric quantity independently from its stored unit.
 * Rounds display to 2dp and trims trailing zeroes, matching how
 * `quantity` itself is a plain (non-cents) `number` rather than money.
 */
export function quantityDisplayText(row: QuoteLineItemsTableRow): string {
    return formatQuantityText(row.quantity);
}

/**
 * Names this row's provenance -- the metric its quantity was measured
 * from, or the keywords that matched it onto the quote -- so every row
 * shows *some* reason it's here, never nothing. Prefers
 * `quantitySource` over `matchedKeywords` when both are present: it
 * explains the actual quantity, which is the more specific claim, while
 * `matchedKeywords` only explains inclusion (relevant for a flat-fee
 * line with nothing to measure, where `quantitySource` is `null`).
 *
 * A row with neither is an unconditional flat-fee item configured as
 * "Include by default". It legitimately has no measured quantity source
 * or matched keyword, so it renders an explicit translated label rather
 * than warning or falling back to unknown provenance.
 */
export function provenanceLabel(
    row: QuoteLineItemsTableRow,
    t: QuotesTFunction,
): string {
    if (row.quantitySource) {
        return quantitySourceProvenanceLabel(row.quantitySource, t);
    }
    if (row.matchedKeywords.length > 0) {
        return matchedKeywordsProvenanceLabel(row.matchedKeywords, t);
    }
    return t("quoteLineItemsTable.includedByDefault");
}

function quantitySourceProvenanceLabel(
    quantitySource: QuoteLineItemsTableQuantitySource,
    t: QuotesTFunction,
): string {
    const source = humanize(quantitySource.measurementSource);
    return quantitySource.measurementPlasterType
        ? t("quoteLineItemsTable.provenanceFromSourceWithPlasterType", {
              source,
              plasterType: humanize(quantitySource.measurementPlasterType),
          })
        : t("quoteLineItemsTable.provenanceFromSource", { source });
}

function matchedKeywordsProvenanceLabel(
    matchedKeywords: readonly string[],
    t: QuotesTFunction,
): string {
    const keywords = matchedKeywords
        .map((keyword) => `"${keyword}"`)
        .join(", ");
    return t("quoteLineItemsTable.provenanceMatchedKeywords", {
        keywords,
    });
}

/**
 * e.g. `"WALL_AREA"` -> `"wall area"`. `measurementSource`/
 * `measurementPlasterType` are free-text columns rather than a closed
 * union this library can see, so -- matching
 * `humanize` in `quote-detail-document.utils.ts` -- this humanizes the raw
 * value instead of translating it through a fixed key map.
 */
function humanize(value: string): string {
    return value.toLowerCase().split("_").filter(Boolean).join(" ");
}
