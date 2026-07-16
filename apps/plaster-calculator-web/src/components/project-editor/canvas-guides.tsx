import { Circle, Line } from "react-konva";

import { activeTheme } from "../../lib/styles.js";

import type { SnapGuide } from "./project-editor.types.js";
import type { Point } from "@libraries/plaster-calculator-common";

const SELECTED_COLOR = activeTheme.editor.selected;

interface CanvasGuidesProps {
    readonly draftPointer: Point | null;
    readonly draftPoints: Point[];
    readonly imageHeight: number;
    readonly imageWidth: number;
    readonly referencePoints: Point[];
    readonly snapGuide: SnapGuide;
    readonly zoom: number;
}

export function CanvasGuides({
    draftPointer,
    draftPoints,
    imageHeight,
    imageWidth,
    referencePoints,
    snapGuide,
    zoom,
}: CanvasGuidesProps) {
    return (
        <>
            {snapGuide?.x != null && (
                <Line
                    points={[snapGuide.x, 0, snapGuide.x, imageHeight]}
                    stroke={activeTheme.editor.draft}
                    strokeWidth={2 / zoom}
                    dash={[8 / zoom, 6 / zoom]}
                    listening={false}
                />
            )}
            {snapGuide?.y != null && (
                <Line
                    points={[0, snapGuide.y, imageWidth, snapGuide.y]}
                    stroke={activeTheme.editor.draft}
                    strokeWidth={2 / zoom}
                    dash={[8 / zoom, 6 / zoom]}
                    listening={false}
                />
            )}
            {referencePoints.map((point, index) => (
                <Circle
                    key={`ref-${index}`}
                    x={point[0]}
                    y={point[1]}
                    radius={8 / zoom}
                    fill={activeTheme.editor.draft}
                    stroke="white"
                    strokeWidth={2 / zoom}
                />
            ))}
            {referencePoints.length === 2 && (
                <Line
                    points={referencePoints.flat()}
                    stroke={activeTheme.editor.draft}
                    strokeWidth={3 / zoom}
                    dash={[8 / zoom, 6 / zoom]}
                />
            )}
            {draftPoints.length > 0 && (
                <>
                    <Line
                        points={(draftPointer
                            ? [...draftPoints, draftPointer]
                            : draftPoints
                        ).flat()}
                        stroke={activeTheme.editor.draft}
                        strokeWidth={3 / zoom}
                        dash={[8 / zoom, 6 / zoom]}
                    />
                    {draftPoints.map((point, index) => (
                        <Circle
                            key={`draft-${index}`}
                            x={point[0]}
                            y={point[1]}
                            radius={(index === 0 ? 9 : 6) / zoom}
                            fill={
                                index === 0
                                    ? SELECTED_COLOR
                                    : activeTheme.editor.draft
                            }
                            stroke="white"
                            strokeWidth={2 / zoom}
                            listening={false}
                        />
                    ))}
                </>
            )}
        </>
    );
}
