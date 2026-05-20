"use client";

import { LoaderCircle } from "lucide-react";

import { cx, ui } from "../lib/styles.js";

interface BusyOverlayProps {
    readonly message: string;
}

export function BusyOverlay({ message }: BusyOverlayProps) {
    return (
        <div
            aria-busy="true"
            aria-live="polite"
            className="fixed inset-0 z-50 grid place-items-center bg-slate-950/55 p-6"
            role="status"
        >
            <div
                className={cx(
                    ui.panel,
                    "flex min-w-[240px] items-center gap-3 shadow-2xl",
                )}
            >
                <LoaderCircle className="animate-spin" size={24} />
                <span className="font-semibold">{message}</span>
            </div>
        </div>
    );
}
