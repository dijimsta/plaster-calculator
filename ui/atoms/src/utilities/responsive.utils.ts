import type {
    ResponsiveValue,
    ResponsiveValues,
} from "../core/responsive-values.ts";

export function isResponsiveValues<T extends ResponsiveValue>(
    value?: T | ResponsiveValues<T>,
): value is ResponsiveValues<T> {
    return typeof value === "object";
}
