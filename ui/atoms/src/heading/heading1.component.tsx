import clsx from "clsx";

import { base, sizes } from "./heading.styles.ts";

import type { ReactElement, ReactNode } from "react";

export type Heading1Props = {
    readonly children?: ReactNode;
};

export function Heading1({ children }: Heading1Props): ReactElement {
    return <h1 className={clsx(base, sizes.h1)}>{children}</h1>;
}
