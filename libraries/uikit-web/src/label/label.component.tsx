import clsx from "clsx";

import type { LabelHTMLAttributes, ReactElement } from "react";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export function Label({
    className,
    children,
    ...props
}: LabelProps): ReactElement {
    return (
        <label
            className={clsx(
                "block",
                "text-sm/6",
                "font-medium",
                "text-gray-900",
                "dark:text-white",
                className,
            )}
            {...props}
        >
            {children}
        </label>
    );
}
