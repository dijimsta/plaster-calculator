import type { AreaPolygon } from "../types.js";
import { useEditorAreaActions } from "./use-editor-area-actions.js";
import { useEditorCeilingActions } from "./use-editor-ceiling-actions.js";
import { useEditorMaterialActions } from "./use-editor-material-actions.js";
import { useEditorScaleActions } from "./use-editor-scale-actions.js";
import type { EditorActionsOptions } from "./use-editor-actions.types.js";

export function useEditorActions(options: EditorActionsOptions) {
    const {
        canvasWrapRef,
        ceilingHeightMm,
        commit,
        imageHeight,
        imageWidth,
        overlay,
        referenceLengthMm,
        referencePoints,
        selectedArea,
        selectedAreaIds,
        selectedAreas,
        selectedEdge,
        selectedPoint,
        selectedPointIndexes,
        viewport,
        zoom,
        setAddMenuOpen,
        setDirty,
        setDraftPointer,
        setDraftPoints,
        setIsDrawingFreeShape,
        setIsSettingReference,
        setReferenceLengthMm,
        setReferencePoints,
        setScaleMmPerPx,
        setSelectedAreaId,
        setSelectedAreaIds,
        setSelectedEdge,
        setSelectedPoint,
        setSelectedPointIndexes,
        setSnapGuide,
        setStatus,
        setZoom,
    } = options;

    function updateArea(
        areaId: string,
        updater: (area: AreaPolygon) => AreaPolygon,
    ) {
        commit({
            ...overlay,
            areas: overlay.areas.map((area) =>
                area.id === areaId ? updater(area) : area,
            ),
        });
    }

    const scaleActions = useEditorScaleActions({
        canvasWrapRef,
        imageHeight,
        imageWidth,
        referenceLengthMm,
        referencePoints,
        viewport,
        zoom,
        setDirty,
        setIsSettingReference,
        setReferenceLengthMm,
        setReferencePoints,
        setScaleMmPerPx,
        setStatus,
        setZoom,
    });

    const areaActions = useEditorAreaActions({
        canvasWrapRef,
        commit,
        imageHeight,
        imageWidth,
        overlay,
        selectedArea,
        selectedEdge,
        selectedPoint,
        selectedPointIndexes,
        viewport,
        zoom,
        setAddMenuOpen,
        setDraftPointer,
        setDraftPoints,
        setIsDrawingFreeShape,
        setSelectedAreaId,
        setSelectedAreaIds,
        setSelectedEdge,
        setSelectedPoint,
        setSelectedPointIndexes,
        setSnapGuide,
        setStatus,
        updateArea,
    });

    const materialActions = useEditorMaterialActions({
        commit,
        overlay,
        selectedArea,
        selectedAreaIds,
        selectedAreas,
        selectedEdge,
        updateArea,
    });

    const ceilingActions = useEditorCeilingActions({
        ceilingHeightMm,
        selectedArea,
        selectedEdge,
        updateArea,
    });

    return {
        ...areaActions,
        ...ceilingActions,
        ...materialActions,
        applyScale: scaleActions.applyScale,
        changeZoom: scaleActions.changeZoom,
        resetView: scaleActions.resetView,
        startReferenceMode: scaleActions.startReferenceMode,
        updateArea,
    };
}
