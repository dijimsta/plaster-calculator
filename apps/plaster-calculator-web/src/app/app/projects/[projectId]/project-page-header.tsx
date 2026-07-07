import {
    Box,
    Breadcrumb,
    Button,
    PageHeading,
    Tabs,
} from "@libraries/uikit-web";
import { Download, File, Home, Pencil, RefreshCcw } from "lucide-react";
import { default as LinkModule } from "next/link.js";

import { RoutedBreadcrumbItem } from "../../../../components/routed-breadcrumb-item.js";
import { ui } from "../../../../lib/styles.js";

import type { ProjectDetail } from "../../../../types.js";

const Link = LinkModule.default;

export interface ProjectHeaderProps {
    readonly project: ProjectDetail | null;
    readonly projectId: string;
    readonly activeTab: "floorplan" | "questionnaires";
    readonly renaming?: boolean;
    readonly renameValue?: string;
    readonly load: () => void;
    readonly saveRename?: () => Promise<void>;
    readonly setRenaming?: (renaming: boolean) => void;
    readonly setRenameValue?: (value: string) => void;
    readonly validateAndExport?: () => Promise<void>;
}

export function ProjectHeader({
    project,
    projectId,
    activeTab,
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
                <ProjectHeaderTitle
                    project={project}
                    renaming={renaming}
                    renameValue={renameValue}
                    saveRename={saveRename}
                    setRenaming={setRenaming}
                    setRenameValue={setRenameValue}
                />
                <PageHeading.Meta aria-label="Project details">
                    <PageHeading.Meta.Item>
                        <File aria-hidden="true" />
                        {project?.originalFileName ?? "Loading..."}
                    </PageHeading.Meta.Item>
                </PageHeading.Meta>
            </PageHeading.Content>
            <ProjectHeaderActions
                project={project}
                load={load}
                validateAndExport={validateAndExport}
            />
            <PageHeading.Navigation>
                <Tabs>
                    <Tabs.Item current={activeTab === "floorplan"}>
                        <Link href={`/app/projects/${projectId}`}>
                            Floorplan
                        </Link>
                    </Tabs.Item>
                    <Tabs.Item current={activeTab === "questionnaires"}>
                        <Link
                            href={`/app/projects/${projectId}/questionnaires`}
                        >
                            Questionnaires
                        </Link>
                    </Tabs.Item>
                </Tabs>
            </PageHeading.Navigation>
        </PageHeading>
    );
}

function ProjectHeaderTitle({
    project,
    renaming,
    renameValue,
    saveRename,
    setRenaming,
    setRenameValue,
}: Pick<
    ProjectHeaderProps,
    | "project"
    | "renaming"
    | "renameValue"
    | "saveRename"
    | "setRenaming"
    | "setRenameValue"
>) {
    if (renaming && saveRename && setRenameValue) {
        return (
            <ProjectRenameForm
                renameValue={renameValue ?? ""}
                saveRename={saveRename}
                setRenameValue={setRenameValue}
            />
        );
    }
    return <ProjectTitle project={project} setRenaming={setRenaming} />;
}

function ProjectHeaderActions({
    project,
    load,
    validateAndExport,
}: Pick<ProjectHeaderProps, "project" | "load" | "validateAndExport">) {
    return (
        <PageHeading.Actions>
            {project && validateAndExport && (
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
    );
}

function ProjectRenameForm({
    renameValue,
    saveRename,
    setRenameValue,
}: {
    readonly renameValue: string;
    readonly saveRename: () => Promise<void>;
    readonly setRenameValue: (value: string) => void;
}) {
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
            {project && setRenaming && (
                <Button
                    aria-label="Rename project"
                    icon={<Pencil size={14} aria-hidden="true" />}
                    onClick={() => setRenaming(true)}
                    variant="secondary"
                />
            )}
        </Box>
    );
}
