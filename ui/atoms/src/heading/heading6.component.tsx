import clsx from "clsx";

import { base, sizes } from "./heading.styles.ts";

import type { ReactElement, ReactNode } from "react";

export type Heading6Props = {
    readonly children?: ReactNode;
};

export function Heading6({ children }: Heading6Props): ReactElement {
    return <h6 className={clsx(base, sizes.h6)}>{children}</h6>;
}
