import {
    DEFAULT_WALL_BOARD_TYPE,
    type WallBoardType,
} from "@libraries/plaster-calculator-common";

import { activeTheme } from "../styles.js";

export const CEILING_BOARD_TYPES = [
    "Recessed Edge",
    "Water Resistant",
] as const;
export type CeilingBoardType = (typeof CEILING_BOARD_TYPES)[number];

export const DEFAULT_CEILING_BOARD_TYPE: CeilingBoardType = "Recessed Edge";

const DEFAULT_BOARD_COLOR =
    activeTheme.editor.boardColors[DEFAULT_WALL_BOARD_TYPE];
const BOARD_COLORS = activeTheme.editor.boardColors;

export const BOARD_SWATCH_CLASSES: Record<WallBoardType, string> = {
    "10mm Plasterboard": "bg-slate-700 dark:bg-slate-300",
    "13mm Plasterboard": "bg-zinc-500",
    "9mm Villaboard": "bg-sky-600",
    "6mm Villaboard": "bg-cyan-600",
    "10mm Acoustic (Soundchek)": "bg-orange-700",
    "13mm Acoustic (Soundchek)": "bg-amber-700",
    "10mm Water Resistant": "bg-blue-600",
    "13mm Water Resistant": "bg-indigo-600",
    "13mm Fire Resistant - dry area": "bg-red-600",
    "16mm Fire Resistant - dry area": "bg-rose-700",
    "13mm Fire Resistant - wet area": "bg-fuchsia-700",
    "16mm Fire Resistant - wet area": "bg-purple-700",
    "6.5mm Flexible board": "bg-emerald-600",
};

export function colorFor(type: string): { fill: string; edge: string } {
    return (
        BOARD_COLORS[type as keyof typeof BOARD_COLORS] ?? DEFAULT_BOARD_COLOR
    );
}

export function normalizeCeilingBoardType(
    value: string | null | undefined,
): CeilingBoardType {
    return isCeilingBoardType(value) ? value : DEFAULT_CEILING_BOARD_TYPE;
}

function isCeilingBoardType(
    value: string | null | undefined,
): value is CeilingBoardType {
    return CEILING_BOARD_TYPES.includes(value as CeilingBoardType);
}
