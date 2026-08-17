import type { GetQuoteReadinessData } from "@generated/data-connector-web";
import {
    OverlaySchema,
    PDF_UPLOAD_TYPE,
    QuoteItemInclusionUtils,
    READINESS_CHECKS,
    type FloorplanPage,
    type ProjectDetail,
    type ReadinessCheckInput,
    type ReadinessCompany,
    type ReadinessResult,
    type SalesStatus,
} from "@libraries/plaster-calculator-common";

type QueryProject = NonNullable<GetQuoteReadinessData["project"]>;
type QueryCompany = NonNullable<QueryProject["company"]>;
type QueryFloorplanPage = GetQuoteReadinessData["floorplanPages"][number];
type QueryTemplateConfig =
    GetQuoteReadinessData["quoteItemTemplateConfigs"][number];

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
     *
     * `defaultTemplateConfigs` (WORK-193) is the team's default template's
     * own `quoteItemTemplateConfigs` — `data.quoteItemTemplateConfigs` when
     * there is no variation in play, or a second `GetQuoteReadiness`
     * response's when the project's company is priced from a variation
     * (`useQuoteReadiness()`'s two-pass resolution). It's what
     * `buildReadinessCheckInput()` resolves each item's `enabled` against,
     * per `TEMPLATE_PRICED`/`TEMPLATE_UNIT_SET`'s contract that `enabled`
     * is always the default template's value, never a variation's own.
     */
    public static evaluate(
        data: GetQuoteReadinessData,
        defaultTemplateConfigs: readonly QueryTemplateConfig[],
    ): readonly ReadinessResult[] {
        const input = QuoteReadinessUtils.buildReadinessCheckInput(
            data,
            defaultTemplateConfigs,
        );
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

    /**
     * `data.quoteItemTemplateConfigs` are the template actually pricing
     * this project's own rows — each carries its own `enabled` column, but
     * per `QuoteItemInclusionUtils.resolveInclusion()`'s design, only the
     * default template decides whether an item goes on a quote. Every row
     * is resolved against `defaultTemplateConfigsByItemTemplateId` before
     * being mapped onto `ReadinessQuoteItemTemplateConfig`: an item missing
     * from the default entirely (e.g. disabled there) resolves to
     * `enabled: false`, the same as an explicit default `enabled: false`
     * row, regardless of what the pricing template's own row says.
     */
    private static buildReadinessCheckInput(
        data: GetQuoteReadinessData,
        defaultTemplateConfigs: readonly QueryTemplateConfig[],
    ): ReadinessCheckInput | null {
        if (!data.project) return null;
        const defaultConfigsByItemTemplateId = new Map(
            defaultTemplateConfigs.map((config) => [
                config.itemTemplateId,
                config,
            ]),
        );
        return {
            project: QuoteReadinessUtils.buildProjectDetail(
                data.project,
                data.floorplanPages,
            ),
            quoteItemTemplateConfigs: data.quoteItemTemplateConfigs.map(
                (config) => {
                    const resolved = QuoteItemInclusionUtils.resolveInclusion(
                        config,
                        {
                            enabled:
                                defaultConfigsByItemTemplateId.get(
                                    config.itemTemplateId,
                                )?.enabled ?? false,
                        },
                    );
                    return {
                        quoteItemTemplateId: resolved.itemTemplateId,
                        label: resolved.itemTemplate.name,
                        enabled: resolved.enabled,
                        unitPriceCents: resolved.unitPriceCents,
                        unit: resolved.itemTemplate.unit ?? null,
                        quantitySourceId:
                            resolved.itemTemplate.quantitySourceId ?? null,
                    };
                },
            ),
            questionnaireAnswers: data.projectQuestionnaireQuestions.map(
                (question) => ({
                    questionId: question.id,
                    label: question.label,
                    answer: question.answer ?? null,
                    answerSource: question.answerSource,
                }),
            ),
            company: QuoteReadinessUtils.buildCompany(data.project.company),
        };
    }

    /**
     * Maps `GetQuoteReadiness`'s `project.company` (widened by WORK-220)
     * onto `ReadinessCompany`, for `COMPANY_CONTACT_DETAILS` (WORK-221).
     * `undefined` when the project has no company, matching
     * `ReadinessCheckInput.company`'s optionality — the check itself treats
     * a missing company as "nothing to chase" and reports met.
     */
    private static buildCompany(
        company: QueryCompany | null | undefined,
    ): ReadinessCompany | undefined {
        if (!company) return undefined;
        return {
            id: company.id,
            companyName: company.companyName,
            phoneNumber: company.phoneNumber ?? null,
            businessNumber: company.businessNumber ?? null,
            primaryContactName: company.primaryContact?.name ?? null,
            primaryContactEmail: company.primaryContact?.email ?? null,
            primaryContactPhone: company.primaryContact?.phoneNumber ?? null,
        };
    }

    /**
     * `ReadinessCheckInput.project` is a full `ProjectDetail`, but
     * `GetQuoteReadiness` only fetches the subset of `ProjectSummary`
     * documented on the query itself (id, teamId, name, salesStatus,
     * pageCount), by design. Of the nine readiness resolvers, none read
     * anything off `project` besides `pages` (via `ReadinessCheckUtils`) —
     * `COMPANY_CONTACT_DETAILS` (WORK-221/222) is the one exception, but it
     * reads `company` off the top-level `ReadinessCheckInput`
     * (`buildCompany()`, below), not off `project` itself. So the remaining
     * `ProjectSummary` fields here are still filled with inert placeholders
     * rather than fetched. If a future check starts reading one of them
     * (e.g. `status`), extend the query and this mapping together — not
     * just the resolver.
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
            scope: null,
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
