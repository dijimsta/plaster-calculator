import type { DrawerSize } from "@libraries/uikit-web";

export function cx(
    ...classes: Array<string | false | null | undefined>
): string {
    return classes.filter(Boolean).join(" ");
}

/**
 * Presentation for this subtree that public `@libraries/uikit-web` APIs
 * cannot express yet (see `docs/web-ui-guidelines.md`'s Presentation
 * section). Every entry here is a deliberately-kept gap, not an oversight:
 *
 * - `editorShell` / `editorLeftPanel` / `editorCanvasContainer` /
 *   `editorRightPanel`: the two-pane editor shell needs a fixed-width
 *   (320px) sidebar column, plus regions that must receive `inert` directly
 *   (no UIKit layout primitive forwards `inert` or an arbitrary `ref`).
 *   `Grid` only supports discrete equal column counts; `SidebarLayout` is a
 *   full-page app shell with a mobile hamburger/backdrop, not a nested
 *   two-pane layout. This shell no longer collapses at a narrow breakpoint
 *   itself -- full-screen mode (`use-editor-full-screen.ts`) auto-enters
 *   below that same width instead, so the two-pane shell only ever renders
 *   at widths wide enough for its fixed sidebar column.
 * - `canvasWrap` / `canvasWrapFullScreen`: the scrollable canvas viewport
 *   needs a raw `ref` (read directly by the scroll-drag handlers in
 *   `editor-canvas.tsx`) and a responsive height. `Box` doesn't forward
 *   refs or support arbitrary/responsive sizing. `canvasWrapFullScreen`
 *   drops `canvasWrap`'s `min-h-[560px]` floor (meant for the two-pane
 *   layout's other stacked content) in favour of `min-h-0`, so the
 *   full-screen canvas can shrink to fit whatever viewport height is
 *   actually available instead of forcing scroll/clip on short viewports
 *   (e.g. a tablet in portrait).
 * - `popoverMenu`: an anchored, absolutely-positioned dropdown of buttons.
 *   UIKit's `overlays/` components are all full-screen/modal (`Backdrop`,
 *   `BusyOverlay`, `Drawer`, `ModalDialog`, `Notification`) -- there's no
 *   small inline popover/menu primitive.
 * - `popoverMenuPortal`: the same dropdown's presentation for the
 *   full-screen toolbar, where `toolbarScrollRow`'s `overflow-x-auto`
 *   forces `overflow-y` to `auto` too (per the CSS Overflow spec, setting
 *   one axis to a non-`visible` value computes the other as `auto` as
 *   well when it isn't set explicitly), clipping an absolutely-positioned
 *   popover to the row's own height. `toolbar-core-controls.tsx` portals
 *   this variant to `document.body` and positions it with inline
 *   `top`/`left` computed from the trigger's `getBoundingClientRect()`, so
 *   it drops `popoverMenu`'s `absolute left-0 top-[46px]` in favour of
 *   `fixed` (the inline style's `position`/`top`/`left` win over these
 *   classes) and raises `z-10` to `z-50` so it renders above the inspector
 *   `Drawer` (`z-40`) regardless of where in the shell it's triggered from.
 * - `editorLegend`: a `border-t`-separated footer row. `Box` has no border
 *   capability.
 * - `areaList` / `areaRow` / `areaRowActive`: a scrollable, multi-selectable
 *   (ctrl/cmd-click additive selection) list of buttons with an
 *   active/selected highlight. `StackedList` has no selection-state styling
 *   or max-height scrolling; `RadioGroup`'s list variants are single-choice
 *   only, the wrong semantics for additive multi-select.
 * - `metric`: a compact, soft-bordered single-line stat readout (e.g. "Wall
 *   length: 3.2 m"). UIKit's only bordered-box primitive is `Card`, which
 *   this codebase otherwise only nests once per panel as an outer container
 *   (see `readiness-summary-header.component.tsx`), not repeated inline for
 *   dense stat rows -- and its padding/shadow are heavier than this needs.
 * - `toolbarScrollRow`: a single non-wrapping, horizontally-scrollable
 *   button row for the full-screen toolbar. `Box` supports `wrap` (multi-
 *   line) but has no horizontal-scroll option -- its `scroll` prop is
 *   vertical-only (`overflow-y-auto`).
 * - `fullScreenShell` / `fullScreenToolbarArea` / `fullScreenCanvasArea`:
 *   full-screen mode fills its own normal content area -- the space beside
 *   the app's sidebar rail -- with ordinary in-flow sizing rather than a
 *   viewport-spanning overlay; there's no native Fullscreen API involved
 *   (see `use-editor-full-screen.ts`). `fullScreenShell` uses `flex-1
 *   min-h-0`, the same pattern `editorShell` (the two-pane sibling this
 *   component alternates with, at the same position in the tree) already
 *   relies on to get a definite height from the app's own flex-column
 *   scroll container, rather than `h-full`, which would need that
 *   ancestor's height to resolve as a CSS percentage instead of via
 *   flex-grow. `fullScreenShell` is also `position: relative` so it's the
 *   positioned ancestor the non-modal inspector `Drawer` (`absolute
 *   inset-0`, see `editorDrawerSize` below) sizes against, instead of
 *   falling back to the viewport. No UIKit layout primitive offers this
 *   in-flow, locally-positioned full-bleed shell.
 * - `fullScreenCanvasShifted`: right padding on the canvas area, applied
 *   only while the inspector `Drawer` is open in full-screen mode, so the
 *   plan reflows left instead of hiding behind the drawer. Its width
 *   (`28rem`) is hand-matched to `editorDrawerSize`'s rendered width (the
 *   `Drawer`'s `size="md"` -> `sm:max-w-md` breakpoint) -- see
 *   `editorDrawerSize` below; the two must stay in sync.
 * - `floatingChipRow` / `bottomLeftChipStack` / `zoomChipPosition`:
 *   absolutely-positioned floating overlays (legend, selection summary,
 *   zoom controls) within the full-screen shell. No UIKit primitive offers
 *   arbitrary fixed/absolute overlay positioning -- `Card` (reused for
 *   their visual chrome) is a static, in-flow box. `floatingChipRow` adds
 *   `flex-wrap` (rather than the single non-wrapping line a `justify-between`
 *   row would otherwise force) so the zoom chip drops to its own line
 *   instead of getting squeezed past its minimum content width -- and
 *   potentially off the visible row -- on narrow full-screen widths where
 *   `bottomLeftChipStack` (legend + selection card, capped `max-w-[70%]`)
 *   is also present. Neither `fullScreenCanvasArea` nor `fullScreenShell`
 *   sets `overflow: hidden`, so nothing in the ancestor chain would clip
 *   this row instead of letting it wrap.
 *
 * See the PR description for the full list, including gaps noted inline at
 * their call sites instead of here (e.g. the toolbar's fieldset-disable
 * pattern, the legend's colour swatch).
 */
