import type { ComponentType, PropsWithChildren, ReactElement } from "react";

export interface NestedComponentsProps extends PropsWithChildren {
    readonly components: readonly ComponentType<PropsWithChildren>[];
}

/**
 * Nests components in declaration order instead of hand-nested JSX.
 * `<NestedComponents components={[A, B, C]}>{children}</NestedComponents>` renders `<A><B><C>{children}</C></B></A>`.
 */
export function NestedComponents({
    children,
    components,
}: NestedComponentsProps): ReactElement {
    return components.reduceRight<ReactElement>(
        (child, Component) => <Component>{child}</Component>,
        <>{children}</>,
    );
}
