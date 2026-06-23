export const DEFAULT_COLOR = "gray";
export const DEFAULT_SIZE = "sm";
export const DEFAULT_VARIANT = "flat-with-border";

export type BadgeColor =
    typeof colors extends Record<infer K, string> ? K : never;

export const colors = Object.freeze({
    gray: "bg-gray-50 text-gray-600",
    red: "bg-red-50 text-red-700",
    yellow: "bg-yellow-50 text-yellow-800",
    green: "bg-green-50 text-green-700",
    blue: "bg-blue-50 text-blue-700",
    indigo: "bg-indigo-50 text-indigo-700",
    purple: "bg-purple-50 text-purple-700",
    pink: "bg-pink-50 text-pink-700",
});

export const borderColors = Object.freeze({
    gray: "inset-ring inset-ring-gray-500/10",
    red: "inset-ring inset-ring-red-600/10",
    yellow: "inset-ring inset-ring-yellow-600/20",
    green: "inset-ring inset-ring-green-600/20",
    blue: "inset-ring inset-ring-blue-700/10",
    indigo: "inset-ring inset-ring-indigo-700/10",
    purple: "inset-ring inset-ring-purple-700/10",
    pink: "inset-ring inset-ring-pink-700/10",
});

export const dotColors = Object.freeze({
    gray: "fill-gray-400",
    red: "fill-red-500",
    yellow: "fill-yellow-500",
    green: "fill-green-500",
    blue: "fill-blue-500",
    indigo: "fill-indigo-500",
    purple: "fill-purple-500",
    pink: "fill-pink-500",
});

export const removeButtonColors = Object.freeze({
    gray: "hover:bg-gray-500/20",
    red: "hover:bg-red-600/20",
    yellow: "hover:bg-yellow-600/20",
    green: "hover:bg-green-600/20",
    blue: "hover:bg-blue-700/20",
    indigo: "hover:bg-indigo-700/20",
    purple: "hover:bg-purple-700/20",
    pink: "hover:bg-pink-700/20",
});

export const removeButtonIconColors = Object.freeze({
    gray: "stroke-gray-600/50 group-hover:stroke-gray-600/75",
    red: "stroke-red-700/50 group-hover:stroke-red-700/75",
    yellow: "stroke-yellow-800/50 group-hover:stroke-yellow-800/75",
    green: "stroke-green-700/50 group-hover:stroke-green-700/75",
    blue: "stroke-blue-700/50 group-hover:stroke-blue-700/75",
    indigo: "stroke-indigo-700/50 group-hover:stroke-indigo-700/75",
    purple: "stroke-purple-700/50 group-hover:stroke-purple-700/75",
    pink: "stroke-pink-700/50 group-hover:stroke-pink-700/75",
});

export type BadgeSize =
    typeof sizes extends Record<infer K, string> ? K : never;

export const sizes = Object.freeze({
    sm: "px-2 py-1 text-xs font-medium",
    xs: "px-1.5 py-0.5 text-xs font-medium",
});

export type BadgeVariant =
    typeof variants extends Record<infer K, string> ? K : never;

export const variants = Object.freeze({
    "flat": "inline-flex items-center rounded-md",
    "flat-with-border": "inline-flex items-center rounded-md",
    "pill": "inline-flex items-center rounded-full",
    "pill-with-border": "inline-flex items-center rounded-full",
});

export const dotStyles = "h-1.5 w-1.5 mr-1.5";

export const removeButtonStyles = Object.freeze({
    button: "group relative -mr-1 ml-0.5 h-3.5 w-3.5 rounded-sm",
    icon: "h-3.5 w-3.5 fill-none",
    hitArea: "absolute -inset-1",
});
