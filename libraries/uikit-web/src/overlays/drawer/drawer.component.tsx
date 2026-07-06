import clsx from "clsx";
import { X } from "lucide-react";
import { useEffect, useId, useRef } from "react";

import { drawerSizes, styles } from "./drawer.styles.ts";
import { Backdrop } from "../backdrop/index.ts";

import type { DrawerSize } from "./drawer.styles.ts";
import type { DialogHTMLAttributes, ReactElement, ReactNode } from "react";

export type DrawerPlacement = "left" | "right";

export interface DrawerProps extends Omit<
    DialogHTMLAttributes<HTMLDialogElement>,
    "children" | "onClose" | "open" | "title"
> {
    readonly open: boolean;
    readonly onClose: () => void;
    readonly title: ReactNode;
    readonly description?: ReactNode;
    readonly children: ReactNode;
    readonly footer?: ReactNode;
    readonly placement?: DrawerPlacement;
    readonly size?: DrawerSize;
    readonly closeLabel?: string;
}

/** An accessible, modal panel that slides in from either side of the viewport. */
export function Drawer({
    open,
    onClose,
    title,
    description,
    children,
    footer,
    placement = "right",
    size = "md",
    closeLabel = "Close panel",
    className,
    ...props
}: DrawerProps): ReactElement {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const titleId = useId();
    const descriptionId = useId();

    useEffect(() => {
        const dialog = dialogRef.current;

        if (open && dialog && !dialog.open) {
            dialog.showModal();
        } else if (!open && dialog?.open) {
            dialog.close();
        }
    }, [open]);

    const isLeft = placement === "left";

    return (
        <dialog
            {...props}
            ref={dialogRef}
            aria-describedby={description ? descriptionId : undefined}
            aria-labelledby={titleId}
            className={clsx(styles.root, className)}
            onCancel={(event) => {
                event.preventDefault();
                onClose();
            }}
        >
            <Backdrop onClick={onClose} />
            <div
                className={clsx(
                    styles.positioner,
                    isLeft ? styles.leftPositioner : styles.rightPositioner,
                )}
            >
                <section
                    className={clsx(
                        styles.panel,
                        drawerSizes[size],
                        isLeft ? styles.leftPanel : styles.rightPanel,
                    )}
                >
                    <header className={styles.header}>
                        <div className={styles.heading}>
                            <h2 id={titleId} className={styles.title}>
                                {title}
                            </h2>
                            {description && (
                                <p
                                    id={descriptionId}
                                    className={styles.description}
                                >
                                    {description}
                                </p>
                            )}
                        </div>
                        <button
                            type="button"
                            aria-label={closeLabel}
                            className={styles.closeButton}
                            onClick={onClose}
                        >
                            <X
                                aria-hidden="true"
                                className={styles.closeIcon}
                            />
                        </button>
                    </header>
                    <div className={styles.body}>{children}</div>
                    {footer && (
                        <footer className={styles.footer}>{footer}</footer>
                    )}
                </section>
            </div>
        </dialog>
    );
}
