import { Button } from "@libraries/uikit-web";
import type { ButtonSize } from "@libraries/uikit-web";
import { Minus, Plus, ZoomIn } from "lucide-react";

const ZOOM_STEP = 0.15;

export type ZoomControlsProps = {
    readonly zoom: number;
    readonly size?: ButtonSize;
    readonly onChangeZoom: (zoom: number) => void;
    readonly onResetView: () => void;
};

/** The zoom-out / reset-zoom-percentage / zoom-in trio, shared by the two-pane toolbar and the full-screen zoom chip. */
export function ZoomControls({
    zoom,
    size = "medium",
    onChangeZoom,
    onResetView,
}: ZoomControlsProps) {
    return (
        <>
            <Button
                variant="secondary"
                size={size}
                icon={<Minus size={18} aria-hidden="true" />}
                onClick={() => onChangeZoom(zoom - ZOOM_STEP)}
                label="Zoom out"
            />
            <Button
                variant="secondary"
                size={size}
                onClick={onResetView}
                title="Reset zoom"
            >
                <ZoomIn size={18} /> {Math.round(zoom * 100)}%
            </Button>
            <Button
                variant="secondary"
                size={size}
                icon={<Plus size={18} aria-hidden="true" />}
                onClick={() => onChangeZoom(zoom + ZOOM_STEP)}
                label="Zoom in"
            />
        </>
    );
}
