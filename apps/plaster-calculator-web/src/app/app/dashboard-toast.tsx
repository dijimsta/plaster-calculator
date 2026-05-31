import { Button } from "@libraries/uikit-web";
import { CheckCircle2, X } from "lucide-react";
import { default as LinkModule } from "next/link.js";

import { ui } from "../../lib/styles.js";

import type { ToastState } from "./dashboard.types.js";

const Link = LinkModule.default;

export function DashboardToast({
    toast,
    toastProject,
    processingProjectId,
    setToast,
    setToastProject,
}: ToastState) {
    if (!toast && !processingProjectId) return null;

    return (
        <div className={ui.toast}>
            <CheckCircle2 size={18} />
            <span>
                {processingProjectId ? (
                    "A project is processing. This list will update automatically."
                ) : toastProject ? (
                    <>
                        <Link href={`/app/projects/${toastProject.id}`}>
                            {toastProject.name}
                        </Link>{" "}
                        {toast}
                    </>
                ) : (
                    toast
                )}
            </span>
            {!processingProjectId && (
                <Button
                    variant="ghost"
                    onClick={() => {
                        setToast("");
                        setToastProject(null);
                    }}
                >
                    <X size={16} />
                </Button>
            )}
        </div>
    );
}
