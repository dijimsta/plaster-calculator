import type { Overlay, Point } from "@libraries/plaster-calculator-common";

export function parseOverlay(value: string | null): Overlay {
    if (!value) return { areas: [] };
    try {
        return JSON.parse(value) as Overlay;
    } catch {
        return { areas: [] };
    }
}

export function parseReferencePoints(value: string | null): Point[] {
    if (!value) return [];
    try {
        const parsed = JSON.parse(value) as Point[];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

export function cloneOverlay(value: Overlay): Overlay {
    return JSON.parse(JSON.stringify(value)) as Overlay;
}
