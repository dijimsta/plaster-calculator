import type { Breakpoint } from "./breakpoint.ts";

export type ResponsiveValue = string | number;

export type ClassNameProvider<T extends ResponsiveValue> = (value: T) => string;

export type ResponsiveMap<T extends ResponsiveValue> = {
    readonly [key in Breakpoint]?: T;
};

export function isResponsiveMap<T extends ResponsiveValue>(
    value?: T | ResponsiveMap<T>,
): value is ResponsiveMap<T> {
    return typeof value === "object";
}

export function fromResponsiveMap<T extends ResponsiveValue>(
    values: ResponsiveMap<T>,
    classNameProvider: ClassNameProvider<T>,
): string {
    return Object.entries(values)
        .map(([breakpoint, value]) => {
            switch (breakpoint) {
                case "xs": // xs is the default breakpoint, so we don't need to prefix it
                    return classNameProvider(value);
                default:
                    return `${breakpoint}:${classNameProvider(value)}`;
            }
        })
        .join(" ");
}

export type Responsive<T extends ResponsiveValue> = T | ResponsiveMap<T>;

export function fromResponsive<T extends ResponsiveValue>(
    value: T | ResponsiveMap<T> | undefined,
    classNameProvider: ClassNameProvider<T>,
): string | undefined {
    if (isResponsiveMap(value)) {
        return fromResponsiveMap(value, classNameProvider);
    } else {
        return value ? classNameProvider(value) : undefined;
    }
}
