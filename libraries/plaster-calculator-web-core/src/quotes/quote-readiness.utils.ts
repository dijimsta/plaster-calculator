import type { GetQuoteReadinessData } from "@generated/data-connector-web";
import {
    OverlaySchema,
    PDF_UPLOAD_TYPE,
    READINESS_CHECKS,
    type FloorplanPage,
    type ProjectDetail,
    type ReadinessCheckInput,
    type ReadinessResult,
    type SalesStatus,
} from "@libraries/plaster-calculator-common";

type QueryProject = NonNullable<GetQuoteReadinessData["project"]>;
type QueryFloorplanPage = GetQuoteReadinessData["floorplanPages"][number];

/**
 * Adapts `GetQuoteReadiness`'s Data Connect response onto the readiness
 * registry's `ReadinessCheckInput`, and runs `READINESS_CHECKS` against it.
 * This is the only place the query and the registry meet, so all of the
 * "narrow query result -> full domain shape" plumbing lives here rather
 * than in the hook.
 */
export class QuoteReadinessUtils {
    /**
     * Runs `READINESS_CHECKS` against `data`, in registry order. Returns an
     * empty array (rather than throwing) if `data.project` is missing —
     * which the `GetQuoteReadiness` `@check` guard should already prevent
     * by failing the request, but the query's generated type still marks
     * `project` optional.
     */
    public static evaluate(
        data: GetQuoteReadinessData,
    ): readonly ReadinessResult[] {
        const input = QuoteReadinessUtils.buildReadinessCheckInput(data);
        return input
            ? READINESS_CHECKS.map((check) => check.resolve(input))
            : [];
    }

    /**
     * A project is ready to quote once every `severity: "BLOCK"` check in
     * `results` is met. `WARN` checks (none exist yet) never block this. A
     * check missing from `results` entirely (e.g. because evaluation never
     * ran) counts as unmet, so an empty `results` array is never "ready".
     */
    public static isReady(results: readonly ReadinessResult[]): boolean {
        return READINESS_CHECKS.every((check) => {
            if (check.severity !== "BLOCK") return true;
            const result = results.find((entry) => entry.checkId === check.id);
            return result?.isMet ?? false;
        });
    }

    private static buildReadinessCheckInput(
        data: GetQuoteReadinessData,
    ): ReadinessCheckInput | null {
        if (!data.project) return null;
        return {
            project: QuoteReadinessUtils.buildProjectDetail(
                data.project,
                data.floorplanPages,
            ),
            quoteItemTemplateConfigs: data.quoteItemTemplateConfigs.map(
                (config) => ({
                    quoteItemTemplateId: config.itemTemplateId,
                    enabled: config.enabled,
                    unitPriceCents: config.unitPriceCents,
                    quantitySourceId:
                        config.itemTemplate.quantitySourceId ?? null,
                }),
            ),
            questionnaireAnswers: data.projectQuestionnaireQuestions.map(
                (question) => ({
                    questionId: question.id,
                    answer: question.answer ?? null,
                    answerSource: question.answerSource,
                }),
            ),
        };
    }

    /**
     * `ReadinessCheckInput.project` is a full `ProjectDetail`, but
     * `GetQuoteReadiness` only fetches the subset of `ProjectSummary`
     * documented on the query itself (id, teamId, name, salesStatus,
     * pageCount), by design. None of the seven readiness resolvers read
     * anything off `project` besides `pages` (via `ReadinessCheckUtils`), so
     * the remaining `ProjectSummary` fields are filled with inert
     * placeholders here rather than fetched. If a future check starts
     * reading one of them (e.g. `status`), extend the query and this
     * mapping together — not just the resolver.
     */
    private static buildProjectDetail(
        project: QueryProject,
        floorplanPages: readonly QueryFloorplanPage[],
    ): ProjectDetail {
        return {
            id: project.id,
            teamId: project.teamId,
            name: project.name,
            companyId: null,
            address: null,
            originalFileName: "",
            uploadType: PDF_UPLOAD_TYPE,
            status: "",
            salesStatus: project.salesStatus as SalesStatus,
            createdAt: "",
            updatedAt: "",
            pageCount: project.pageCount,
            pages: floorplanPages.map(QuoteReadinessUtils.buildFloorplanPage),
        };
    }

    /**
     * `FloorplanPage.overlay` is the only per-page field the resolvers read
     * besides `scaleMmPerPx`/`ceilingHeightMm` (via `ReadinessCheckUtils`),
     * so the rest of `FloorplanPageSchema`'s required fields are inert
     * placeholders here too — see `buildProjectDetail`.
     */
    private static buildFloorplanPage(page: QueryFloorplanPage): FloorplanPage {
        return {
            id: page.id,
            pageNumber: page.pageNumber,
            status: "",
            processingError: null,
            imageUrl: "",
            previewUrl: "",
            overlay: QuoteReadinessUtils.parseOverlayJson(page.overlayJson),
            scaleMmPerPx: page.scaleMmPerPx ?? null,
            ceilingHeightMm: page.ceilingHeightMm ?? null,
            referencePoints: null,
            referenceLengthMm: null,
            updatedAt: "",
        };
    }

    /**
     * Validates `overlayJson` through `OverlaySchema` and returns it
     * unchanged if valid, so downstream area-parsing
     * (`ReadinessCheckUtils.activeAreasForPage()`) gets exactly what it
     * already expects: a JSON string it can re-parse, or `null`. Null,
     * unparsable, and schema-invalid JSON all degrade to `null` rather than
     * throwing — `ReadinessCheckUtils.parseOverlayAreas()` already treats a
     * `null` overlay as zero areas, which is what makes `ROOMS_MEASURED`
     * (and the other area-level checks) correctly report "unmet" for a
     * malformed page instead of crashing the whole gate.
     */
    private static parseOverlayJson(
        overlayJson: string | null | undefined,
    ): string | null {
        if (!overlayJson) return null;
        try {
            const parsed: unknown = JSON.parse(overlayJson);
            return OverlaySchema.safeParse(parsed).success ? overlayJson : null;
        } catch {
            return null;
        }
    }
}
