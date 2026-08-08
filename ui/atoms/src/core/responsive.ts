import type { ResponsiveValue, ResponsiveValues } from "./responsive-values.ts";

export type Responsive<T extends ResponsiveValue> = T | ResponsiveValues<T>;
