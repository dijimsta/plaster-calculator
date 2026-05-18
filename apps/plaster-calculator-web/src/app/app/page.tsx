"use client";

import {
    useEffect,
    useMemo,
    useState,
    type ChangeEvent,
    type DragEvent,
    type FormEvent,
} from "react";
import { default as LinkModule } from "next/link.js";
import {
    CheckCircle2,
    FileUp,
    LoaderCircle,
    Pencil,
    RefreshCcw,
    Search,
    Trash2,
    Upload,
    X,
} from "lucide-react";
import ThemeSettingsButton from "../../components/ThemeSettingsButton.js";
import {
    deleteProject,
    getProjectStatus,
    listProjects,
    listProcessingStrategies,
    processProject,
    renameProject,
    uploadPdfPageSource,
    uploadProject,
} from "../../lib/api.js";
import {
    loadPdfDocument,
    renderPdfPageSourcePng,
    renderPdfThumbnails,
    revokePdfPreviews,
    type PdfPagePreview,
} from "../../lib/pdf.js";
import { cx, ui } from "../../lib/styles.js";
import type { ProjectSummary, ProcessingStrategyInfo } from "../../types.js";
import type { PDFDocumentProxy } from "pdfjs-dist/legacy/build/pdf.mjs";

const Link = LinkModule.default;

