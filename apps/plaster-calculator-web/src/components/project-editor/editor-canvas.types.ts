import type { OverlayMode, SnapGuide } from "./project-editor.types.js";
import type { SelectedEdge } from "../../hooks/use-editor-selection.js";
import type {
    AreaPolygon,
    Overlay,
    Point,
} from "@libraries/plaster-calculator-common";
import type { Stage as KonvaStage } from "konva/lib/Stage.js";
import type { RefObject } from "react";

export interface ScrollDragState {
    x: number;
    y: number;
    scrollLeft: number;
    scrollTop: number;
    moved: boolean;
}

export interface EditorCanvasProps {
    readonly canvasWrapRef: RefObject<HTMLDivElement | null>;
    readonly commitFromSnapshot: (before: Overlay, next: Overlay) => void;
    readonly draftPointer: Point | null;
    readonly draftPoints: Point[];
    readonly image: HTMLImageElement | null;
    readonly imageError: string;
    readonly imageHeight: number;
    readonly imageWidth: number;
    readonly isDrawingFreeShape: boolean;
    readonly isSettingReference: boolean;
    readonly overlayMode: OverlayMode;
    readonly overlayRef: RefObject<Overlay>;
    readonly referencePoints: Point[];
    readonly scrollDragRef: RefObject<ScrollDragState | null>;
    readonly selectedArea: AreaPolygon | null;
    readonly selectedAreaIds: string[];
    readonly selectedEdge: SelectedEdge | null;
    readonly selectedPoint: number | null;
    readonly selectedPointIndexes: number[];
    readonly snapGuide: SnapGuide;
    readonly stageHeight: number;
    readonly stageRef: RefObject<KonvaStage | null>;
    readonly stageWidth: number;
    readonly visibleAreas: AreaPolygon[];
    readonly zoom: number;
    readonly finishFreeShape: (points: Point[]) => void;
    readonly selectArea: (areaId: string, additive: boolean) => void;
    readonly selectEdge: (areaId: string, edgeIndex: number) => void;
    readonly selectPoint: (index: number, additive: boolean) => void;
    readonly setDirty: (dirty: boolean) => void;
    readonly setDraftPointer: (point: Point | null) => void;
    readonly setDraftPoints: (updater: (points: Point[]) => Point[]) => void;
    readonly setIsSettingReference: (value: boolean) => void;
    readonly setOverlay: (overlay: Overlay) => void;
    readonly setReferencePoints: (points: Point[]) => void;
    readonly setSnapGuide: (guide: SnapGuide) => void;
}
