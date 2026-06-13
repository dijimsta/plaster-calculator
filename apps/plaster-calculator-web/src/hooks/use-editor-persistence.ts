import { useCallback, useState } from "react";

import { useEditorAutosave } from "./use-editor-autosave.js";
import {
    applyCeilingHeightToProject,
    applyScaleToProject,
    savePageOverlay,
} from "../lib/api.js";

import type { Overlay, Point } from "../types.js";

interface EditorPersistenceOptions {
    readonly ceilingHeightMm: number | null;
    readonly dirty: boolean;
    readonly disabled: boolean;
    readonly onSaved: () => void;
    readonly overlay: Overlay;
    readonly pageId: string;
    readonly projectId: string;
    readonly referenceLengthMm: string;
    readonly referencePoints: Point[];
    readonly scaleMmPerPx: number | null;
    readonly setDirty: (dirty: boolean) => void;
}

interface EditorPersistence {
    readonly autoSaving: boolean;
    readonly saving: boolean;
    readonly status: string;
    readonly applyHeightToAllPages: () => Promise<void>;
    readonly applyScaleToAllPages: () => Promise<void>;
    readonly save: (refresh?: boolean, automatic?: boolean) => Promise<void>;
    readonly setStatus: (status: string) => void;
}

export function useEditorPersistence({
    ceilingHeightMm,
    dirty,
    disabled,
    onSaved,
    overlay,
    pageId,
    projectId,
    referenceLengthMm,
    referencePoints,
    scaleMmPerPx,
    setDirty,
}: EditorPersistenceOptions): EditorPersistence {
    const [saving, setSaving] = useState(false);
    const [autoSaving, setAutoSaving] = useState(false);
    const [status, setStatus] = useState("");

    const save = useCallback(
        async (refresh = true, automatic = false) => {
            if (automatic) {
                setAutoSaving(true);
            } else {
                setSaving(true);
            }
            try {
                await savePageOverlay(projectId, pageId, {
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
                setStatus(
                    error instanceof Error ? error.message : "Save failed",
                );
            } finally {
                if (automatic) {
                    setAutoSaving(false);
                } else {
                    setSaving(false);
                }
            }
        },
        [
            ceilingHeightMm,
            onSaved,
            overlay,
            pageId,
            projectId,
            referenceLengthMm,
            referencePoints,
            scaleMmPerPx,
            setDirty,
        ],
    );

    const applyHeightToAllPages = useCallback(async () => {
        try {
            if (dirty) await save(false);
            await applyCeilingHeightToProject(projectId, ceilingHeightMm);
            setStatus("Ceiling height applied to all pages");
            onSaved();
        } catch (error) {
            setStatus(
                error instanceof Error
                    ? error.message
                    : "Unable to apply ceiling height",
            );
        }
    }, [ceilingHeightMm, dirty, onSaved, projectId, save]);

    const applyScaleToAllPages = useCallback(async () => {
        if (!scaleMmPerPx || scaleMmPerPx <= 0) {
            setStatus("Set a reference before applying scale to all pages");
            return;
        }
        try {
            if (dirty) await save(false);
            await applyScaleToProject(projectId, scaleMmPerPx);
            setStatus("Scale applied to all pages");
            onSaved();
        } catch (error) {
            setStatus(
                error instanceof Error
                    ? error.message
                    : "Unable to apply scale",
            );
        }
    }, [dirty, onSaved, projectId, save, scaleMmPerPx]);

    useEditorAutosave({
        autoSaving,
        ceilingHeightMm,
        dirty,
        overlay,
        saving,
        disabled,
        scaleMmPerPx,
        save,
    });

    return {
        autoSaving,
        saving,
        status,
        applyHeightToAllPages,
        applyScaleToAllPages,
        save,
        setStatus,
    };
}
