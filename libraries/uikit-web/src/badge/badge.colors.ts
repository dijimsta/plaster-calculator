export type BadgeColor =
    typeof colors extends Record<infer K, string> ? K : never;

export const colors = Object.freeze({
    gray: "bg-gray-50 text-gray-600 inset-ring inset-ring-gray-500/10",
    red: "bg-red-50 text-red-700 inset-ring inset-ring-red-600/10",
    yellow: "bg-yellow-50 text-yellow-800 inset-ring inset-ring-yellow-600/20",
    green: "bg-green-50 text-green-700 inset-ring inset-ring-green-600/20",
    blue: "bg-blue-50 text-blue-700 inset-ring inset-ring-blue-700/10",
    indigo: "bg-indigo-50 text-indigo-700 inset-ring inset-ring-indigo-700/10",
    purple: "bg-purple-50 text-purple-700 inset-ring inset-ring-purple-700/10",
    pink: "bg-pink-50 text-pink-700 inset-ring inset-ring-pink-700/10",
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
