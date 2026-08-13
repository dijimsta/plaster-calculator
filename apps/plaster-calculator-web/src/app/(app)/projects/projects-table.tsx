import type { SalesStatus } from "@libraries/plaster-calculator-common";
import { salesStatusAccentColors } from "@libraries/plaster-calculator-ui";
import { Badge, Box, Button, Input, Table, Text } from "@libraries/uikit-web";
import { Pencil, Trash2 } from "lucide-react";
import { default as LinkModule } from "next/link.js";

import type { EnrichedProject } from "../hooks/use-projects-listing.js";

const Link = LinkModule.default;

export type ProjectsTableProps = {
    readonly headers: readonly string[];
    readonly projects: readonly EnrichedProject[];
    readonly renamingId: string | null;
    readonly renameValue: string;
    readonly salesStatusLabel: (status: SalesStatus) => string;
    readonly onRenameValueChange: (value: string) => void;
    readonly onStartRename: (project: EnrichedProject) => void;
    readonly onSaveRename: (projectId: string) => void;
    readonly onDelete: (project: EnrichedProject) => void;
};

export function ProjectsTable({
    headers,
    projects,
    renamingId,
    renameValue,
    salesStatusLabel,
    onRenameValueChange,
    onStartRename,
    onSaveRename,
    onDelete,
}: ProjectsTableProps) {
    return (
        <Table bordered>
            <Table.Head>
                <Table.Row>
                    {headers.map((header) => (
                        <Table.Header key={header}>{header}</Table.Header>
                    ))}
                </Table.Row>
            </Table.Head>
            <Table.Body>
                {projects.map((project) => (
                    <Table.Row key={project.id}>
                        <Table.Cell>
                            {renamingId === project.id ? (
                                <Input
                                    value={renameValue}
                                    onChange={(event) =>
                                        onRenameValueChange(event.target.value)
                                    }
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter") {
                                            onSaveRename(project.id);
                                        }
                                    }}
                                />
                            ) : (
                                <Link href={`/projects/${project.id}`}>
                                    <strong>{project.name}</strong>
                                    {project.address && (
                                        <Text variant="muted" truncate>
                                            {project.address}
                                        </Text>
                                    )}
                                </Link>
                            )}
                        </Table.Cell>
                        <Table.Cell>{project.companyName ?? "—"}</Table.Cell>
                        <Table.Cell>{project.originalFileName}</Table.Cell>
                        <Table.Cell>
                            <Badge
                                dot
                                color={
                                    salesStatusAccentColors[project.salesStatus]
                                }
                                size="xs"
                            >
                                {salesStatusLabel(project.salesStatus)}
                            </Badge>
                        </Table.Cell>
                        <Table.Cell>
                            {new Date(project.updatedAt).toLocaleString()}
                        </Table.Cell>
                        <Table.Cell>
                            <Box gap="sm">
                                {renamingId === project.id ? (
                                    <Button
                                        variant="secondary"
                                        onClick={() => onSaveRename(project.id)}
                                    >
                                        Save
                                    </Button>
                                ) : (
                                    <Button
                                        variant="secondary"
                                        onClick={() => onStartRename(project)}
                                        title="Rename project"
                                    >
                                        <Pencil size={18} />
                                    </Button>
                                )}
                                <Button
                                    variant="secondary"
                                    onClick={() => onDelete(project)}
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
    );
}
