import type { MaterialField } from "../../hooks/use-editor-material-actions.js";
import type { SelectedEdge } from "../../hooks/use-editor-selection.js";
import type { ValidationIssue } from "../../lib/validation.js";
import type {
    AreaPolygon,
    EdgeOverride,
    FloorplanPage,
    Point,
} from "../../types.js";
import type { ReactNode } from "react";

export interface EditorSummary {
    readonly wallTotals: [string, number][];
    readonly ceilingTotals: [string, number][];
}

export interface SelectionMetrics {
    readonly wallLengthM: number;
    readonly ceilingAreaM2: number;
}

export interface EditorSidebarProps {
    readonly page: FloorplanPage;
    readonly status: string;
    readonly dirty: boolean;
    readonly ceilingHeightMm: number | null;
    readonly scaleMmPerPx: number | null;
    readonly referencePoints: Point[];
    readonly referenceLengthMm: string;
    readonly isSettingReference: boolean;
    readonly summary: EditorSummary | null;
    readonly visibleAreas: AreaPolygon[];
    readonly selectedAreaIds: string[];
    readonly selectedArea: AreaPolygon | null;
    readonly selectedEdgeArea: AreaPolygon | null;
    readonly selectedEdge: SelectedEdge | null;
    readonly selectedEdgeOverride: EdgeOverride | undefined | null;
    readonly selectedPointIndexes: number[];
    readonly metrics: SelectionMetrics | null;
    readonly projectAccountPanel?: ReactNode;
    readonly areaIssue: (
        areaId: string,
        field: ValidationIssue["field"],
    ) => string;
    readonly applyHeightToAllPages: () => void;
    readonly applyScale: () => void;
    readonly applyScaleToAllPages: () => void;
    readonly clearSelectedEdgeOverride: () => void;
    readonly commonMaterialValue: (field: MaterialField) => string;
    readonly fieldError: (message: string) => ReactNode;
    readonly hasPageHeightIssue: () => boolean;
    readonly pageIssue: (field: ValidationIssue["field"]) => string;
    readonly renderCeilingControls: (area: AreaPolygon) => ReactNode;
    readonly selectArea: (areaId: string, additive: boolean) => void;
    readonly setCeilingHeightMm: (value: number | null) => void;
    readonly setDirty: (dirty: boolean) => void;
    readonly setIsSettingReference: (value: boolean) => void;
    readonly setMaterial: (field: MaterialField, value: string) => void;
    readonly setReferenceLengthMm: (value: string) => void;
    readonly setReferencePoints: (points: Point[]) => void;
    readonly setSelectedEdgeMaterial: (
        field: "wallBoardProfile" | "wallBoardType",
        value: string,
    ) => void;
    readonly setSelectedEdgeNoPlaster: (noPlaster: boolean) => void;
    readonly startReferenceMode: () => void;
    readonly toggleOutdoor: () => void;
    readonly updateArea: (
        areaId: string,
        updater: (area: AreaPolygon) => AreaPolygon,
    ) => void;
}
