import clsx from "clsx";
import { X } from "lucide-react";
import { useEffect, useId, useRef } from "react";

import { modalDialogSizes, styles } from "./modal-dialog.styles.ts";
import { Backdrop } from "../backdrop/index.ts";

import type { ModalDialogSize } from "./modal-dialog.styles.ts";
import type { DialogHTMLAttributes, ReactElement, ReactNode } from "react";

export interface ModalDialogProps extends Omit<
    DialogHTMLAttributes<HTMLDialogElement>,
    "children" | "onClose" | "open" | "title"
> {
    readonly open: boolean;
    readonly onClose: () => void;
    readonly title: ReactNode;
    readonly description?: ReactNode;
    readonly children: ReactNode;
    readonly footer?: ReactNode;
    readonly size?: ModalDialogSize;
    readonly closeLabel?: string;
    readonly showCloseButton?: boolean;
}

/** An accessible modal dialog for focused content, alerts, and confirmations. */
export function ModalDialog({
    open,
    onClose,
    title,
    description,
    children,
    footer,
    size = "md",
    closeLabel = "Close dialog",
    showCloseButton = true,
    className,
    ...props
}: ModalDialogProps): ReactElement {
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
            <div className={styles.positioner}>
                <section className={clsx(styles.panel, modalDialogSizes[size])}>
                    {showCloseButton && (
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
                    )}
                    <header className={styles.header}>
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
