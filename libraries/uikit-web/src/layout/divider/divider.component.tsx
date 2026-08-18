import clsx from "clsx";
import type { CSSProperties, PropsWithChildren, ReactElement } from "react";

export type DividerThickness = "thin" | "thick";

export type DividerProps = PropsWithChildren<{
    /**
     * Overrides the line's default gray with an arbitrary CSS color (e.g. a
     * team-chosen brand hex value that can't be expressed as a fixed
     * Tailwind class). Applied via inline style -- the same pattern
     * `ProgressBar` uses for its runtime-determined indicator width -- since
     * the value isn't known until render time.
     */
    readonly color?: string;
    /** A bolder, more prominent line -- e.g. under a printed document's letterhead. Defaults to `"thin"`. */
    readonly thickness?: DividerThickness;
}>;

const thicknesses = Object.freeze({
    thin: "h-px",
    thick: "h-0.5",
});

function lineClassName(thickness: DividerThickness): string {
    return clsx(thicknesses[thickness], "bg-gray-100", "dark:bg-gray-700");
}

export function Divider({
    children,
    color,
    thickness = "thin",
}: DividerProps): ReactElement {
    const lineStyle: CSSProperties | undefined = color
        ? { backgroundColor: color }
        : undefined;

    if (children === undefined) {
        return <div className={lineClassName(thickness)} style={lineStyle} />;
    }

    return (
        <div className={clsx("flex", "items-center", "gap-3", "my-5")}>
            <div
                className={clsx("flex-1", lineClassName(thickness))}
                style={lineStyle}
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
                className={clsx("flex-1", lineClassName(thickness))}
                style={lineStyle}
            />
        </div>
    );
}
