"use client";

import clsx from "clsx";

import { InputGroupContext } from "./input-group.context.ts";
import { orientations, root } from "./input-group.styles.ts";

import type { HTMLAttributes, PropsWithChildren, ReactElement } from "react";

export type InputGroupOrientation = "horizontal" | "vertical";

export type InputGroupProps = PropsWithChildren<
    {
        readonly orientation?: InputGroupOrientation;
    } & HTMLAttributes<HTMLDivElement>
>;

export function InputGroup({
    orientation = "vertical",
    className,
    children,
    ...props
}: InputGroupProps): ReactElement {
    return (
        <InputGroupContext value={{ orientation }}>
            <div
                className={clsx(root, orientations[orientation], className)}
                {...props}
            >
                {children}
            </div>
        </InputGroupContext>
    );
}
