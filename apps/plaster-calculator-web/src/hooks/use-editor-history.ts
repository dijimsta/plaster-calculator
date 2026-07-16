import { useState } from "react";

import { cloneOverlay } from "../lib/editor/overlay-serialization.js";

import type { Overlay } from "@libraries/plaster-calculator-common";

interface EditorHistoryState {
    readonly future: Overlay[];
    readonly history: Overlay[];
    readonly commit: (next: Overlay) => void;
    readonly commitFromSnapshot: (before: Overlay, next: Overlay) => void;
    readonly redo: () => void;
    readonly resetHistory: () => void;
    readonly undo: () => void;
}

interface EditorHistoryOptions {
    readonly overlay: Overlay;
    readonly setDirty: (dirty: boolean) => void;
    readonly setOverlay: (overlay: Overlay) => void;
    readonly setStatus: (status: string) => void;
}

export function useEditorHistory({
    overlay,
    setDirty,
    setOverlay,
    setStatus,
}: EditorHistoryOptions): EditorHistoryState {
    const [history, setHistory] = useState<Overlay[]>([]);
    const [future, setFuture] = useState<Overlay[]>([]);

    function commit(next: Overlay): void {
        setHistory((items) => [...items.slice(-49), cloneOverlay(overlay)]);
        setFuture([]);
        setOverlay(next);
        setDirty(true);
        setStatus("Unsaved changes");
    }

    function commitFromSnapshot(before: Overlay, next: Overlay): void {
        setHistory((items) => [...items.slice(-49), cloneOverlay(before)]);
        setFuture([]);
        setOverlay(next);
        setDirty(true);
        setStatus("Unsaved changes");
    }

    function undo(): void {
        const previous = history[history.length - 1];
        if (!previous) return;
        setFuture((items) => [cloneOverlay(overlay), ...items]);
        setHistory((items) => items.slice(0, -1));
        setOverlay(previous);
        setDirty(true);
    }

    function redo(): void {
        const next = future[0];
        if (!next) return;
        setHistory((items) => [...items, cloneOverlay(overlay)]);
        setFuture((items) => items.slice(1));
        setOverlay(next);
        setDirty(true);
    }

    function resetHistory(): void {
        setHistory([]);
        setFuture([]);
    }

    return {
        future,
        history,
        commit,
        commitFromSnapshot,
        redo,
        resetHistory,
        undo,
    };
}
