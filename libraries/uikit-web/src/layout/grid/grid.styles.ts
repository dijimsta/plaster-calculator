import type { Responsive } from "../../utils/responsive.ts";
import { mapResponsiveToClassNames } from "../../utils/responsive.utils.ts";

import type { GridTemplateColumns } from "./grid.types.ts";

export const base = "grid";

export function fromResponsiveGridTemplateColumns(
    columns?: Responsive<GridTemplateColumns>,
): string | undefined {
    return mapResponsiveToClassNames(columns, (value) => `grid-cols-${value}`);
}
