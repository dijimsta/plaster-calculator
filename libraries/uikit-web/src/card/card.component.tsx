import clsx from "clsx";

import type { PropsWithChildren, ReactElement } from "react";

export function Card({ children }: PropsWithChildren): ReactElement {
    return (
        <div className={clsx("bg-white", "rounded-2xl", "p-8", "shadow-2xl")}>
            {children}
        </div>
    );
}

export namespace Card {
    export function Title({ children }: PropsWithChildren): ReactElement {
        return (
            <h1
                className={clsx(
                    "text-[15px]",
                    "font-semibold",
                    "text-gray-900",
                    "text-center",
                    "mb-6",
                )}
            >
                {children}
            </h1>
        );
    }

    export function ButtonGroup({ children }: PropsWithChildren): ReactElement {
        return (
            <div className={clsx("flex", "flex-col", "gap-2.5")}>
                {children}
            </div>
        );
    }

    export function Footer({ children }: PropsWithChildren): ReactElement {
        return (
            <p
                className={clsx(
                    "mt-6",
                    "text-center",
                    "text-xs",
                    "text-gray-500",
                    "leading-relaxed",
                    "[&_a]:underline",
                    "[&_a]:text-current",
                    "[&_a:hover]:text-gray-600",
                )}
            >
                {children}
            </p>
        );
    }
}
