export const DEFAULT_INTENT = "warn";

export const styles = Object.freeze({
    container: "rounded-md p-4",
    inner: "flex",
    iconWrapper: "shrink-0",
    contentWrapper: "ml-3",
    title: "text-sm font-medium mb-2",
    body: "text-sm",
    icon: "size-5",
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
