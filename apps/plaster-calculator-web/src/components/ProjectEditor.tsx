"use client";

import {
    AlignHorizontalJustifyCenter,
    CopyPlus,
    Loader2,
    Minus,
    MousePointer2,
    Plus,
    Redo2,
    Save,
    Scissors,
    Square,
    Trash2,
    Undo2,
    ZoomIn,
} from "lucide-react";
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

import {
    applyCeilingHeightToProject,
    applyScaleToProject,
    savePageOverlay,
} from "../lib/api.js";
import { activeTheme, cx, ui } from "../lib/styles.js";

import type {
    PageValidationInput,
    ValidationIssue,
} from "../lib/validation.js";
import type {
    AreaPolygon,
    EdgeOverride,
    FloorplanPage,
    Overlay,
    Point,
    ProjectDetail,
} from "../types.js";
import type { KonvaEventObject } from "konva/lib/Node.js";
import type { Stage as KonvaStage } from "konva/lib/Stage.js";

const BOARD_TYPES = [
    "Recessed Edge",
    "Water Resistant",
    "Sound Check",
] as const;
type BoardType = (typeof BOARD_TYPES)[number];
const DEFAULT_BOARD_COLOR = activeTheme.editor.boardColors["Recessed Edge"];
const BOARD_COLORS = activeTheme.editor.boardColors;
const BOARD_SWATCH_CLASSES: Record<BoardType, string> = {
    "Recessed Edge": "bg-slate-700 dark:bg-slate-300",
    "Water Resistant": "bg-blue-600",
    "Sound Check": "bg-orange-700",
};
const SELECTED_COLOR = activeTheme.editor.selected;
const SELECTED_POINT_COLOR = activeTheme.editor.selectedPoint;
const LOW_EDGE_COLOR = activeTheme.editor.lowEdge;
const HIGH_EDGE_COLOR = activeTheme.editor.highEdge;
const SNAP_THRESHOLD_PX = 10;
type OverlayMode = "walls" | "ceilings" | "both";
type SnapGuide = { x?: number; y?: number } | null;
type DragState = {
    before: Overlay;
    startClientX: number;
    startClientY: number;
};

