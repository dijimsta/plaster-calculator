import type { ProjectPlanTextSource } from "./keyword-match.types.ts";

/**
 * Builds the single searchable text corpus that `QuoteItemKeywordMatcherUtils
 * .match()` searches, out of a project's `extractedTextJson` (PDF text,
 * JSON-encoded per page) and its pages' `ocrTextContent` (plain text per
 * page). Kept separate from `QuoteItemKeywordMatcherUtils` because it is a
 * distinct concern — parsing/collecting project text — that a caller could
 * also want independently of keyword matching (e.g. to feed an AI flow, the
 * way `questionnaire-ai.ts`'s `resolveExtractedText()`/`buildOcrText()`
 * already do outside this package).
 */
export class ProjectPlanTextCorpusUtils {
    /**
     * Joins every non-empty extracted-PDF-text page and every non-empty
     * per-page OCR text into one corpus, in that order, one page's text per
     * line. Malformed/absent `extractedTextJson` contributes nothing rather
     * than throwing, matching `ReadinessCheckUtils.parseOverlayAreas()`'s
     * defensive handling of `FloorplanPage.overlay` elsewhere in this
     * package.
     */
    public static buildSearchableCorpus(
        project: ProjectPlanTextSource,
    ): string {
        const extractedTextPages =
            ProjectPlanTextCorpusUtils.parseExtractedText(
                project.extractedTextJson,
            );
        const ocrTextPages = project.pages
            .map((page) => page.ocrTextContent)
            .filter((text): text is string => Boolean(text));

        return [...extractedTextPages, ...ocrTextPages].join("\n");
    }

    /**
     * Parses `Project.extractedTextJson` — a JSON-encoded array of
     * `{ text: string }` objects, one per PDF page (see
     * `functions/plaster-calculator-functions/src/questionnaire-ai.ts`'s
     * `flattenExtractedText()` for the existing reader of this same shape)
     * — into its non-empty page texts. Returns an empty array for `null` or
     * malformed JSON rather than throwing.
     */
    private static parseExtractedText(
        extractedTextJson: string | null,
    ): readonly string[] {
        if (!extractedTextJson) return [];
        try {
            const parsed: unknown = JSON.parse(extractedTextJson);
            if (!Array.isArray(parsed)) return [];
            return parsed
                .map(
                    (page: unknown) =>
                        (page as { text?: unknown } | null)?.text,
                )
                .filter(
                    (text): text is string =>
                        typeof text === "string" && text.length > 0,
                );
        } catch {
            return [];
        }
    }
}
