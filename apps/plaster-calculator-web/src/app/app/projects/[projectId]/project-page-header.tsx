import { ArrowLeft, Download, Pencil, RefreshCcw } from "lucide-react";
import { default as LinkModule } from "next/link.js";

import { cx, ui } from "../../../../lib/styles.js";

import type { ProjectDetail } from "../../../../types.js";

const Link = LinkModule.default;

export interface ProjectHeaderProps {
    readonly project: ProjectDetail | null;
    readonly renaming: boolean;
    readonly renameValue: string;
    readonly load: () => void;
    readonly saveRename: () => Promise<void>;
    readonly setRenaming: (renaming: boolean) => void;
    readonly setRenameValue: (value: string) => void;
    readonly validateAndExport: () => Promise<void>;
}

export function ProjectHeader({
    project,
    renaming,
    renameValue,
    load,
    saveRename,
    setRenaming,
    setRenameValue,
    validateAndExport,
}: ProjectHeaderProps) {
    return (
        <header className={ui.topbar}>
            <div className={ui.buttonRow}>
                <Link className={cx(ui.button, ui.buttonDefault)} href="/app">
                    <ArrowLeft size={18} /> Projects
                </Link>
                {project && (
                    <button
                        className={cx(ui.button, ui.buttonDefault)}
                        onClick={() => void validateAndExport()}
                    >
                        <Download size={18} /> CSV
                    </button>
                )}
            </div>
            <div className="grid gap-1 text-right">
                {renaming ? (
                    <ProjectRenameForm
                        renameValue={renameValue}
                        saveRename={saveRename}
                        setRenameValue={setRenameValue}
                    />
                ) : (
                    <ProjectTitle project={project} setRenaming={setRenaming} />
                )}
                <span className={ui.muted}>
                    {project?.originalFileName ?? "Loading..."}
                </span>
            </div>
            <div className={ui.buttonRow}>
                <button
                    className={cx(ui.button, ui.buttonDefault)}
                    onClick={load}
                >
                    <RefreshCcw size={18} /> Refresh
                </button>
            </div>
        </header>
    );
}

function ProjectRenameForm({
    renameValue,
    saveRename,
    setRenameValue,
}: Pick<ProjectHeaderProps, "renameValue" | "saveRename" | "setRenameValue">) {
    return (
        <div className={ui.buttonRow}>
            <input
                className={ui.input}
                value={renameValue}
                onChange={(event) => setRenameValue(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === "Enter") void saveRename();
                }}
            />
            <button
                className={cx(ui.button, ui.buttonPrimary)}
                onClick={() => void saveRename()}
            >
                Save
            </button>
        </div>
    );
}

function ProjectTitle({
    project,
    setRenaming,
}: Pick<ProjectHeaderProps, "project" | "setRenaming">) {
    return (
        <div className={cx(ui.buttonRow, "justify-end")}>
            <h1 className="m-0 text-2xl leading-tight">
                {project?.name ?? "Project"}
            </h1>
            {project && (
                <button
                    className={cx(ui.button, ui.buttonDefault, ui.buttonIcon)}
                    onClick={() => setRenaming(true)}
                    title="Rename project"
                >
                    <Pencil size={18} />
                </button>
            )}
        </div>
    );
}
