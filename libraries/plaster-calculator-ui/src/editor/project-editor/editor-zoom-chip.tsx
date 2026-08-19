import { Box, Card } from "@libraries/uikit-web";

import { ZoomControls } from "./zoom-controls.js";
import type { ZoomControlsProps } from "./zoom-controls.js";

/** Floating, bottom-right zoom trio for the full-screen editor layout -- shares `ZoomControls` with the two-pane toolbar. */
export function EditorZoomChip(props: ZoomControlsProps) {
    return (
        <Card>
            <Box direction="row" align="center" gap="sm">
                <ZoomControls {...props} />
            </Box>
        </Card>
    );
}
