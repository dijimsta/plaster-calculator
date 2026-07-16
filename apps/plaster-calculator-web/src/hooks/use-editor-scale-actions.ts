import {
    OverlayGeometryHelper,
    type Point,
} from "@libraries/plaster-calculator-common";

import type { ViewportSize } from "./use-editor-actions.types.js";
import type { RefObject } from "react";

interface ScaleActionsOptions {
    readonly canvasWrapRef: RefObject<HTMLDivElement | null>;
    readonly imageHeight: number;
    readonly imageWidth: number;
    readonly referenceLengthMm: string;
    readonly referencePoints: Point[];
    readonly viewport: ViewportSize;
    readonly zoom: number;
    readonly setDirty: (dirty: boolean) => void;
    readonly setIsSettingReference: (value: boolean) => void;
    readonly setReferenceLengthMm: (value: string) => void;
    readonly setReferencePoints: (points: Point[]) => void;
    readonly setScaleMmPerPx: (value: number | null) => void;
    readonly setStatus: (status: string) => void;
    readonly setZoom: (zoom: number) => void;
}

export function useEditorScaleActions({
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
}: ScaleActionsOptions) {
    function applyScale() {
        if (referencePoints.length !== 2) return;
        const firstReferencePoint = referencePoints[0];
        const secondReferencePoint = referencePoints[1];
        if (!firstReferencePoint || !secondReferencePoint) return;
        const length = Number(referenceLengthMm);
        if (!Number.isFinite(length) || length <= 0) return;
        const distance = Math.hypot(
            secondReferencePoint[0] - firstReferencePoint[0],
            secondReferencePoint[1] - firstReferencePoint[1],
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

    function viewportCenterInImage(): Point {
        const element = canvasWrapRef.current;
        const scrollLeft = element?.scrollLeft ?? 0;
        const scrollTop = element?.scrollTop ?? 0;
        return [
            OverlayGeometryHelper.clamp(
                (scrollLeft + viewport.width / 2) / zoom,
                0,
                imageWidth,
            ),
            OverlayGeometryHelper.clamp(
                (scrollTop + viewport.height / 2) / zoom,
                0,
                imageHeight,
            ),
        ];
    }

    return {
        applyScale,
        changeZoom,
        resetView,
        startReferenceMode,
        viewportCenterInImage,
    };
}
