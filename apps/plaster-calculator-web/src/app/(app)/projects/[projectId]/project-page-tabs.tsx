import { Tabs } from "@libraries/uikit-web";

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
            <Tabs variant="pills-on-gray" label="Select page">
                {project.pages.map((page) => (
                    <Tabs.Item
                        key={page.id}
                        current={page.id === selectedPageId}
                    >
                        <button
                            type="button"
                            onClick={() => void selectPage(page.id)}
                            disabled={switchingPage}
                        >
                            Page {page.pageNumber}
                        </button>
                    </Tabs.Item>
                ))}
            </Tabs>
        </div>
    );
}
