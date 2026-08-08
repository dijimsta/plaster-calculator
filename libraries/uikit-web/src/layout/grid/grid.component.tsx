import clsx from "clsx";

import * as styles from "./grid.styles.ts";

import type { GridTemplateColumns } from "./grid.types.ts";
import type { Responsive } from "../../utils/responsive.ts";
import type { PropsWithChildren, ReactElement } from "react";

export type GridProps = {
    readonly columns?: Responsive<GridTemplateColumns>;
};

export function Grid({
    columns,
    children,
}: PropsWithChildren<GridProps>): ReactElement {
    return (
        <div
            className={clsx(
                styles.base,
                styles.fromResponsiveGridTemplateColumns(columns),
            )}
        >
            {children}
        </div>
    );
}