export default function ProjectEditor({
    project,
    page,
    onSaved,
    onDraftChange,
    validationIssues = [],
}: {
    project: ProjectDetail;
    page: FloorplanPage;
    onSaved: () => void;
    onDraftChange?: (pageId: string, draft: PageValidationInput) => void;
    validationIssues?: ValidationIssue[];
}) {
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [imageError, setImageError] = useState("");
    const [overlay, setOverlay] = useState<Overlay>(() =>
        parseOverlay(page.overlay),
    );
    const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
    const [selectedAreaIds, setSelectedAreaIds] = useState<string[]>([]);
    const [selectedEdge, setSelectedEdge] = useState<{
        areaId: string;
        edgeIndex: number;
    } | null>(null);
    const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
    const [selectedPointIndexes, setSelectedPointIndexes] = useState<number[]>(
        [],
    );
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
    const [viewport, setViewport] = useState({ width: 1200, height: 760 });
    const [dirty, setDirty] = useState(false);
    const [saving, setSaving] = useState(false);
    const [autoSaving, setAutoSaving] = useState(false);
    const [status, setStatus] = useState("");
    const [history, setHistory] = useState<Overlay[]>([]);
    const [future, setFuture] = useState<Overlay[]>([]);
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

    useEffect(() => {
        setImage(null);
        setImageError("");
        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.onload = () => setImage(img);
        img.onerror = () =>
            setImageError(`Could not load floorplan image: ${page.imageUrl}`);
        img.src = page.imageUrl;
    }, [page.imageUrl]);

    useEffect(() => {
        setOverlay(parseOverlay(page.overlay));
        setScaleMmPerPx(page.scaleMmPerPx);
        setCeilingHeightMm(page.ceilingHeightMm);
        setReferencePoints(parseReferencePoints(page.referencePoints));
        setReferenceLengthMm(page.referenceLengthMm?.toString() ?? "");
        setDirty(false);
        setHistory([]);
        setFuture([]);
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
        const element = canvasWrapRef.current;
        if (!element) return;
        const update = () =>
            setViewport({
                width: element.clientWidth,
                height: element.clientHeight,
            });
        update();
        const observer = new ResizeObserver(update);
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const timer = window.setInterval(() => {
            if (dirty && !saving && !autoSaving) void save(false, true);
        }, 15000);
        return () => window.clearInterval(timer);
    }, [dirty, overlay, scaleMmPerPx, ceilingHeightMm, saving, autoSaving]);

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

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            const target = event.target as HTMLElement | null;
            if (
                target &&
                ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)
            )
                return;
            if (
                (event.ctrlKey || event.metaKey) &&
                event.key.toLowerCase() === "z"
            ) {
                event.preventDefault();
                undo();
                return;
            }
            if (
                (event.ctrlKey || event.metaKey) &&
                (event.key.toLowerCase() === "y" ||
                    (event.shiftKey && event.key.toLowerCase() === "z"))
            ) {
                event.preventDefault();
                redo();
                return;
            }
            if (event.key === "Delete" || event.key === "Backspace") {
                event.preventDefault();
                deleteSelection();
                return;
            }
            if (event.key === "Escape" && isDrawingFreeShape) {
                event.preventDefault();
                cancelFreeShape();
                return;
            }
            if (event.key === "Escape" && hasSelection()) {
                event.preventDefault();
                clearSelection();
            }
        }
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [
        history,
        future,
        overlay,
        selectedAreaId,
        selectedAreaIds,
        selectedEdge,
        selectedPoint,
        selectedPointIndexes,
        isDrawingFreeShape,
        draftPoints,
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

    function commit(next: Overlay) {
        setHistory((items) => [...items.slice(-49), cloneOverlay(overlay)]);
        setFuture([]);
        setOverlay(next);
        setDirty(true);
        setStatus("Unsaved changes");
    }

    function commitFromSnapshot(before: Overlay, next: Overlay) {
        setHistory((items) => [...items.slice(-49), cloneOverlay(before)]);
        setFuture([]);
        setOverlay(next);
        setDirty(true);
        setStatus("Unsaved changes");
    }

    function clearSelection() {
        setSelectedAreaId(null);
        setSelectedAreaIds([]);
        setSelectedEdge(null);
        setSelectedPoint(null);
        setSelectedPointIndexes([]);
    }

    function hasSelection() {
        return (
            !!selectedAreaId ||
            selectedAreaIds.length > 0 ||
            !!selectedEdge ||
            selectedPoint != null ||
            selectedPointIndexes.length > 0
        );
    }

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

    function undo() {
        const previous = history[history.length - 1];
        if (!previous) return;
        setFuture((items) => [cloneOverlay(overlay), ...items]);
        setHistory((items) => items.slice(0, -1));
        setOverlay(previous);
        setDirty(true);
    }

    function redo() {
        const next = future[0];
        if (!next) return;
        setHistory((items) => [...items, cloneOverlay(overlay)]);
        setFuture((items) => items.slice(1));
        setOverlay(next);
        setDirty(true);
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

    function selectPoint(index: number, additive: boolean) {
        setSelectedEdge(null);
        setSelectedPoint(index);
        if (!additive) {
            setSelectedPointIndexes([index]);
            return;
        }
        setSelectedPointIndexes((current) => {
            if (current.includes(index))
                return current.filter((item) => item !== index);
            return [...current, index];
        });
    }

    function selectArea(areaId: string, additive: boolean) {
        setSelectedEdge(null);
        setSelectedPoint(null);
        setSelectedPointIndexes([]);
        if (!additive) {
            setSelectedAreaId(areaId);
            setSelectedAreaIds([areaId]);
            return;
        }
        setSelectedAreaIds((current) => {
            const next = current.includes(areaId)
                ? current.filter((id) => id !== areaId)
                : [...current, areaId];
            setSelectedAreaId(
                next.includes(areaId)
                    ? areaId
                    : (next[next.length - 1] ?? null),
            );
            return next;
        });
    }

    function commonMaterialValue(
        field: "wallPlasterType" | "ceilingPlasterType",
    ) {
        const values = selectedAreas.map((area) => area[field]);
        if (values.length === 0) return "";
        return values.every((value) => value === values[0]) ? values[0] : "";
    }

    function selectEdge(areaId: string, edgeIndex: number) {
        setSelectedAreaId(areaId);
        setSelectedAreaIds([areaId]);
        setSelectedPoint(null);
        setSelectedPointIndexes([]);
        setSelectedEdge({ areaId, edgeIndex });
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
        return message ? (
            <span className={ui.fieldError}>{message}</span>
        ) : null;
    }

    function renderCeilingControls(area: AreaPolygon) {
        const mode = area.ceilingMode ?? "flat";
        const raked = area.rakedCeiling;
        const roomHeightError = areaIssue(area.id, "ceilingHeightMm");
        const lowEdgeError = areaIssue(area.id, "rakedLowEdge");
        const highEdgeError = areaIssue(area.id, "rakedHighEdge");
        const lowHeightError = areaIssue(area.id, "rakedLowHeight");
        const highHeightError = areaIssue(area.id, "rakedHighHeight");
        return (
            <>
                <div className={ui.field}>
                    <label>Room ceiling</label>
                    <select
                        className={ui.input}
                        value={mode}
                        onChange={(event) =>
                            setCeilingMode(
                                event.target.value as "flat" | "raked",
                            )
                        }
                    >
                        <option value="flat">Flat</option>
                        <option value="raked">Raked</option>
                    </select>
                </div>
                {mode === "flat" && (
                    <div className={ui.field}>
                        <label>Room height override mm</label>
                        <input
                            className={cx(
                                ui.input,
                                roomHeightError && ui.inputInvalid,
                            )}
                            type="number"
                            placeholder={
                                ceilingHeightMm == null
                                    ? "Page height not set"
                                    : String(ceilingHeightMm)
                            }
                            value={area.ceilingHeightMm ?? ""}
                            onChange={(event) =>
                                setSelectedAreaHeight(event.target.value)
                            }
                        />
                        {fieldError(roomHeightError)}
                    </div>
                )}
                {mode === "raked" && (
                    <>
                        <div className={ui.buttonRow}>
                            <button
                                className={cx(
                                    ui.button,
                                    ui.buttonDefault,
                                    lowEdgeError && ui.buttonInvalid,
                                )}
                                onClick={() => setRakedEdge("low")}
                                disabled={
                                    !selectedEdge ||
                                    selectedEdge.areaId !== area.id
                                }
                            >
                                Set selected low edge
                            </button>
                            <button
                                className={cx(
                                    ui.button,
                                    ui.buttonDefault,
                                    highEdgeError && ui.buttonInvalid,
                                )}
                                onClick={() => setRakedEdge("high")}
                                disabled={
                                    !selectedEdge ||
                                    selectedEdge.areaId !== area.id
                                }
                            >
                                Set selected high edge
                            </button>
                        </div>
                        {(lowEdgeError || highEdgeError) && (
                            <span className={ui.fieldError}>
                                {lowEdgeError || highEdgeError}
                            </span>
                        )}
                        <div className={ui.metric}>
                            Low edge:{" "}
                            {raked && raked.lowEdgeIndex >= 0
                                ? raked.lowEdgeIndex + 1
                                : "-"}{" "}
                            | High edge:{" "}
                            {raked && raked.highEdgeIndex >= 0
                                ? raked.highEdgeIndex + 1
                                : "-"}
                        </div>
                        <div className={ui.field}>
                            <label>Low height mm</label>
                            <input
                                className={cx(
                                    ui.input,
                                    lowHeightError && ui.inputInvalid,
                                )}
                                type="number"
                                value={raked?.lowHeightMm ?? ""}
                                onChange={(event) =>
                                    setRakedHeight(
                                        "lowHeightMm",
                                        event.target.value,
                                    )
                                }
                            />
                            {fieldError(lowHeightError)}
                        </div>
                        <div className={ui.field}>
                            <label>High height mm</label>
                            <input
                                className={cx(
                                    ui.input,
                                    highHeightError && ui.inputInvalid,
                                )}
                                type="number"
                                value={raked?.highHeightMm ?? ""}
                                onChange={(event) =>
                                    setRakedHeight(
                                        "highHeightMm",
                                        event.target.value,
                                    )
                                }
                            />
                            {fieldError(highHeightError)}
                        </div>
                    </>
                )}
            </>
        );
    }

    return (
        <section className={ui.editorShell}>
            <div className={ui.panel}>
                <div className={ui.editorToolbar}>
                    <div className={ui.buttonRow}>
                        <button
                            className={cx(
                                ui.button,
                                ui.buttonDefault,
                                ui.buttonIcon,
                            )}
                            onClick={undo}
                            disabled={history.length === 0}
                            title="Undo"
                        >
                            <Undo2 size={18} />
                        </button>
                        <button
                            className={cx(
                                ui.button,
                                ui.buttonDefault,
                                ui.buttonIcon,
                            )}
                            onClick={redo}
                            disabled={future.length === 0}
                            title="Redo"
                        >
                            <Redo2 size={18} />
                        </button>
                        <button
                            className={cx(
                                ui.button,
                                ui.buttonDefault,
                                ui.buttonIcon,
                            )}
                            onClick={clearSelection}
                            disabled={!hasSelection()}
                            title="Deselect all"
                        >
                            <MousePointer2 size={18} />
                        </button>
                        <div className="relative">
                            <button
                                className={cx(
                                    ui.button,
                                    ui.buttonDefault,
                                    ui.buttonIcon,
                                )}
                                onClick={() => setAddMenuOpen((open) => !open)}
                                title="Add area"
                            >
                                <Plus size={18} />
                            </button>
                            {addMenuOpen && (
                                <div className={ui.popoverMenu}>
                                    <button
                                        className={cx(
                                            ui.button,
                                            ui.buttonDefault,
                                        )}
                                        onClick={addRectangle}
                                    >
                                        <Square size={16} /> Rectangle
                                    </button>
                                    <button
                                        className={cx(
                                            ui.button,
                                            ui.buttonDefault,
                                        )}
                                        onClick={startFreeShape}
                                    >
                                        <MousePointer2 size={16} /> Free shape
                                    </button>
                                </div>
                            )}
                        </div>
                        <button
                            className={cx(
                                ui.button,
                                ui.buttonDefault,
                                ui.buttonIcon,
                            )}
                            onClick={addPoint}
                            disabled={!selectedArea}
                            title="Add point"
                        >
                            <CopyPlus size={18} />
                        </button>
                        <button
                            className={cx(
                                ui.button,
                                ui.buttonDefault,
                                ui.buttonIcon,
                            )}
                            onClick={straightenSelectedPoints}
                            disabled={
                                !selectedArea ||
                                selectedPointIndexes.length !== 2
                            }
                            title="Straighten between selected points"
                        >
                            <AlignHorizontalJustifyCenter size={18} />
                        </button>
                        <button
                            className={cx(
                                ui.button,
                                ui.buttonDefault,
                                ui.buttonIcon,
                            )}
                            onClick={splitArea}
                            disabled={
                                !selectedArea ||
                                selectedPointIndexes.length !== 2
                            }
                            title="Split selected polygon"
                        >
                            <Scissors size={18} />
                        </button>
                        <button
                            className={cx(
                                ui.button,
                                ui.buttonDefault,
                                ui.buttonIcon,
                            )}
                            onClick={deleteSelection}
                            disabled={!selectedArea}
                            title={
                                selectedPointIndexes.length > 0
                                    ? "Delete selected points"
                                    : "Delete selected area"
                            }
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                    <div className={ui.buttonRow}>
                        <button
                            className={cx(
                                ui.button,
                                ui.buttonDefault,
                                ui.buttonIcon,
                            )}
                            onClick={() => changeZoom(zoom - 0.15)}
                            title="Zoom out"
                        >
                            <Minus size={18} />
                        </button>
                        <button
                            className={cx(ui.button, ui.buttonDefault)}
                            onClick={resetView}
                            title="Reset zoom"
                        >
                            <ZoomIn size={18} /> {Math.round(zoom * 100)}%
                        </button>
                        <button
                            className={cx(
                                ui.button,
                                ui.buttonDefault,
                                ui.buttonIcon,
                            )}
                            onClick={() => changeZoom(zoom + 0.15)}
                            title="Zoom in"
                        >
                            <Plus size={18} />
                        </button>
                        <div className={ui.segmented}>
                            {(
                                ["walls", "ceilings", "both"] as OverlayMode[]
                            ).map((mode) => (
                                <button
                                    key={mode}
                                    className={cx(
                                        ui.segmentedButton,
                                        overlayMode === mode &&
                                            ui.segmentedButtonActive,
                                    )}
                                    onClick={() => setOverlayMode(mode)}
                                >
                                    {mode === "walls"
                                        ? "Walls"
                                        : mode === "ceilings"
                                          ? "Ceilings"
                                          : "Both"}
                                </button>
                            ))}
                        </div>
                        <button
                            className={cx(ui.button, ui.buttonPrimary)}
                            onClick={() => void save()}
                            disabled={saving || autoSaving || !dirty}
                        >
                            {saving || autoSaving ? (
                                <Loader2 className="animate-spin" size={18} />
                            ) : (
                                <Save size={18} />
                            )}
                            {autoSaving
                                ? "Auto Saving"
                                : saving
                                  ? "Saving"
                                  : "Save"}
                        </button>
                    </div>
                </div>

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

            <aside className={ui.inspector}>
                <section className={cx(ui.panel, ui.stack)}>
                    <h3>Page {page.pageNumber}</h3>
                    <span className={ui.muted}>
                        {status || "Ready"}{" "}
                        {dirty ? "- autosaves every 15 seconds" : ""}
                    </span>
                    <div className={ui.field}>
                        <label>Ceiling height mm</label>
                        <input
                            className={cx(
                                ui.input,
                                hasPageHeightIssue() && ui.inputInvalid,
                            )}
                            type="number"
                            value={ceilingHeightMm ?? ""}
                            onChange={(event) => {
                                setCeilingHeightMm(
                                    event.target.value
                                        ? Number(event.target.value)
                                        : null,
                                );
                                setDirty(true);
                            }}
                        />
                        {hasPageHeightIssue() &&
                            fieldError("Ceiling height is required")}
                    </div>
                    <button
                        className={cx(ui.button, ui.buttonDefault)}
                        onClick={applyHeightToAllPages}
                    >
                        Apply height to all pages
                    </button>
                </section>

                <section className={cx(ui.panel, ui.stack)}>
                    <h3>Scale</h3>
                    <div className={ui.buttonRow}>
                        <button
                            className={cx(
                                ui.button,
                                isSettingReference
                                    ? ui.buttonPrimary
                                    : ui.buttonDefault,
                            )}
                            onClick={
                                isSettingReference
                                    ? () => setIsSettingReference(false)
                                    : startReferenceMode
                            }
                        >
                            <MousePointer2 size={18} />{" "}
                            {isSettingReference
                                ? "Cancel reference"
                                : "Set reference"}
                        </button>
                        <button
                            className={cx(ui.button, ui.buttonDefault)}
                            onClick={() => {
                                setReferencePoints([]);
                                setIsSettingReference(false);
                            }}
                        >
                            Reset
                        </button>
                    </div>
                    <p className={ui.muted}>
                        {isSettingReference
                            ? "Click two points on the image."
                            : `${referencePoints.length}/2 reference points set.`}
                    </p>
                    <div className={ui.field}>
                        <label>Reference length mm</label>
                        <input
                            className={cx(
                                ui.input,
                                pageIssue("reference") && ui.inputInvalid,
                            )}
                            value={referenceLengthMm}
                            onChange={(event) => {
                                setReferenceLengthMm(event.target.value);
                                setDirty(true);
                            }}
                            type="number"
                        />
                        {fieldError(pageIssue("reference"))}
                    </div>
                    <button
                        className={cx(ui.button, ui.buttonPrimary)}
                        onClick={applyScale}
                        disabled={referencePoints.length !== 2}
                    >
                        Apply scale
                    </button>
                    <button
                        className={cx(ui.button, ui.buttonDefault)}
                        onClick={applyScaleToAllPages}
                        disabled={!scaleMmPerPx}
                    >
                        Apply scale to all pages
                    </button>
                    <div className={ui.metric}>
                        Scale:{" "}
                        {scaleMmPerPx
                            ? `${scaleMmPerPx.toFixed(3)} mm/px`
                            : "not set"}
                    </div>
                </section>

                <section className={cx(ui.panel, ui.stack)}>
                    <h3>Summary</h3>
                    {!summary && (
                        <div className={ui.validationCta}>
                            <p
                                className={
                                    pageIssue("reference") ? ui.error : ui.muted
                                }
                            >
                                {pageIssue("reference") ||
                                    "Summary is not available because reference is not yet set."}
                            </p>
                            <button
                                className={cx(ui.button, ui.buttonPrimary)}
                                onClick={startReferenceMode}
                            >
                                <MousePointer2 size={18} /> Set reference
                            </button>
                        </div>
                    )}
                    {summary && (
                        <>
                            <div className={ui.field}>
                                <span className={ui.label}>Wall length</span>
                                {summary.wallTotals.length === 0 && (
                                    <p className={ui.muted}>
                                        No counted wall lengths.
                                    </p>
                                )}
                                {summary.wallTotals.map(([type, total]) => (
                                    <div
                                        className={ui.metric}
                                        key={`wall-${type}`}
                                    >
                                        {type}: {total.toFixed(2)} m
                                    </div>
                                ))}
                            </div>
                            <div className={ui.field}>
                                <span className={ui.label}>Ceiling area</span>
                                {summary.ceilingTotals.map(([type, total]) => (
                                    <div
                                        className={ui.metric}
                                        key={`ceiling-${type}`}
                                    >
                                        {type}: {total.toFixed(2)} m2
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </section>

                <section className={cx(ui.panel, ui.stack)}>
                    <h3>Areas</h3>
                    <div className={ui.buttonRow}>
                        {BOARD_TYPES.map((type) => (
                            <span
                                className={cx(
                                    ui.muted,
                                    "inline-flex items-center gap-1.5",
                                )}
                                key={type}
                            >
                                <span
                                    className={cx(
                                        "inline-block h-3 w-3 rounded",
                                        BOARD_SWATCH_CLASSES[type],
                                    )}
                                />
                                {type}
                            </span>
                        ))}
                    </div>
                    <div className={ui.areaList}>
                        {visibleAreas.map((area) => (
                            <button
                                className={cx(
                                    ui.areaRow,
                                    selectedAreaIds.includes(area.id) &&
                                        ui.areaRowActive,
                                )}
                                key={area.id}
                                onClick={(event) => {
                                    selectArea(
                                        area.id,
                                        event.ctrlKey || event.metaKey,
                                    );
                                }}
                            >
                                <strong>{area.label}</strong>
                            </button>
                        ))}
                    </div>
                </section>

                <section className={cx(ui.panel, ui.stack)}>
                    <h3>Selection</h3>
                    {!selectedArea && !selectedEdgeArea && (
                        <p className={ui.muted}>
                            Select an area to edit labels and board types.
                        </p>
                    )}
                    {selectedEdgeArea && selectedEdge && (
                        <>
                            <div className={ui.metric}>
                                Edge {selectedEdge.edgeIndex + 1} selected in{" "}
                                {selectedEdgeArea.label}
                            </div>
                            {selectedAreaIds.length === 1 &&
                                selectedArea?.id === selectedEdgeArea.id &&
                                renderCeilingControls(selectedArea)}
                            <label
                                className={cx(
                                    ui.button,
                                    ui.buttonDefault,
                                    "justify-start",
                                )}
                            >
                                <input
                                    type="checkbox"
                                    checked={!!selectedEdgeOverride?.noPlaster}
                                    onChange={(event) =>
                                        setSelectedEdgeNoPlaster(
                                            event.target.checked,
                                        )
                                    }
                                />
                                No plaster
                            </label>
                            <div className={ui.field}>
                                <label>Wall board</label>
                                <select
                                    className={ui.input}
                                    value={
                                        selectedEdgeOverride?.wallPlasterType ??
                                        selectedEdgeArea.wallPlasterType
                                    }
                                    onChange={(event) =>
                                        setSelectedEdgeMaterial(
                                            event.target.value,
                                        )
                                    }
                                    disabled={
                                        !!selectedEdgeOverride?.noPlaster ||
                                        !!selectedEdgeArea.isOutdoor
                                    }
                                >
                                    {BOARD_TYPES.map((type) => (
                                        <option key={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                            <button
                                className={cx(ui.button, ui.buttonDefault)}
                                onClick={clearSelectedEdgeOverride}
                                disabled={!selectedEdgeOverride}
                            >
                                Clear override
                            </button>
                        </>
                    )}
                    {!selectedEdge &&
                        selectedArea &&
                        selectedAreaIds.length > 1 && (
                            <>
                                <div className={ui.metric}>
                                    {selectedAreaIds.length} areas selected.
                                    Material changes apply to all selected
                                    areas.
                                </div>
                                <div className={ui.field}>
                                    <label>Wall board</label>
                                    <select
                                        className={ui.input}
                                        value={commonMaterialValue(
                                            "wallPlasterType",
                                        )}
                                        onChange={(event) =>
                                            setMaterial(
                                                "wallPlasterType",
                                                event.target.value,
                                            )
                                        }
                                    >
                                        <option value="" disabled>
                                            Mixed
                                        </option>
                                        {BOARD_TYPES.map((type) => (
                                            <option key={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className={ui.field}>
                                    <label>Ceiling board</label>
                                    <select
                                        className={ui.input}
                                        value={commonMaterialValue(
                                            "ceilingPlasterType",
                                        )}
                                        onChange={(event) =>
                                            setMaterial(
                                                "ceilingPlasterType",
                                                event.target.value,
                                            )
                                        }
                                    >
                                        <option value="" disabled>
                                            Mixed
                                        </option>
                                        {BOARD_TYPES.map((type) => (
                                            <option key={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                            </>
                        )}
                    {!selectedEdge &&
                        selectedArea &&
                        selectedAreaIds.length <= 1 && (
                            <>
                                <div className={ui.field}>
                                    <label>Area label</label>
                                    <input
                                        className={cx(
                                            ui.input,
                                            areaIssue(
                                                selectedArea.id,
                                                "areaLabel",
                                            ) && ui.inputInvalid,
                                        )}
                                        value={selectedArea.label}
                                        onChange={(event) =>
                                            updateArea(
                                                selectedArea.id,
                                                (area) => ({
                                                    ...area,
                                                    label: event.target.value,
                                                }),
                                            )
                                        }
                                    />
                                    {fieldError(
                                        areaIssue(selectedArea.id, "areaLabel"),
                                    )}
                                </div>
                                <label
                                    className={cx(
                                        ui.button,
                                        ui.buttonDefault,
                                        "justify-start",
                                    )}
                                >
                                    <input
                                        type="checkbox"
                                        checked={!!selectedArea.isOutdoor}
                                        onChange={toggleOutdoor}
                                    />
                                    Outdoor area
                                </label>
                                {renderCeilingControls(selectedArea)}
                                {!selectedArea.isOutdoor && (
                                    <>
                                        <div className={ui.field}>
                                            <label>Wall board</label>
                                            <select
                                                className={cx(
                                                    ui.input,
                                                    areaIssue(
                                                        selectedArea.id,
                                                        "wallPlasterType",
                                                    ) && ui.inputInvalid,
                                                )}
                                                value={
                                                    selectedArea.wallPlasterType
                                                }
                                                onChange={(event) =>
                                                    setMaterial(
                                                        "wallPlasterType",
                                                        event.target.value,
                                                    )
                                                }
                                            >
                                                {BOARD_TYPES.map((type) => (
                                                    <option key={type}>
                                                        {type}
                                                    </option>
                                                ))}
                                            </select>
                                            {fieldError(
                                                areaIssue(
                                                    selectedArea.id,
                                                    "wallPlasterType",
                                                ),
                                            )}
                                        </div>
                                        <div className={ui.field}>
                                            <label>Ceiling board</label>
                                            <select
                                                className={cx(
                                                    ui.input,
                                                    areaIssue(
                                                        selectedArea.id,
                                                        "ceilingPlasterType",
                                                    ) && ui.inputInvalid,
                                                )}
                                                value={
                                                    selectedArea.ceilingPlasterType
                                                }
                                                onChange={(event) =>
                                                    setMaterial(
                                                        "ceilingPlasterType",
                                                        event.target.value,
                                                    )
                                                }
                                            >
                                                {BOARD_TYPES.map((type) => (
                                                    <option key={type}>
                                                        {type}
                                                    </option>
                                                ))}
                                            </select>
                                            {fieldError(
                                                areaIssue(
                                                    selectedArea.id,
                                                    "ceilingPlasterType",
                                                ),
                                            )}
                                        </div>
                                    </>
                                )}
                                {selectedArea.isOutdoor && (
                                    <div className={ui.field}>
                                        <label>Ceiling board</label>
                                        <select
                                            className={cx(
                                                ui.input,
                                                areaIssue(
                                                    selectedArea.id,
                                                    "ceilingPlasterType",
                                                ) && ui.inputInvalid,
                                            )}
                                            value={
                                                selectedArea.ceilingPlasterType
                                            }
                                            onChange={(event) =>
                                                setMaterial(
                                                    "ceilingPlasterType",
                                                    event.target.value,
                                                )
                                            }
                                        >
                                            {BOARD_TYPES.map((type) => (
                                                <option key={type}>
                                                    {type}
                                                </option>
                                            ))}
                                        </select>
                                        {fieldError(
                                            areaIssue(
                                                selectedArea.id,
                                                "ceilingPlasterType",
                                            ),
                                        )}
                                    </div>
                                )}
                                {fieldError(
                                    areaIssue(selectedArea.id, "polygon"),
                                )}
                                <div className={ui.metric}>
                                    Selected points:{" "}
                                    {selectedPointIndexes.length}
                                </div>
                                <div className={ui.metric}>
                                    Wall length:{" "}
                                    {selectedArea.isOutdoor
                                        ? "not counted"
                                        : metrics
                                          ? `${metrics.wallLengthM.toFixed(2)} m`
                                          : "set scale"}
                                </div>
                                <div className={ui.metric}>
                                    Ceiling area:{" "}
                                    {metrics
                                        ? `${metrics.ceilingAreaM2.toFixed(2)} m2`
                                        : "set scale"}
                                </div>
                            </>
                        )}
                </section>
            </aside>
        </section>
    );
}

function parseOverlay(value: string | null): Overlay {
    if (!value) return { areas: [] };
    try {
        return JSON.parse(value) as Overlay;
    } catch {
        return { areas: [] };
    }
}

function parseReferencePoints(value: string | null): Point[] {
    if (!value) return [];
    try {
        const parsed = JSON.parse(value) as Point[];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function cloneOverlay(value: Overlay): Overlay {
    return JSON.parse(JSON.stringify(value)) as Overlay;
}

function colorFor(type: string) {
    return BOARD_COLORS[type as BoardType] ?? DEFAULT_BOARD_COLOR;
}

function pointDistance(a: Point, b: Point) {
    return Math.hypot(b[0] - a[0], b[1] - a[1]);
}

function pointAt(points: Point[], index: number): Point {
    const point = points[index];
    if (!point) {
        throw new Error(`Missing polygon point at index ${index}.`);
    }
    return point;
}

function pathLengthBetween(
    points: Point[],
    start: number,
    end: number,
    step: 1 | -1,
) {
    if (points.length < 2) return 0;
    let total = 0;
    let index = start;
    while (index !== end) {
        const nextIndex = (index + step + points.length) % points.length;
        total += pointDistance(
            pointAt(points, index),
            pointAt(points, nextIndex),
        );
        index = nextIndex;
    }
    return total;
}

function wallLengthByType(area: AreaPolygon) {
    if (area.isOutdoor) return [];
    if (area.points.length < 2) return [];
    const totals = new Map<string, number>();
    area.points.forEach((point, index) => {
        const override = area.edgeOverrides?.[String(index)];
        if (override?.noPlaster) return;
        const type = override?.wallPlasterType ?? area.wallPlasterType;
        const next = pointAt(area.points, (index + 1) % area.points.length);
        totals.set(type, (totals.get(type) ?? 0) + pointDistance(point, next));
    });
    return Array.from(totals.entries()).map(([type, lengthPx]) => ({
        type,
        lengthPx,
    }));
}

function polygonArea(points: Point[]) {
    if (points.length < 3) return 0;
    const sum = points.reduce((total, point, index) => {
        const next = pointAt(points, (index + 1) % points.length);
        return total + point[0] * next[1] - next[0] * point[1];
    }, 0);
    return Math.abs(sum / 2);
}

function ceilingAreaM2ForArea(area: AreaPolygon, scaleMmPerPx: number) {
    const flatM2 = polygonArea(area.points) * Math.pow(scaleMmPerPx / 1000, 2);
    const raked = area.ceilingMode === "raked" ? area.rakedCeiling : null;
    if (
        !raked ||
        raked.lowHeightMm == null ||
        raked.highHeightMm == null ||
        raked.lowEdgeIndex === raked.highEdgeIndex
    ) {
        return flatM2;
    }
    const lowMid = edgeMidpoint(area.points, raked.lowEdgeIndex);
    const highMid = edgeMidpoint(area.points, raked.highEdgeIndex);
    if (!lowMid || !highMid) return flatM2;
    const runM = (pointDistance(lowMid, highMid) * scaleMmPerPx) / 1000;
    if (runM <= 0) return flatM2;
    const riseM = Math.abs(raked.highHeightMm - raked.lowHeightMm) / 1000;
    return flatM2 * Math.sqrt(1 + Math.pow(riseM / runM, 2));
}

function edgeMidpoint(points: Point[], edgeIndex: number): Point | null {
    if (edgeIndex < 0 || edgeIndex >= points.length) return null;
    const a = pointAt(points, edgeIndex);
    const b = pointAt(points, (edgeIndex + 1) % points.length);
    return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
}

function effectiveFlatHeight(area: AreaPolygon, pageHeightMm: number | null) {
    return area.ceilingHeightMm ?? pageHeightMm ?? null;
}

function snapToReferences(
    pointer: Point,
    references: Point[],
    zoom: number,
): { point: Point; guide: SnapGuide } {
    const threshold = SNAP_THRESHOLD_PX / zoom;
    let x = pointer[0];
    let y = pointer[1];
    let guide: SnapGuide = null;
    references.forEach((reference) => {
        if (Math.abs(pointer[0] - reference[0]) <= threshold) {
            x = reference[0];
            guide = { ...(guide ?? {}), x };
        }
        if (Math.abs(pointer[1] - reference[1]) <= threshold) {
            y = reference[1];
            guide = { ...(guide ?? {}), y };
        }
    });
    return { point: [x, y], guide };
}

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

function cleanOverrides(overrides: Record<string, EdgeOverride>) {
    const cleaned = Object.fromEntries(
        Object.entries(overrides).filter(
            ([, override]) => override.noPlaster || override.wallPlasterType,
        ),
    ) as Record<string, EdgeOverride>;
    return Object.keys(cleaned).length ? cleaned : undefined;
}

function cloneOverride(override: EdgeOverride | undefined) {
    return override ? { ...override } : undefined;
}

function edgeOverridesAfterInsert(
    overrides: Record<string, EdgeOverride> | undefined,
    anchorIndex: number,
) {
    if (!overrides) return undefined;
    const next: Record<string, EdgeOverride> = {};
    Object.entries(overrides).forEach(([key, override]) => {
        const index = Number(key);
        if (!Number.isInteger(index)) return;
        if (index < anchorIndex) next[String(index)] = { ...override };
        if (index === anchorIndex) {
            next[String(index)] = { ...override };
            next[String(index + 1)] = { ...override };
        }
        if (index > anchorIndex) next[String(index + 1)] = { ...override };
    });
    return cleanOverrides(next);
}

function edgeOverridesAfterRemoveMany(
    overrides: Record<string, EdgeOverride> | undefined,
    removed: Set<number>,
    pointCount: number,
) {
    if (!overrides) return undefined;
    const next: Record<string, EdgeOverride> = {};
    const indexMap = new Map<number, number>();
    let nextIndex = 0;
    for (let index = 0; index < pointCount; index += 1) {
        if (!removed.has(index)) {
            indexMap.set(index, nextIndex);
            nextIndex += 1;
        }
    }
    Object.entries(overrides).forEach(([key, override]) => {
        const index = Number(key);
        if (!Number.isInteger(index)) return;
        const startRemoved = removed.has(index);
        const endRemoved = removed.has((index + 1) % pointCount);
        if (startRemoved || endRemoved) return;
        const mapped = indexMap.get(index);
        if (mapped == null) return;
        next[String(mapped)] = { ...override };
    });
    return cleanOverrides(next);
}

function rakedAfterPointRemoval(area: AreaPolygon, removed: Set<number>) {
    if (!area.rakedCeiling) return undefined;
    const mapEdge = (edgeIndex: number) => {
        if (
            removed.has(edgeIndex) ||
            removed.has((edgeIndex + 1) % area.points.length)
        )
            return null;
        let nextIndex = 0;
        for (let index = 0; index < edgeIndex; index += 1) {
            if (!removed.has(index)) nextIndex += 1;
        }
        return nextIndex;
    };
    const lowEdgeIndex = mapEdge(area.rakedCeiling.lowEdgeIndex);
    const highEdgeIndex = mapEdge(area.rakedCeiling.highEdgeIndex);
    if (
        lowEdgeIndex == null ||
        highEdgeIndex == null ||
        lowEdgeIndex === highEdgeIndex
    )
        return undefined;
    return { ...area.rakedCeiling, lowEdgeIndex, highEdgeIndex };
}

function splitEdgeOverrides(
    area: AreaPolygon,
    start: number,
    end: number,
    part: "first" | "second",
) {
    const overrides = area.edgeOverrides;
    if (!overrides) return undefined;
    const next: Record<string, EdgeOverride> = {};
    if (part === "first") {
        for (let oldIndex = start; oldIndex < end; oldIndex += 1) {
            const override = cloneOverride(overrides[String(oldIndex)]);
            if (override) next[String(oldIndex - start)] = override;
        }
        return cleanOverrides(next);
    }
    for (let oldIndex = end; oldIndex < area.points.length; oldIndex += 1) {
        const override = cloneOverride(overrides[String(oldIndex)]);
        if (override) next[String(oldIndex - end)] = override;
    }
    for (let oldIndex = 0; oldIndex < start; oldIndex += 1) {
        const override = cloneOverride(overrides[String(oldIndex)]);
        if (override)
            next[String(area.points.length - end + oldIndex)] = override;
    }
    return cleanOverrides(next);
}
