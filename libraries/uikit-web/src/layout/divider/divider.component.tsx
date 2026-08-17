import clsx from "clsx";
import type { CSSProperties, PropsWithChildren, ReactElement } from "react";

export type DividerProps = PropsWithChildren<{
    /**
     * Overrides the line's default gray with an arbitrary CSS color (e.g. a
     * team-chosen brand hex value that can't be expressed as a fixed
     * Tailwind class). Applied via inline style -- the same pattern
     * `ProgressBar` uses for its runtime-determined indicator width -- since
     * the value isn't known until render time.
     */
    readonly color?: string;
}>;

const lineClassName = clsx("h-px", "bg-gray-100", "dark:bg-gray-700");

export function Divider({ children, color }: DividerProps): ReactElement {
    const lineStyle: CSSProperties | undefined = color
        ? { backgroundColor: color }
        : undefined;

    if (children === undefined) {
        return <div className={lineClassName} style={lineStyle} />;
    }

    return (
        <div className={clsx("flex", "items-center", "gap-3", "my-5")}>
            <div className={clsx("flex-1", lineClassName)} style={lineStyle} />
            <span
                className={clsx(
                    "text-xs",
                    "text-gray-500",
                    "dark:text-gray-400",
                )}
            >
                {children}
            </span>
            <div className={clsx("flex-1", lineClassName)} style={lineStyle} />
        </div>
    );
}
