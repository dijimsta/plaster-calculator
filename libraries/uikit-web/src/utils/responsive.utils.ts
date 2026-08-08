import type {
    ClassName,
    Responsive,
    ResponsiveValue,
    ResponsiveValues,
} from "./responsive.ts";

const CLASS_NAME_SEPARATOR = " ";

export type ClassNameProvider<T extends ResponsiveValue> = (
    value: T,
) => ClassName;

export function isResponsiveValues<T extends ResponsiveValue>(
    value?: T | ResponsiveValues<T>,
): value is ResponsiveValues<T> {
    return typeof value === "object";
}

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
