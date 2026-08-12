import type {
    CreateQuoteWithItemsVariables,
    GetQuoteReadinessData,
} from "@generated/data-connector-web";
import {
    QuoteItemKeywordMatcherUtils,
    ReadinessCheckUtils,
    TakeoffRollupUtils,
    type PageTakeoffInput,
    type QuantitySourceDefinition,
    type TakeoffRollupResult,
} from "@libraries/plaster-calculator-common";

import type {
    GenerateQuoteInput,
    GenerateQuoteResult,
    GenerateQuoteTemplateConfig,
    ResolvedQuoteItem,
} from "./generate-quote.types.ts";

type QueryFloorplanPage = GetQuoteReadinessData["floorplanPages"][number];
type QueryTemplateConfig =
    GetQuoteReadinessData["quoteItemTemplateConfigs"][number];

/** `CreateQuoteWithItems`'s (`data/connector-web/quotes.mutations.gql`) fixed slot count. */
const MAX_QUOTE_ITEMS = 20;

/**
 * Take-off -> match -> price -> `CreateQuoteWithItems` variables, as one
 * pure (no I/O) orchestration. `useGenerateQuote()` maps `GetQuoteReadiness`
 * (WORK-130) query results onto this class's inputs and calls `build()`;
 * everything here is a plain function of its arguments so it's testable
 * without a `DataConnect` instance.
 */
export class GenerateQuoteUtils {
    /**
     * `QuoteItemTemplate.quantitySourceId` can only ever point at one of
     * these six rows: `EnsureSystemQuoteItemTemplates` (`data/connector-web/
     * quotes.mutations.gql`) is the only mutation that ever writes a
     * `QuantitySource` row, and `CreateQuoteItemTemplate` (the mutation a
     * team uses to add its own custom item templates) never sets
     * `quantitySourceId` at all — every team-created template's
     * `quantitySourceId` is `null`. So rather than adding a Data Connect
     * query just to read `QuantitySource.measurementSource`/
     * `measurementPlasterType` back (out of scope for this package, and
     * `GetQuoteReadiness` doesn't select them), this mirrors the same six
     * `id`/`measurementSource`/`measurementPlasterType` triples
     * `EnsureSystemQuoteItemTemplates` seeds, by hand. If a future ticket
     * lets a team seed its own `QuantitySource` rows, this list — and the
     * assumption above — need to be revisited. The IDs use Data Connect's
     * compact UUID representation (without hyphens), matching the generated
     * query values compared in `resolveQuantityFor()`; the seed mutation's
     * hyphenated literals identify the same UUID rows.
     */
    private static readonly KNOWN_QUANTITY_SOURCES: readonly QuantitySourceDefinition[] =
        [
            {
                id: "c1b8d7b7bfda440099d664a366c02f62",
                measurementSource: "WALL_AREA",
                measurementPlasterType: "STANDARD",
            },
            {
                id: "9f8704f99c21406b99ab7e30eec761ff",
                measurementSource: "WALL_AREA",
                measurementPlasterType: "WET_AREA",
            },
            {
                id: "c3c9157433c540bfbc6dcaab40b7da22",
                measurementSource: "CEILING_AREA",
                measurementPlasterType: "STANDARD",
            },
            {
                id: "c8b59f22fa5a467d995e7d261e86dc52",
                measurementSource: "CORNICE_LENGTH",
                measurementPlasterType: null,
            },
            {
                id: "a8c9d27b6e1e48348a12a2b6bf811ac1",
                measurementSource: "FLOOR_AREA",
                measurementPlasterType: "WET_AREA",
            },
            {
                id: "84caa96a9e654176ab64c9360081caf8",
                measurementSource: "DOOR_COUNT",
                measurementPlasterType: null,
            },
        ];

    /**
     * The full orchestration: refuses outright when `input.isReady` is
     * `false` (the readiness gate is not merely advisory — see
     * `GenerateQuoteFailureReason`'s doc comment), otherwise rolls up
     * `input.pages` via `TakeoffRollupUtils.rollup()`, resolves+filters
     * quote items via `resolveQuoteItems()`, and hands the result to
     * `buildMutationVariables()`.
     */
    public static build(input: GenerateQuoteInput): GenerateQuoteResult {
        if (!input.isReady) {
            return {
                ok: false,
                reason: "NOT_READY",
                message:
                    "The project has not met the quote readiness gate; refusing to generate a quote.",
            };
        }

        const rollupResults = TakeoffRollupUtils.rollup(
            input.pages,
            GenerateQuoteUtils.KNOWN_QUANTITY_SOURCES,
        );
        const items = GenerateQuoteUtils.resolveQuoteItems(
            input.templateConfigs,
            rollupResults,
            input.searchText,
        );
        return GenerateQuoteUtils.buildMutationVariables(
            input.projectId,
            input.quoteId,
            items,
        );
    }

