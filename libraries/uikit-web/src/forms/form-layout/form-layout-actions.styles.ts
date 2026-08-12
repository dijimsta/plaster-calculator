import clsx from "clsx";

export const actionsLayout = "flex items-center justify-end gap-x-4 pt-6";
export const actionsDivider =
    "border-t border-gray-900/10 dark:border-white/10";

export function actionsClassName(divided: boolean): string {
    return clsx(actionsLayout, divided && actionsDivider);
}
