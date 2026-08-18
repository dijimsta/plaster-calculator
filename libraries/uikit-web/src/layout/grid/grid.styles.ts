import type { Responsive } from "../../utils/responsive.ts";
import { mapResponsiveToClassNames } from "../../utils/responsive.utils.ts";

import type { GridTemplateColumns } from "./grid.types.ts";

export const base = "grid";

export function fromResponsiveGridTemplateColumns(
    columns?: Responsive<GridTemplateColumns>,
): string | undefined {
    return mapResponsiveToClassNames(columns, (value) => `grid-cols-${value}`);
}

/** Mirrors `Box`'s own `gaps` scale (`../box/box.styles.ts`) so the two layout primitives read as one spacing system. */
export const gaps = Object.freeze({
    xs: "gap-1",
    sm: "gap-2",
    md: "gap-3",
    lg: "gap-4",
});

export type GridGap = keyof typeof gaps;
