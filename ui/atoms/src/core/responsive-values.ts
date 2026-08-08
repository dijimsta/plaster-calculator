import type { Breakpoint } from "./breakpoint.ts";

export type ResponsiveValue = string | number;

export type ResponsiveValues<T extends ResponsiveValue> = {
    readonly [key in Breakpoint]?: T;
};
