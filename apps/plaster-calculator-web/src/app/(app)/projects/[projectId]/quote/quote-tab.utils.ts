import type { GetProjectQuoteData } from "@generated/data-connector-web";
import {
    QuoteAppearanceSchema,
    resolveQuoteAppearance,
    type QuoteAppearance,
} from "@libraries/plaster-calculator-common";
import type {
    EditableQuoteFormValues,
    QuoteDetailDocumentProps,
} from "@libraries/plaster-calculator-ui";
import { formatQuantityText } from "@libraries/utilities";

type ProjectQuote = NonNullable<
    NonNullable<GetProjectQuoteData["project"]>["quote"]
>;
type ProjectQuoteItem = ProjectQuote["items"][number];
type ProjectQuoteAppearanceRow = GetProjectQuoteData["appearance"][number];

type TakeoffSummaryEntry = {
    readonly label: string;
    readonly unit: string | null;
    readonly quantity: number;
};

/**
 * `QuoteAppearance`'s nullable shape, but with `pricingDetail` left as the
 * plain `string` the generated SDK returns -- `QuoteAppearanceSchema.parse()`
 * is what narrows it down to `QuotePricingDetail`'s closed literal union.
 */
type RawQuoteAppearance = Omit<QuoteAppearance, "pricingDetail"> & {
    readonly pricingDetail: string;
};

function toNullable<T>(value: T | null | undefined): T | null {
    return value ?? null;
}

export type ToDocumentPropsOptions = {
    readonly quote: ProjectQuote;
    readonly projectName: string;
    readonly companyName: string | null;
    /** The team's letterhead/output settings (WORK-201/202) -- see `toAppearance()`. */
    readonly appearance: QuoteAppearance;
    /** Resolved download URL for `appearance.logoStoragePath`; see `QuoteDetailDocumentProps.logoUrl`. */
    readonly logoUrl: string | null | undefined;
    /** The project's scope-of-work text (`ProjectDetail.scope`); blank/absent omits the block. */
    readonly scopeOfWorkText: string | null | undefined;
};

/**
 * Maps the project's generated quote onto the complete printable document.
 * Project display fields come from the project page's existing detail read,
 * pricing and status come from `GetProjectQuote`, and the team's letterhead
 * settings come from `GetProjectQuote`'s sibling `appearance` selection
 * (WORK-201) via `toAppearance()`.
 */
