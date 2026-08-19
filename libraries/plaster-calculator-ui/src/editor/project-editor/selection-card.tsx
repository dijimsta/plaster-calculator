import { edgeLengthPx } from "@libraries/plaster-calculator-common";
import type { AreaPolygon } from "@libraries/plaster-calculator-common";
import { Box, Button, Card, Text } from "@libraries/uikit-web";
import { SlidersHorizontal } from "lucide-react";
import type { ReactElement } from "react";

import { useEditorTranslation } from "../i18n/index.js";

import type { SelectionMetrics } from "./editor-sidebar.types.js";
import type { SelectedEdge } from "./use-editor-selection.js";

export type SelectionCardProps = {
    readonly selectedArea: AreaPolygon | null;
    readonly selectedEdge: SelectedEdge | null;
    readonly selectedEdgeArea: AreaPolygon | null;
    readonly selectedPointIndexes: number[];
    readonly metrics: SelectionMetrics | null;
    readonly scaleMmPerPx: number | null;
    readonly onEditProperties: () => void;
};

/**
 * Floating, bottom-left selection summary for the full-screen editor
 * layout. Reuses the same derived selection state the sidebar's
 * Selection/Areas panels already compute -- it never recomputes area or
 * edge metrics itself.
 */
export function SelectionCard({
    selectedArea,
    selectedEdge,
    selectedEdgeArea,
    selectedPointIndexes,
    metrics,
    scaleMmPerPx,
    onEditProperties,
}: SelectionCardProps): ReactElement | null {
    const { t } = useEditorTranslation();
    const content = selectionCardContent({
        selectedArea,
        selectedEdge,
        selectedEdgeArea,
        selectedPointIndexes,
        metrics,
        scaleMmPerPx,
        pointSelectedLabel: t("selectionCard.pointSelected"),
        roomLabel: t("selectionCard.roomLabel"),
        wallLabel: t("selectionCard.wallLabel"),
    });
    if (!content) return null;

    return (
        <Card>
            <Box direction="column" gap="xs">
                <Text weight="semibold">{content.title}</Text>
                {content.detail && (
                    <Text size="sm" variant="muted">
                        {content.detail}
                    </Text>
                )}
                <Button
                    variant="secondary"
                    size="small"
                    icon={<SlidersHorizontal size={16} aria-hidden="true" />}
                    onClick={onEditProperties}
                >
                    {t("selectionCard.editProperties")}
                </Button>
            </Box>
        </Card>
    );
}

type SelectionCardContent = {
    readonly title: string;
    readonly detail: string | null;
};

type SelectionCardContentOptions = Omit<
    SelectionCardProps,
    "onEditProperties"
> & {
    readonly pointSelectedLabel: string;
    readonly roomLabel: string;
    readonly wallLabel: string;
};

function selectionCardContent({
    selectedArea,
    selectedEdge,
    selectedEdgeArea,
    selectedPointIndexes,
    metrics,
    scaleMmPerPx,
    pointSelectedLabel,
    roomLabel,
    wallLabel,
}: SelectionCardContentOptions): SelectionCardContent | null {
    if (selectedEdge && selectedEdgeArea) {
        return {
            title: `${wallLabel}: ${selectedEdgeArea.label}`,
            detail: edgeLengthDetail(
                selectedEdgeArea,
                selectedEdge,
                scaleMmPerPx,
            ),
        };
    }
    if (selectedPointIndexes.length > 0) {
        return { title: pointSelectedLabel, detail: null };
    }
    if (selectedArea) {
        return {
            title: `${roomLabel}: ${selectedArea.label}`,
            detail: metrics ? `${metrics.ceilingAreaM2.toFixed(2)} m2` : null,
        };
    }
    return null;
}

function edgeLengthDetail(
    area: AreaPolygon,
    selectedEdge: SelectedEdge,
    scaleMmPerPx: number | null,
): string | null {
    if (!scaleMmPerPx) return null;
    const lengthM =
        (edgeLengthPx(area, selectedEdge.edgeIndex) * scaleMmPerPx) / 1000;
    return `${lengthM.toFixed(2)} m`;
}
