import { useEffect, useRef, useState, type RefObject } from "react";

import {
    parseOverlay,
    parseReferencePoints,
} from "../lib/editor/overlay-serialization.js";

import type { PageValidationInput } from "../lib/validation.js";
import type { FloorplanPage } from "../types.js";
import type { Overlay, Point } from "@libraries/plaster-calculator-common";

interface EditorOverlayState {
    readonly ceilingHeightMm: number | null;
    readonly overlay: Overlay;
    readonly overlayRef: RefObject<Overlay>;
    readonly referenceLengthMm: string;
    readonly referencePoints: Point[];
    readonly scaleMmPerPx: number | null;
    readonly setCeilingHeightMm: (value: number | null) => void;
    readonly setOverlay: (overlay: Overlay) => void;
    readonly setReferenceLengthMm: (value: string) => void;
    readonly setReferencePoints: (points: Point[]) => void;
    readonly setScaleMmPerPx: (value: number | null) => void;
}

interface EditorOverlayOptions {
    readonly onDraftChange?: (
        pageId: string,
        draft: PageValidationInput,
    ) => void;
    readonly page: FloorplanPage;
    readonly setDirty: (dirty: boolean) => void;
}

export function useEditorOverlay({
    onDraftChange,
    page,
    setDirty,
}: EditorOverlayOptions): EditorOverlayState {
    const [overlay, setOverlay] = useState<Overlay>(() =>
        parseOverlay(page.overlay),
    );
    const [scaleMmPerPx, setScaleMmPerPx] = useState<number | null>(
        page.scaleMmPerPx,
    );
    const [ceilingHeightMm, setCeilingHeightMm] = useState<number | null>(
        page.ceilingHeightMm,
    );
    const [referencePoints, setReferencePoints] = useState<Point[]>(() =>
        parseReferencePoints(page.referencePoints),
    );
    const [referenceLengthMm, setReferenceLengthMm] = useState(
        page.referenceLengthMm?.toString() ?? "",
    );
    const overlayRef = useRef<Overlay>(overlay);

    useEffect(() => {
        setOverlay(parseOverlay(page.overlay));
        setScaleMmPerPx(page.scaleMmPerPx);
        setCeilingHeightMm(page.ceilingHeightMm);
        setReferencePoints(parseReferencePoints(page.referencePoints));
        setReferenceLengthMm(page.referenceLengthMm?.toString() ?? "");
        setDirty(false);
    }, [
        page.id,
        page.overlay,
        page.scaleMmPerPx,
        page.ceilingHeightMm,
        page.referencePoints,
        page.referenceLengthMm,
        setDirty,
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

    return {
        ceilingHeightMm,
        overlay,
        overlayRef,
        referenceLengthMm,
        referencePoints,
        scaleMmPerPx,
        setCeilingHeightMm,
        setOverlay,
        setReferenceLengthMm,
        setReferencePoints,
        setScaleMmPerPx,
    };
}
