export type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export type ResponsiveValue = string | number;

export type ResponsiveValues<T extends ResponsiveValue> = {
    readonly [key in Breakpoint]?: T;
};

export type Responsive<T extends ResponsiveValue> = T | ResponsiveValues<T>;

export type ClassName = string;
