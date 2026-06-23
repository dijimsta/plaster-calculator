export const DEFAULT_INTENT = "neutral";

export const DEFAULT_VARIANT = "flat";

export type AlertVariant = "flat" | "flat-with-border" | "light-with-border";

export const styles = Object.freeze({
    container: "rounded-md p-4",
    accentContainer: "border-l-4 p-4",
    inner: "flex",
    iconWrapper: "shrink-0",
    contentWrapper: "ml-3",
    title: "text-sm font-medium [&:not(:last-child)]:mb-2",
    body: "text-sm",
    icon: "size-5",
    dismissWrapper: "ml-auto pl-3",
    dismissInner: "-mx-1.5 -my-1.5",
    dismissButton:
        "inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2",
    dismissButtonSrLabel: "sr-only",
});

export type AlertIntent =
    typeof containerColors extends Record<infer K, string> ? K : never;

export const containerColors = Object.freeze({
    neutral: "bg-gray-50",
    info: "bg-blue-50",
    warn: "bg-yellow-50",
    error: "bg-red-50",
    success: "bg-green-50",
});

export const accentBorderColors = Object.freeze({
    neutral: "border-gray-400",
    info: "border-blue-400",
    warn: "border-yellow-400",
    error: "border-red-400",
    success: "border-green-400",
});

export const iconColors = Object.freeze({
    neutral: "text-gray-400",
    info: "text-blue-400",
    warn: "text-yellow-400",
    error: "text-red-400",
    success: "text-green-400",
});

export const titleColors = Object.freeze({
    neutral: "text-gray-800",
    info: "text-blue-800",
    warn: "text-yellow-800",
    error: "text-red-800",
    success: "text-green-800",
});

export const bodyColors = Object.freeze({
    neutral: "text-gray-700",
    info: "text-blue-700",
    warn: "text-yellow-700",
    error: "text-red-700",
    success: "text-green-700",
});

export const dismissButtonColors = Object.freeze({
    neutral:
        "text-gray-500 hover:bg-gray-100 focus:ring-gray-600 focus:ring-offset-gray-50",
    info: "text-blue-500 hover:bg-blue-100 focus:ring-blue-600 focus:ring-offset-blue-50",
    warn: "text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600 focus:ring-offset-yellow-50",
    error: "text-red-500 hover:bg-red-100 focus:ring-red-600 focus:ring-offset-red-50",
    success:
        "text-green-500 hover:bg-green-100 focus:ring-green-600 focus:ring-offset-green-50",
});

export const ringColors = Object.freeze({
    neutral: "inset-ring inset-ring-gray-300",
    info: "inset-ring inset-ring-blue-300",
    warn: "inset-ring inset-ring-yellow-300",
    error: "inset-ring inset-ring-red-300",
    success: "inset-ring inset-ring-green-300",
});