export class QuoteTabUtils {
    public static toEditableValues(
        quote: ProjectQuote,
    ): EditableQuoteFormValues {
        return {
            reference: quote.reference ?? "",
            lineItems: quote.items.map((item) => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                unit: item.unit ?? null,
                unitPriceCents: item.unitPriceCents,
            })),
        };
    }

    /**
     * Resolves `GetProjectQuote`'s team-scoped `appearance` row (at most one,
     * per that query's doc comment) into a complete `QuoteAppearance` via
     * `resolveQuoteAppearance()` -- the same "team never opened the settings
     * tab" fallback `QuoteAppearanceService.getAppearance()`
     * (`@libraries/plaster-calculator-web-core`) uses. Parses through
     * `QuoteAppearanceSchema` first, mirroring that same service's
     * `toQuoteAppearance()`, since `row.pricingDetail` is a plain `string` on
     * the generated SDK (no GraphQL enum scalar) and needs narrowing down to
     * `QuotePricingDetail`'s closed literal union before it satisfies
     * `QuoteAppearance`.
     */
    public static toAppearance(
        row: ProjectQuoteAppearanceRow | undefined,
    ): QuoteAppearance {
        return resolveQuoteAppearance(
            row
                ? QuoteAppearanceSchema.parse(
                      QuoteTabUtils.toRawAppearance(row),
                  )
                : undefined,
        );
    }

    /** Normalises `GetProjectQuote`'s optional appearance fields down to the nullable shape `QuoteAppearanceSchema` expects. */
    private static toRawAppearance(
        row: ProjectQuoteAppearanceRow,
    ): RawQuoteAppearance {
        return {
            logoStoragePath: toNullable(row.logoStoragePath),
            businessName: toNullable(row.businessName),
            abn: toNullable(row.abn),
            licenceNumber: toNullable(row.licenceNumber),
            address: toNullable(row.address),
            phoneNumber: toNullable(row.phoneNumber),
            email: toNullable(row.email),
            accentColor: toNullable(row.accentColor),
            pricingDetail: row.pricingDetail,
            showScopeOfWork: row.showScopeOfWork,
            showTakeoffSummary: row.showTakeoffSummary,
            showSignatureBlock: row.showSignatureBlock,
            validForDays: row.validForDays,
            terms: toNullable(row.terms),
        };
    }

    public static toDocumentProps({
        quote,
        projectName,
        companyName,
        appearance,
        logoUrl,
        scopeOfWorkText,
    }: ToDocumentPropsOptions): QuoteDetailDocumentProps {
        return {
            reference: quote.reference ?? null,
            projectName,
            companyName,
            issuedAt: quote.issuedAt ?? quote.createdAt,
            appearance,
            logoUrl,
            scopeOfWorkText: scopeOfWorkText?.trim() || undefined,
            takeoffSummaryText: QuoteTabUtils.takeoffSummaryText(quote),
            lineItems: quote.items.map((item) => ({
                id: item.id,
                name: item.name,
                quantity: item.quantity,
                unit: item.unit ?? null,
                unitPriceCents: item.unitPriceCents,
                quantitySource: item.quantitySource
                    ? {
                          measurementSource:
                              item.quantitySource.measurementSource,
                          measurementPlasterType:
                              item.quantitySource.measurementPlasterType ??
                              null,
                      }
                    : null,
            })),
        };
    }

    /**
     * Rolls the quote's measured line items up into one human-readable
     * take-off summary (e.g. "Wall area: 120.5 m2, Ceiling area -- 10mm
     * plasterboard: 45.2 m2"), grouped by provenance
     * (`quantitySource.measurementSource`/`measurementPlasterType`) and unit.
     * Manually-entered lines (no `quantitySource`) carry no take-off
     * provenance and are excluded rather than counted as an unlabelled
     * quantity. Returns `undefined` when no line has a `quantitySource` at
     * all, so the caller (and `QuoteDetailDocument`) omits the block instead
     * of printing an empty heading.
     */
    private static takeoffSummaryText(quote: ProjectQuote): string | undefined {
        const measuredItems = quote.items.filter(
            (
                item,
            ): item is ProjectQuoteItem & {
                quantitySource: NonNullable<ProjectQuoteItem["quantitySource"]>;
            } => item.quantitySource != null,
        );
        if (measuredItems.length === 0) {
            return undefined;
        }

        const totalsByKey = measuredItems.reduce(
            (totals, item) => QuoteTabUtils.addTakeoffQuantity(totals, item),
            new Map<string, TakeoffSummaryEntry>(),
        );
        return Array.from(totalsByKey.values())
            .map(QuoteTabUtils.formatTakeoffSummaryEntry)
            .join(", ");
    }

    private static addTakeoffQuantity(
        totals: Map<string, TakeoffSummaryEntry>,
        item: ProjectQuoteItem & {
            quantitySource: NonNullable<ProjectQuoteItem["quantitySource"]>;
        },
    ): Map<string, TakeoffSummaryEntry> {
        const label = QuoteTabUtils.quantitySourceLabel(item.quantitySource);
        const key = `${label}|${item.unit ?? ""}`;
        const existing = totals.get(key);
        totals.set(key, {
            label,
            unit: item.unit ?? null,
            quantity: (existing?.quantity ?? 0) + item.quantity,
        });
        return totals;
    }

    private static quantitySourceLabel(
        quantitySource: NonNullable<ProjectQuoteItem["quantitySource"]>,
    ): string {
        const source = QuoteTabUtils.humanizeMeasurement(
            quantitySource.measurementSource,
        );
        return quantitySource.measurementPlasterType
            ? `${source} — ${QuoteTabUtils.humanizeMeasurement(quantitySource.measurementPlasterType)}`
            : source;
    }

    private static formatTakeoffSummaryEntry(
        entry: TakeoffSummaryEntry,
    ): string {
        const quantityText = formatQuantityText(entry.quantity);
        return entry.unit
            ? `${entry.label}: ${quantityText} ${entry.unit}`
            : `${entry.label}: ${quantityText}`;
    }

    private static humanizeMeasurement(value: string): string {
        return value
            .toLowerCase()
            .split("_")
            .filter(Boolean)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
    }
}
