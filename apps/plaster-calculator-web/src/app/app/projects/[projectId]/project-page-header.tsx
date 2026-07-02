import { Box, Breadcrumb, Button, PageHeading } from "@libraries/uikit-web";
import { Download, File, Home, Pencil, RefreshCcw } from "lucide-react";

import { RoutedBreadcrumbItem } from "../../../../components/routed-breadcrumb-item.js";
import { ui } from "../../../../lib/styles.js";

import type { ProjectDetail } from "../../../../types.js";

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
        <PageHeading>
            <PageHeading.Breadcrumbs>
                <Breadcrumb>
                    <RoutedBreadcrumbItem href="/app">
                        <Home size={16} aria-label="Home" />
                    </RoutedBreadcrumbItem>
                    <RoutedBreadcrumbItem href="/app/projects">
                        Projects
                    </RoutedBreadcrumbItem>
                    <Breadcrumb.Item current>
                        {project?.name ?? "Project"}
                    </Breadcrumb.Item>
                </Breadcrumb>
            </PageHeading.Breadcrumbs>
            <PageHeading.Content>
                {renaming ? (
                    <ProjectRenameForm
                        renameValue={renameValue}
                        saveRename={saveRename}
                        setRenameValue={setRenameValue}
                    />
                ) : (
                    <ProjectTitle project={project} setRenaming={setRenaming} />
                )}
                <PageHeading.Meta aria-label="Project details">
                    <PageHeading.Meta.Item>
                        <File aria-hidden="true" />
                        {project?.originalFileName ?? "Loading..."}
                    </PageHeading.Meta.Item>
                </PageHeading.Meta>
            </PageHeading.Content>
            <PageHeading.Actions>
                {project && (
                    <Button
                        icon={<Download aria-hidden="true" />}
                        variant="secondary"
                        onClick={() => void validateAndExport()}
                    >
                        CSV
                    </Button>
                )}
                <Button
                    icon={<RefreshCcw aria-hidden="true" />}
                    variant="secondary"
                    onClick={load}
                >
                    Refresh
                </Button>
            </PageHeading.Actions>
        </PageHeading>
    );
}

function ProjectRenameForm({
    renameValue,
    saveRename,
    setRenameValue,
}: Pick<ProjectHeaderProps, "renameValue" | "saveRename" | "setRenameValue">) {
    return (
        <Box align="center" gap="sm">
            <input
                className={ui.input}
                value={renameValue}
                onChange={(event) => setRenameValue(event.target.value)}
                onKeyDown={(event) => {
                    if (event.key === "Enter") void saveRename();
                }}
            />
            <Button variant="primary" onClick={() => void saveRename()}>
                Save
            </Button>
        </Box>
    );
}

function ProjectTitle({
    project,
    setRenaming,
}: Pick<ProjectHeaderProps, "project" | "setRenaming">) {
    return (
        <Box align="center" gap="sm">
            <PageHeading.Title>{project?.name ?? "Project"}</PageHeading.Title>
            {project && (
                <Button
                    aria-label="Rename project"
                    icon={<Pencil aria-hidden="true" />}
                    onClick={() => setRenaming(true)}
                    variant="secondary"
                />
            )}
        </Box>
    );
}
