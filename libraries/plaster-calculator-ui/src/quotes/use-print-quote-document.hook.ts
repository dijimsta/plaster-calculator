import { useCallback } from "react";

export type UsePrintQuoteDocumentResult = {
    /** Triggers a browser print scoped to the quote document. */
    readonly printQuoteDocument: () => void;
};

/**
 * Triggers the browser print dialog for a quote document. The actual
 * scoping — showing only the `QuoteDetailDocument` card and hiding the rest
 * of the page — comes from `quote-detail-document.print.css`'s `@media
 * print` rules, which key off `QUOTE_DETAIL_DOCUMENT_PRINT_ROOT_ID`; this
 * hook only owns the trigger, so both the quotes table row's download
 * button and the quote detail page's "Download PDF" button can share one
 * code path once wired up in `plaster-calculator-web` (a later group).
 * `window.print()` prints whatever `QuoteDetailDocument` is currently
 * mounted on the page, so the caller is responsible for having navigated to
 * (or rendered) the right quote before calling `printQuoteDocument`.
 */
export function usePrintQuoteDocument(): UsePrintQuoteDocumentResult {
    const printQuoteDocument = useCallback(() => {
        window.print();
    }, []);

    return { printQuoteDocument };
}
