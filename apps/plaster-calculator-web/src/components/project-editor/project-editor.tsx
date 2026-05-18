"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
    Circle,
    Group,
    Image as KonvaImage,
    Layer,
    Line,
    Rect,
    Stage,
} from "react-konva";
import type { Stage as KonvaStage } from "konva/lib/Stage.js";
import type { KonvaEventObject } from "konva/lib/Node.js";
import type {
    AreaPolygon,
    EdgeOverride,
    Overlay,
    Point,
} from "../../types.js";
import {
    applyCeilingHeightToProject,
    applyScaleToProject,
    savePageOverlay,
} from "../../lib/api.js";
import type { ValidationIssue } from "../../lib/validation.js";
import { activeTheme, ui } from "../../lib/styles.js";
import {
    colorFor,
} from "../../lib/editor/board-materials.js";
import {
    ceilingAreaM2ForArea,
    clamp,
    effectiveFlatHeight,
    pathLengthBetween,
    pointAt,
    pointDistance,
    wallLengthByType,
} from "../../lib/editor/overlay-geometry.js";
import {
    cloneOverlay,
    parseOverlay,
    parseReferencePoints,
} from "../../lib/editor/overlay-serialization.js";
import {
    edgeOverridesAfterInsert,
    edgeOverridesAfterRemoveMany,
    rakedAfterPointRemoval,
    splitEdgeOverrides,
} from "../../lib/editor/edge-overrides.js";
import { snapToReferences } from "../../lib/editor/snap-guides.js";
import { useEditorAutosave } from "../../hooks/use-editor-autosave.js";
import { useEditorImage } from "../../hooks/use-editor-image.js";
import { useEditorKeyboardShortcuts } from "../../hooks/use-editor-keyboard-shortcuts.js";
import { useEditorViewport } from "../../hooks/use-editor-viewport.js";
import { useEditorHistory } from "../../hooks/use-editor-history.js";
import { useEditorSelection } from "../../hooks/use-editor-selection.js";
import type {
    DragState,
    OverlayMode,
    ProjectEditorProps,
    SnapGuide,
} from "./project-editor.types.js";
import { EditorToolbar } from "./editor-toolbar.js";
import { EditorSidebar } from "./editor-sidebar.js";
import { CeilingControls } from "./ceiling-controls.js";
import { ValidationMessage } from "./validation-message.js";

const SELECTED_COLOR = activeTheme.editor.selected;
const SELECTED_POINT_COLOR = activeTheme.editor.selectedPoint;
const LOW_EDGE_COLOR = activeTheme.editor.lowEdge;
const HIGH_EDGE_COLOR = activeTheme.editor.highEdge;

