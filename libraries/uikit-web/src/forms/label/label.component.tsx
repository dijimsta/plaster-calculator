import clsx from "clsx";

import type { ReactElement, ReactNode } from "react";

export type LabelProps = {
    readonly htmlFor?: string;
    readonly children?: ReactNode;
};

export function Label({ htmlFor, children }: LabelProps): ReactElement {
    return (
        <label
            htmlFor={htmlFor}
            className={clsx(
                "block",
                "text-sm/6",
                "font-medium",
                "text-gray-900",
                "dark:text-white",
            )}
        >
            {children}
        </label>
    );
}
