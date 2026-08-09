"use client";

import clsx from "clsx";
import type { ReactElement, ReactNode } from "react";

import { InputGroupContext } from "./input-group.context.ts";
import { orientations, root } from "./input-group.styles.ts";

export type InputGroupOrientation = "horizontal" | "vertical";

export type InputGroupProps = {
    readonly orientation?: InputGroupOrientation;
    readonly children?: ReactNode;
};

export function InputGroup({
    orientation = "vertical",
    children,
}: InputGroupProps): ReactElement {
    return (
        <InputGroupContext value={{ orientation }}>
            <div className={clsx(root, orientations[orientation])}>
                {children}
            </div>
        </InputGroupContext>
    );
}
