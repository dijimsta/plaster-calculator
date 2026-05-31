import { Button } from "@libraries/uikit-web";
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
                    <div className={cx(ui.field, "min-w-[190px]")}>
                        <label htmlFor="sales-status-filter">Status</label>
                        <select
                            id="sales-status-filter"
                            className={ui.input}
                            value={activeSalesStatus}
                            onChange={(event) =>
                                setActiveSalesStatus(
                                    event.target
                                        .value as typeof activeSalesStatus,
                                )
                            }
                        >
                            <option value="QUOTING">
                                {salesStatusLabel("QUOTING")}
                            </option>
                            <option value="QUOTE_SUBMITTED">
                                {salesStatusLabel("QUOTE_SUBMITTED")}
                            </option>
                        </select>
                    </div>
                    <div className={cx(ui.field, "min-w-[260px]")}>
                        <label htmlFor="search">Search</label>
                        <div className="relative">
                            <Search
                                size={16}
                                className="absolute left-[11px] top-[13px] text-slate-500 dark:text-slate-400"
                            />
                            <input
                                id="search"
                                className={cx(ui.input, "pl-[34px]")}
                                value={query}
                                onChange={(event) =>
                                    setQuery(event.target.value)
                                }
                            />
                        </div>
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
                        <span className={ui.muted}>Loading projects...</span>
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
                                    <span
                                        className={cx(
                                            ui.muted,
                                            ui.projectMetaLine,
                                        )}
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
                                    </span>
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
                                        <button
                                            className={cx(
                                                ui.button,
                                                ui.buttonDefault,
                                                ui.buttonIcon,
                                            )}
                                            onClick={() => {
                                                setRenamingId(project.id);
                                                setRenameValue(project.name);
                                            }}
                                            title="Rename project"
                                        >
                                            <Pencil size={18} />
                                        </button>
                                    )}
                                    <button
                                        className={cx(
                                            ui.button,
                                            ui.buttonDefault,
                                            ui.buttonIcon,
                                        )}
                                        onClick={() => removeProject(project)}
                                        title="Delete project"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {filtered.length === 0 && (
                            <p className={ui.muted}>
                                No {salesStatusLabel(activeSalesStatus)}{" "}
                                projects.
                            </p>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}