    /**
     * Matches every `templateConfigs` entry against `searchText`
     * (`QuoteItemKeywordMatcherUtils.match()`) and resolves its quantity
     * (`resolveQuantityFor()`), keeping only the ones that both match *and*
     * resolve to a non-zero quantity — a quote should not carry a $0 line
     * for a metric this plan doesn't have, matched keywords or not.
     * Exposed publicly (rather than folded into `build()`) so tests can
     * exercise matching/quantity-resolution/zero-filtering directly against
     * hand-built `TakeoffRollupResult`s, without needing a full `Overlay`
     * fixture.
     */
    public static resolveQuoteItems(
        templateConfigs: readonly GenerateQuoteTemplateConfig[],
        rollupResults: readonly TakeoffRollupResult[],
        searchText: string,
    ): readonly ResolvedQuoteItem[] {
        return templateConfigs
            .map((config) =>
                GenerateQuoteUtils.resolveQuoteItem(
                    config,
                    rollupResults,
                    searchText,
                ),
            )
            .filter((item): item is ResolvedQuoteItem => item !== null);
    }

    /**
     * Maps up to `MAX_QUOTE_ITEMS` resolved items onto `CreateQuoteWithItems`'s
     * fixed `includeItemN`/`itemN*` slots. Refuses — rather than truncating —
     * when `items.length` exceeds `MAX_QUOTE_ITEMS`: `CreateQuoteWithItems`
     * has no way to accept more, and silently dropping lines from a
     * customer-facing quote without telling anyone is worse than failing
     * loudly and letting a human decide what to do (e.g. split the
     * project's catalog, or extend the mutation with more slots — see that
     * mutation's own doc comment). Exposed publicly for the same testability
     * reason as `resolveQuoteItems()`.
     */
    public static buildMutationVariables(
        projectId: string,
        quoteId: string,
        items: readonly ResolvedQuoteItem[],
    ): GenerateQuoteResult {
        if (items.length === 0) {
            return {
                ok: false,
                reason: "NO_ITEMS",
                message:
                    "No billable quote items resolved from the project take-off and template.",
            };
        }

        if (items.length > MAX_QUOTE_ITEMS) {
            return {
                ok: false,
                reason: "TOO_MANY_ITEMS",
                message: `Generated ${String(items.length)} quote items, but CreateQuoteWithItems only supports ${String(MAX_QUOTE_ITEMS)}.`,
            };
        }

        const variables: Record<string, unknown> = { projectId, quoteId };
        items.forEach((item, index) =>
            GenerateQuoteUtils.assignSlot(variables, index + 1, item),
        );

        return {
            ok: true,
            // `CreateQuoteWithItemsVariables` has no index signature — its
            // `item1Name`/`item2Name`/... fields are static, unrelated
            // properties (see that mutation's own doc comment for why: a
            // GraphQL document can't accept a variable-length list of
            // table-row inputs). Building the object by dynamic key is the
            // only way to fill a variable number of slots without 20
            // hand-written branches, so this cast is the deliberate seam
            // between that dynamic construction and the generated type.
            variables: variables as unknown as CreateQuoteWithItemsVariables,
            itemCount: items.length,
        };
    }

    /**
     * Maps `GetQuoteReadiness`'s `floorplanPages` onto `PageTakeoffInput`,
     * reusing `ReadinessCheckUtils.parseOverlayAreas()` (`@libraries/
     * plaster-calculator-common`) for the same defensive
     * "malformed/absent overlay JSON -> no areas, not a crash" parsing the
     * readiness gate itself already relies on, rather than re-implementing
     * overlay parsing here.
     */
    public static buildPageTakeoffInputs(
        floorplanPages: readonly QueryFloorplanPage[],
    ): readonly PageTakeoffInput[] {
        return floorplanPages.map((page) => ({
            pageId: page.id,
            overlay: {
                areas: [
                    ...ReadinessCheckUtils.parseOverlayAreas(
                        page.overlayJson ?? null,
                    ),
                ],
            },
            scaleMmPerPx: page.scaleMmPerPx ?? null,
            pageHeightMm: page.ceilingHeightMm ?? null,
        }));
    }

