import { Box, Button } from "@libraries/uikit-web";

import { useAppTranslation } from "../../../../i18n/index.ts";
import type { ProjectDetail } from "../../../../types.js";

type ProjectPagePickerPanelProps = {
    readonly project: ProjectDetail;
    readonly selectedPageId: string | null;
    readonly selectPage: (pageId: string) => Promise<void>;
    readonly switchingPage: boolean;
};

/**
 * Full-screen-mode counterpart to `ProjectPageTabs`: the same page-switching
 * data and behaviour (`project.pages`/`selectPage`/`switchingPage`),
 * rendered as a vertical list of buttons for the editor's inspector drawer
 * instead of a horizontal pill row.
 */
export function ProjectPagePickerPanel({
    project,
    selectedPageId,
    selectPage,
    switchingPage,
}: ProjectPagePickerPanelProps) {
    const { t } = useAppTranslation();

    return (
        <Box direction="column" gap="sm">
            {project.pages.map((page) => (
                <Button
                    key={page.id}
                    variant={
                        page.id === selectedPageId ? "primary" : "secondary"
                    }
                    fullWidth
                    align="start"
                    disabled={switchingPage}
                    onClick={() => void selectPage(page.id)}
                >
                    {t("pdfPageModal.page", { number: page.pageNumber })}
                </Button>
            ))}
        </Box>
    );
}
