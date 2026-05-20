import type {
    PageValidationInput,
    ValidationIssue,
} from "../../lib/validation.js";
import type { Overlay, ProjectDetail, FloorplanPage } from "../../types.js";
import type { ReactNode } from "react";

export interface ProjectEditorProps {
    readonly project: ProjectDetail;
    readonly page: FloorplanPage;
    readonly onSaved: () => void;
    readonly projectAccountPanel?: ReactNode;
    readonly onDraftChange?: (
        pageId: string,
        draft: PageValidationInput,
    ) => void;
    readonly validationIssues?: ValidationIssue[];
}

export type OverlayMode = "walls" | "ceilings" | "both";

export type SnapGuide = { x?: number; y?: number } | null;

export interface DragState {
    readonly before: Overlay;
    readonly startClientX: number;
    readonly startClientY: number;
}