export const activeTheme = {
    active: "border-slate-900 ring-2 ring-slate-200 dark:border-slate-100 dark:ring-slate-700",
    canvasBg: "bg-slate-200 dark:bg-slate-800",
    editor: {
        boardColors: {
            "10mm Plasterboard": {
                edge: "#334155",
                fill: "rgb(51 65 85 / 0.18)",
            },
            "13mm Plasterboard": {
                edge: "#52525b",
                fill: "rgb(82 82 91 / 0.18)",
            },
            "9mm Villaboard": {
                edge: "#0284c7",
                fill: "rgb(2 132 199 / 0.18)",
            },
            "6mm Villaboard": {
                edge: "#0891b2",
                fill: "rgb(8 145 178 / 0.18)",
            },
            "10mm Acoustic (Soundchek)": {
                edge: "#c2410c",
                fill: "rgb(194 65 12 / 0.18)",
            },
            "13mm Acoustic (Soundchek)": {
                edge: "#b45309",
                fill: "rgb(180 83 9 / 0.18)",
            },
            "10mm Water Resistant": {
                edge: "#2563eb",
                fill: "rgb(37 99 235 / 0.18)",
            },
            "13mm Water Resistant": {
                edge: "#4f46e5",
                fill: "rgb(79 70 229 / 0.18)",
            },
            "13mm Fire Resistant - dry area": {
                edge: "#dc2626",
                fill: "rgb(220 38 38 / 0.18)",
            },
            "16mm Fire Resistant - dry area": {
                edge: "#be123c",
                fill: "rgb(190 18 60 / 0.18)",
            },
            "13mm Fire Resistant - wet area": {
                edge: "#a21caf",
                fill: "rgb(162 28 175 / 0.18)",
            },
            "16mm Fire Resistant - wet area": {
                edge: "#7e22ce",
                fill: "rgb(126 34 206 / 0.18)",
            },
            "6.5mm Flexible board": {
                edge: "#059669",
                fill: "rgb(5 150 105 / 0.18)",
            },
            "Recessed Edge": {
                edge: "#334155",
                fill: "rgb(51 65 85 / 0.18)",
            },
            "Water Resistant": {
                edge: "#2563eb",
                fill: "rgb(37 99 235 / 0.18)",
            },
            "Sound Check": {
                edge: "#c2410c",
                fill: "rgb(194 65 12 / 0.18)",
            },
        },
        draft: "#2563eb",
        highEdge: "#dc2626",
        lowEdge: "#0284c7",
        noPlaster: "#64748b",
        point: "#334155",
        selected: "#f97316",
        selectedPoint: "#7c3aed",
        stageBg: "#f1f5f9",
    },
    line: "border-slate-200 dark:border-slate-800",
    panelBg: "bg-white dark:bg-slate-900",
    softBg: "bg-slate-100 dark:bg-slate-800",
} as const;