    /**
     * Maps `GetQuoteReadiness`'s `quoteItemTemplateConfigs` (already
     * filtered to `enabled: true` by that query) onto
     * `GenerateQuoteTemplateConfig`. `materialUnitPriceCents`/
     * `labourUnitPriceCents` are hard-coded to `0` — see
     * `GenerateQuoteTemplateConfig`'s doc comment for why.
     */
    public static buildTemplateConfigs(
        configs: readonly QueryTemplateConfig[],
    ): readonly GenerateQuoteTemplateConfig[] {
        return configs.map((config) => ({
            itemTemplateId: config.itemTemplateId,
            name: config.itemTemplate.name,
            hasKeywords: config.itemTemplate.hasKeywords,
            keywords: config.itemTemplate.keywords,
            quantitySourceId: config.itemTemplate.quantitySourceId ?? null,
            sortOrder: config.itemTemplate.sortOrder,
            unitPriceCents: config.unitPriceCents,
            materialUnitPriceCents: 0,
            labourUnitPriceCents: 0,
        }));
    }

    private static resolveQuoteItem(
        config: GenerateQuoteTemplateConfig,
        rollupResults: readonly TakeoffRollupResult[],
        searchText: string,
    ): ResolvedQuoteItem | null {
        const matchResult = QuoteItemKeywordMatcherUtils.match(
            config,
            searchText,
        );
        if (!matchResult.matches) return null;

        const quantity = GenerateQuoteUtils.resolveQuantityFor(
            config,
            rollupResults,
        );
        if (quantity <= 0) return null;

        return {
            sourceTemplateId: config.itemTemplateId,
            name: config.name,
            displayOrder: config.sortOrder,
            quantity,
            quantitySourceId: config.quantitySourceId,
            unitPriceCents: config.unitPriceCents,
            materialUnitPriceCents: config.materialUnitPriceCents,
            labourUnitPriceCents: config.labourUnitPriceCents,
            matchedKeywords: matchResult.matchedKeywords,
        };
    }

    /**
     * A template with a `quantitySourceId` (unconditional or
     * keyword-matched) always resolves its quantity from the take-off
     * rollup — `0` when the rollup has no entry for that source, e.g. a
     * plan with no wet-area walls.
     *
     * A template with no `quantitySourceId` represents a flat-fee line. By
     * the time this method runs, keyword matching has already decided whether
     * a conditional line belongs on the quote, while an unconditional line
     * was explicitly configured as "Include by default". Both therefore
     * resolve to a quantity of `1`, matching `unitPriceCents`'s cents-per-item
     * convention for a one-off charge.
     */
    private static resolveQuantityFor(
        config: GenerateQuoteTemplateConfig,
        rollupResults: readonly TakeoffRollupResult[],
    ): number {
        if (config.quantitySourceId !== null) {
            return (
                rollupResults.find(
                    (result) =>
                        result.quantitySourceId === config.quantitySourceId,
                )?.quantity ?? 0
            );
        }
        return 1;
    }

    private static assignSlot(
        variables: Record<string, unknown>,
        slot: number,
        item: ResolvedQuoteItem,
    ): void {
        variables[`includeItem${String(slot)}`] = true;
        variables[`item${String(slot)}Name`] = item.name;
        variables[`item${String(slot)}DisplayOrder`] = item.displayOrder;
        variables[`item${String(slot)}Quantity`] = item.quantity;
        variables[`item${String(slot)}SourceTemplateId`] =
            item.sourceTemplateId;
        variables[`item${String(slot)}QuantitySourceId`] =
            item.quantitySourceId;
        variables[`item${String(slot)}UnitPriceCents`] = item.unitPriceCents;
        variables[`item${String(slot)}MaterialUnitPriceCents`] =
            item.materialUnitPriceCents;
        variables[`item${String(slot)}LabourUnitPriceCents`] =
            item.labourUnitPriceCents;
        variables[`item${String(slot)}MatchedKeywords`] = item.matchedKeywords;
    }
}
