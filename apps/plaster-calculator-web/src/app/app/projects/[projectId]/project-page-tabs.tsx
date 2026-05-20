import { cx, ui } from "../../../../lib/styles.js";

import type { ProjectDetail } from "../../../../types.js";

interface ProjectPageTabsProps {
    readonly project: ProjectDetail | null;
    readonly selectedPageId: string | null;
    readonly selectPage: (pageId: string) => Promise<void>;
    readonly switchingPage: boolean;
}

export function ProjectPageTabs({
    project,
    selectedPageId,
    selectPage,
    switchingPage,
}: ProjectPageTabsProps) {
    if (!project || project.pages.length <= 1) {
        return null;
    }

    return (
        <div className={cx(ui.topbar, "justify-start")}>
            <div className={ui.segmented}>
                {project.pages.map((page) => (
                    <button
                        key={page.id}
                        className={cx(
                            ui.segmentedButton,
                            page.id === selectedPageId &&
                                ui.segmentedButtonActive,
                        )}
                        onClick={() => void selectPage(page.id)}
                        disabled={switchingPage}
                    >
                        Page {page.pageNumber}
                    </button>
                ))}
            </div>
        </div>
    );
}
