"use client";

import { Breadcrumb } from "@libraries/uikit-web";
import { useRouter } from "next/navigation.js";
import type { PropsWithChildren, ReactElement } from "react";

type RoutedBreadcrumbItemProps = {
    readonly href: string;
};

export function RoutedBreadcrumbItem({
    href,
    children,
}: PropsWithChildren<RoutedBreadcrumbItemProps>): ReactElement {
    const router = useRouter();

    return (
        <Breadcrumb.Item
            href={href}
            onClick={(event) => {
                event.preventDefault();
                router.push(href);
            }}
        >
            {children}
        </Breadcrumb.Item>
    );
}
