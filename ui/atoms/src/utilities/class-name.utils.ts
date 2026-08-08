import { isResponsiveValues } from "./responsive.utils.ts";
import {
    type ResponsiveValue,
    type ResponsiveValues,
} from "../core/responsive-values.ts";

import type { ClassName } from "../core/class-name.ts";
import type { Responsive } from "../core/responsive.ts";

export type ClassNameProvider<T extends ResponsiveValue> = (
    value: T,
) => ClassName;

export const CLASS_NAME_SEPARATOR = " ";

export function mapResponsiveValuesToClassNames<T extends ResponsiveValue>(
    values: ResponsiveValues<T>,
    classNameProvider: ClassNameProvider<T>,
): ClassName {
    return Object.entries(values)
        .map(([breakpoint, value]) => {
            switch (breakpoint) {
                case "xs": // xs is the default breakpoint, so we don't need to prefix it
                    return classNameProvider(value);
                default:
                    return `${breakpoint}:${classNameProvider(value)}`;
            }
        })
        .join(CLASS_NAME_SEPARATOR);
}

export function mapResponsiveToClassNames<T extends ResponsiveValue>(
    value: Responsive<T> | undefined,
    classNameProvider: ClassNameProvider<T>,
): ClassName | undefined {
    if (isResponsiveValues(value)) {
        return mapResponsiveValuesToClassNames(value, classNameProvider);
    } else {
        return value ? classNameProvider(value) : undefined;
    }
}
