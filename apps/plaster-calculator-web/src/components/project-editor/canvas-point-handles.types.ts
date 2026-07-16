import type { SnapGuide } from "./project-editor.types.js";
import type { SelectedEdge } from "../../hooks/use-editor-selection.js";
import type {
    AreaPolygon,
    Overlay,
} from "@libraries/plaster-calculator-common";
import type { RefObject } from "react";

export interface CanvasPointHandlesProps {
    readonly commitFromSnapshot: (before: Overlay, next: Overlay) => void;
    readonly isDrawingFreeShape: boolean;
    readonly isSettingReference: boolean;
    readonly overlayRef: RefObject<Overlay>;
    readonly selectedArea: AreaPolygon | null;
    readonly selectedAreaIds: string[];
    readonly selectedEdge: SelectedEdge | null;
    readonly selectedPoint: number | null;
    readonly selectedPointIndexes: number[];
    readonly zoom: number;
    readonly selectPoint: (index: number, additive: boolean) => void;
    readonly setDirty: (dirty: boolean) => void;
    readonly setOverlay: (overlay: Overlay) => void;
    readonly setSnapGuide: (guide: SnapGuide) => void;
}
