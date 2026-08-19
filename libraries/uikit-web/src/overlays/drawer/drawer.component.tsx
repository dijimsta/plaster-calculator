"use client";

import clsx from "clsx";
import { X } from "lucide-react";
import { useEffect, useId, useRef } from "react";
import type { ReactElement, ReactNode } from "react";

import { Backdrop } from "../backdrop/index.ts";

import { drawerSizes, styles } from "./drawer.styles.ts";
import type { DrawerSize } from "./drawer.styles.ts";

export type DrawerPlacement = "left" | "right";

/** Opens a drawer's underlying dialog using the mode its `modal` prop requires. */
function openDrawerDialog(dialog: HTMLDialogElement, modal: boolean): void {
    if (modal) {
        dialog.showModal();
    } else {
        dialog.show();
    }
}

/** The root `<dialog>` class for a drawer's modal or non-modal mode. */
function drawerRootClassName(modal: boolean): string {
    return modal ? styles.root : styles.rootNonModal;
}

/** A modal drawer renders a Backdrop; a non-modal drawer leaves the page uncovered. */
function DrawerBackdrop({
    modal,
    onClose,
}: {
    readonly modal: boolean;
    readonly onClose: () => void;
}): ReactElement | null {
    return modal ? <Backdrop onClick={onClose} /> : null;
}

export type DrawerProps = {
    readonly open: boolean;
    readonly onClose: () => void;
    readonly title: ReactNode;
    readonly description?: ReactNode;
    readonly children: ReactNode;
    readonly footer?: ReactNode;
    readonly placement?: DrawerPlacement;
    readonly size?: DrawerSize;
    readonly closeLabel?: string;
    /**
     * Modal (default): browser-level focus trap, inert background, and a Backdrop.
     * Non-modal: a positioned, non-blocking panel over still-interactive page content —
     * the consumer owns dismissal (e.g. Escape) and any layout reflow around it.
     *
     * Deliberately does not add its own Escape-key handling for the non-modal case: a
     * consumer that owns dismissal precedence (e.g. closing this before another
     * overlay) needs a single source of truth for that key, and a second internal
     * listener here would race it non-deterministically.
     */
    readonly modal?: boolean;
};

/** An accessible panel that slides in from either side of the viewport, modal or non-modal. */
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
    modal = true,
}: DrawerProps): ReactElement {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const titleId = useId();
    const descriptionId = useId();

    useEffect(() => {
        const dialog = dialogRef.current;

        if (open && dialog && !dialog.open) {
            openDrawerDialog(dialog, modal);
        } else if (!open && dialog?.open) {
            dialog.close();
        }
    }, [open, modal]);

    const isLeft = placement === "left";

    return (
        <dialog
            ref={dialogRef}
            aria-describedby={description ? descriptionId : undefined}
            aria-labelledby={titleId}
            className={drawerRootClassName(modal)}
            onCancel={(event) => {
                event.preventDefault();
                onClose();
            }}
        >
            <DrawerBackdrop modal={modal} onClose={onClose} />
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
