"use client";

import {
    Badge,
    Box,
    Breadcrumb,
    Button,
    Input,
    PageHeading,
    Table,
    Tabs,
    Text,
} from "@libraries/uikit-web";
import {
    Home,
    LoaderCircle,
    Pencil,
    RefreshCcw,
    Search,
    Trash2,
} from "lucide-react";
import { default as LinkModule } from "next/link.js";

import { BusyOverlay } from "../../../components/busy-overlay.js";
import { RoutedBreadcrumbItem } from "../../../components/routed-breadcrumb-item.js";
import { salesStatusLabel } from "../../../lib/sales-status.js";
import {
    useProjectsListing,
    type StatusFilter,
} from "../hooks/use-projects-listing.js";

const Link = LinkModule.default;

export default function ProjectsPage() {
    const {
        statusFilter,
        query,
        projectsLoading,
        busyMessage,
        totalCount,
        quotingCount,
        quoteSubmittedCount,
        filtered,
        resultCount,
        renameValue,
        renamingId,
        refresh,
        removeProject,
        saveRename,
        setStatusFilter,
        setQuery,
        clearFilters,
        setRenamingId,
        setRenameValue,
    } = useProjectsListing();

    const filtersActive = statusFilter !== "ALL" || query !== "";

    const statusTabs: { value: StatusFilter; label: string; count: number }[] =
        [
            { value: "ALL", label: "All", count: totalCount },
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

    return (
        <>
            {busyMessage && <BusyOverlay message={busyMessage} />}
            <PageHeading>
                <PageHeading.Breadcrumbs>
                    <Breadcrumb>
                        <RoutedBreadcrumbItem href="/app">
                            <Home size={16} aria-label="Home" />
                        </RoutedBreadcrumbItem>
                        <Breadcrumb.Item current>Projects</Breadcrumb.Item>
                    </Breadcrumb>
                </PageHeading.Breadcrumbs>
                <PageHeading.Content>
                    <PageHeading.Title>Projects</PageHeading.Title>
                    <PageHeading.Description>
                        Every plan you&apos;re quoting for your builders. Open a
                        project to review its floorplan, scope questionnaire and
                        quote.
                    </PageHeading.Description>
                </PageHeading.Content>
            </PageHeading>
            <Box direction="column" gap="lg" padding="md">
                <Box direction="column" gap="md">
                    <Box direction="row" align="center" gap="md" wrap>
                        <Tabs
                            variant="pills-on-gray"
                            aria-label="Filter by status"
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
                            placeholder="Search project, account or plan…"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <Button
                            variant="secondary"
                            onClick={() => void refresh()}
                            title="Refresh projects"
                        >
                            <RefreshCcw size={18} /> Refresh
                        </Button>
                        {filtersActive && (
                            <Button variant="secondary" onClick={clearFilters}>
                                Clear filters
                            </Button>
                        )}
                    </Box>
                    <Text variant="muted">
                        Showing {resultCount} of {totalCount} projects
                    </Text>
                </Box>
                {projectsLoading ? (
                    <Box
                        align="center"
                        justify="center"
                        gap="sm"
                        role="status"
                        aria-live="polite"
                    >
                        <LoaderCircle className="animate-spin" size={24} />
                        <Text variant="muted">Loading projects...</Text>
                    </Box>
                ) : filtered.length === 0 ? (
                    <Text variant="muted">No projects match your filters.</Text>
                ) : (
                    <Table bordered>
                        <Table.Head>
                            <Table.Row>
                                <Table.Header>Project</Table.Header>
                                <Table.Header>Account</Table.Header>
                                <Table.Header>Plan</Table.Header>
                                <Table.Header>Status</Table.Header>
                                <Table.Header>Updated</Table.Header>
                                <Table.Header>Actions</Table.Header>
                            </Table.Row>
                        </Table.Head>
                        <Table.Body>
                            {filtered.map((project) => (
                                <Table.Row key={project.id}>
                                    <Table.Cell>
                                        {renamingId === project.id ? (
                                            <Input
                                                value={renameValue}
                                                onChange={(event) =>
                                                    setRenameValue(
                                                        event.target.value,
                                                    )
                                                }
                                                onKeyDown={(event) => {
                                                    if (event.key === "Enter") {
                                                        saveRename(project.id);
                                                    }
                                                }}
                                            />
                                        ) : (
                                            <Link
                                                href={`/app/projects/${project.id}`}
                                            >
                                                <strong>{project.name}</strong>
                                                {project.address && (
                                                    <Text
                                                        variant="muted"
                                                        truncate
                                                    >
                                                        {project.address}
                                                    </Text>
                                                )}
                                            </Link>
                                        )}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {project.accountCompanyName ?? "—"}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {project.originalFileName}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Badge
                                            dot
                                            color={
                                                project.salesStatus ===
                                                "QUOTE_SUBMITTED"
                                                    ? "green"
                                                    : "blue"
                                            }
                                            size="xs"
                                        >
                                            {salesStatusLabel(
                                                project.salesStatus,
                                            )}
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell>
                                        {new Date(
                                            project.updatedAt,
                                        ).toLocaleString()}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Box gap="sm">
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
                                                </Button>
                                            )}
                                            <Button
                                                variant="secondary"
                                                onClick={() =>
                                                    removeProject(project)
                                                }
                                                title="Delete project"
                                            >
                                                <Trash2 size={18} />
                                            </Button>
                                        </Box>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                )}
            </Box>
        </>
    );
}
