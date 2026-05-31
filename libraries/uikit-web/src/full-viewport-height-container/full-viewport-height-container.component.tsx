import clsx from "clsx";

import type { PropsWithChildren, ReactElement } from "react";

export function FullViewportHeightContainer({
    children,
}: PropsWithChildren): ReactElement {
    return (
        <div
            className={clsx(
                "h-screen",
                "flex",
                "items-center",
                "justify-center",
            )}
        >
            {children}
        </div>
    );
}
