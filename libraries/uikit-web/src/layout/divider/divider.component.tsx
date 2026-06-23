import clsx from "clsx";

import type { PropsWithChildren, ReactElement } from "react";

export function Divider({ children }: PropsWithChildren): ReactElement {
    return (
        <div className={clsx("flex", "items-center", "gap-3", "my-5")}>
            <div
                className={clsx(
                    "flex-1",
                    "h-px",
                    "bg-gray-100",
                    "dark:bg-gray-700",
                )}
            />
            <span
                className={clsx(
                    "text-xs",
                    "text-gray-500",
                    "dark:text-gray-400",
                )}
            >
                {children}
            </span>
            <div
                className={clsx(
                    "flex-1",
                    "h-px",
                    "bg-gray-100",
                    "dark:bg-gray-700",
                )}
            />
        </div>
    );
}
