export type ButtonVariant =
    typeof variants extends Record<infer K, string> ? K : never;

export const variants = Object.freeze({
    primary: "bg-indigo-600 text-white enabled:hover:bg-indigo-700",
    secondary:
        "bg-white text-gray-900 font-semibold ring-1 ring-inset ring-gray-200 shadow-xs enabled:hover:bg-gray-50 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-600",
    soft: "bg-indigo-50 text-indigo-600 enabled:hover:bg-indigo-100",
});
