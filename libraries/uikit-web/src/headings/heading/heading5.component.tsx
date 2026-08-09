import clsx from "clsx";
import type { PropsWithChildren, ReactElement } from "react";

import { base, sizes } from "./heading.styles.ts";

export function Heading5({ children }: PropsWithChildren): ReactElement {
    return <h5 className={clsx(base, sizes.h5)}>{children}</h5>;
}
