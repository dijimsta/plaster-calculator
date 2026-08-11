import {
    Button,
    EmptyState,
    Input,
    Label,
    SelectMenu,
    Text,
} from "@libraries/uikit-web";
import {
    FolderKanban,
    LoaderCircle,
    Pencil,
    RefreshCcw,
    Search,
    Trash2,
} from "lucide-react";
import { default as LinkModule } from "next/link.js";

import { useAppTranslation } from "../../i18n/index.ts";
import { useSalesStatusLabel } from "../../lib/sales-status.js";
import { cx, ui } from "../../lib/styles.js";

import type { ProjectHistoryProps } from "./dashboard.types.js";

const Link = LinkModule.default;

export function ProjectHistory({
    activeSalesStatus,
    filtered,
    projectsLoading,
    query,
    renameValue,
    renamingId,
    refresh,
    removeProject,
    saveRename,
    setActiveSalesStatus,
    setQuery,
    setRenamingId,
    setRenameValue,
}: ProjectHistoryProps) {
    const { t } = useAppTranslation();
    const salesStatusLabel = useSalesStatusLabel();

    return (
        <section className={cx(ui.panel, ui.stack, "self-start")}>
            <div className={ui.editorToolbar}>
                <h2>Active Projects</h2>
                <div className={cx(ui.buttonRow, "items-end")}>
                    <div className="grid gap-1.5 min-w-[190px]">
                        <Label htmlFor="sales-status-filter">Status</Label>
                        <SelectMenu
                            id="sales-status-filter"
                            options={[
                                {
                                    value: "QUOTING",
                                    label: salesStatusLabel("QUOTING"),
                                },
                                {
                                    value: "QUOTE_SUBMITTED",
                                    label: salesStatusLabel("QUOTE_SUBMITTED"),
                                },
                            ]}
                            value={activeSalesStatus}
                            onChange={(e) =>
                                setActiveSalesStatus(
                                    e.target.value as typeof activeSalesStatus,
                                )
                            }
                        />
                    </div>
                    <div className="grid gap-1.5 min-w-[260px]">
                        <Label htmlFor="search">Search</Label>
                        <Input
                            id="search"
                            leadingIcon={
                                <Search
                                    size={16}
                                    className="text-gray-400 dark:text-gray-500"
                                />
                            }
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>
                    <Button
                        variant="secondary"
                        onClick={() => void refresh()}
                        title="Refresh project history"
                    >
                        <RefreshCcw size={18} /> Refresh
                    </Button>
                </div>
            </div>
            <div className={ui.projectList}>
                {projectsLoading ? (
                    <div
                        className={ui.projectListState}
                        role="status"
                        aria-live="polite"
                    >
                        <LoaderCircle className="animate-spin" size={24} />
                        <Text size="sm" variant="muted">
                            Loading projects...
                        </Text>
                    </div>
                ) : (
                    <>
                        {filtered.map((project) => (
                            <div className={ui.projectItem} key={project.id}>
                                <Link href={`/projects/${project.id}`}>
                                    {renamingId === project.id ? (
                                        <span
                                            onClick={(event) =>
                                                event.preventDefault()
                                            }
                                        >
                                            <Input
                                                value={renameValue}
                                                onChange={(event) =>
                                                    setRenameValue(
                                                        event.target.value,
                                                    )
                                                }
                                                onKeyDown={(event) => {
                                                    if (event.key === "Enter") {
                                                        event.preventDefault();
                                                        saveRename(project.id);
                                                    }
                                                }}
                                            />
                                        </span>
                                    ) : (
                                        <strong>{project.name}</strong>
                                    )}
                                    <Text size="sm" variant="muted" truncate>
                                        {project.originalFileName} /{" "}
                                        {project.uploadType} / {project.status}{" "}
                                        /{" "}
                                        {salesStatusLabel(project.salesStatus)}{" "}
                                        / {project.pageCount}{" "}
                                        {project.pageCount === 1
                                            ? "page"
                                            : "pages"}{" "}
                                        /{" "}
                                        {new Date(
                                            project.updatedAt,
                                        ).toLocaleString()}
                                    </Text>
                                </Link>
                                <div className={ui.projectActions}>
                                    {renamingId === project.id ? (
                                        <Button
                                            variant="secondary"
                                            onClick={() =>
                                                saveRename(project.id)
                                            }
                                        >
                                            Save
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="secondary"
                                            icon={
                                                <Pencil
                                                    size={18}
                                                    aria-hidden="true"
                                                />
                                            }
                                            onClick={() => {
                                                setRenamingId(project.id);
                                                setRenameValue(project.name);
                                            }}
                                            label="Rename project"
                                        />
                                    )}
                                    <Button
                                        variant="secondary"
                                        icon={
                                            <Trash2
                                                size={18}
                                                aria-hidden="true"
                                            />
                                        }
                                        onClick={() => removeProject(project)}
                                        label="Delete project"
                                    />
                                </div>
                            </div>
                        ))}
                        {filtered.length === 0 && (
                            <EmptyState
                                icon={<FolderKanban />}
                                title={t("projectHistory.noStatusProjects", {
                                    status: salesStatusLabel(activeSalesStatus),
                                })}
                            />
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