export default function HomePage() {
    const [projects, setProjects] = useState<ProjectSummary[]>([]);
    const [query, setQuery] = useState("");
    const [name, setName] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [dragActive, setDragActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [projectsLoading, setProjectsLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [toast, setToast] = useState("");
    const [toastProject, setToastProject] = useState<{
        id: string;
        name: string;
    } | null>(null);
    const [draftProjectId, setDraftProjectId] = useState<string | null>(null);
    const [pdfDocument, setPdfDocument] = useState<PDFDocumentProxy | null>(
        null,
    );
    const [pdfPages, setPdfPages] = useState<PdfPagePreview[]>([]);
    const [selectedPages, setSelectedPages] = useState<number[]>([]);
    const [pageUploadProgress, setPageUploadProgress] = useState<{
        current: number;
        total: number;
        label: string;
    } | null>(null);
    const [processingProjectId, setProcessingProjectId] = useState<
        string | null
    >(null);
    const [processingStrategies, setProcessingStrategies] = useState<
        ProcessingStrategyInfo[]
    >([]);
    const [selectedStrategyKey, setSelectedStrategyKey] = useState("");
    const [renamingId, setRenamingId] = useState<string | null>(null);
    const [renameValue, setRenameValue] = useState("");

    useEffect(() => {
        refresh();
        loadProcessingStrategies();
    }, []);

    useEffect(() => {
        if (!processingProjectId) return;
        const timer = window.setInterval(async () => {
            try {
                const project = await getProjectStatus(processingProjectId);
                setProjects((current) =>
                    current.some((item) => item.id === project.id)
                        ? current.map((item) =>
                              item.id === project.id ? project : item,
                          )
                        : [project, ...current],
                );
                if (project.status === "READY") {
                    setToast("finished processing.");
                    setToastProject({ id: project.id, name: project.name });
                    setProcessingProjectId(null);
                    window.clearInterval(timer);
                    await refresh();
                }
                if (project.status === "FAILED") {
                    setToast(
                        `${project.name} failed to process${project.processingError ? `: ${project.processingError}` : "."}`,
                    );
                    setToastProject(null);
                    setProcessingProjectId(null);
                    window.clearInterval(timer);
                    await refresh();
                }
            } catch (error) {
                setToast(
                    error instanceof Error
                        ? error.message
                        : "Unable to poll processing status",
                );
            }
        }, 3000);
        return () => window.clearInterval(timer);
    }, [processingProjectId]);

    async function refresh() {
        setProjectsLoading(true);
        try {
            setProjects(await listProjects());
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Unable to load projects",
            );
        } finally {
            setProjectsLoading(false);
        }
    }

    async function loadProcessingStrategies() {
        try {
            const strategies = await listProcessingStrategies();
            setProcessingStrategies(strategies);
            setSelectedStrategyKey(
                (current) =>
                    current ||
                    strategies.find((strategy) => strategy.defaultStrategy)
                        ?.key ||
                    strategies[0]?.key ||
                    "",
            );
        } catch (error) {
            setMessage(
                error instanceof Error
                    ? error.message
                    : "Unable to load processing strategies",
            );
        }
    }

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return q
            ? projects.filter(
                  (project) =>
                      project.name.toLowerCase().includes(q) ||
                      project.originalFileName.toLowerCase().includes(q),
              )
            : projects;
    }, [projects, query]);

    function isPdfFile(candidate: File) {
        return (
            candidate.type === "application/pdf" ||
            candidate.name.toLowerCase().endsWith(".pdf")
        );
    }

    async function submit(event: FormEvent) {
        event.preventDefault();
        if (!file) return;
        setLoading(true);
        setMessage("Uploading floorplan...");
        let preparedPdf: PDFDocumentProxy | null = null;
        let preparedPages: PdfPagePreview[] = [];
        try {
            const isPdf = isPdfFile(file);
            if (isPdf) {
                setMessage("Preparing PDF preview...");
                preparedPdf = await loadPdfDocument(file);
                preparedPages = await renderPdfThumbnails(preparedPdf);
                setMessage("Uploading original PDF...");
            }

            const upload = await uploadProject(
                name || file.name,
                file,
                preparedPdf?.numPages,
            );
            if (upload.uploadType === "PDF") {
                if (!preparedPdf || preparedPages.length === 0) {
                    throw new Error("Unable to prepare PDF pages.");
                }
                cleanupPdfModal();
                setDraftProjectId(upload.projectId);
                setPdfDocument(preparedPdf);
                setPdfPages(preparedPages);
                setSelectedPages([]);
                preparedPdf = null;
                preparedPages = [];
                setMessage("");
            } else {
                setMessage("Processing image in the background...");
                setProcessingProjectId(upload.projectId);
                setToast("Project is processing.");
                const project = await processProject(
                    upload.projectId,
                    [1],
                    selectedStrategyKey || undefined,
                );
                setProcessingProjectId(null);
                setToast(`${project.name} finished processing.`);
                setToastProject({ id: project.id, name: project.name });
            }
            await refresh();
        } catch (error) {
            preparedPdf?.destroy();
            revokePdfPreviews(preparedPages);
            setMessage(
                error instanceof Error ? error.message : "Upload failed",
            );
        } finally {
            setLoading(false);
        }
    }

    function handleFileSelection(nextFile?: File | null) {
        if (!nextFile) return;
        setFile(nextFile);
        setMessage("");
    }

    function handleDrop(event: DragEvent<HTMLLabelElement>) {
        event.preventDefault();
        setDragActive(false);
        handleFileSelection(event.dataTransfer.files?.[0]);
    }

    async function processSelectedPdfPages() {
        if (!draftProjectId || !pdfDocument || selectedPages.length === 0) {
            return;
        }
        setLoading(true);
        const pageImagePaths: Record<number, string> = {};
        const total = selectedPages.length;
        try {
            for (const [index, pageNumber] of selectedPages.entries()) {
                setPageUploadProgress({
                    current: index,
                    total,
                    label: `Rendering page ${pageNumber} at 200 DPI...`,
                });
                const sourcePng = await renderPdfPageSourcePng(
                    pdfDocument,
                    pageNumber,
                );
                setPageUploadProgress({
                    current: index,
                    total,
                    label: `Uploading page ${pageNumber}...`,
                });
                pageImagePaths[pageNumber] = await uploadPdfPageSource(
                    draftProjectId,
                    pageNumber,
                    sourcePng,
                );
                setPageUploadProgress({
                    current: index + 1,
                    total,
                    label: `Uploaded page ${pageNumber}.`,
                });
            }
            setMessage("Processing PDF pages in the background...");
            const processingProjectId = draftProjectId;
            cleanupPdfModal();
            setProcessingProjectId(processingProjectId);
            setToast("Project is processing.");
            const project = await processProject(
                processingProjectId,
                selectedPages,
                selectedStrategyKey || undefined,
                pageImagePaths,
            );
            setProcessingProjectId(null);
            setToast(`${project.name} finished processing.`);
            setToastProject({ id: project.id, name: project.name });
            await refresh();
        } catch (error) {
            setMessage(
                error instanceof Error ? error.message : "Processing failed",
            );
        } finally {
            setPageUploadProgress(null);
            setLoading(false);
        }
    }

    function closePdfModal() {
        if (loading) return;
        cleanupPdfModal();
    }

    function cleanupPdfModal() {
        pdfDocument?.destroy();
        revokePdfPreviews(pdfPages);
        setDraftProjectId(null);
        setPdfDocument(null);
        setPdfPages([]);
        setSelectedPages([]);
        setPageUploadProgress(null);
    }

    function togglePage(pageNumber: number) {
        setSelectedPages((current) =>
            current.includes(pageNumber)
                ? current.filter((page) => page !== pageNumber)
                : [...current, pageNumber].sort((a, b) => a - b),
        );
    }

    function renderStrategySelect(id: string) {
        return (
            <div className={ui.field}>
                <label htmlFor={id}>Processing strategy</label>
                <select
                    id={id}
                    className={ui.input}
                    value={selectedStrategyKey}
                    onChange={(event) =>
                        setSelectedStrategyKey(event.target.value)
                    }
                    disabled={processingStrategies.length === 0}
                >
                    {processingStrategies.length === 0 ? (
                        <option value="">Default strategy</option>
                    ) : (
                        processingStrategies.map((strategy) => (
                            <option key={strategy.key} value={strategy.key}>
                                {strategy.label}
                            </option>
                        ))
                    )}
                </select>
            </div>
        );
    }

    async function removeProject(project: ProjectSummary) {
        const confirmed = window.confirm(
            `Delete "${project.name}" and all stored files for this project?`,
        );
        if (!confirmed) return;
        setMessage("Deleting project...");
        try {
            await deleteProject(project.id);
            await refresh();
            setMessage("Project deleted.");
        } catch (error) {
            setMessage(
                error instanceof Error ? error.message : "Delete failed",
            );
        }
    }

    async function saveRename(projectId: string) {
        const trimmed = renameValue.trim();
        if (!trimmed) return;
        try {
            await renameProject(projectId, trimmed);
            setRenamingId(null);
            setToast("Project renamed.");
            await refresh();
        } catch (error) {
            setToast(error instanceof Error ? error.message : "Rename failed");
        }
    }

    return (
        <main className={ui.shell}>
            {(toast || processingProjectId) && (
                <div className={ui.toast}>
                    <CheckCircle2 size={18} />
                    <span>
                        {processingProjectId ? (
                            "A project is processing. This list will update automatically."
                        ) : toastProject ? (
                            <>
                                <Link href={`/app/projects/${toastProject.id}`}>
                                    {toastProject.name}
                                </Link>{" "}
                                {toast}
                            </>
                        ) : (
                            toast
                        )}
                    </span>
                    {!processingProjectId && (
                        <button
                            className={cx(ui.button, ui.buttonIcon)}
                            onClick={() => {
                                setToast("");
                                setToastProject(null);
                            }}
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
            )}

            <header className={ui.topbar}>
                <div className="grid gap-1">
                    <h1 className="m-0 text-2xl leading-tight">
                        Plaster Calculator
                    </h1>
                    <span className={ui.muted}>Your quoting workspace</span>
                </div>
                <div className={ui.buttonRow}>
                    <ThemeSettingsButton />
                    <button
                        className={ui.button}
                        onClick={refresh}
                        title="Refresh projects"
                    >
                        <RefreshCcw size={18} /> Refresh
                    </button>
                </div>
            </header>

            <section className={ui.layoutGrid}>
                <form className={cx(ui.panel, ui.stack)} onSubmit={submit}>
                    <h2>New Project</h2>
                    <div className={ui.field}>
                        <label htmlFor="name">Address or project name</label>
                        <input
                            id="name"
                            className={ui.input}
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            placeholder="12 Example Street"
                        />
                    </div>
                    <div className={ui.field}>
                        <span className={ui.label}>PDF or image file</span>
                        <label
                            className={cx(
                                ui.fileDropzone,
                                dragActive && ui.fileDropzoneActive,
                            )}
                            htmlFor="file"
                            onDragEnter={(event) => {
                                event.preventDefault();
                                setDragActive(true);
                            }}
                            onDragOver={(event) => {
                                event.preventDefault();
                                setDragActive(true);
                            }}
                            onDragLeave={() => setDragActive(false)}
                            onDrop={handleDrop}
                        >
                            <input
                                id="file"
                                type="file"
                                accept="application/pdf,image/*"
                                className={ui.hiddenFileInput}
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>,
                                ) =>
                                    handleFileSelection(event.target.files?.[0])
                                }
                            />
                            <Upload size={28} />
                            <strong>
                                {file ? file.name : "Drop a PDF or image here"}
                            </strong>
                            <span className={ui.muted}>
                                {file
                                    ? "Click to choose a different file"
                                    : "Click to browse from your computer"}
                            </span>
                        </label>
                    </div>
                    {renderStrategySelect("processing-strategy")}
                    <button
                        className={cx(ui.button, ui.buttonPrimary)}
                        disabled={!file || loading}
                    >
                        <Upload size={18} /> Upload
                    </button>
                    {message && (
                        <p
                            className={
                                message.includes("failed") ||
                                message.includes("Unable")
                                    ? ui.error
                                    : ui.muted
                            }
                        >
                            {message}
                        </p>
                    )}
                </form>

                <section className={cx(ui.panel, ui.stack, "self-start")}>
                    <div className={ui.editorToolbar}>
                        <h2>Project History</h2>
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
                    </div>
                    <div className={ui.projectList}>
                        {projectsLoading ? (
                            <div
                                className={ui.projectListState}
                                role="status"
                                aria-live="polite"
                            >
                                <LoaderCircle
                                    className="animate-spin"
                                    size={24}
                                />
                                <span className={ui.muted}>
                                    Loading projects...
                                </span>
                            </div>
                        ) : (
                            <>
                                {filtered.map((project) => (
                                    <div
                                        className={ui.projectItem}
                                        key={project.id}
                                    >
                                        <Link
                                            href={`/app/projects/${project.id}`}
                                        >
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
                                                        if (
                                                            event.key ===
                                                            "Enter"
                                                        ) {
                                                            event.preventDefault();
                                                            saveRename(
                                                                project.id,
                                                            );
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
                                                {project.originalFileName} ·{" "}
                                                {project.uploadType} ·{" "}
                                                {project.status} ·{" "}
                                                {project.pageCount}{" "}
                                                {project.pageCount === 1
                                                    ? "page"
                                                    : "pages"}{" "}
                                                ·{" "}
                                                {new Date(
                                                    project.updatedAt,
                                                ).toLocaleString()}
                                            </span>
                                        </Link>
                                        <div className={ui.projectActions}>
                                            {renamingId === project.id ? (
                                                <button
                                                    className={ui.button}
                                                    onClick={() =>
                                                        saveRename(project.id)
                                                    }
                                                >
                                                    Save
                                                </button>
                                            ) : (
                                                <button
                                                    className={cx(
                                                        ui.button,
                                                        ui.buttonIcon,
                                                    )}
                                                    onClick={() => {
                                                        setRenamingId(
                                                            project.id,
                                                        );
                                                        setRenameValue(
                                                            project.name,
                                                        );
                                                    }}
                                                    title="Rename project"
                                                >
                                                    <Pencil size={18} />
                                                </button>
                                            )}
                                            <button
                                                className={cx(
                                                    ui.button,
                                                    ui.buttonIcon,
                                                )}
                                                onClick={() =>
                                                    removeProject(project)
                                                }
                                                title="Delete project"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {filtered.length === 0 && (
                                    <p className={ui.muted}>No projects yet.</p>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </section>

            {draftProjectId && (
                <div className={ui.modalBackdrop}>
                    <section className={ui.modal}>
                        <header className={ui.editorToolbar}>
                            <div>
                                <h2>Select PDF Pages</h2>
                                <p className={ui.muted}>
                                    Tick the pages to process.
                                </p>
                            </div>
                            <button
                                className={cx(ui.button, ui.buttonIcon)}
                                disabled={loading}
                                onClick={closePdfModal}
                            >
                                <X size={18} />
                            </button>
                        </header>
                        {renderStrategySelect("pdf-processing-strategy")}
                        {pageUploadProgress && (
                            <div className={ui.pdfProgress}>
                                <div className={ui.pdfProgressLabel}>
                                    <span>{pageUploadProgress.label}</span>
                                    <span>
                                        {pageUploadProgress.current} /{" "}
                                        {pageUploadProgress.total}
                                    </span>
                                </div>
                                <progress
                                    className="w-full accent-slate-900 dark:accent-slate-100"
                                    max={pageUploadProgress.total}
                                    value={pageUploadProgress.current}
                                />
                            </div>
                        )}
                        <div className={ui.previewGrid}>
                            {pdfPages.map((page) => (
                                <div
                                    className={ui.previewTile}
                                    key={page.pageNumber}
                                >
                                    <img
                                        src={page.previewUrl}
                                        alt={`Page ${page.pageNumber}`}
                                    />
                                    <footer>
                                        <span>Page {page.pageNumber}</span>
                                        <input
                                            type="checkbox"
                                            checked={selectedPages.includes(
                                                page.pageNumber,
                                            )}
                                            onChange={() =>
                                                togglePage(page.pageNumber)
                                            }
                                        />
                                    </footer>
                                </div>
                            ))}
                        </div>
                        <footer className={cx(ui.buttonRow, "justify-end")}>
                            <button
                                className={ui.button}
                                disabled={loading}
                                onClick={closePdfModal}
                            >
                                Cancel
                            </button>
                            <button
                                className={cx(ui.button, ui.buttonPrimary)}
                                disabled={loading || selectedPages.length === 0}
                                onClick={processSelectedPdfPages}
                            >
                                <FileUp size={18} />{" "}
                                {selectedPages.length === 0
                                    ? "Select pages to continue"
                                    : `Process selected ${selectedPages.length} ${selectedPages.length === 1 ? "page" : "pages"}`}
                            </button>
                        </footer>
                    </section>
                </div>
            )}
        </main>
    );
}
