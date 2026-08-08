import { fromResponsive, type Responsive } from "../responsive/responsive.ts";

import type { GridTemplateColumns } from "./grid.types.ts";

export const base = "grid";

export function fromResponsiveGridTemplateColumns(
    columns?: Responsive<GridTemplateColumns>,
): string | undefined {
    return fromResponsive(columns, (value) => `grid-cols-${value}`);
}
