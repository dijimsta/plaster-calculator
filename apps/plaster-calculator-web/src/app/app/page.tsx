"use client";

import { useEffect, useMemo, useState, type ChangeEvent, type DragEvent, type FormEvent } from "react";
import { default as LinkModule } from "next/link.js";
import { CheckCircle2, FileUp, LoaderCircle, Pencil, RefreshCcw, Search, Trash2, Upload, X } from "lucide-react";
import ThemeSettingsButton from "@/components/ThemeSettingsButton.js";
import { deletePlan, getPdfPages, getPlan, listPlans, listProcessingStrategies, processPlan, renamePlan, uploadPlan } from "@/lib/api.js";
import type { PdfPagePreview, PlanSummary, ProcessingStrategyInfo } from "@/types.js";

const Link = LinkModule.default;

export default function HomePage() {
  const [plans, setPlans] = useState<PlanSummary[]>([]);
  const [query, setQuery] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [plansLoading, setPlansLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [toast, setToast] = useState("");
  const [toastPlan, setToastPlan] = useState<{ id: string; name: string } | null>(null);
  const [draftPlanId, setDraftPlanId] = useState<string | null>(null);
  const [pdfPages, setPdfPages] = useState<PdfPagePreview[]>([]);
  const [selectedPages, setSelectedPages] = useState<number[]>([]);
  const [largePreview, setLargePreview] = useState<PdfPagePreview | null>(null);
  const [processingPlanId, setProcessingPlanId] = useState<string | null>(null);
  const [processingStrategies, setProcessingStrategies] = useState<ProcessingStrategyInfo[]>([]);
  const [selectedStrategyKey, setSelectedStrategyKey] = useState("");
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  useEffect(() => {
    refresh();
    loadProcessingStrategies();
  }, []);

  useEffect(() => {
    if (!processingPlanId) return;
    const timer = window.setInterval(async () => {
      try {
        const plan = await getPlan(processingPlanId);
        await refresh();
        if (plan.status === "READY") {
          setToast("finished processing.");
          setToastPlan({ id: plan.id, name: plan.name });
          setProcessingPlanId(null);
          window.clearInterval(timer);
        }
        if (plan.status === "FAILED") {
          setToast(`${plan.name} failed to process${plan.processingError ? `: ${plan.processingError}` : "."}`);
          setToastPlan(null);
          setProcessingPlanId(null);
          window.clearInterval(timer);
        }
      } catch (error) {
        setToast(error instanceof Error ? error.message : "Unable to poll processing status");
      }
    }, 3000);
    return () => window.clearInterval(timer);
  }, [processingPlanId]);

  async function refresh() {
    setPlansLoading(true);
    try {
      setPlans(await listPlans());
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to load plans");
    } finally {
      setPlansLoading(false);
    }
  }

  async function loadProcessingStrategies() {
    try {
      const strategies = await listProcessingStrategies();
      setProcessingStrategies(strategies);
      setSelectedStrategyKey((current) => current || strategies.find((strategy) => strategy.defaultStrategy)?.key || strategies[0]?.key || "");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to load processing strategies");
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? plans.filter((plan) => plan.name.toLowerCase().includes(q) || plan.originalFileName.toLowerCase().includes(q)) : plans;
  }, [plans, query]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!file) return;
    setLoading(true);
    setMessage("Uploading floorplan...");
    try {
      const upload = await uploadPlan(name || file.name, file);
      if (upload.uploadType === "PDF") {
        const pages = await getPdfPages(upload.planId);
        setDraftPlanId(upload.planId);
        setPdfPages(pages);
        setSelectedPages([]);
        setMessage("");
      } else {
        setMessage("Processing image in the background...");
        const plan = await processPlan(upload.planId, [1], selectedStrategyKey || undefined);
        setProcessingPlanId(plan.id);
        setToast(`${plan.name} is processing.`);
      }
      await refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Upload failed");
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
    if (!draftPlanId || selectedPages.length === 0) return;
    setLoading(true);
    try {
      const plan = await processPlan(draftPlanId, selectedPages, selectedStrategyKey || undefined);
      setProcessingPlanId(plan.id);
      setToast(`${plan.name} is processing.`);
      closePdfModal();
      await refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Processing failed");
    } finally {
      setLoading(false);
    }
  }

  function closePdfModal() {
    setDraftPlanId(null);
    setPdfPages([]);
    setSelectedPages([]);
    setLargePreview(null);
  }

  function togglePage(pageNumber: number) {
    setSelectedPages((current) =>
      current.includes(pageNumber) ? current.filter((page) => page !== pageNumber) : [...current, pageNumber].sort((a, b) => a - b)
    );
  }

  function renderStrategySelect(id: string) {
    return (
      <div className="field">
        <label htmlFor={id}>Processing strategy</label>
        <select
          id={id}
          className="input"
          value={selectedStrategyKey}
          onChange={(event) => setSelectedStrategyKey(event.target.value)}
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

  async function removePlan(plan: PlanSummary) {
    const confirmed = window.confirm(`Delete "${plan.name}" and all stored files for this plan?`);
    if (!confirmed) return;
    setMessage("Deleting plan...");
    try {
      await deletePlan(plan.id);
      await refresh();
      setMessage("Plan deleted.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Delete failed");
    }
  }

  async function saveRename(planId: string) {
    const trimmed = renameValue.trim();
    if (!trimmed) return;
    try {
      await renamePlan(planId, trimmed);
      setRenamingId(null);
      setToast("Plan renamed.");
      await refresh();
    } catch (error) {
      setToast(error instanceof Error ? error.message : "Rename failed");
    }
  }

  return (
    <main className="shell">
      {(toast || processingPlanId) && (
        <div className="toast">
          <CheckCircle2 size={18} />
          <span>
            {processingPlanId ? (
              "A plan is processing. This list will update automatically."
            ) : toastPlan ? (
              <>
                <Link href={`/app/plans/${toastPlan.id}`}>{toastPlan.name}</Link> {toast}
              </>
            ) : (
              toast
            )}
          </span>
          {!processingPlanId && <button className="btn icon" onClick={() => {
            setToast("");
            setToastPlan(null);
          }}><X size={16} /></button>}
        </div>
      )}

      <header className="topbar">
        <div className="brand">
          <h1>Plaster Calculator</h1>
          <span>Your quoting workspace</span>
        </div>
        <div className="button-row">
          <ThemeSettingsButton />
          <button className="btn" onClick={refresh} title="Refresh plans">
            <RefreshCcw size={18} /> Refresh
          </button>
        </div>
      </header>

      <section className="layout-grid">
        <form className="panel stack" onSubmit={submit}>
          <h2>New Plan</h2>
          <div className="field">
            <label htmlFor="name">Address or plan name</label>
            <input id="name" className="input" value={name} onChange={(event) => setName(event.target.value)} placeholder="12 Example Street" />
          </div>
          <div className="field">
            <span className="field-label">PDF or image file</span>
            <label
              className={`file-dropzone${dragActive ? " active" : ""}`}
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
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleFileSelection(event.target.files?.[0])}
              />
              <Upload size={28} />
              <strong>{file ? file.name : "Drop a PDF or image here"}</strong>
              <span>{file ? "Click to choose a different file" : "Click to browse from your computer"}</span>
            </label>
          </div>
          {renderStrategySelect("processing-strategy")}
          <button className="btn primary" disabled={!file || loading}>
            <Upload size={18} /> Upload
          </button>
          {message && <p className={message.includes("failed") || message.includes("Unable") ? "error" : "muted"}>{message}</p>}
        </form>

        <section className="panel stack plan-history-panel">
          <div className="editor-toolbar">
            <h2>Plan History</h2>
            <div className="field" style={{ minWidth: 260 }}>
              <label htmlFor="search">Search</label>
              <div style={{ position: "relative" }}>
                <Search size={16} style={{ left: 11, position: "absolute", top: 13, color: "var(--muted)" }} />
                <input id="search" className="input" style={{ paddingLeft: 34 }} value={query} onChange={(event) => setQuery(event.target.value)} />
              </div>
            </div>
          </div>
          <div className="plan-list">
            {plansLoading ? (
              <div className="plan-list-state" role="status" aria-live="polite">
                <LoaderCircle className="spin" size={24} />
                <span className="muted">Loading plans...</span>
              </div>
            ) : (
              <>
                {filtered.map((plan) => (
                  <div className="plan-item" key={plan.id}>
                    <Link href={`/app/plans/${plan.id}`}>
                      {renamingId === plan.id ? (
                        <input
                          className="input"
                          value={renameValue}
                          onClick={(event) => event.preventDefault()}
                          onChange={(event) => setRenameValue(event.target.value)}
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              event.preventDefault();
                              saveRename(plan.id);
                            }
                          }}
                        />
                      ) : (
                        <strong>{plan.name}</strong>
                      )}
                      <span className="muted plan-meta-line">
                        {plan.originalFileName} · {plan.uploadType} · {plan.status} · {plan.pageCount} {plan.pageCount === 1 ? "page" : "pages"} ·{" "}
                        {new Date(plan.updatedAt).toLocaleString()}
                      </span>
                    </Link>
                    <div className="button-row plan-actions">
                      {renamingId === plan.id ? (
                        <button className="btn" onClick={() => saveRename(plan.id)}>Save</button>
                      ) : (
                        <button className="btn icon" onClick={() => {
                          setRenamingId(plan.id);
                          setRenameValue(plan.name);
                        }} title="Rename plan">
                          <Pencil size={18} />
                        </button>
                      )}
                      <button className="btn icon" onClick={() => removePlan(plan)} title="Delete plan">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
                {filtered.length === 0 && <p className="muted">No plans yet.</p>}
              </>
            )}
          </div>
        </section>
      </section>

      {draftPlanId && (
        <div className="modal-backdrop">
          <section className="modal">
            <header className="editor-toolbar">
              <div>
                <h2>Select PDF Pages</h2>
                <p className="muted">Click a thumbnail to preview. Tick the pages to process.</p>
              </div>
              <button className="btn icon" onClick={closePdfModal}><X size={18} /></button>
            </header>
            {renderStrategySelect("pdf-processing-strategy")}
            {largePreview && (
              <div className="large-preview" onClick={() => setLargePreview(null)}>
                <img src={largePreview.previewUrl} alt={`Page ${largePreview.pageNumber}`} />
              </div>
            )}
            <div className="preview-grid">
              {pdfPages.map((page) => (
                <div className="preview-tile" key={page.pageNumber}>
                  <button type="button" onClick={() => setLargePreview(page)}>
                    <img src={page.previewUrl} alt={`Page ${page.pageNumber}`} />
                  </button>
                  <footer>
                    <span>Page {page.pageNumber}</span>
                    <input type="checkbox" checked={selectedPages.includes(page.pageNumber)} onChange={() => togglePage(page.pageNumber)} />
                  </footer>
                </div>
              ))}
            </div>
            <footer className="button-row" style={{ justifyContent: "flex-end" }}>
              <button className="btn" onClick={closePdfModal}>Cancel</button>
              <button className="btn primary" disabled={loading || selectedPages.length === 0} onClick={processSelectedPdfPages}>
                <FileUp size={18} /> {selectedPages.length === 0 ? "Select pages to continue" : `Process selected ${selectedPages.length} ${selectedPages.length === 1 ? "page" : "pages"}`}
              </button>
            </footer>
          </section>
        </div>
      )}

    </main>
  );
}
