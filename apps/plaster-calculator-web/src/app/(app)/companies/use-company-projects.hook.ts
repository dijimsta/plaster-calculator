"use client";

import { useProjectsService } from "@libraries/plaster-calculator-web-core";
import { useEffect, useState } from "react";

import { useAppTranslation } from "../../../i18n/index.ts";
import type { ProjectSummary } from "../../../types.js";

/** Projects shown per page in the company detail page's projects panel. */
export const COMPANY_PROJECTS_PAGE_SIZE = 10;

export type CompanyProjectsState = {
    readonly projects: readonly ProjectSummary[];
    readonly isLoading: boolean;
    readonly isLoadingMore: boolean;
    readonly hasMore: boolean;
    readonly message: string;
    readonly loadMore: () => void;
};

/**
 * Bounded "load more" project fetch for a single company's projects panel on
 * the company detail page. Every request asks for one row past the page
 * size, so the response length reveals whether more projects remain without
 * a separate total-count query.
 */
export function useCompanyProjects(companyId: string): CompanyProjectsState {
    const projectsService = useProjectsService();
    const { t } = useAppTranslation();
    const [projects, setProjects] = useState<ProjectSummary[]>([]);
    const [hasMore, setHasMore] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        void loadFirstPage();
    }, [companyId, projectsService]);

    async function fetchPage(
        offset: number,
        loaded: readonly ProjectSummary[],
    ): Promise<void> {
        setMessage("");
        try {
            const results = await projectsService.listProjectsByCompany(
                companyId,
                { limit: COMPANY_PROJECTS_PAGE_SIZE + 1, offset },
            );
            setProjects([
                ...loaded,
                ...results.slice(0, COMPANY_PROJECTS_PAGE_SIZE),
            ]);
            setHasMore(results.length > COMPANY_PROJECTS_PAGE_SIZE);
        } catch (error) {
            setMessage(
                errorMessage(error, t("companies.projectsPanel.unableToLoad")),
            );
        }
    }

    async function loadFirstPage(): Promise<void> {
        setIsLoading(true);
        await fetchPage(0, []);
        setIsLoading(false);
    }

    async function loadMore(): Promise<void> {
        setIsLoadingMore(true);
        await fetchPage(projects.length, projects);
        setIsLoadingMore(false);
    }

    return {
        projects,
        isLoading,
        isLoadingMore,
        hasMore,
        message,
        loadMore: () => void loadMore(),
    };
}

function errorMessage(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
}
