import { useState } from "react";

export interface SelectedEdge {
    readonly areaId: string;
    readonly edgeIndex: number;
}

interface EditorSelectionState {
    readonly selectedAreaId: string | null;
    readonly selectedAreaIds: string[];
    readonly selectedEdge: SelectedEdge | null;
    readonly selectedPoint: number | null;
    readonly selectedPointIndexes: number[];
    readonly clearSelection: () => void;
    readonly hasSelection: () => boolean;
    readonly selectArea: (areaId: string, additive: boolean) => void;
    readonly selectEdge: (areaId: string, edgeIndex: number) => void;
    readonly selectPoint: (index: number, additive: boolean) => void;
    readonly setSelectedAreaId: (areaId: string | null) => void;
    readonly setSelectedAreaIds: (areaIds: string[]) => void;
    readonly setSelectedEdge: (edge: SelectedEdge | null) => void;
    readonly setSelectedPoint: (index: number | null) => void;
    readonly setSelectedPointIndexes: (indexes: number[]) => void;
}

export function useEditorSelection(): EditorSelectionState {
    const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
    const [selectedAreaIds, setSelectedAreaIds] = useState<string[]>([]);
    const [selectedEdge, setSelectedEdge] = useState<SelectedEdge | null>(null);
    const [selectedPoint, setSelectedPoint] = useState<number | null>(null);
    const [selectedPointIndexes, setSelectedPointIndexes] = useState<number[]>(
        [],
    );

    function clearSelection(): void {
        setSelectedAreaId(null);
        setSelectedAreaIds([]);
        setSelectedEdge(null);
        setSelectedPoint(null);
        setSelectedPointIndexes([]);
    }

    function hasSelection(): boolean {
        return (
            !!selectedAreaId ||
            selectedAreaIds.length > 0 ||
            !!selectedEdge ||
            selectedPoint != null ||
            selectedPointIndexes.length > 0
        );
    }

    function selectPoint(index: number, additive: boolean): void {
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

    function selectArea(areaId: string, additive: boolean): void {
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

    function selectEdge(areaId: string, edgeIndex: number): void {
        setSelectedAreaId(areaId);
        setSelectedAreaIds([areaId]);
        setSelectedPoint(null);
        setSelectedPointIndexes([]);
        setSelectedEdge({ areaId, edgeIndex });
    }

    return {
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
    };
}
