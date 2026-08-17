import { DEFAULT_QUOTE_APPEARANCE } from "@libraries/plaster-calculator-common";
import type { QuoteAppearance } from "@libraries/plaster-calculator-common";
import { QueryClient } from "@tanstack/react-query";

/**
 * The exact react-query key `useQuoteAppearance()`
 * (`@libraries/plaster-calculator-web-core`, `quotes/use-quote-appearance.hook.ts`)
 * uses for its `QuoteAppearance` query. That hook has no override params for
 * seeding sample data -- unlike the generated Data Connect hooks, which
 * accept `initialData`/`enabled` directly (see `withDataConnectQueryClient`,
 * `./data-connect.stub.tsx`) -- so `QuoteAppearancePanel`'s stories seed this
 * key straight into a dedicated `QueryClient` instead. Kept in sync with the
 * hook by hand; if that private key ever changes, a `QuoteAppearancePanel`
 * story falls back to its own loading state rather than breaking.
 */
const QUOTE_APPEARANCE_QUERY_KEY = ["quote-appearance"] as const;

/**
 * A `QueryClient` pre-seeded with `appearance` so `QuoteAppearancePanel`
 * renders that data immediately with no network call. `staleTime: Infinity`
 * stops react-query from treating the seeded data as stale and firing a
 * background refetch on mount -- there's no real backend in Storybook for
 * that refetch to reach. Saving, uploading, or removing a logo in a story
 * built on this `QueryClient` still calls the real
 * `quoteAppearanceService` (there's no injectable seam for that -- see this
 * component's own doc comment), so those actions are not exercised by these
 * stories.
 */
export function createQuoteAppearanceStoryQueryClient(
    appearance: QuoteAppearance,
): QueryClient {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false, staleTime: Infinity },
            mutations: { retry: false },
        },
    });
    queryClient.setQueryData(QUOTE_APPEARANCE_QUERY_KEY, appearance);
    return queryClient;
}

/**
 * A fully filled-in `QuoteAppearance` -- every letterhead field set, a
 * non-default accent colour, all three optional blocks on, and terms text --
 * for `QuoteAppearancePanel`'s "fully configured" story.
 * `logoStoragePath` is set rather than a fresh-upload `logoUrl` (which only
 * `QuoteAppearanceLogoField`'s own `useState` can hold, this session, after a
 * real upload -- see its doc comment): a team's logo is normally saved from
 * an *earlier* session, so this is the representative "has a logo" state,
 * shown as the saved-logo placeholder rather than a loaded image.
 */
export const QUOTE_APPEARANCE_PANEL_SAMPLE_APPEARANCE: QuoteAppearance = {
    ...DEFAULT_QUOTE_APPEARANCE,
    logoStoragePath: "teams/sample-team/quote-appearance/logo.svg",
    businessName: "Coastal Plastering Co.",
    abn: "12 345 678 901",
    licenceNumber: "PL-778812",
    address: "14 Shorefront Road, Coolangatta QLD 4225",
    phoneNumber: "(07) 5555 0199",
    email: "quotes@coastalplastering.example",
    accentColor: "#2563eb",
    showScopeOfWork: true,
    showTakeoffSummary: true,
    showSignatureBlock: true,
    validForDays: 30,
    terms: "Payment due within 14 days of acceptance. Prices exclude variations not described above.",
};
