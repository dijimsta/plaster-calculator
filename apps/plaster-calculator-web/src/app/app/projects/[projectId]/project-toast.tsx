import { Button } from "@libraries/uikit-web";
import { X } from "lucide-react";

import { ui } from "../../../../lib/styles.js";

interface ProjectToastProps {
    readonly toast: string;
    readonly setToast: (toast: string) => void;
}

export function ProjectToast({ toast, setToast }: ProjectToastProps) {
    if (!toast) return null;

    return (
        <div className={ui.toast}>
            <span>{toast}</span>
            <Button
                variant="ghost"
                onClick={() => setToast("")}
                title="Dismiss message"
                type="button"
            >
                <X size={16} />
            </Button>
        </div>
    );
}
