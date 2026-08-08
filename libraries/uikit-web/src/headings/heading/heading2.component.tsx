import clsx from "clsx";

import { base, sizes } from "./heading.styles.ts";

import type { PropsWithChildren, ReactElement } from "react";

export function Heading2({ children }: PropsWithChildren): ReactElement {
    return <h2 className={clsx(base, sizes.h2)}>{children}</h2>;
}
