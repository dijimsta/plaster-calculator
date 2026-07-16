import type { SelectedEdge } from "./use-editor-selection.js";
import type {
    AreaPolygon,
    Overlay,
    Point,
} from "@libraries/plaster-calculator-common";
import type { RefObject } from "react";

export interface ViewportSize {
    readonly width: number;
    readonly height: number;
}

export type UpdateArea = (
    areaId: string,
    updater: (area: AreaPolygon) => AreaPolygon,
) => void;

export interface EditorActionsOptions {
    readonly canvasWrapRef: RefObject<HTMLDivElement | null>;
    readonly ceilingHeightMm: number | null;
    readonly commit: (next: Overlay) => void;
    readonly imageHeight: number;
    readonly imageWidth: number;
    readonly overlay: Overlay;
    readonly referenceLengthMm: string;
    readonly referencePoints: Point[];
    readonly selectedArea: AreaPolygon | null;
    readonly selectedAreaIds: string[];
    readonly selectedAreas: AreaPolygon[];
    readonly selectedEdge: SelectedEdge | null;
    readonly selectedPoint: number | null;
    readonly selectedPointIndexes: number[];
    readonly viewport: ViewportSize;
    readonly zoom: number;
    readonly setAddMenuOpen: (open: boolean) => void;
    readonly setDirty: (dirty: boolean) => void;
    readonly setDraftPointer: (point: Point | null) => void;
    readonly setDraftPoints: (points: Point[]) => void;
    readonly setIsDrawingFreeShape: (value: boolean) => void;
    readonly setIsSettingReference: (value: boolean) => void;
    readonly setReferenceLengthMm: (value: string) => void;
    readonly setReferencePoints: (points: Point[]) => void;
    readonly setScaleMmPerPx: (value: number | null) => void;
    readonly setSelectedAreaId: (areaId: string | null) => void;
    readonly setSelectedAreaIds: (areaIds: string[]) => void;
    readonly setSelectedEdge: (edge: SelectedEdge | null) => void;
    readonly setSelectedPoint: (pointIndex: number | null) => void;
    readonly setSelectedPointIndexes: (pointIndexes: number[]) => void;
    readonly setSnapGuide: (guide: null) => void;
    readonly setStatus: (status: string) => void;
    readonly setZoom: (zoom: number) => void;
}
