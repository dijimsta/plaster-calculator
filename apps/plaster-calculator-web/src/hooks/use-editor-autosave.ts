import { useEffect } from "react";
import type { Overlay } from "../types.js";

interface EditorAutosaveOptions {
    readonly autoSaving: boolean;
    readonly ceilingHeightMm: number | null;
    readonly dirty: boolean;
    readonly overlay: Overlay;
    readonly saving: boolean;
    readonly scaleMmPerPx: number | null;
    readonly save: (refresh?: boolean, automatic?: boolean) => Promise<void>;
}

export function useEditorAutosave({
    autoSaving,
    ceilingHeightMm,
    dirty,
    overlay,
    saving,
    scaleMmPerPx,
    save,
}: EditorAutosaveOptions): void {
    useEffect(() => {
        const timer = window.setInterval(() => {
            if (dirty && !saving && !autoSaving) void save(false, true);
        }, 15000);
        return () => window.clearInterval(timer);
    }, [dirty, overlay, scaleMmPerPx, ceilingHeightMm, saving, autoSaving, save]);
}
