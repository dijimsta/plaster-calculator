import { useEffect, useRef } from "react";

import type { EditorInitialTool } from "./project-editor.types.js";

type EditorInitialToolOptions = {
    readonly initialTool?: EditorInitialTool | null;
    readonly startFreeShape: () => void;
    readonly startReferenceMode: () => void;
};

/**
 * Activates a deep-linked initial tool ("scale" or "draw-room") exactly
 * once, on mount, then gets out of the way -- neither a page switch nor any
 * later render should keep snapping the tool back.
 */
export function useEditorInitialTool({
    initialTool,
    startFreeShape,
    startReferenceMode,
}: EditorInitialToolOptions): void {
    const appliedInitialToolRef = useRef(false);
    useEffect(() => {
        if (appliedInitialToolRef.current) return;
        appliedInitialToolRef.current = true;
        if (initialTool === "scale") {
            startReferenceMode();
        } else if (initialTool === "draw-room") {
            startFreeShape();
        }
        // Deliberately runs once, keyed off nothing but mount: a deep link
        // should set the initial tool and then get out of the way, not
        // fight the user (or a page switch) for control afterward.
    }, []);
}
