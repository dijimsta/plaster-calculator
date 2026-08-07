import clsx from "clsx";

import { base, sizes } from "./heading.styles.ts";

import type { ReactElement, ReactNode } from "react";

export type Heading4Props = {
    readonly children?: ReactNode;
};

export function Heading4({ children }: Heading4Props): ReactElement {
    return <h4 className={clsx(base, sizes.h4)}>{children}</h4>;
}
