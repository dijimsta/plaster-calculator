"use client";

import { use, useCallback, useEffect, useMemo, useState } from "react";
import { default as LinkModule } from "next/link.js";
import { ArrowLeft, Download, Pencil, RefreshCcw, X } from "lucide-react";
import { default as DynamicModule } from "next/dynamic.js";
import ThemeSettingsButton from "@/components/ThemeSettingsButton.js";
import { exportPlanCsv, getPlan, renamePlan, savePageOverlay } from "@/lib/api.js";
import type { PlanDetail } from "@/types.js";
import { parseOverlay, parseReferencePoints, validatePageForExport, type PageValidationInput, type ValidationIssue } from "@/lib/validation.js";

const dynamic = DynamicModule.default;
const PlanEditor = dynamic(() => import("@/components/PlanEditor.js"), { ssr: false });
const Link = LinkModule.default;

export default function PlanPage({ params }: { params: Promise<{ planId: string }> }) {
  const { planId } = use(params);
  const [plan, setPlan] = useState<PlanDetail | null>(null);
  const [selectedPageId, setSelectedPageId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");
  const [validationIssues, setValidationIssues] = useState<ValidationIssue[]>([]);
  const [pageDrafts, setPageDrafts] = useState<Record<string, PageValidationInput>>({});
  const [switchingPage, setSwitchingPage] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState("");

  useEffect(() => {
    load();
  }, [planId]);

  useEffect(() => {
    if (!plan || validationIssues.length === 0) return;
    const issues = plan.pages.flatMap((page) => validatePageForExport(pageDrafts[page.id] ?? page));
    setValidationIssues(issues);
    if (issues.length === 0) setToast("");
  }, [pageDrafts]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(""), 6000);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  async function load() {
    try {
      const detail = await getPlan(planId);
      setPlan(detail);
      setRenameValue(detail.name);
      setSelectedPageId((current) =>
        current && detail.pages.some((page) => page.id === current)
          ? current
          : detail.pages[0]?.id ?? null
      );
      setPageDrafts({});
      setValidationIssues([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load plan");
    }
  }

  const selectedPage = useMemo(() => plan?.pages.find((page) => page.id === selectedPageId) ?? null, [plan, selectedPageId]);

  async function saveRename() {
    if (!plan || !renameValue.trim()) return;
    try {
      const renamed = await renamePlan(plan.id, renameValue.trim());
      setPlan(renamed);
      setRenaming(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to rename plan");
    }
  }

  const updateDraft = useCallback((pageId: string, draft: PageValidationInput) => {
    setPageDrafts((current) => ({ ...current, [pageId]: draft }));
  }, []);

  async function saveDraftBeforeLeavingPage() {
    if (!plan || !selectedPageId) return;
    const draft = pageDrafts[selectedPageId];
    if (!draft) return;
    const savedPage = await savePageOverlay(plan.id, selectedPageId, {
      overlay: parseOverlay(draft.overlay),
      scaleMmPerPx: draft.scaleMmPerPx,
      ceilingHeightMm: draft.ceilingHeightMm,
      referencePoints: draft.referencePoints ? parseReferencePoints(draft.referencePoints) : null,
      referenceLengthMm: draft.referenceLengthMm
    });
    setPlan((current) => current ? { ...current, pages: current.pages.map((page) => page.id === savedPage.id ? savedPage : page) } : current);
    setPageDrafts((current) => {
      const next = { ...current };
      delete next[selectedPageId];
      return next;
    });
  }

  async function selectPage(pageId: string) {
    if (pageId === selectedPageId || switchingPage) return;
    setSwitchingPage(true);
    try {
      await saveDraftBeforeLeavingPage();
      setSelectedPageId(pageId);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save current page before switching");
    } finally {
      setSwitchingPage(false);
    }
  }

  async function validateAndExport() {
    if (!plan) return;
    const issues = plan.pages.flatMap((page) => validatePageForExport(pageDrafts[page.id] ?? page));
    setValidationIssues(issues);
    if (issues.length > 0) {
      setToast("A few details need attention before export. I've highlighted the first one for you.");
      setError("");
      const firstIssue = issues[0];
      if (firstIssue) setSelectedPageId(firstIssue.pageId);
      return;
    }
    try {
      await saveDraftBeforeLeavingPage();
      setError("");
      const exportFile = await exportPlanCsv(plan.id);
      const blob = new Blob([exportFile.csv], { type: exportFile.mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = exportFile.fileName;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save current page before exporting");
    }
  }

  return (
    <main className="shell">
      {toast && (
        <div className="toast">
          <span>{toast}</span>
          <button className="btn icon" onClick={() => setToast("")} title="Dismiss message" type="button">
            <X size={16} />
          </button>
        </div>
      )}
      <header className="topbar">
        <div className="button-row">
          <Link className="btn" href="/app">
            <ArrowLeft size={18} /> Plans
          </Link>
          {plan && (
            <button className="btn" onClick={() => void validateAndExport()}>
              <Download size={18} /> CSV
            </button>
          )}
        </div>
        <div className="brand" style={{ textAlign: "right" }}>
          {renaming ? (
            <div className="button-row">
              <input className="input" value={renameValue} onChange={(event) => setRenameValue(event.target.value)} onKeyDown={(event) => {
                if (event.key === "Enter") void saveRename();
              }} />
              <button className="btn primary" onClick={saveRename}>Save</button>
            </div>
          ) : (
            <div className="button-row" style={{ justifyContent: "flex-end" }}>
              <h1>{plan?.name ?? "Plan"}</h1>
              {plan && <button className="btn icon" onClick={() => setRenaming(true)} title="Rename plan"><Pencil size={18} /></button>}
            </div>
          )}
          <span>{plan?.originalFileName ?? "Loading..."}</span>
        </div>
        <div className="button-row">
          <ThemeSettingsButton />
          <button className="btn" onClick={load}>
            <RefreshCcw size={18} /> Refresh
          </button>
        </div>
      </header>

      {error && <p className="error">{error}</p>}
      {plan && plan.pages.length > 1 && (
        <div className="topbar" style={{ justifyContent: "flex-start" }}>
          <div className="segmented">
            {plan.pages.map((page) => (
              <button key={page.id} className={page.id === selectedPageId ? "active" : ""} onClick={() => void selectPage(page.id)} disabled={switchingPage}>
                Page {page.pageNumber}
              </button>
            ))}
          </div>
        </div>
      )}
      {plan && selectedPage && (
        <PlanEditor
          plan={plan}
          page={selectedPage}
          onSaved={load}
          onDraftChange={updateDraft}
          validationIssues={validationIssues.filter((issue) => issue.pageId === selectedPage.id)}
        />
      )}
      {plan && plan.pages.length === 0 && <section className="panel">This plan has not been processed yet.</section>}
    </main>
  );
}
