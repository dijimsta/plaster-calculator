import type { GetQuoteReadinessData } from "@generated/data-connector-web";
import type {
    AreaPolygon,
    ReadinessAffectedItem,
    Overlay,
    Point,
    WallBoardType,
} from "@libraries/plaster-calculator-common";
import { normalizeWallBoardType } from "@libraries/plaster-calculator-common";
import {
    parseOverlay,
    parseReferencePoints,
} from "@libraries/plaster-calculator-ui";
import type { FloorplanPage } from "@libraries/plaster-calculator-web-core";

/** Shown as a ceiling height fix's starting value when neither the area nor
 * its page has one set yet — an unset page still needs a sane starting
 * point to seed the input with. */
const DEFAULT_PAGE_CEILING_HEIGHT_MM = 2400;

/**
 * Pure helpers for the WORK-140 inline fix controls' overlay read-modify-
 * write. `FloorplanPage.overlayJson` is a single JSON blob shared with the
 * floorplan editor (`plaster-calculator-ui`'s `project-editor`), so every
 * write here goes through the exact same `parseOverlay`/`AreaPolygon` shape
 * that editor already uses, kept as static methods (not floating functions)
 * so the read side (`findAreaInReadinessData`, seeding a control's current
 * value from the already-fetched `GetQuoteReadiness` response) and the write
 * side (`patchArea`, called immediately after a fresh
 * `ProjectsService.getPage`) share one name instead of each re-deriving how
 * an area is located inside the overlay.
 */
export class QuoteReadinessFixUtils {
    /**
     * Returns a new `Overlay` with only the one area (`areaId`) patched —
     * every other area, and every other overlay field, passes through
     * untouched. Combined with re-fetching the page immediately before
     * calling this (see `page.hooks.tsx`'s `useUpdateAreaOverlayFieldCallback`),
     * this is what keeps a fix to one room from clobbering a concurrent fix
     * to a different room: each write starts from the *latest* overlay and
     * only ever changes the fields this one control owns.
     */
    public static patchArea(
        overlay: Overlay,
        areaId: string,
        patch: Partial<AreaPolygon>,
    ): Overlay {
        return {
            ...overlay,
            areas: overlay.areas.map((area) =>
                area.id === areaId ? { ...area, ...patch } : area,
            ),
        };
    }

    /**
     * Locates one area within the already-fetched `GetQuoteReadiness`
     * response, so a fix control can seed its current value (e.g. the
     * area's existing wall board type) without a separate query. This is
     * read-only display seeding — the write path (`patchArea`) always
     * re-fetches the page fresh rather than reusing this lookup, since this
     * data can be stale by the time a user acts on it.
     */
    public static findAreaInReadinessData(
        readinessData: GetQuoteReadinessData | undefined,
        pageId: string | undefined,
        areaId: string | undefined,
    ): AreaPolygon | null {
        if (!pageId || !areaId) return null;
        const page = readinessData?.floorplanPages.find(
            (candidate) => candidate.id === pageId,
        );
        if (!page) return null;
        const overlay = parseOverlay(page.overlayJson ?? null);
        return overlay.areas.find((area) => area.id === areaId) ?? null;
    }

    /**
     * The `referencePoints` argument to pass back through
     * `ProjectsService.savePageOverlay` when re-saving a page's overlay
     * unchanged — mirrors `useEditorPersistence`'s own `save()` convention
     * of only ever sending a complete pair, collapsing anything else
     * (including a freshly-parsed empty array) back to `null` rather than
     * writing a partial/empty list over whatever calibration state exists.
     */
    public static currentReferencePoints(
        page: Pick<FloorplanPage, "referencePoints">,
    ): Point[] | null {
        const points = parseReferencePoints(page.referencePoints);
        return points.length === 2 ? points : null;
    }

    /** `WallBoardTypeFixControl`'s starting value for `item`'s area — its
     * explicit wall board type if set, otherwise the same legacy/defaulted
     * fallback `normalizeWallBoardType()`/the `WALL_TYPE_SET` resolver
     * already use, so the control never opens on a value the readiness
     * check itself wouldn't recognise as set. */
    public static currentWallBoardType(
        readinessData: GetQuoteReadinessData | undefined,
        item: ReadinessAffectedItem,
    ): WallBoardType {
        const area = QuoteReadinessFixUtils.findAreaInReadinessData(
            readinessData,
            item.pageId,
            item.areaId,
        );
        return normalizeWallBoardType(
            area?.wallBoardType,
            area?.wallPlasterType,
        );
    }

    /** `CeilingHeightFixControl`'s starting value for `item`'s area — its
     * own override if set, otherwise `null` (the control falls back to
     * showing `pageDefaultCeilingHeightMm` in that case). */
    public static currentCeilingHeightMm(
        readinessData: GetQuoteReadinessData | undefined,
        item: ReadinessAffectedItem,
    ): number | null {
        const area = QuoteReadinessFixUtils.findAreaInReadinessData(
            readinessData,
            item.pageId,
            item.areaId,
        );
        return area?.ceilingHeightMm ?? null;
    }

    /** `CeilingHeightFixControl`'s `pageDefaultHeightMm` for `item`'s page —
     * the page's own ceiling height if set, otherwise a sane placeholder for
     * a page that hasn't had one set either. */
    public static pageDefaultCeilingHeightMm(
        readinessData: GetQuoteReadinessData | undefined,
        item: ReadinessAffectedItem,
    ): number {
        const page = readinessData?.floorplanPages.find(
            (candidate) => candidate.id === item.pageId,
        );
        return page?.ceilingHeightMm ?? DEFAULT_PAGE_CEILING_HEIGHT_MM;
    }

    /** `UnitPriceFixControl`'s starting value for `item`'s quote item
     * template — its current price, or zero for a template with no config
     * row yet (the resolver that produced this `ReadinessAffectedItem`
     * wouldn't have flagged it otherwise, but a control still needs a
     * number to render). */
    public static currentUnitPriceCents(
        readinessData: GetQuoteReadinessData | undefined,
        item: ReadinessAffectedItem,
    ): number {
        const config = readinessData?.quoteItemTemplateConfigs.find(
            (candidate) =>
                candidate.itemTemplateId === item.quoteItemTemplateId,
        );
        return config?.unitPriceCents ?? 0;
    }

    /** `ConfirmFixControl`'s displayed value for the `INFERRED_ANSWERS_CONFIRMED`
     * check — the question's current answer text, falling back to its label
     * if the answer is somehow missing by the time this renders. */
    public static currentQuestionnaireAnswer(
        readinessData: GetQuoteReadinessData | undefined,
        item: ReadinessAffectedItem,
    ): string {
        const question = readinessData?.projectQuestionnaireQuestions.find(
            (candidate) => candidate.id === item.questionId,
        );
        return question?.answer ?? item.questionLabel ?? "";
    }
}
