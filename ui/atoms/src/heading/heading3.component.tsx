import clsx from "clsx";

import { base, sizes } from "./heading.styles.ts";

import type { ReactElement, ReactNode } from "react";

export type Heading3Props = {
    readonly children?: ReactNode;
};

export function Heading3({ children }: Heading3Props): ReactElement {
    return <h3 className={clsx(base, sizes.h3)}>{children}</h3>;
}
