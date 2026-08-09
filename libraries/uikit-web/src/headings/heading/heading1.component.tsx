import clsx from "clsx";
import type { PropsWithChildren, ReactElement } from "react";

import { base, sizes } from "./heading.styles.ts";

export function Heading1({ children }: PropsWithChildren): ReactElement {
    return <h1 className={clsx(base, sizes.h1)}>{children}</h1>;
}
