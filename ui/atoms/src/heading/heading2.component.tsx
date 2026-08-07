import clsx from "clsx";

import { base, sizes } from "./heading.styles.ts";

import type { ReactElement, ReactNode } from "react";

export type Heading2Props = {
    readonly children?: ReactNode;
};

export function Heading2({ children }: Heading2Props): ReactElement {
    return <h2 className={clsx(base, sizes.h2)}>{children}</h2>;
}
