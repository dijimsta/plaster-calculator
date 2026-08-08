import { mapResponsiveToClassNames } from "./class-name.utils.ts";
import { type Padding } from "../core/padding.ts";

import type { Responsive } from "../core/responsive.ts";

export function mapPaddingToClassNames(padding: Responsive<Padding>) {
    return mapResponsiveToClassNames(padding, (value) => `p-${value}`);
}
