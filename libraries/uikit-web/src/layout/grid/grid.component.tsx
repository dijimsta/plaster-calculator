import clsx from "clsx";
import type { PropsWithChildren, ReactElement } from "react";

import type { Responsive } from "../../utils/responsive.ts";

import * as styles from "./grid.styles.ts";
import type { GridGap } from "./grid.styles.ts";
import type { GridTemplateColumns } from "./grid.types.ts";

export type { GridGap };

export type GridProps = {
    readonly columns?: Responsive<GridTemplateColumns>;
    readonly gap?: GridGap;
};

/**
 * A responsive CSS grid whose `columns` breakpoints (1-12, matching
 * Tailwind's default `grid-template-columns` scale) build their
 * `grid-cols-N`/breakpoint-prefixed class names at runtime
 * (`fromResponsiveGridTemplateColumns`, `grid.styles.ts`) rather than as
 * literal strings. Tailwind's static scanner can't see a class name
 * assembled from concatenated pieces, so every consuming app's Tailwind
 * entry CSS must force-generate the full set with
 * `@source inline("{,sm:,md:,lg:,xl:,2xl:}grid-cols-{1,2,3,4,5,6,7,8,9,10,11,12}");`
 * (see `apps/plaster-calculator-web/src/app/globals.css` and
 * `apps/storybook-web/src/styles.css`) -- omitting it doesn't error, it
 * just silently renders every breakpoint as a single column.
 */
export function Grid({
    columns,
    gap,
    children,
}: PropsWithChildren<GridProps>): ReactElement {
    return (
        <div
            className={clsx(
                styles.base,
                styles.fromResponsiveGridTemplateColumns(columns),
                gap !== undefined && styles.gaps[gap],
            )}
        >
            {children}
        </div>
    );
}
