"use client";

import type { SalesStatus } from "@libraries/plaster-calculator-common";
import { ProjectKanbanBoard } from "@libraries/plaster-calculator-ui";
import {
    Badge,
    Box,
    Breadcrumb,
    Button,
    BusyOverlay,
    EmptyState,
    Input,
    PageHeading,
    Pagination,
    Tabs,
    Text,
} from "@libraries/uikit-web";
import {
    FolderKanban,
    Home,
    LoaderCircle,
    RefreshCcw,
    Search,
} from "lucide-react";
import { useRouter } from "next/navigation.js";

import { RoutedBreadcrumbItem } from "../../../components/routed-breadcrumb-item.js";
import { useAppTranslation } from "../../../i18n/index.ts";
import { useSalesStatusLabel } from "../../../lib/sales-status.js";
import type { EnrichedProject } from "../hooks/use-projects-listing.js";
import {
    useProjectsListing,
    type StatusFilter,
} from "../hooks/use-projects-listing.js";

import {
    isSpecificStatusListView,
    resolveIsLoading,
    resolveTableProjects,
    shouldShowPagination,
} from "./projects-page.utils.js";
import { ProjectsTable } from "./projects-table.js";

const BOARD_STATUSES: readonly SalesStatus[] = [
    "QUOTING",
    "QUOTE_SUBMITTED",
    "WON",
    "LOST",
];

