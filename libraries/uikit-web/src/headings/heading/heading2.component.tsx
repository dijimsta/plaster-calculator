import clsx from "clsx";
import type { PropsWithChildren, ReactElement } from "react";

import { base, sizes } from "./heading.styles.ts";

export function Heading2({ children }: PropsWithChildren): ReactElement {
    return <h2 className={clsx(base, sizes.h2)}>{children}</h2>;
}
