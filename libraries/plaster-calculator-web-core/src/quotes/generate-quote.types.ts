import type { CreateQuoteWithItemsVariables } from "@generated/data-connector-web";
import type {
    PageTakeoffInput,
    QuantitySourceDefinition,
} from "@libraries/plaster-calculator-common";
import type { FirebaseError } from "firebase/app";

/**
 * One enabled `QuoteItemTemplateConfig`, joined to its `QuoteItemTemplate`,
 * as needed by `generate-quote.utils.ts`. This is a minimal local shape
 * rather than the generated `GetQuoteReadinessData` type, matching the
 * pattern `ReadinessQuoteItemTemplateConfig` (`@libraries/plaster-calculator-common`)
 * already uses for the same underlying query — callers map their Data
 * Connect query results onto it via `buildTemplateConfigs()`.
 *
 * `materialUnitPriceCents`/`labourUnitPriceCents` are always `0` when built
 * from `GetQuoteReadiness` today: that query (`data/connector-web/quotes.
 * queries.gql`) only selects `unitPriceCents` on `quoteItemTemplateConfigs`,
 * not the other two `QuoteItemTemplateConfig` price columns. `unitPriceCents`
 * is the field the quote-totals helpers (`quote-totals.utils.ts`) actually
 * price a quote line from, so this doesn't affect a generated quote's
 * totals. Since WORK-382, a generated quote's real material cost is read
 * live from its stamped supplier's `SupplierItemEstimate`s instead
 * (`estimateQuoteMargin()`, `margin-estimate.utils.ts`), matched by
 * `QuoteItem.sourceTemplateId` — not from this snapshot column — so these
 * two fields stay `0` deliberately rather than something a future ticket
 * should "fix" by populating them from `GetQuoteReadiness`.
 */
export type GenerateQuoteTemplateConfig = {
    readonly itemTemplateId: string;
    readonly name: string;
    readonly unit: string | null;
    readonly hasKeywords: boolean;
    readonly keywords: readonly string[];
    readonly quantitySourceId: string | null;
    readonly quantitySource: QuantitySourceDefinition | null;
    readonly sortOrder: number;
    readonly unitPriceCents: number;
    readonly materialUnitPriceCents: number;
    readonly labourUnitPriceCents: number;
};

/**
 * One `QuoteItemTemplateConfig` that survived keyword matching and quantity
 * resolution with a non-zero quantity — i.e. one line
 * `buildMutationVariables()` (`generate-quote.utils.ts`) will place into a
 * `CreateQuoteWithItems` slot.
 */
export type ResolvedQuoteItem = {
    readonly sourceTemplateId: string;
    readonly name: string;
    readonly displayOrder: number;
    readonly quantity: number;
    readonly unit: string | null;
    readonly quantitySourceId: string | null;
    readonly unitPriceCents: number;
    readonly materialUnitPriceCents: number;
    readonly labourUnitPriceCents: number;
    readonly matchedKeywords: readonly string[];
};

/**
 * Everything `build()` (`generate-quote.utils.ts`) needs to decide whether — and
 * what — to generate. `isReady` is the quote readiness gate's `isReady`
 * (`useQuoteReadiness()`); `build()` refuses to produce mutation variables
 * at all when it is `false`, rather than relying on the caller to remember
 * to check it first.
 */
export type GenerateQuoteInput = {
    readonly isReady: boolean;
    readonly projectId: string;
    readonly quoteId: string;
    /**
     * The `QuoteTemplate` (WORK-190/WORK-193) that priced `templateConfigs` —
     * the project's company's assignment, or the team's default template
     * when the company has none. `useGenerateQuote()` resolves this the
     * same way `useQuoteReadiness()` does, in fact from that same hook
     * call, so readiness and generation always agree on which rates a
     * quote was built from. Not written anywhere by `build()` today —
     * `CreateQuoteWithItems` has no column for it — but carried on this
     * input so a caller can't hand `templateConfigs` to `build()` without
     * having actually resolved a template for them.
     */
    readonly quoteTemplateId: string;
    /**
     * The team's default supplier (`useSuppliers()`, `../suppliers/`,
     * WORK-380) at generation time, or `null` when the team has no
     * suppliers yet. `buildMutationVariables()` (`generate-quote.utils.ts`)
     * writes this straight to `CreateQuoteWithItems`'s `$supplierId`
     * (WORK-379/WORK-382), so a generated quote is stamped with the same
     * supplier the margin card will estimate its cost against, instead of
     * leaving `Quote.supplierId` unset until a user opens the picker.
     */
    readonly defaultSupplierId: string | null;
    readonly pages: readonly PageTakeoffInput[];
    readonly templateConfigs: readonly GenerateQuoteTemplateConfig[];
    readonly searchText: string;
};

/**
 * Why `build()`/`buildMutationVariables()` (`generate-quote.utils.ts`) refused to
 * produce mutation variables:
 * - `NOT_READY`: the quote readiness gate (`useQuoteReadiness()`) is not
 *   met, so `generate()` must not call `CreateQuoteWithItems` at all.
 * - `NO_ITEMS`: matching and take-off produced no billable lines, so an
 *   empty `$0.00` quote must not be persisted.
 * - `TOO_MANY_ITEMS`: matching + quantity resolution produced more lines
 *   than `CreateQuoteWithItems`'s 20 fixed slots can hold. See
 *   `buildMutationVariables()`'s doc comment for why this fails loudly
 *   rather than silently truncating a customer-facing quote.
 */
export type GenerateQuoteFailureReason =
    "NOT_READY" | "NO_ITEMS" | "TOO_MANY_ITEMS";

/** The outcome of `build()`/`buildMutationVariables()` (`generate-quote.utils.ts`). */
export type GenerateQuoteResult =
    | {
          readonly ok: true;
          readonly variables: CreateQuoteWithItemsVariables;
          readonly itemCount: number;
      }
    | {
          readonly ok: false;
          readonly reason: GenerateQuoteFailureReason;
          readonly message: string;
      };

/**
 * Thrown by `useGenerateQuote()`'s mutation when `build()`
 * (`generate-quote.utils.ts`) refuses to run, so the failure surfaces
 * through the same `error` field a
 * `CreateQuoteWithItems` network/`@check` failure would, rather than a
 * separate rejection path a caller would have to check for specially.
 */
export class GenerateQuoteError extends Error {
    public readonly reason: GenerateQuoteFailureReason;

    public constructor(reason: GenerateQuoteFailureReason, message: string) {
        super(message);
        this.name = "GenerateQuoteError";
        this.reason = reason;
    }
}

/**
 * Return shape of `useGenerateQuote()`. `generate()` resolves with the new
 * `Quote.id` on success (so a caller can navigate to it), and rejects — via
 * `error` — without calling `CreateQuoteWithItems` at all when the
 * readiness gate isn't met or matching produced more than 20 lines.
 * `isGenerating` mirrors `useSaveQuoteTemplate()`'s `isSaving` naming;
 * `error` mirrors `useQuoteReadiness()`'s explicit `error` field convention,
 * widened to also cover `GenerateQuoteError` (a refusal that never reached
 * the network) alongside `FirebaseError` (a `CreateQuoteWithItems` failure).
 */
export type UseGenerateQuoteResult = {
    readonly generate: () => Promise<string>;
    readonly isGenerating: boolean;
    readonly error: GenerateQuoteError | FirebaseError | null;
};
