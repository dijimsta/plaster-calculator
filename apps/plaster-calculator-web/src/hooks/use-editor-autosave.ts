import { useEffect } from "react";

import type { Overlay } from "@libraries/plaster-calculator-common";

interface EditorAutosaveOptions {
    readonly autoSaving: boolean;
    readonly ceilingHeightMm: number | null;
    readonly dirty: boolean;
    readonly overlay: Overlay;
    readonly saving: boolean;
    readonly disabled: boolean;
    readonly scaleMmPerPx: number | null;
    readonly save: (refresh?: boolean, automatic?: boolean) => Promise<void>;
}

export function useEditorAutosave({
    autoSaving,
    ceilingHeightMm,
    dirty,
    overlay,
    saving,
    disabled,
    scaleMmPerPx,
    save,
}: EditorAutosaveOptions): void {
    useEffect(() => {
        const timer = window.setInterval(() => {
            if (!disabled && dirty && !saving && !autoSaving) {
                void save(false, true);
            }
        }, 15000);
        return () => window.clearInterval(timer);
    }, [
        dirty,
        overlay,
        scaleMmPerPx,
        ceilingHeightMm,
        saving,
        autoSaving,
        save,
        disabled,
    ]);
}
