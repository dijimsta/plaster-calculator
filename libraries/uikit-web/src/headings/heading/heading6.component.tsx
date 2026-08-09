import clsx from "clsx";
import type { PropsWithChildren, ReactElement } from "react";

import { base, sizes } from "./heading.styles.ts";

export function Heading6({ children }: PropsWithChildren): ReactElement {
    return <h6 className={clsx(base, sizes.h6)}>{children}</h6>;
}
