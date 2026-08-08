import clsx from "clsx";

import { base, sizes } from "./heading.styles.ts";

import type { PropsWithChildren, ReactElement } from "react";

export function Heading5({ children }: PropsWithChildren): ReactElement {
    return <h5 className={clsx(base, sizes.h5)}>{children}</h5>;
}
