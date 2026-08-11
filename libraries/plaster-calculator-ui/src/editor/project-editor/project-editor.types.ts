import type { Overlay } from "@libraries/plaster-calculator-common";
import type {
    ProjectDetail,
    FloorplanPage,
} from "@libraries/plaster-calculator-web-core";
import type { ReactNode } from "react";

import type { PageValidationInput, ValidationIssue } from "./validation.js";

/**
 * A tool the editor can be opened with pre-selected, e.g. from a WORK-139
 * quote-readiness deep link that lands the user on the reference-line/scale
 * tool or the room-drawing (free shape) tool for a specific page. Exported
 * so a consumer (the app's floorplan route) can validate an incoming query
 * param against the same literal union the editor actually understands,
 * rather than duplicating the strings.
 */
export const EDITOR_INITIAL_TOOLS = ["scale", "draw-room"] as const;
export type EditorInitialTool = (typeof EDITOR_INITIAL_TOOLS)[number];

export interface ProjectEditorProps {
    readonly project: ProjectDetail;
    readonly page: FloorplanPage;
    readonly onSaved: () => void | Promise<void>;
    readonly onAnalyzingChange?: (analyzing: boolean) => void;
    readonly projectCompanyPanel?: ReactNode;
    readonly salesStatusPanel?: ReactNode;
    readonly onDraftChange?: (
        pageId: string,
        draft: PageValidationInput,
    ) => void;
    readonly validationIssues?: ValidationIssue[];
    /**
     * Activates `"scale"` (reference-line mode) or `"draw-room"` (free
     * shape drawing) once, on mount — never re-applied after that, so
     * switching pages or tools afterward doesn't keep snapping back. `null`
     * or `undefined` (missing/unrecognised query param, resolved by the
     * caller) leaves tool selection exactly as it already defaults.
     */
    readonly initialTool?: EditorInitialTool | null;
}

export type OverlayMode = "walls" | "ceilings" | "both";

export type SnapGuide = { x?: number; y?: number } | null;

export interface DragState {
    readonly before: Overlay;
    readonly startClientX: number;
    readonly startClientY: number;
}
