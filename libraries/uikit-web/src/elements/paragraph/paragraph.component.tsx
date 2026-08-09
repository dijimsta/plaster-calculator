import clsx from "clsx";
import type { ReactElement, ReactNode } from "react";

import {
    measures,
    sizes,
    variants,
    type ParagraphSize,
    type ParagraphMeasure,
    type ParagraphVariant,
} from "./paragraph.styles.ts";

export type { ParagraphMeasure, ParagraphSize, ParagraphVariant };

export type ParagraphProps = {
    readonly textSize?: ParagraphSize;
    readonly variant?: ParagraphVariant;
    readonly measure?: ParagraphMeasure;
    /** Announces the paragraph as a polite status update. */
    readonly status?: boolean;
    readonly children?: ReactNode;
};

export function Paragraph({
    textSize = "base",
    variant = "default",
    measure = "default",
    status = false,
    children,
}: ParagraphProps): ReactElement {
    return (
        <p
            role={status ? "status" : undefined}
            aria-live={status ? "polite" : undefined}
            className={clsx(
                sizes[textSize],
                variants[variant],
                measures[measure],
            )}
        >
            {children}
        </p>
    );
}
