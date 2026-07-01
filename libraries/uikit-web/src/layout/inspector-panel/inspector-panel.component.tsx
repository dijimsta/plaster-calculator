import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import { useId, useState } from "react";

import { statusTones, styles } from "./inspector-panel.styles.ts";

import type { InspectorStatusTone } from "./inspector-panel.styles.ts";
import type {
    HTMLAttributes,
    PropsWithChildren,
    ReactElement,
    ReactNode,
} from "react";

export type InspectorPanelProps = HTMLAttributes<HTMLDivElement>;

export type InspectorSectionStatus = {
    readonly label: string;
    readonly tone: InspectorStatusTone;
};

export type InspectorSectionProps = PropsWithChildren<{
    readonly title: string;
    readonly icon?: ReactNode;
    readonly status?: InspectorSectionStatus;
    readonly defaultOpen?: boolean;
    readonly open?: boolean;
    readonly onToggle?: (open: boolean) => void;
    readonly className?: string;
}>;

export function InspectorPanel({
    className,
    children,
    ...props
}: PropsWithChildren<InspectorPanelProps>): ReactElement {
    return (
        <div className={clsx(styles.panel, className)} {...props}>
            {children}
        </div>
    );
}

export function InspectorSection({
    title,
    icon,
    status,
    defaultOpen = false,
    open,
    onToggle,
    className,
    children,
}: InspectorSectionProps): ReactElement {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const bodyId = useId();
    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalOpen;

    function toggle(): void {
        const nextOpen = !isOpen;

        if (!isControlled) {
            setInternalOpen(nextOpen);
        }

        onToggle?.(nextOpen);
    }

    return (
        <section className={clsx(styles.section, className)}>
            <button
                type="button"
                aria-controls={bodyId}
                aria-expanded={isOpen}
                className={clsx(styles.header, isOpen && styles.openHeader)}
                onClick={toggle}
            >
                <ChevronRight
                    aria-hidden="true"
                    className={clsx(
                        styles.chevron,
                        isOpen && styles.openChevron,
                    )}
                />
                {icon && (
                    <span aria-hidden="true" className={styles.icon}>
                        {icon}
                    </span>
                )}
                <span className={styles.title}>{title}</span>
                {status && <InspectorStatus status={status} />}
            </button>
            <div
                id={bodyId}
                aria-hidden={!isOpen}
                inert={!isOpen}
                className={clsx(
                    styles.bodyGrid,
                    isOpen ? styles.openBodyGrid : styles.closedBodyGrid,
                )}
            >
                <div className={styles.bodyOverflow}>
                    <div className={styles.body}>{children}</div>
                </div>
            </div>
        </section>
    );
}

function InspectorStatus({
    status,
}: {
    readonly status: InspectorSectionStatus;
}): ReactElement {
    const tone = statusTones[status.tone];

    return (
        <span className={clsx(styles.status, tone.status)}>
            <span
                aria-hidden="true"
                className={clsx(styles.statusDot, tone.dot)}
            />
            {status.label}
        </span>
    );
}
