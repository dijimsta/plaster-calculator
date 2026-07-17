import {
    Button,
    Input,
    Label,
    Paragraph,
    SelectMenu,
    Text,
} from "@libraries/uikit-web";
import { LoaderCircle, Pencil, RefreshCcw, Search, Trash2 } from "lucide-react";
import { default as LinkModule } from "next/link.js";

import { salesStatusLabel } from "../../lib/sales-status.js";
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
                                <Link href={`/app/projects/${project.id}`}>
                                    {renamingId === project.id ? (
                                        <input
                                            className={ui.input}
                                            value={renameValue}
                                            onClick={(event) =>
                                                event.preventDefault()
                                            }
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
                                    ) : (
                                        <strong>{project.name}</strong>
                                    )}
                                    <Text
                                        size="sm"
                                        variant="muted"
                                        className={ui.projectMetaLine}
                                    >
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
                                            aria-label="Rename project"
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
                                        aria-label="Delete project"
                                    />
                                </div>
                            </div>
                        ))}
                        {filtered.length === 0 && (
                            <Paragraph textSize="sm" variant="muted">
                                No {salesStatusLabel(activeSalesStatus)}{" "}
                                projects.
                            </Paragraph>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