export function ProjectEditor({
    project,
    page,
    onSaved,
    onDraftChange,
    validationIssues = [],
}: ProjectEditorProps) {
    const { image, imageError } = useEditorImage(page.imageUrl);
    const [overlay, setOverlay] = useState<Overlay>(() =>
        parseOverlay(page.overlay),
    );
    const {
        selectedAreaId,
        selectedAreaIds,
        selectedEdge,
        selectedPoint,
        selectedPointIndexes,
        clearSelection,
        hasSelection,
        selectArea,
        selectEdge,
        selectPoint,
        setSelectedAreaId,
        setSelectedAreaIds,
        setSelectedEdge,
        setSelectedPoint,
        setSelectedPointIndexes,
    } = useEditorSelection();
    const [overlayMode, setOverlayMode] = useState<OverlayMode>("both");
    const [scaleMmPerPx, setScaleMmPerPx] = useState<number | null>(
        page.scaleMmPerPx,
    );
    const [ceilingHeightMm, setCeilingHeightMm] = useState<number | null>(
        page.ceilingHeightMm,
    );
    const [isSettingReference, setIsSettingReference] = useState(false);
    const [referencePoints, setReferencePoints] = useState<Point[]>(() =>
        parseReferencePoints(page.referencePoints),
    );
    const [referenceLengthMm, setReferenceLengthMm] = useState(
        page.referenceLengthMm?.toString() ?? "",
    );
    const [addMenuOpen, setAddMenuOpen] = useState(false);
    const [isDrawingFreeShape, setIsDrawingFreeShape] = useState(false);
    const [draftPoints, setDraftPoints] = useState<Point[]>([]);
    const [draftPointer, setDraftPointer] = useState<Point | null>(null);
    const [snapGuide, setSnapGuide] = useState<SnapGuide>(null);
    const [zoom, setZoom] = useState(1);
    const [dirty, setDirty] = useState(false);
    const [saving, setSaving] = useState(false);
    const [autoSaving, setAutoSaving] = useState(false);
    const [status, setStatus] = useState("");
    const stageRef = useRef<KonvaStage>(null);
    const canvasWrapRef = useRef<HTMLDivElement | null>(null);
    const overlayRef = useRef<Overlay>(overlay);
    const pointDragRef = useRef<DragState | null>(null);
    const polygonDragRef = useRef<DragState | null>(null);
    const edgeDragRef = useRef<DragState | null>(null);
    const scrollDragRef = useRef<{
        x: number;
        y: number;
        scrollLeft: number;
        scrollTop: number;
        moved: boolean;
    } | null>(null);
    const viewport = useEditorViewport(canvasWrapRef);
    const {
        future,
        history,
        commit,
        commitFromSnapshot,
        redo,
        resetHistory,
        undo,
    } = useEditorHistory({
        overlay,
        setDirty,
        setOverlay,
        setStatus,
    });

    useEffect(() => {
        setOverlay(parseOverlay(page.overlay));
        setScaleMmPerPx(page.scaleMmPerPx);
        setCeilingHeightMm(page.ceilingHeightMm);
        setReferencePoints(parseReferencePoints(page.referencePoints));
        setReferenceLengthMm(page.referenceLengthMm?.toString() ?? "");
        setDirty(false);
        resetHistory();
        setSelectedAreaId(null);
        setSelectedAreaIds([]);
        setSelectedEdge(null);
        setSelectedPoint(null);
        setSelectedPointIndexes([]);
        setSnapGuide(null);
        setDraftPointer(null);
    }, [
        page.id,
        page.overlay,
        page.scaleMmPerPx,
        page.ceilingHeightMm,
        page.referencePoints,
        page.referenceLengthMm,
    ]);

    useEffect(() => {
        overlayRef.current = overlay;
    }, [overlay]);

    useEffect(() => {
        onDraftChange?.(page.id, {
            id: page.id,
            pageNumber: page.pageNumber,
            overlay: JSON.stringify(overlay),
            scaleMmPerPx,
            ceilingHeightMm,
            referencePoints: referencePoints.length
                ? JSON.stringify(referencePoints)
                : null,
            referenceLengthMm: referenceLengthMm
                ? Number(referenceLengthMm)
                : null,
        });
    }, [
        page.id,
        page.pageNumber,
        overlay,
        scaleMmPerPx,
        ceilingHeightMm,
        referencePoints,
        referenceLengthMm,
        onDraftChange,
    ]);

    const selectedArea =
        overlay.areas.find(
            (area) => area.id === selectedAreaId && !area.deleted,
        ) ?? null;
    const visibleAreas = overlay.areas.filter((area) => !area.deleted);
    const selectedAreas = visibleAreas.filter((area) =>
        selectedAreaIds.includes(area.id),
    );
    const selectedEdgeArea =
        visibleAreas.find((area) => area.id === selectedEdge?.areaId) ?? null;
    const selectedEdgeOverride =
        selectedEdgeArea && selectedEdge
            ? selectedEdgeArea.edgeOverrides?.[String(selectedEdge.edgeIndex)]
            : null;
    const imageWidth =
        image?.naturalWidth ?? overlay.imageSizePx?.width ?? 1200;
    const imageHeight =
        image?.naturalHeight ?? overlay.imageSizePx?.height ?? 900;
    const stageWidth = imageWidth * zoom;
    const stageHeight = imageHeight * zoom;

    const metrics = useMemo(() => {
        if (!selectedArea || !scaleMmPerPx) return null;
        const wallLengthM =
            (wallLengthByType(selectedArea).reduce(
                (total, item) => total + item.lengthPx,
                0,
            ) *
                scaleMmPerPx) /
            1000;
        const ceilingAreaM2 = ceilingAreaM2ForArea(selectedArea, scaleMmPerPx);
        return { wallLengthM, ceilingAreaM2 };
    }, [selectedArea, scaleMmPerPx]);

    const summary = useMemo(() => {
        if (!scaleMmPerPx) return null;
        const wallTotals = new Map<string, number>();
        const ceilingTotals = new Map<string, number>();
        visibleAreas.forEach((area) => {
            wallLengthByType(area).forEach((item) => {
                wallTotals.set(
                    item.type,
                    (wallTotals.get(item.type) ?? 0) +
                        (item.lengthPx * scaleMmPerPx) / 1000,
                );
            });
            const ceilingAreaM2 = ceilingAreaM2ForArea(area, scaleMmPerPx);
            ceilingTotals.set(
                area.ceilingPlasterType,
                (ceilingTotals.get(area.ceilingPlasterType) ?? 0) +
                    ceilingAreaM2,
            );
        });
        return {
            wallTotals: Array.from(wallTotals.entries()).filter(
                ([, total]) => total > 0,
            ),
            ceilingTotals: Array.from(ceilingTotals.entries()).filter(
                ([, total]) => total > 0,
            ),
        };
    }, [visibleAreas, scaleMmPerPx]);

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

    function addRectangle() {
        const center = viewportCenterInImage();
        const width = 220;
        const height = 160;
        const x = clamp(
            Math.round(center[0] - width / 2),
            0,
            Math.max(0, imageWidth - width),
        );
        const y = clamp(
            Math.round(center[1] - height / 2),
            0,
            Math.max(0, imageHeight - height),
        );
        const area: AreaPolygon = {
            id: crypto.randomUUID(),
            label: `Area ${visibleAreas.length + 1}`,
            points: [
                [x, y],
                [x + width, y],
                [x + width, y + height],
                [x, y + height],
            ],
            wallPlasterType: "Recessed Edge",
            ceilingPlasterType: "Recessed Edge",
            isOutdoor: false,
            source: "manual",
            deleted: false,
        };
        commit({ ...overlay, areas: [...overlay.areas, area] });
        setSelectedAreaId(area.id);
        setSelectedAreaIds([area.id]);
        setAddMenuOpen(false);
    }

    function startFreeShape() {
        setDraftPoints([]);
        setDraftPointer(null);
        setSnapGuide(null);
        setIsDrawingFreeShape(true);
        setAddMenuOpen(false);
        setStatus(
            "Click points for a free shape. Click the first point to finish.",
        );
    }

    function finishFreeShape(points: Point[]) {
        if (points.length < 3) return;
        const area: AreaPolygon = {
            id: crypto.randomUUID(),
            label: `Area ${visibleAreas.length + 1}`,
            points,
            wallPlasterType: "Recessed Edge",
            ceilingPlasterType: "Recessed Edge",
            isOutdoor: false,
            source: "manual",
            deleted: false,
        };
        commit({ ...overlay, areas: [...overlay.areas, area] });
        setSelectedAreaId(area.id);
        setSelectedAreaIds([area.id]);
        setDraftPoints([]);
        setDraftPointer(null);
        setSnapGuide(null);
        setIsDrawingFreeShape(false);
    }

    function cancelFreeShape() {
        setDraftPoints([]);
        setDraftPointer(null);
        setSnapGuide(null);
        setIsDrawingFreeShape(false);
        setStatus("Free shape cancelled");
    }

    function addPoint() {
        if (!selectedArea || selectedArea.points.length < 2) return;
        const anchorIndex =
            selectedEdge?.areaId === selectedArea.id
                ? selectedEdge.edgeIndex
                : (selectedPoint ?? 0);
        const nextIndex = (anchorIndex + 1) % selectedArea.points.length;
        const a = pointAt(selectedArea.points, anchorIndex);
        const b = pointAt(selectedArea.points, nextIndex);
        const point: Point = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
        updateArea(selectedArea.id, (area) => ({
            ...area,
            points: [
                ...area.points.slice(0, anchorIndex + 1),
                point,
                ...area.points.slice(anchorIndex + 1),
            ],
            edgeOverrides: edgeOverridesAfterInsert(
                area.edgeOverrides,
                anchorIndex,
            ),
        }));
        setSelectedPoint(anchorIndex + 1);
        setSelectedPointIndexes([anchorIndex + 1]);
        setSelectedEdge(null);
    }

    function removeSelectedPoints() {
        if (!selectedArea || selectedPointIndexes.length === 0) return;
        const removed = Array.from(new Set(selectedPointIndexes)).sort(
            (a, b) => a - b,
        );
        if (selectedArea.points.length - removed.length < 3) {
            setStatus("A polygon needs at least 3 points");
            return;
        }
        const removedSet = new Set(removed);
        updateArea(selectedArea.id, (area) => ({
            ...area,
            points: area.points.filter((_, index) => !removedSet.has(index)),
            edgeOverrides: edgeOverridesAfterRemoveMany(
                area.edgeOverrides,
                removedSet,
                area.points.length,
            ),
            rakedCeiling: rakedAfterPointRemoval(area, removedSet),
        }));
        setSelectedPoint(null);
        setSelectedPointIndexes([]);
        setSelectedEdge(null);
    }

    function deleteSelection() {
        if (selectedArea && selectedPointIndexes.length > 0) {
            removeSelectedPoints();
            return;
        }
        deleteArea();
    }

    function deleteArea() {
        if (!selectedArea) return;
        updateArea(selectedArea.id, (area) => ({ ...area, deleted: true }));
        setSelectedAreaId(null);
        setSelectedAreaIds([]);
        setSelectedEdge(null);
    }

    function splitArea() {
        if (!selectedArea || selectedPointIndexes.length !== 2) {
            setStatus("Select two points with Ctrl-click before splitting");
            return;
        }
        const sortedPointIndexes = [...selectedPointIndexes].sort(
            (a, b) => a - b,
        );
        const start = sortedPointIndexes[0];
        const end = sortedPointIndexes[1];
        if (start == null || end == null) return;
        const firstPoints = selectedArea.points.slice(start, end + 1);
        const secondPoints = [
            ...selectedArea.points.slice(end),
            ...selectedArea.points.slice(0, start + 1),
        ];
        if (firstPoints.length < 3 || secondPoints.length < 3) {
            setStatus("Choose two non-adjacent points to split");
            return;
        }
        const first: AreaPolygon = {
            ...selectedArea,
            id: crypto.randomUUID(),
            label: `${selectedArea.label} A`,
            points: firstPoints,
            edgeOverrides: splitEdgeOverrides(
                selectedArea,
                start,
                end,
                "first",
            ),
            source: "manual",
        };
        const second: AreaPolygon = {
            ...selectedArea,
            id: crypto.randomUUID(),
            label: `${selectedArea.label} B`,
            points: secondPoints,
            edgeOverrides: splitEdgeOverrides(
                selectedArea,
                start,
                end,
                "second",
            ),
            source: "manual",
        };
        commit({
            ...overlay,
            areas: overlay.areas
                .map((area) =>
                    area.id === selectedArea.id
                        ? { ...area, deleted: true }
                        : area,
                )
                .concat(first, second),
        });
        setSelectedAreaId(first.id);
        setSelectedAreaIds([first.id]);
        setSelectedPoint(null);
        setSelectedPointIndexes([]);
        setSelectedEdge(null);
    }

    function straightenSelectedPoints() {
        if (!selectedArea || selectedPointIndexes.length !== 2) {
            setStatus("Select two points before straightening");
            return;
        }
        const sortedPointIndexes = [...selectedPointIndexes].sort(
            (left, right) => left - right,
        );
        const a = sortedPointIndexes[0];
        const b = sortedPointIndexes[1];
        if (a == null || b == null) return;
        const forwardLength = pathLengthBetween(selectedArea.points, a, b, 1);
        const backwardLength = pathLengthBetween(selectedArea.points, b, a, 1);
        const removeForward = forwardLength <= backwardLength;
        const removed = new Set<number>();
        if (removeForward) {
            for (let i = a + 1; i < b; i += 1) removed.add(i);
        } else {
            for (let i = b + 1; i < selectedArea.points.length; i += 1)
                removed.add(i);
            for (let i = 0; i < a; i += 1) removed.add(i);
        }
        if (removed.size === 0) {
            setStatus("The selected points are already connected");
            return;
        }
        if (selectedArea.points.length - removed.size < 3) {
            setStatus("Straighten would leave fewer than 3 points");
            return;
        }
        updateArea(selectedArea.id, (area) => ({
            ...area,
            points: area.points.filter((_, index) => !removed.has(index)),
            edgeOverrides: edgeOverridesAfterRemoveMany(
                area.edgeOverrides,
                removed,
                area.points.length,
            ),
            rakedCeiling: rakedAfterPointRemoval(area, removed),
        }));
        setSelectedPoint(null);
        setSelectedPointIndexes([]);
        setSelectedEdge(null);
    }

    function setMaterial(
        field: "wallPlasterType" | "ceilingPlasterType",
        value: string,
    ) {
        const targetIds =
            selectedAreaIds.length > 0
                ? selectedAreaIds
                : selectedArea
                  ? [selectedArea.id]
                  : [];
        if (targetIds.length === 0) return;
        commit({
            ...overlay,
            areas: overlay.areas.map((area) => {
                if (!targetIds.includes(area.id)) return area;
                if (field === "wallPlasterType" && area.isOutdoor) return area;
                return { ...area, [field]: value };
            }),
        });
    }

    function toggleOutdoor() {
        if (!selectedArea) return;
        updateArea(selectedArea.id, (area) => {
            const isOutdoor = !area.isOutdoor;
            return {
                ...area,
                isOutdoor,
                ceilingPlasterType: isOutdoor
                    ? "Water Resistant"
                    : area.ceilingPlasterType,
            };
        });
    }

    function commonMaterialValue(
        field: "wallPlasterType" | "ceilingPlasterType",
    ) {
        const values = selectedAreas.map((area) => area[field]);
        if (values.length === 0) return "";
        return values.every((value) => value === values[0])
            ? (values[0] ?? "")
            : "";
    }

    function updateSelectedEdgeOverride(
        updater: (override: EdgeOverride) => EdgeOverride | null,
    ) {
        if (!selectedEdge) return;
        updateArea(selectedEdge.areaId, (area) => {
            const key = String(selectedEdge.edgeIndex);
            const nextOverrides = { ...(area.edgeOverrides ?? {}) };
            const nextOverride = updater(nextOverrides[key] ?? {});
            if (
                nextOverride &&
                (nextOverride.wallPlasterType || nextOverride.noPlaster)
            ) {
                nextOverrides[key] = nextOverride;
            } else {
                delete nextOverrides[key];
            }
            return {
                ...area,
                edgeOverrides: Object.keys(nextOverrides).length
                    ? nextOverrides
                    : undefined,
            };
        });
    }

    function setSelectedEdgeMaterial(value: string) {
        updateSelectedEdgeOverride((override) => ({
            ...override,
            wallPlasterType: value,
            noPlaster: false,
        }));
    }

    function setSelectedEdgeNoPlaster(noPlaster: boolean) {
        updateSelectedEdgeOverride((override) => ({ ...override, noPlaster }));
    }

    function clearSelectedEdgeOverride() {
        updateSelectedEdgeOverride(() => null);
    }

    function updateSelectedArea(updater: (area: AreaPolygon) => AreaPolygon) {
        if (!selectedArea) return;
        updateArea(selectedArea.id, updater);
    }

    function setCeilingMode(mode: "flat" | "raked") {
        updateSelectedArea((area) => {
            if (mode === "flat")
                return {
                    ...area,
                    ceilingMode: "flat",
                    rakedCeiling: undefined,
                };
            const defaultHeight = effectiveFlatHeight(area, ceilingHeightMm);
            return {
                ...area,
                ceilingMode: "raked",
                rakedCeiling: area.rakedCeiling ?? {
                    lowEdgeIndex: -1,
                    highEdgeIndex: -1,
                    lowHeightMm: defaultHeight,
                    highHeightMm: defaultHeight,
                },
            };
        });
    }

    function setSelectedAreaHeight(value: string) {
        updateSelectedArea((area) => ({
            ...area,
            ceilingHeightMm: value ? Number(value) : null,
        }));
    }

    function setRakedEdge(role: "low" | "high") {
        if (
            !selectedArea ||
            !selectedEdge ||
            selectedEdge.areaId !== selectedArea.id
        )
            return;
        updateSelectedArea((area) => {
            const defaultHeight = effectiveFlatHeight(area, ceilingHeightMm);
            const current = area.rakedCeiling ?? {
                lowEdgeIndex: -1,
                highEdgeIndex: -1,
                lowHeightMm: defaultHeight,
                highHeightMm: defaultHeight,
            };
            return {
                ...area,
                ceilingMode: "raked",
                rakedCeiling:
                    role === "low"
                        ? { ...current, lowEdgeIndex: selectedEdge.edgeIndex }
                        : { ...current, highEdgeIndex: selectedEdge.edgeIndex },
            };
        });
    }

    function setRakedHeight(
        field: "lowHeightMm" | "highHeightMm",
        value: string,
    ) {
        updateSelectedArea((area) => {
            const defaultHeight = effectiveFlatHeight(area, ceilingHeightMm);
            const current = area.rakedCeiling ?? {
                lowEdgeIndex: -1,
                highEdgeIndex: -1,
                lowHeightMm: defaultHeight,
                highHeightMm: defaultHeight,
            };
            return {
                ...area,
                ceilingMode: "raked",
                rakedCeiling: {
                    ...current,
                    [field]: value ? Number(value) : null,
                },
            };
        });
    }

    function onStageClick() {
        if (scrollDragRef.current?.moved) return;
        if (isDrawingFreeShape) {
            const pointer = imagePointer();
            if (!pointer) return;
            const snapped = snapDraftPoint(pointer);
            if (
                draftPoints.length >= 3 &&
                draftPoints[0] &&
                pointDistance(pointer, draftPoints[0]) <= 14 / zoom
            ) {
                finishFreeShape(draftPoints);
            } else {
                setDraftPoints((points) => [...points, snapped.point]);
                setDraftPointer(null);
                setSnapGuide(null);
            }
            return;
        }
        if (!isSettingReference) return;
        const pointer = imagePointer();
        if (!pointer) return;
        if (referencePoints.length === 0) {
            setReferencePoints([pointer]);
        } else {
            const firstReferencePoint = referencePoints[0];
            if (!firstReferencePoint) return;
            setReferencePoints([firstReferencePoint, pointer]);
            setIsSettingReference(false);
        }
    }

    function applyScale() {
        if (referencePoints.length !== 2) return;
        const firstReferencePoint = referencePoints[0];
        const secondReferencePoint = referencePoints[1];
        if (!firstReferencePoint || !secondReferencePoint) return;
        const length = Number(referenceLengthMm);
        if (!Number.isFinite(length) || length <= 0) return;
        const distance = pointDistance(
            firstReferencePoint,
            secondReferencePoint,
        );
        setScaleMmPerPx(length / distance);
        setReferenceLengthMm(String(length));
        setDirty(true);
        setStatus("Scale updated");
        setIsSettingReference(false);
    }

    function startReferenceMode() {
        setReferencePoints([]);
        setIsSettingReference(true);
        setStatus("Click two points on the floorplan");
    }

    function imagePointer(): Point | null {
        if (!stageRef.current) return null;
        const pointer = stageRef.current.getPointerPosition();
        if (!pointer) return null;
        return [pointer.x / zoom, pointer.y / zoom];
    }

    function viewportCenterInImage(): Point {
        const element = canvasWrapRef.current;
        const scrollLeft = element?.scrollLeft ?? 0;
        const scrollTop = element?.scrollTop ?? 0;
        return [
            clamp((scrollLeft + viewport.width / 2) / zoom, 0, imageWidth),
            clamp((scrollTop + viewport.height / 2) / zoom, 0, imageHeight),
        ];
    }

    function changeZoom(nextZoom: number) {
        const clamped = Math.min(4, Math.max(0.25, nextZoom));
        const element = canvasWrapRef.current;
        const centerX = element
            ? (element.scrollLeft + element.clientWidth / 2) / zoom
            : 0;
        const centerY = element
            ? (element.scrollTop + element.clientHeight / 2) / zoom
            : 0;
        setZoom(clamped);
        window.requestAnimationFrame(() => {
            if (!element) return;
            element.scrollLeft = centerX * clamped - element.clientWidth / 2;
            element.scrollTop = centerY * clamped - element.clientHeight / 2;
        });
    }

    function resetView() {
        setZoom(1);
        const element = canvasWrapRef.current;
        if (element) {
            element.scrollLeft = 0;
            element.scrollTop = 0;
        }
    }

    function startScrollDrag(event: KonvaEventObject<MouseEvent>) {
        if (
            isSettingReference ||
            isDrawingFreeShape ||
            event.target !== event.target.getStage()
        )
            return;
        const element = canvasWrapRef.current;
        if (!element) return;
        scrollDragRef.current = {
            x: event.evt.clientX,
            y: event.evt.clientY,
            scrollLeft: element.scrollLeft,
            scrollTop: element.scrollTop,
            moved: false,
        };
        event.target.getStage()!.container().style.cursor = "grabbing";
    }

    function moveScrollDrag(event: KonvaEventObject<MouseEvent>) {
        if (isDrawingFreeShape) {
            const pointer = imagePointer();
            if (pointer) {
                const snapped = snapDraftPoint(pointer);
                setDraftPointer(snapped.point);
                setSnapGuide(snapped.guide);
            }
        }
        const drag = scrollDragRef.current;
        const element = canvasWrapRef.current;
        if (!drag || !element) return;
        const dx = event.evt.clientX - drag.x;
        const dy = event.evt.clientY - drag.y;
        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) drag.moved = true;
        element.scrollLeft = drag.scrollLeft - dx;
        element.scrollTop = drag.scrollTop - dy;
    }

    function endScrollDrag(event: KonvaEventObject<MouseEvent>) {
        if (!scrollDragRef.current) return;
        event.target.getStage()!.container().style.cursor =
            isSettingReference || isDrawingFreeShape ? "crosshair" : "grab";
        window.setTimeout(() => {
            scrollDragRef.current = null;
        }, 0);
    }

    function cursorForEdge(from: Point, to: Point) {
        const angle = Math.abs(
            (Math.atan2(to[1] - from[1], to[0] - from[0]) * 180) / Math.PI,
        );
        const normalized = angle > 90 ? 180 - angle : angle;
        if (normalized < 22.5) return "ns-resize";
        if (normalized < 67.5)
            return (to[1] - from[1]) * (to[0] - from[0]) >= 0
                ? "nesw-resize"
                : "nwse-resize";
        return "ew-resize";
    }

    function constrainEdgeDrag(
        overlaySnapshot: Overlay,
        areaId: string,
        edgeIndex: number,
        dx: number,
        dy: number,
    ) {
        const area = overlaySnapshot.areas.find((item) => item.id === areaId);
        if (!area || area.points.length < 2) return { dx, dy };
        const from = area.points[edgeIndex];
        const to = area.points[(edgeIndex + 1) % area.points.length];
        if (!from || !to) return { dx, dy };
        const angle = Math.abs(
            (Math.atan2(to[1] - from[1], to[0] - from[0]) * 180) / Math.PI,
        );
        const normalized = angle > 90 ? 180 - angle : angle;
        if (normalized < 22.5) return { dx: 0, dy };
        if (normalized > 67.5) return { dx, dy: 0 };
        return { dx, dy };
    }

    function clientPoint(event: KonvaEventObject<MouseEvent | TouchEvent>) {
        const evt = event.evt;
        if ("touches" in evt) {
            const touch = evt.touches[0] ?? evt.changedTouches[0];
            return { x: touch?.clientX ?? 0, y: touch?.clientY ?? 0 };
        }
        return { x: evt.clientX, y: evt.clientY };
    }

    function dragOffset(
        drag: DragState,
        event: KonvaEventObject<MouseEvent | TouchEvent>,
    ) {
        const pointer = clientPoint(event);
        return {
            dx: (pointer.x - drag.startClientX) / zoom,
            dy: (pointer.y - drag.startClientY) / zoom,
        };
    }

    function movedPointFromDrag(
        drag: DragState,
        area: AreaPolygon,
        pointIndex: number,
        event: KonvaEventObject<MouseEvent | TouchEvent>,
    ) {
        const offset = dragOffset(drag, event);
        const snapshotArea =
            drag.before.areas.find((item) => item.id === area.id) ?? area;
        const originalPoint =
            snapshotArea.points[pointIndex] ?? pointAt(area.points, pointIndex);
        const pointerPoint: Point = [
            originalPoint[0] + offset.dx,
            originalPoint[1] + offset.dy,
        ];
        return snapDraggedPoint(snapshotArea, pointIndex, pointerPoint);
    }

    function snapDraftPoint(pointer: Point) {
        const anchor = draftPoints[draftPoints.length - 1];
        return anchor
            ? snapToReferences(pointer, [anchor], zoom)
            : { point: pointer, guide: null };
    }

    function snapDraggedPoint(
        area: AreaPolygon,
        pointIndex: number,
        pointer: Point,
    ) {
        const previous = pointAt(
            area.points,
            (pointIndex - 1 + area.points.length) % area.points.length,
        );
        const next = pointAt(
            area.points,
            (pointIndex + 1) % area.points.length,
        );
        return snapToReferences(pointer, [previous, next], zoom);
    }

    async function save(refresh = true, automatic = false) {
        if (automatic) {
            setAutoSaving(true);
        } else {
            setSaving(true);
        }
        try {
            await savePageOverlay(project.id, page.id, {
                overlay,
                scaleMmPerPx,
                ceilingHeightMm,
                referencePoints:
                    referencePoints.length === 2 ? referencePoints : null,
                referenceLengthMm: referenceLengthMm
                    ? Number(referenceLengthMm)
                    : null,
            });
            setDirty(false);
            setStatus(`Saved ${new Date().toLocaleTimeString()}`);
            if (refresh) onSaved();
        } catch (error) {
            setStatus(error instanceof Error ? error.message : "Save failed");
        } finally {
            if (automatic) {
                setAutoSaving(false);
            } else {
                setSaving(false);
            }
        }
    }

    async function applyHeightToAllPages() {
        try {
            if (dirty) await save(false);
            await applyCeilingHeightToProject(project.id, ceilingHeightMm);
            setStatus("Ceiling height applied to all pages");
            onSaved();
        } catch (error) {
            setStatus(
                error instanceof Error
                    ? error.message
                    : "Unable to apply ceiling height",
            );
        }
    }

    async function applyScaleToAllPages() {
        if (!scaleMmPerPx || scaleMmPerPx <= 0) {
            setStatus("Set a reference before applying scale to all pages");
            return;
        }
        try {
            if (dirty) await save(false);
            await applyScaleToProject(project.id, scaleMmPerPx);
            setStatus("Scale applied to all pages");
            onSaved();
        } catch (error) {
            setStatus(
                error instanceof Error
                    ? error.message
                    : "Unable to apply scale",
            );
        }
    }

    function pageIssue(field: ValidationIssue["field"]) {
        return (
            validationIssues.find(
                (issue) => !issue.areaId && issue.field === field,
            )?.message ?? ""
        );
    }

    function areaIssue(areaId: string, field: ValidationIssue["field"]) {
        return (
            validationIssues.find(
                (issue) => issue.areaId === areaId && issue.field === field,
            )?.message ?? ""
        );
    }

    function hasPageHeightIssue() {
        return validationIssues.some(
            (issue) => issue.field === "ceilingHeightMm",
        );
    }

    function fieldError(message: string) {
        return <ValidationMessage message={message} />;
    }

    function renderCeilingControls(area: AreaPolygon) {
        return (
            <CeilingControls
                area={area}
                ceilingHeightMm={ceilingHeightMm}
                selectedEdge={selectedEdge}
                areaIssue={areaIssue}
                setCeilingMode={setCeilingMode}
                setRakedEdge={setRakedEdge}
                setRakedHeight={setRakedHeight}
                setSelectedAreaHeight={setSelectedAreaHeight}
            />
        );
    }
    useEditorAutosave({
        autoSaving,
        ceilingHeightMm,
        dirty,
        overlay,
        saving,
        scaleMmPerPx,
        save,
    });

    useEditorKeyboardShortcuts({
        isDrawingFreeShape,
        onCancelFreeShape: cancelFreeShape,
        onClearSelection: clearSelection,
        onDeleteSelection: deleteSelection,
        onRedo: redo,
        onUndo: undo,
        hasSelection,
    });

    return (
        <section className={ui.editorShell}>
            <div className={ui.panel}>
                <EditorToolbar
                    addMenuOpen={addMenuOpen}
                    autoSaving={autoSaving}
                    dirty={dirty}
                    futureCount={future.length}
                    historyCount={history.length}
                    overlayMode={overlayMode}
                    saving={saving}
                    selectedArea={selectedArea}
                    selectedPointCount={selectedPointIndexes.length}
                    zoom={zoom}
                    onAddPoint={addPoint}
                    onAddRectangle={addRectangle}
                    onChangeZoom={changeZoom}
                    onClearSelection={clearSelection}
                    onDeleteSelection={deleteSelection}
                    onRedo={redo}
                    onResetView={resetView}
                    onSave={() => void save()}
                    onSetAddMenuOpen={setAddMenuOpen}
                    onSetOverlayMode={setOverlayMode}
                    onSplitArea={splitArea}
                    onStartFreeShape={startFreeShape}
                    onStraightenSelectedPoints={straightenSelectedPoints}
                    onUndo={undo}
                    hasSelection={hasSelection}
                />
                <div className={ui.canvasWrap} ref={canvasWrapRef}>
                    {imageError && <p className={ui.error}>{imageError}</p>}
                    <Stage
                        width={stageWidth}
                        height={stageHeight}
                        ref={stageRef}
                        onClick={onStageClick}
                        onMouseEnter={(event) => {
                            event.target.getStage()!.container().style.cursor =
                                isSettingReference || isDrawingFreeShape
                                    ? "crosshair"
                                    : "grab";
                        }}
                        onMouseDown={startScrollDrag}
                        onMouseMove={moveScrollDrag}
                        onMouseUp={endScrollDrag}
                        onMouseLeave={endScrollDrag}
                    >
                        <Layer>
                            <Group scaleX={zoom} scaleY={zoom}>
                                <Rect
                                    width={imageWidth}
                                    height={imageHeight}
                                    fill={activeTheme.editor.stageBg}
                                    listening={false}
                                />
                                {image && (
                                    <KonvaImage
                                        image={image}
                                        width={imageWidth}
                                        height={imageHeight}
                                        listening={false}
                                    />
                                )}
                                {visibleAreas.map((area) => {
                                    const active = selectedAreaIds.includes(
                                        area.id,
                                    );
                                    return (
                                        <Line
                                            key={area.id}
                                            x={0}
                                            y={0}
                                            points={area.points.flat()}
                                            closed
                                            draggable={
                                                !isSettingReference &&
                                                !isDrawingFreeShape
                                            }
                                            fill={
                                                overlayMode === "walls"
                                                    ? "transparent"
                                                    : colorFor(
                                                          area.ceilingPlasterType,
                                                      ).fill
                                            }
                                            stroke="transparent"
                                            opacity={active ? 1 : 0.86}
                                            strokeWidth={0}
                                            onClick={(event) => {
                                                if (
                                                    isSettingReference ||
                                                    isDrawingFreeShape
                                                )
                                                    return;
                                                event.cancelBubble = true;
                                                selectArea(
                                                    area.id,
                                                    event.evt.ctrlKey ||
                                                        event.evt.metaKey,
                                                );
                                            }}
                                            onDragStart={(event) => {
                                                event.cancelBubble = true;
                                                const pointer =
                                                    clientPoint(event);
                                                polygonDragRef.current = {
                                                    before: cloneOverlay(
                                                        overlayRef.current,
                                                    ),
                                                    startClientX: pointer.x,
                                                    startClientY: pointer.y,
                                                };
                                            }}
                                            onDragMove={(event) => {
                                                event.cancelBubble = true;
                                                const drag =
                                                    polygonDragRef.current;
                                                if (!drag) return;
                                                const offset = dragOffset(
                                                    drag,
                                                    event,
                                                );
                                                event.target.position({
                                                    x: 0,
                                                    y: 0,
                                                });
                                                setOverlay({
                                                    ...drag.before,
                                                    areas: drag.before.areas.map(
                                                        (currentArea) =>
                                                            currentArea.id ===
                                                            area.id
                                                                ? {
                                                                      ...currentArea,
                                                                      points: currentArea.points.map(
                                                                          ([
                                                                              x,
                                                                              y,
                                                                          ]) =>
                                                                              [
                                                                                  x +
                                                                                      offset.dx,
                                                                                  y +
                                                                                      offset.dy,
                                                                              ] as Point,
                                                                      ),
                                                                  }
                                                                : currentArea,
                                                    ),
                                                });
                                                setDirty(true);
                                            }}
                                            onDragEnd={(event) => {
                                                event.cancelBubble = true;
                                                const pointer =
                                                    clientPoint(event);
                                                const drag =
                                                    polygonDragRef.current ?? {
                                                        before: cloneOverlay(
                                                            overlayRef.current,
                                                        ),
                                                        startClientX: pointer.x,
                                                        startClientY: pointer.y,
                                                    };
                                                const offset = dragOffset(
                                                    drag,
                                                    event,
                                                );
                                                event.target.position({
                                                    x: 0,
                                                    y: 0,
                                                });
                                                const next = {
                                                    ...drag.before,
                                                    areas: drag.before.areas.map(
                                                        (currentArea) =>
                                                            currentArea.id ===
                                                            area.id
                                                                ? {
                                                                      ...currentArea,
                                                                      points: currentArea.points.map(
                                                                          ([
                                                                              x,
                                                                              y,
                                                                          ]) =>
                                                                              [
                                                                                  x +
                                                                                      offset.dx,
                                                                                  y +
                                                                                      offset.dy,
                                                                              ] as Point,
                                                                      ),
                                                                  }
                                                                : currentArea,
                                                    ),
                                                };
                                                polygonDragRef.current = null;
                                                commitFromSnapshot(
                                                    drag.before,
                                                    next,
                                                );
                                            }}
                                        />
                                    );
                                })}
                                {visibleAreas.map((area) =>
                                    area.points.map((point, index) => {
                                        const nextIndex =
                                            (index + 1) % area.points.length;
                                        const next = pointAt(
                                            area.points,
                                            nextIndex,
                                        );
                                        const override =
                                            area.edgeOverrides?.[String(index)];
                                        const edgeSelected =
                                            selectedEdge?.areaId === area.id &&
                                            selectedEdge.edgeIndex === index;
                                        const areaSelected =
                                            selectedAreaIds.includes(area.id) &&
                                            selectedPoint == null &&
                                            selectedPointIndexes.length === 0;
                                        const selectedStroke =
                                            edgeSelected ||
                                            (!selectedEdge && areaSelected);
                                        const noPlaster = !!override?.noPlaster;
                                        const wallType =
                                            override?.wallPlasterType ??
                                            area.wallPlasterType;
                                        const lowRakedEdge =
                                            area.ceilingMode === "raked" &&
                                            area.rakedCeiling?.lowEdgeIndex ===
                                                index;
                                        const highRakedEdge =
                                            area.ceilingMode === "raked" &&
                                            area.rakedCeiling?.highEdgeIndex ===
                                                index;
                                        const edgeColor = lowRakedEdge
                                            ? LOW_EDGE_COLOR
                                            : highRakedEdge
                                              ? HIGH_EDGE_COLOR
                                              : noPlaster
                                                ? activeTheme.editor.noPlaster
                                                : colorFor(wallType).edge;
                                        return (
                                            <Line
                                                key={`edge-visible-${area.id}-${index}`}
                                                points={[
                                                    point[0],
                                                    point[1],
                                                    next[0],
                                                    next[1],
                                                ]}
                                                stroke={
                                                    overlayMode ===
                                                        "ceilings" ||
                                                    area.isOutdoor
                                                        ? "transparent"
                                                        : selectedStroke
                                                          ? SELECTED_COLOR
                                                          : edgeColor
                                                }
                                                strokeWidth={
                                                    (selectedStroke ||
                                                    lowRakedEdge ||
                                                    highRakedEdge
                                                        ? 6
                                                        : override
                                                          ? 4
                                                          : 3) / zoom
                                                }
                                                dash={
                                                    noPlaster
                                                        ? [10 / zoom, 7 / zoom]
                                                        : undefined
                                                }
                                                opacity={noPlaster ? 0.7 : 1}
                                                listening={false}
                                            />
                                        );
                                    }),
                                )}
                                {visibleAreas.map((area) =>
                                    area.points.map((point, index) => {
                                        const nextIndex =
                                            (index + 1) % area.points.length;
                                        const next = pointAt(
                                            area.points,
                                            nextIndex,
                                        );
                                        return (
                                            <Line
                                                key={`edge-hit-${area.id}-${index}`}
                                                points={[
                                                    point[0],
                                                    point[1],
                                                    next[0],
                                                    next[1],
                                                ]}
                                                stroke="transparent"
                                                strokeWidth={18 / zoom}
                                                draggable={
                                                    !isSettingReference &&
                                                    !isDrawingFreeShape
                                                }
                                                onClick={(event) => {
                                                    if (
                                                        isSettingReference ||
                                                        isDrawingFreeShape
                                                    )
                                                        return;
                                                    event.cancelBubble = true;
                                                    selectEdge(area.id, index);
                                                }}
                                                onMouseEnter={(event) => {
                                                    event.target
                                                        .getStage()!
                                                        .container().style.cursor =
                                                        cursorForEdge(
                                                            point,
                                                            next,
                                                        );
                                                }}
                                                onMouseLeave={(event) => {
                                                    event.target
                                                        .getStage()!
                                                        .container().style.cursor =
                                                        isSettingReference ||
                                                        isDrawingFreeShape
                                                            ? "crosshair"
                                                            : "grab";
                                                }}
                                                onDragStart={(event) => {
                                                    event.cancelBubble = true;
                                                    const pointer =
                                                        clientPoint(event);
                                                    edgeDragRef.current = {
                                                        before: cloneOverlay(
                                                            overlayRef.current,
                                                        ),
                                                        startClientX: pointer.x,
                                                        startClientY: pointer.y,
                                                    };
                                                }}
                                                onDragMove={(event) => {
                                                    event.cancelBubble = true;
                                                    const drag =
                                                        edgeDragRef.current;
                                                    if (!drag) return;
                                                    const rawOffset =
                                                        dragOffset(drag, event);
                                                    event.target.position({
                                                        x: 0,
                                                        y: 0,
                                                    });
                                                    const offset =
                                                        constrainEdgeDrag(
                                                            drag.before,
                                                            area.id,
                                                            index,
                                                            rawOffset.dx,
                                                            rawOffset.dy,
                                                        );
                                                    setOverlay({
                                                        ...drag.before,
                                                        areas: drag.before.areas.map(
                                                            (currentArea) =>
                                                                currentArea.id ===
                                                                area.id
                                                                    ? {
                                                                          ...currentArea,
                                                                          points: currentArea.points.map(
                                                                              (
                                                                                  p,
                                                                                  pointIndex,
                                                                              ) =>
                                                                                  pointIndex ===
                                                                                      index ||
                                                                                  pointIndex ===
                                                                                      nextIndex
                                                                                      ? ([
                                                                                            p[0] +
                                                                                                offset.dx,
                                                                                            p[1] +
                                                                                                offset.dy,
                                                                                        ] as Point)
                                                                                      : p,
                                                                          ),
                                                                      }
                                                                    : currentArea,
                                                        ),
                                                    });
                                                    setDirty(true);
                                                }}
                                                onDragEnd={(event) => {
                                                    event.cancelBubble = true;
                                                    const pointer =
                                                        clientPoint(event);
                                                    const drag =
                                                        edgeDragRef.current ?? {
                                                            before: cloneOverlay(
                                                                overlayRef.current,
                                                            ),
                                                            startClientX:
                                                                pointer.x,
                                                            startClientY:
                                                                pointer.y,
                                                        };
                                                    const rawOffset =
                                                        dragOffset(drag, event);
                                                    event.target.position({
                                                        x: 0,
                                                        y: 0,
                                                    });
                                                    const offset =
                                                        constrainEdgeDrag(
                                                            drag.before,
                                                            area.id,
                                                            index,
                                                            rawOffset.dx,
                                                            rawOffset.dy,
                                                        );
                                                    const nextOverlay = {
                                                        ...drag.before,
                                                        areas: drag.before.areas.map(
                                                            (currentArea) =>
                                                                currentArea.id ===
                                                                area.id
                                                                    ? {
                                                                          ...currentArea,
                                                                          points: currentArea.points.map(
                                                                              (
                                                                                  p,
                                                                                  pointIndex,
                                                                              ) =>
                                                                                  pointIndex ===
                                                                                      index ||
                                                                                  pointIndex ===
                                                                                      nextIndex
                                                                                      ? ([
                                                                                            p[0] +
                                                                                                offset.dx,
                                                                                            p[1] +
                                                                                                offset.dy,
                                                                                        ] as Point)
                                                                                      : p,
                                                                          ),
                                                                      }
                                                                    : currentArea,
                                                        ),
                                                    };
                                                    edgeDragRef.current = null;
                                                    commitFromSnapshot(
                                                        drag.before,
                                                        nextOverlay,
                                                    );
                                                }}
                                            />
                                        );
                                    }),
                                )}
                                {selectedArea?.points.map((point, index) => (
                                    <Circle
                                        key={`${selectedArea.id}-${index}`}
                                        x={point[0]}
                                        y={point[1]}
                                        radius={
                                            (selectedEdge?.areaId ===
                                                selectedArea.id &&
                                            (selectedEdge.edgeIndex === index ||
                                                (selectedEdge.edgeIndex + 1) %
                                                    selectedArea.points
                                                        .length ===
                                                    index)
                                                ? 9
                                                : 7) / zoom
                                        }
                                        fill={
                                            selectedPointIndexes.includes(index)
                                                ? SELECTED_POINT_COLOR
                                                : (selectedEdge?.areaId ===
                                                        selectedArea.id &&
                                                        (selectedEdge.edgeIndex ===
                                                            index ||
                                                            (selectedEdge.edgeIndex +
                                                                1) %
                                                                selectedArea
                                                                    .points
                                                                    .length ===
                                                                index)) ||
                                                    (!selectedEdge &&
                                                        selectedAreaIds.includes(
                                                            selectedArea.id,
                                                        ) &&
                                                        selectedPoint == null &&
                                                        selectedPointIndexes.length ===
                                                            0)
                                                  ? SELECTED_COLOR
                                                  : activeTheme.editor.point
                                        }
                                        stroke="white"
                                        strokeWidth={
                                            (selectedEdge?.areaId ===
                                                selectedArea.id &&
                                            (selectedEdge.edgeIndex === index ||
                                                (selectedEdge.edgeIndex + 1) %
                                                    selectedArea.points
                                                        .length ===
                                                    index)
                                                ? 3
                                                : 2) / zoom
                                        }
                                        draggable={
                                            !isSettingReference &&
                                            !isDrawingFreeShape
                                        }
                                        onClick={(event) => {
                                            if (
                                                isSettingReference ||
                                                isDrawingFreeShape
                                            )
                                                return;
                                            event.cancelBubble = true;
                                            selectPoint(
                                                index,
                                                event.evt.ctrlKey ||
                                                    event.evt.metaKey,
                                            );
                                        }}
                                        onDragStart={(event) => {
                                            event.cancelBubble = true;
                                            const pointer = clientPoint(event);
                                            pointDragRef.current = {
                                                before: cloneOverlay(
                                                    overlayRef.current,
                                                ),
                                                startClientX: pointer.x,
                                                startClientY: pointer.y,
                                            };
                                        }}
                                        onDragMove={(event) => {
                                            event.cancelBubble = true;
                                            const drag = pointDragRef.current;
                                            if (!drag) return;
                                            const snapped = movedPointFromDrag(
                                                drag,
                                                selectedArea,
                                                index,
                                                event,
                                            );
                                            const nextPoint = snapped.point;
                                            event.target.position({
                                                x: nextPoint[0],
                                                y: nextPoint[1],
                                            });
                                            setSnapGuide(snapped.guide);
                                            setOverlay({
                                                ...drag.before,
                                                areas: drag.before.areas.map(
                                                    (area) =>
                                                        area.id ===
                                                        selectedArea.id
                                                            ? {
                                                                  ...area,
                                                                  points: area.points.map(
                                                                      (p, i) =>
                                                                          i ===
                                                                          index
                                                                              ? nextPoint
                                                                              : p,
                                                                  ),
                                                              }
                                                            : area,
                                                ),
                                            });
                                            setDirty(true);
                                        }}
                                        onDragEnd={(event) => {
                                            event.cancelBubble = true;
                                            const pointer = clientPoint(event);
                                            const drag =
                                                pointDragRef.current ?? {
                                                    before: cloneOverlay(
                                                        overlayRef.current,
                                                    ),
                                                    startClientX: pointer.x,
                                                    startClientY: pointer.y,
                                                };
                                            const snapped = movedPointFromDrag(
                                                drag,
                                                selectedArea,
                                                index,
                                                event,
                                            );
                                            const nextPoint = snapped.point;
                                            event.target.position({
                                                x: nextPoint[0],
                                                y: nextPoint[1],
                                            });
                                            const next = {
                                                ...drag.before,
                                                areas: drag.before.areas.map(
                                                    (area) =>
                                                        area.id ===
                                                        selectedArea.id
                                                            ? {
                                                                  ...area,
                                                                  points: area.points.map(
                                                                      (p, i) =>
                                                                          i ===
                                                                          index
                                                                              ? nextPoint
                                                                              : p,
                                                                  ),
                                                              }
                                                            : area,
                                                ),
                                            };
                                            pointDragRef.current = null;
                                            commitFromSnapshot(
                                                drag.before,
                                                next,
                                            );
                                            setSnapGuide(null);
                                        }}
                                    />
                                ))}
                                {snapGuide?.x != null && (
                                    <Line
                                        points={[
                                            snapGuide.x,
                                            0,
                                            snapGuide.x,
                                            imageHeight,
                                        ]}
                                        stroke={activeTheme.editor.draft}
                                        strokeWidth={2 / zoom}
                                        dash={[8 / zoom, 6 / zoom]}
                                        listening={false}
                                    />
                                )}
                                {snapGuide?.y != null && (
                                    <Line
                                        points={[
                                            0,
                                            snapGuide.y,
                                            imageWidth,
                                            snapGuide.y,
                                        ]}
                                        stroke={activeTheme.editor.draft}
                                        strokeWidth={2 / zoom}
                                        dash={[8 / zoom, 6 / zoom]}
                                        listening={false}
                                    />
                                )}
                                {referencePoints.map((point, index) => (
                                    <Circle
                                        key={`ref-${index}`}
                                        x={point[0]}
                                        y={point[1]}
                                        radius={8 / zoom}
                                        fill={activeTheme.editor.draft}
                                        stroke="white"
                                        strokeWidth={2 / zoom}
                                    />
                                ))}
                                {referencePoints.length === 2 && (
                                    <Line
                                        points={referencePoints.flat()}
                                        stroke={activeTheme.editor.draft}
                                        strokeWidth={3 / zoom}
                                        dash={[8 / zoom, 6 / zoom]}
                                    />
                                )}
                                {draftPoints.length > 0 && (
                                    <>
                                        <Line
                                            points={(draftPointer
                                                ? [...draftPoints, draftPointer]
                                                : draftPoints
                                            ).flat()}
                                            stroke={activeTheme.editor.draft}
                                            strokeWidth={3 / zoom}
                                            dash={[8 / zoom, 6 / zoom]}
                                        />
                                        {draftPoints.map((point, index) => (
                                            <Circle
                                                key={`draft-${index}`}
                                                x={point[0]}
                                                y={point[1]}
                                                radius={
                                                    (index === 0 ? 9 : 6) / zoom
                                                }
                                                fill={
                                                    index === 0
                                                        ? SELECTED_COLOR
                                                        : activeTheme.editor
                                                              .draft
                                                }
                                                stroke="white"
                                                strokeWidth={2 / zoom}
                                                listening={false}
                                            />
                                        ))}
                                    </>
                                )}
                            </Group>
                        </Layer>
                    </Stage>
                </div>
            </div>

            <EditorSidebar
                page={page}
                status={status}
                dirty={dirty}
                ceilingHeightMm={ceilingHeightMm}
                scaleMmPerPx={scaleMmPerPx}
                referencePoints={referencePoints}
                referenceLengthMm={referenceLengthMm}
                isSettingReference={isSettingReference}
                summary={summary}
                visibleAreas={visibleAreas}
                selectedAreaIds={selectedAreaIds}
                selectedArea={selectedArea}
                selectedEdgeArea={selectedEdgeArea}
                selectedEdge={selectedEdge}
                selectedEdgeOverride={selectedEdgeOverride}
                selectedPointIndexes={selectedPointIndexes}
                metrics={metrics}
                areaIssue={areaIssue}
                applyHeightToAllPages={applyHeightToAllPages}
                applyScale={applyScale}
                applyScaleToAllPages={applyScaleToAllPages}
                clearSelectedEdgeOverride={clearSelectedEdgeOverride}
                commonMaterialValue={commonMaterialValue}
                fieldError={fieldError}
                hasPageHeightIssue={hasPageHeightIssue}
                pageIssue={pageIssue}
                renderCeilingControls={renderCeilingControls}
                selectArea={selectArea}
                setCeilingHeightMm={setCeilingHeightMm}
                setDirty={setDirty}
                setIsSettingReference={setIsSettingReference}
                setMaterial={setMaterial}
                setReferenceLengthMm={setReferenceLengthMm}
                setReferencePoints={setReferencePoints}
                setSelectedEdgeMaterial={setSelectedEdgeMaterial}
                setSelectedEdgeNoPlaster={setSelectedEdgeNoPlaster}
                startReferenceMode={startReferenceMode}
                toggleOutdoor={toggleOutdoor}
                updateArea={updateArea}
            />
        </section>
    );
}
