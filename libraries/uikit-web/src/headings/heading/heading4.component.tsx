import clsx from "clsx";
import type { PropsWithChildren, ReactElement } from "react";

import { base, sizes } from "./heading.styles.ts";

export function Heading4({ children }: PropsWithChildren): ReactElement {
    return <h4 className={clsx(base, sizes.h4)}>{children}</h4>;
}
