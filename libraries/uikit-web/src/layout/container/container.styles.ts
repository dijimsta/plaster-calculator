export const base = "mx-auto w-full";

export const sizes = {
    narrow: "max-w-3xl",
    wide: "max-w-7xl",
    responsive: "container",
} as const;

export type ContainerSize = keyof typeof sizes;

export const paddings = {
    always: "p-4 sm:p-6 lg:p-8",
    responsive: "p-0 sm:p-6 lg:p-8",
} as const;

export type ContainerPadding = keyof typeof paddings;
