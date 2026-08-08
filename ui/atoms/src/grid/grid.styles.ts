import { mapResponsiveToClassNames } from "../utilities/class-name.utils.ts";

import type { GridTemplateColumns } from "./grid.types.ts";
import type { Responsive } from "../core/responsive.ts";

export const base = "grid";

export function fromResponsiveGridTemplateColumns(
    columns?: Responsive<GridTemplateColumns>,
): string | undefined {
    return mapResponsiveToClassNames(columns, (value) => `grid-cols-${value}`);
}