type Theme = typeof activeTheme;

function createUi(theme: Theme) {
    return {
        areaList: "grid max-h-[220px] gap-2 overflow-auto",
        areaRow: cx(
            "cursor-pointer rounded-lg border p-[9px] text-left",
            theme.line,
        ),
        areaRowActive: theme.active,
        canvasWrap: cx(
            "flex-1 min-h-[560px] overflow-auto rounded-lg border",
            theme.canvasBg,
            theme.line,
        ),
        canvasWrapFullScreen: cx(
            "flex-1 min-h-0 overflow-auto rounded-lg border",
            theme.canvasBg,
            theme.line,
        ),
        editorCanvasContainer: "flex flex-col flex-1 min-h-0",
        editorLeftPanel: cx(
            "flex flex-col min-h-0 rounded-lg border shadow-lg [&_h2]:mb-3.5 [&_h2]:mt-0 [&_h3]:mb-3.5 [&_h3]:mt-0",
            theme.panelBg,
            theme.line,
        ),
        editorLegend: cx(
            "flex shrink-0 flex-wrap items-center gap-2 border-t p-2",
            theme.line,
        ),
        editorRightPanel: "min-h-0",
        editorShell:
            "grid grid-cols-[minmax(0,1fr)_320px] grid-rows-[minmax(0,1fr)] flex-1 min-h-0",
        metric: cx("rounded-lg border p-2.5", theme.softBg, theme.line),
        popoverMenu: cx(
            "absolute left-0 top-[46px] z-10 grid min-w-[170px] gap-1.5 rounded-lg border p-2 shadow-lg",
            theme.panelBg,
            theme.line,
        ),
        popoverMenuPortal: cx(
            "fixed z-50 grid min-w-[170px] gap-1.5 rounded-lg border p-2 shadow-lg",
            theme.panelBg,
            theme.line,
        ),
        toolbarScrollRow: "flex flex-nowrap items-center gap-2 overflow-x-auto",
        fullScreenShell: cx(
            "relative flex flex-1 min-h-0 flex-col",
            theme.panelBg,
        ),
        fullScreenToolbarArea: cx(
            "flex shrink-0 flex-col gap-2 border-b p-2",
            theme.line,
        ),
        fullScreenCanvasArea: "relative flex flex-1 min-h-0 flex-col",
        // `28rem` mirrors `drawerSizes.md` (`sm:max-w-md`) in
        // `libraries/uikit-web/src/overlays/drawer/drawer.styles.ts` --
        // see `editorDrawerSize` below, which must stay in sync with this.
        fullScreenCanvasShifted: "sm:pr-[28rem]",
        floatingChipRow:
            "pointer-events-none absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-2 p-3",
        // Bottom-left stack: legend chip above selection card, so the two
        // don't overlap when both are visible.
        bottomLeftChipStack:
            "pointer-events-auto flex max-w-[70%] flex-col items-start gap-2",
        zoomChipPosition: "pointer-events-auto",
    };
}

export const ui = createUi(activeTheme);

/**
 * The `Drawer` `size` the full-screen inspector uses -- kept as a named
 * constant, alongside `ui.fullScreenCanvasShifted` above, because both
 * encode the same rendered drawer width and must be changed together.
 */
export const editorDrawerSize: DrawerSize = "md";
