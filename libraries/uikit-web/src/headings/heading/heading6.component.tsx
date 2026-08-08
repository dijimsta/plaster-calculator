import clsx from "clsx";

import { base, sizes } from "./heading.styles.ts";

import type { PropsWithChildren, ReactElement } from "react";

export function Heading6({ children }: PropsWithChildren): ReactElement {
    return <h6 className={clsx(base, sizes.h6)}>{children}</h6>;
}
