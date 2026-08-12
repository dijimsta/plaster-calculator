import type { CreateQuoteWithItemsVariables } from "@generated/data-connector-web";
import type { PageTakeoffInput } from "@libraries/plaster-calculator-common";
import type { FirebaseError } from "firebase/app";

/**
 * One enabled `QuoteItemTemplateConfig`, joined to its `QuoteItemTemplate`,
 * as needed by `GenerateQuoteUtils`. This is a minimal local shape rather
 * than the generated `GetQuoteReadinessData` type, matching the pattern
 * `ReadinessQuoteItemTemplateConfig` (`@libraries/plaster-calculator-common`)
 * already uses for the same underlying query — callers map their Data
 * Connect query results onto it via `GenerateQuoteUtils.buildTemplateConfigs()`.
 *
 * `materialUnitPriceCents`/`labourUnitPriceCents` are always `0` when built
 * from `GetQuoteReadiness` today: that query (`data/connector-web/quotes.
 * queries.gql`) only selects `unitPriceCents` on `quoteItemTemplateConfigs`,
 * not the other two `QuoteItemTemplateConfig` price columns. `unitPriceCents`
 * is the field `QuoteTotalsUtils` actually prices a quote line from, so this
 * doesn't affect a generated quote's totals — but the material/labour
 * breakdown will read as `0` until a future ticket extends that query (out
 * of scope here: this package cannot add Data Connect queries).
 */
export type GenerateQuoteTemplateConfig = {
    readonly itemTemplateId: string;
    readonly name: string;
    readonly hasKeywords: boolean;
    readonly keywords: readonly string[];
    readonly quantitySourceId: string | null;
    readonly sortOrder: number;
    readonly unitPriceCents: number;
    readonly materialUnitPriceCents: number;
    readonly labourUnitPriceCents: number;
};

/**
 * One `QuoteItemTemplateConfig` that survived keyword matching and quantity
 * resolution with a non-zero quantity — i.e. one line `GenerateQuoteUtils.
 * buildMutationVariables()` will place into a `CreateQuoteWithItems` slot.
 */
export type ResolvedQuoteItem = {
    readonly sourceTemplateId: string;
    readonly name: string;
    readonly displayOrder: number;
    readonly quantity: number;
    readonly quantitySourceId: string | null;
    readonly unitPriceCents: number;
    readonly materialUnitPriceCents: number;
    readonly labourUnitPriceCents: number;
    readonly matchedKeywords: readonly string[];
};

/**
 * Everything `GenerateQuoteUtils.build()` needs to decide whether — and
 * what — to generate. `isReady` is the quote readiness gate's `isReady`
 * (`useQuoteReadiness()`); `build()` refuses to produce mutation variables
 * at all when it is `false`, rather than relying on the caller to remember
 * to check it first.
 */
export type GenerateQuoteInput = {
    readonly isReady: boolean;
    readonly projectId: string;
    readonly quoteId: string;
    readonly pages: readonly PageTakeoffInput[];
    readonly templateConfigs: readonly GenerateQuoteTemplateConfig[];
    readonly searchText: string;
};

/**
 * Why `GenerateQuoteUtils.build()`/`buildMutationVariables()` refused to
 * produce mutation variables:
 * - `NOT_READY`: the quote readiness gate (`useQuoteReadiness()`) is not
 *   met, so `generate()` must not call `CreateQuoteWithItems` at all.
 * - `TOO_MANY_ITEMS`: matching + quantity resolution produced more lines
 *   than `CreateQuoteWithItems`'s 20 fixed slots can hold. See
 *   `buildMutationVariables()`'s doc comment for why this fails loudly
 *   rather than silently truncating a customer-facing quote.
 */
export type GenerateQuoteFailureReason = "NOT_READY" | "TOO_MANY_ITEMS";

/** The outcome of `GenerateQuoteUtils.build()`/`buildMutationVariables()`. */
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
 * Thrown by `useGenerateQuote()`'s mutation when `GenerateQuoteUtils.build()`
 * refuses to run, so the failure surfaces through the same `error` field a
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