export default function ProjectsPage() {
    const { t } = useAppTranslation();
    const router = useRouter();
    const salesStatusLabel = useSalesStatusLabel();
    const {
        view,
        statusFilter,
        query,
        projectsLoading,
        busyMessage,
        totalCount,
        quotingCount,
        quoteSubmittedCount,
        filtered,
        resultCount,
        page,
        pageCount,
        paginatedProjects,
        paginatedLoading,
        renameValue,
        renamingId,
        refresh,
        removeProject,
        saveRename,
        moveProjectSalesStatus,
        setView,
        setStatusFilter,
        setQuery,
        setPage,
        clearFilters,
        setRenamingId,
        setRenameValue,
    } = useProjectsListing();

    const filtersActive = statusFilter !== "ALL" || query !== "";

    const isPaginatedListView = isSpecificStatusListView(view, statusFilter);
    const tableProjects = resolveTableProjects(
        isPaginatedListView,
        paginatedProjects,
        filtered,
    );
    const isLoading = resolveIsLoading(
        projectsLoading,
        isPaginatedListView,
        paginatedLoading,
    );
    const showPagination = shouldShowPagination(isPaginatedListView, pageCount);

    const tableHeaders = [
        t("projects.tableHeaders.project"),
        t("projects.tableHeaders.company"),
        t("projects.tableHeaders.plan"),
        t("projects.tableHeaders.status"),
        t("projects.tableHeaders.updated"),
        t("projects.tableHeaders.actions"),
    ];

    const statusTabs: { value: StatusFilter; label: string; count: number }[] =
        [
            {
                value: "ALL",
                label: t("projects.statusTabs.all"),
                count: totalCount,
            },
            {
                value: "QUOTING",
                label: salesStatusLabel("QUOTING"),
                count: quotingCount,
            },
            {
                value: "QUOTE_SUBMITTED",
                label: salesStatusLabel("QUOTE_SUBMITTED"),
                count: quoteSubmittedCount,
            },
        ];

    const boardColumns = BOARD_STATUSES.map((salesStatus) => ({
        salesStatus,
        label: salesStatusLabel(salesStatus),
    }));

    const boardCards = filtered.map((project) => ({
        id: project.id,
        name: project.name,
        address: project.address,
        companyName: project.companyName,
        originalFileName: project.originalFileName,
        updatedAt: project.updatedAt,
        salesStatus: project.salesStatus,
    }));

    return (
        <>
            {busyMessage && <BusyOverlay message={busyMessage} />}
            <PageHeading>
                <PageHeading.Breadcrumbs>
                    <Breadcrumb>
                        <RoutedBreadcrumbItem href="/">
                            <Home size={16} aria-label="Home" />
                        </RoutedBreadcrumbItem>
                        <Breadcrumb.Item current>
                            {t("projects.breadcrumb")}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </PageHeading.Breadcrumbs>
                <PageHeading.Content>
                    <PageHeading.Title>{t("projects.title")}</PageHeading.Title>
                    <PageHeading.Description>
                        Every plan you&apos;re quoting for your builders. Open a
                        project to review its floorplan, scope questionnaire and
                        quote.
                    </PageHeading.Description>
                </PageHeading.Content>
            </PageHeading>
            <Box direction="column" gap="lg" padding="md">
                <Box direction="column" gap="md">
                    <Box
                        direction="row"
                        align="center"
                        justify="between"
                        gap="md"
                        wrap
                    >
                        <Box direction="row" align="center" gap="md" wrap>
                            <Tabs
                                variant="pills-on-gray"
                                label="Filter by status"
                            >
                                {statusTabs.map((tab) => (
                                    <Tabs.Item
                                        key={tab.value}
                                        current={statusFilter === tab.value}
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setStatusFilter(tab.value)
                                            }
                                        >
                                            {tab.label}
                                            <Badge size="xs" color="gray">
                                                {tab.count}
                                            </Badge>
                                        </button>
                                    </Tabs.Item>
                                ))}
                            </Tabs>
                            <Input
                                leadingIcon={
                                    <Search
                                        size={16}
                                        className="text-gray-400 dark:text-gray-500"
                                    />
                                }
                                placeholder="Search project, company or plan…"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <Button
                                variant="secondary"
                                onClick={() => void refresh()}
                                title={t("projects.refreshTitle")}
                            >
                                <RefreshCcw size={18} /> {t("projects.refresh")}
                            </Button>
                            {filtersActive && (
                                <Button
                                    variant="secondary"
                                    onClick={clearFilters}
                                >
                                    Clear filters
                                </Button>
                            )}
                        </Box>
                        <Tabs
                            variant="pills-on-gray"
                            label={t("projects.viewToggle.label")}
                        >
                            <Tabs.Item current={view === "list"}>
                                <button
                                    type="button"
                                    onClick={() => setView("list")}
                                >
                                    {t("projects.viewToggle.list")}
                                </button>
                            </Tabs.Item>
                            <Tabs.Item current={view === "board"}>
                                <button
                                    type="button"
                                    onClick={() => setView("board")}
                                >
                                    {t("projects.viewToggle.board")}
                                </button>
                            </Tabs.Item>
                        </Tabs>
                    </Box>
                    <Text variant="muted">
                        Showing {resultCount} of {totalCount} projects
                    </Text>
                </Box>
                {isLoading ? (
                    <Box align="center" justify="center" gap="sm" status>
                        <LoaderCircle className="animate-spin" size={24} />
                        <Text variant="muted">
                            {t("projects.loadingProjects")}
                        </Text>
                    </Box>
                ) : tableProjects.length === 0 ? (
                    <EmptyState
                        icon={<FolderKanban />}
                        title={t("projects.emptyStateTitle")}
                        actions={
                            filtersActive ? (
                                <Button
                                    variant="secondary"
                                    onClick={clearFilters}
                                >
                                    Clear filters
                                </Button>
                            ) : undefined
                        }
                    />
                ) : view === "board" ? (
                    <ProjectKanbanBoard
                        columns={boardColumns}
                        cards={boardCards}
                        onOpen={(projectId) =>
                            router.push(`/projects/${projectId}`)
                        }
                        onMove={moveProjectSalesStatus}
                    />
                ) : (
                    <ProjectsTable
                        headers={tableHeaders}
                        projects={tableProjects}
                        renamingId={renamingId}
                        renameValue={renameValue}
                        salesStatusLabel={salesStatusLabel}
                        onRenameValueChange={setRenameValue}
                        onStartRename={(project: EnrichedProject) => {
                            setRenamingId(project.id);
                            setRenameValue(project.name);
                        }}
                        onSaveRename={saveRename}
                        onDelete={removeProject}
                    />
                )}
                {showPagination && (
                    <Pagination
                        page={page}
                        pageCount={pageCount}
                        onPageChange={setPage}
                        label={t("projects.paginationLabel")}
                    />
                )}
            </Box>
        </>
    );
}
