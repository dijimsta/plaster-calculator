import clsx from "clsx";

import { base, paddings, sizes } from "./container.styles.ts";

import type { ContainerPadding, ContainerSize } from "./container.styles.ts";
import type { HTMLAttributes, PropsWithChildren, ReactElement } from "react";

export type ContainerProps = PropsWithChildren<
    HTMLAttributes<HTMLDivElement> & {
        readonly padding?: ContainerPadding;
        readonly size?: ContainerSize;
    }
>;

export function Container({
    padding = "always",
    size = "wide",
    className,
    children,
    ...props
}: ContainerProps): ReactElement {
    return (
        <div
            className={clsx(base, sizes[size], paddings[padding], className)}
            {...props}
        >
            {children}
        </div>
    );
}
