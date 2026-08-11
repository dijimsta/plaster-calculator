import type { Overlay } from "@libraries/plaster-calculator-common";
import type {
    ProjectDetail,
    FloorplanPage,
} from "@libraries/plaster-calculator-web-core";
import type { ReactNode } from "react";

import type { PageValidationInput, ValidationIssue } from "./validation.js";

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
}

export type OverlayMode = "walls" | "ceilings" | "both";

export type SnapGuide = { x?: number; y?: number } | null;

export interface DragState {
    readonly before: Overlay;
    readonly startClientX: number;
    readonly startClientY: number;
}
