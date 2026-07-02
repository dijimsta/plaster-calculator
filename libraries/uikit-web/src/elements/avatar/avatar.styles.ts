export const DEFAULT_SIZE = "md";
export const DEFAULT_SHAPE = "circular";
export const DEFAULT_COLOR = "gray";

export type AvatarSize =
    typeof sizes extends Record<infer K, string> ? K : never;

export const sizes = Object.freeze({
    xs: "size-6",
    sm: "size-8",
    md: "size-10",
    lg: "size-12",
    xl: "size-14",
});

export const textSizes = Object.freeze({
    xs: "text-xs",
    sm: "text-sm",
    md: "text-sm",
    lg: "text-base",
    xl: "text-lg",
});

export type AvatarShape =
    typeof shapes extends Record<infer K, string> ? K : never;

export const shapes = Object.freeze({
    circular: "rounded-full",
    square: "rounded-md",
});

export type AvatarColor =
    typeof initialsColors extends Record<infer K, string> ? K : never;

export const initialsColors = Object.freeze({
    gray: "bg-gray-500",
    red: "bg-red-500",
    orange: "bg-orange-500",
    amber: "bg-amber-500",
    green: "bg-green-500",
    blue: "bg-blue-500",
    indigo: "bg-indigo-500",
    purple: "bg-purple-500",
    pink: "bg-pink-500",
});

export type AvatarStatus =
    typeof statusColors extends Record<infer K, string> ? K : never;

export const statusColors = Object.freeze({
    online: "bg-green-400",
    offline: "bg-gray-400",
    away: "bg-yellow-400",
    busy: "bg-red-400",
});

export const statusDotSizes = Object.freeze({
    xs: "size-1.5",
    sm: "size-2",
    md: "size-2.5",
    lg: "size-3",
    xl: "size-3.5",
});

export const statusPositionCircular = Object.freeze({
    xs: "bottom-0 right-0",
    sm: "bottom-0 right-0",
    md: "bottom-0 right-0",
    lg: "bottom-0 right-0",
    xl: "bottom-0.5 right-0.5",
});

export const statusPositionSquare = Object.freeze({
    xs: "-top-0.5 -right-0.5",
    sm: "-top-1 -right-1",
    md: "-top-1 -right-1",
    lg: "-top-1 -right-1",
    xl: "-top-1 -right-1",
});

export const wrapperBase = "relative inline-block";
export const imageBase = "block object-cover";
export const placeholderBase =
    "flex items-center justify-center bg-gray-100 overflow-hidden";
export const initialsBase =
    "flex items-center justify-center font-medium text-white select-none";
export const statusBase = "absolute block rounded-full ring-2 ring-white";
