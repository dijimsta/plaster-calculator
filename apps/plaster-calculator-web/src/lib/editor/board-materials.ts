import { activeTheme } from "../styles.js";

export const BOARD_TYPES = [
    "Recessed Edge",
    "Water Resistant",
    "Sound Check",
] as const;

export type BoardType = (typeof BOARD_TYPES)[number];

const DEFAULT_BOARD_COLOR = activeTheme.editor.boardColors["Recessed Edge"];
const BOARD_COLORS = activeTheme.editor.boardColors;

export const BOARD_SWATCH_CLASSES: Record<BoardType, string> = {
    "Recessed Edge": "bg-slate-700 dark:bg-slate-300",
    "Water Resistant": "bg-blue-600",
    "Sound Check": "bg-orange-700",
};

export function colorFor(type: string): { fill: string; edge: string } {
    return BOARD_COLORS[type as BoardType] ?? DEFAULT_BOARD_COLOR;
}
