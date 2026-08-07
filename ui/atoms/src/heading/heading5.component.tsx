import clsx from "clsx";

import { base, sizes } from "./heading.styles.ts";

import type { ReactElement, ReactNode } from "react";

export type Heading5Props = {
    readonly children?: ReactNode;
};

export function Heading5({ children }: Heading5Props): ReactElement {
    return <h5 className={clsx(base, sizes.h5)}>{children}</h5>;
}
