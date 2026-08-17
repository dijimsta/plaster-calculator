import {
    EDITOR_INITIAL_TOOLS,
    type EditorInitialTool,
} from "@libraries/plaster-calculator-ui";

const FLOORPLAN_DEEP_LINK_PAGE_PARAM = "page";
const FLOORPLAN_DEEP_LINK_TOOL_PARAM = "tool";

/**
 * Builds and parses the `page`/`tool` query params on the floorplan route
 * (WORK-139) — the deep link a `SCALE_APPLIED`/`ROOMS_MEASURED` quote
 * readiness fix control (`floorplan-deep-link-fix-control.component.tsx` in
 * `plaster-calculator-ui`) sends the user to. Grouped in this module so the
 * quote tab (building an `href`) and the floorplan route (parsing
 * `searchParams`) share one name instead of each re-deriving the param
 * contract. `tool` reuses `EditorInitialTool` from the editor package
 * itself, rather than a locally duplicated literal union, so a value these
 * functions consider valid is guaranteed to be one the editor actually
 * understands.
 */

/**
 * `null` when `pageNumber` is missing — a `ReadinessAffectedItem` for
 * these checks should always carry one, but a resolver bug shouldn't
 * turn into a link to a bare, unscoped floorplan tab.
 */
export function buildHref(
    projectId: string,
    pageNumber: number | undefined,
    tool: EditorInitialTool,
): string | null {
    if (pageNumber == null) return null;
    const params = new URLSearchParams({
        [FLOORPLAN_DEEP_LINK_PAGE_PARAM]: String(pageNumber),
        [FLOORPLAN_DEEP_LINK_TOOL_PARAM]: tool,
    });
    return `/projects/${projectId}?${params.toString()}`;
}

/** `null` for a missing or unrecognised `tool` param — the floorplan
 * route falls back to its normal default tool selection in that case. */
export function parseTool(
    searchParams: URLSearchParams,
): EditorInitialTool | null {
    const value = searchParams.get(FLOORPLAN_DEEP_LINK_TOOL_PARAM);
    return value != null &&
        (EDITOR_INITIAL_TOOLS as readonly string[]).includes(value)
        ? (value as EditorInitialTool)
        : null;
}

/** `null` for a missing, non-numeric, or non-positive `page` param —
 * the floorplan route falls back to its normal default page selection
 * (the project's first page) in that case. */
export function parsePageNumber(searchParams: URLSearchParams): number | null {
    const value = searchParams.get(FLOORPLAN_DEEP_LINK_PAGE_PARAM);
    if (value == null) return null;
    const parsed = Number(value);
    return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}
