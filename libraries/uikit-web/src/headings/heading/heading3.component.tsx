import clsx from "clsx";
import type { PropsWithChildren, ReactElement } from "react";

import { base, sizes } from "./heading.styles.ts";

export function Heading3({ children }: PropsWithChildren): ReactElement {
    return <h3 className={clsx(base, sizes.h3)}>{children}</h3>;
}
