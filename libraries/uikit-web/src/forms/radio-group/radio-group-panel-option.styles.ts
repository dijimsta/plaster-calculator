export const panelOption =
    "relative flex cursor-pointer select-none gap-3 p-4 ring-1 ring-inset ring-transparent transition-colors [-webkit-tap-highlight-color:transparent] first:rounded-t-lg last:rounded-b-lg hover:bg-gray-50 has-[:checked]:z-10 has-[:checked]:bg-indigo-50 has-[:checked]:ring-indigo-600 has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50 dark:hover:bg-white/5 dark:has-[:checked]:bg-indigo-500/10 dark:has-[:checked]:ring-indigo-500";

export const panelOptionLayout = Object.freeze({
    default: "items-center",
    table: "grid grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)_auto] items-center",
});
export const panelListContent = "min-w-0 text-sm/6";
export const panelListLabel = "block font-medium text-gray-900 dark:text-white";
export const panelListDescription = "block text-gray-500 dark:text-gray-400";
export const panelLabel =
    "min-w-0 text-sm/6 font-medium text-gray-900 dark:text-white";
export const panelDescription =
    "min-w-0 text-sm/6 text-gray-500 dark:text-gray-400";
export const panelDescriptionRight = "ml-auto text-right";
