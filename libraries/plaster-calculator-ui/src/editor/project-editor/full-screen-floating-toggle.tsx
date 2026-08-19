import { Button } from "@libraries/uikit-web";
import { Maximize2, Minimize2 } from "lucide-react";

import { useEditorTranslation } from "../i18n/index.js";

import { ui } from "./project-editor.styles.js";

export type FullScreenFloatingToggleProps = {
    readonly fullScreen: boolean;
    readonly onToggleFullScreen: () => void;
};

/**
 * Enters or exits full-screen mode, floating directly on the canvas in both
 * layouts rather than living in the toolbar (where it used to compete for
 * space with per-tool controls, and looked like just another secondary
 * action). Rendered by both `ProjectEditorView` and
 * `ProjectEditorFullScreenView` inside their respective canvas containers;
 * see `ui.canvasFloatingTogglePosition` in `project-editor.styles.ts` for
 * why those containers need `position: relative` to host it. Shares
 * `use-editor-full-screen.ts`'s `enter`/`exit` handlers -- this only
 * relocates the trigger, it doesn't own any toggle logic itself.
 */
export function FullScreenFloatingToggle({
    fullScreen,
    onToggleFullScreen,
}: FullScreenFloatingToggleProps) {
    const { t } = useEditorTranslation();

    return (
        <div className={ui.canvasFloatingTogglePosition}>
            <Button
                variant="primary"
                size="large"
                icon={
                    fullScreen ? (
                        <Minimize2 size={20} aria-hidden="true" />
                    ) : (
                        <Maximize2 size={20} aria-hidden="true" />
                    )
                }
                onClick={onToggleFullScreen}
                label={
                    fullScreen
                        ? t("editorToolbar.exitFullScreen")
                        : t("editorToolbar.enterFullScreen")
                }
            />
        </div>
    );
}
