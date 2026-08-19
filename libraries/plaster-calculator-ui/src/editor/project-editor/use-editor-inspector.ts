import { useCallback, useState } from "react";

export type EditorInspectorState = {
    readonly inspectorOpen: boolean;
    readonly toggleInspector: () => void;
    readonly closeInspector: () => void;
};

/**
 * Owns whether the editor's inspector is open -- the two-pane layout's
 * fixed sidebar column, or the full-screen layout's non-modal inspector
 * `Drawer`. Lifted out of `use-editor-full-screen.ts` (which used to own an
 * equivalent `drawerOpen` flag scoped to full screen only) so a single
 * state, driven by one consistently-positioned toolbar button, controls the
 * same concept in both layouts instead of each layout tracking its own
 * visibility independently. Defaults open, matching both layouts' prior
 * default (the two-pane sidebar was always visible; full screen's own
 * default is unified with it here rather than kept separately closed).
 */
export function useEditorInspector(): EditorInspectorState {
    const [inspectorOpen, setInspectorOpen] = useState(true);

    const toggleInspector = useCallback(
        () => setInspectorOpen((open) => !open),
        [],
    );
    const closeInspector = useCallback(() => setInspectorOpen(false), []);

    return { inspectorOpen, toggleInspector, closeInspector };
}
