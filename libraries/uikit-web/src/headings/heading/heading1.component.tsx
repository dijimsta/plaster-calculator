import clsx from "clsx";

import { base, sizes } from "./heading.styles.ts";

import type { PropsWithChildren, ReactElement } from "react";

export function Heading1({ children }: PropsWithChildren): ReactElement {
    return <h1 className={clsx(base, sizes.h1)}>{children}</h1>;
}
