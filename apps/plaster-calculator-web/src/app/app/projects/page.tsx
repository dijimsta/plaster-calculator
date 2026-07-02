"use client";

import {
    Badge,
    Box,
    Button,
    Input,
    Label,
    PageHeading,
    SelectMenu,
    Table,
    Text,
} from "@libraries/uikit-web";
import { LoaderCircle, Pencil, RefreshCcw, Search, Trash2 } from "lucide-react";
import { default as LinkModule } from "next/link.js";

import { BusyOverlay } from "../../../components/busy-overlay.js";
import { salesStatusLabel } from "../../../lib/sales-status.js";
import { useDashboardProjects } from "../hooks/use-dashboard-projects.js";

const Link = LinkModule.default;

export default function ProjectsPage() {
    const {
        activeSalesStatus,
        busyMessage,
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
    } = useDashboardProjects();

    return (
        <>
            {busyMessage && <BusyOverlay message={busyMessage} />}
            <PageHeading>
                <PageHeading.Content>
                    <PageHeading.Title>Projects</PageHeading.Title>
                </PageHeading.Content>
            </PageHeading>
            <Box direction="column" gap="lg" padding="md">
                <Box direction="row" align="end" gap="sm" wrap>
                    <Box direction="column" gap="xs">
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
                    </Box>
                    <Box direction="column" gap="xs">
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
                    </Box>
                    <Button
                        variant="secondary"
                        onClick={() => void refresh()}
                        title="Refresh projects"
                    >
                        <RefreshCcw size={18} /> Refresh
                    </Button>
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
                    <Text variant="muted">
                        No {salesStatusLabel(activeSalesStatus)} projects.
                    </Text>
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
