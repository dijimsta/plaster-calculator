"use client";

import {
    NewQuestionnaireTemplateDrawer,
    QuestionnaireTemplateCardGridList,
} from "@libraries/plaster-calculator-ui";
import {
    Breadcrumb,
    Button,
    ModalDialog,
    PageHeading,
    Tabs,
    Text,
} from "@libraries/uikit-web";
import { Home, Plus } from "lucide-react";
import { default as LinkModule } from "next/link.js";
import { useReducer } from "react";

import {
    useConfirmDeleteCallback,
    useCreateQuestionnaireTemplateCallback,
    useDeleteQuestionnaireTemplateCallback,
    useQuestionnaireTemplates,
    useRefreshQuestionnaireTemplatesCallback,
} from "./page.hooks.js";
import {
    createInitialQuestionnaireTemplatesPageState,
    questionnaireTemplatesPageReducer,
} from "./page.reducer.js";
import { RoutedBreadcrumbItem } from "../../../../components/routed-breadcrumb-item.js";

const Link = LinkModule.default;

export default function QuestionnaireTemplatesPage() {
    const [state, dispatch] = useReducer(
        questionnaireTemplatesPageReducer,
        undefined,
        createInitialQuestionnaireTemplatesPageState,
    );
    const templates = useQuestionnaireTemplates();
    const refreshTemplates = useRefreshQuestionnaireTemplatesCallback();
    const handleCreate = useCreateQuestionnaireTemplateCallback(
        refreshTemplates,
        dispatch,
    );
    const deleteTemplate = useDeleteQuestionnaireTemplateCallback(
        refreshTemplates,
        dispatch,
    );
    const confirmDelete = useConfirmDeleteCallback(
        state.templatePendingDeletion,
        deleteTemplate,
    );

    return (
        <>
            <PageHeading>
                <PageHeading.Breadcrumbs>
                    <Breadcrumb>
                        <RoutedBreadcrumbItem href="/app">
                            <Home size={16} aria-label="Home" />
                        </RoutedBreadcrumbItem>
                        <RoutedBreadcrumbItem href="/app/questionnaires">
                            Questionnaires
                        </RoutedBreadcrumbItem>
                        <Breadcrumb.Item current>Templates</Breadcrumb.Item>
                    </Breadcrumb>
                </PageHeading.Breadcrumbs>
                <PageHeading.Content>
                    <PageHeading.Title>Questionnaires</PageHeading.Title>
                    <PageHeading.Description>
                        The question sets the AI fills in when you auto-fill a
                        project. Use the built-in standards or duplicate a
                        template to make your own.
                    </PageHeading.Description>
                </PageHeading.Content>
                <PageHeading.Actions>
                    <Button
                        icon={<Plus size={18} />}
                        onClick={() => dispatch({ type: "openDrawer" })}
                    >
                        New Template
                    </Button>
                </PageHeading.Actions>
                <PageHeading.Navigation>
                    <Tabs>
                        <Tabs.Item>
                            <Link href="/app/questionnaires">Projects</Link>
                        </Tabs.Item>
                        <Tabs.Item current>
                            <Link href="/app/questionnaires/templates">
                                Templates
                            </Link>
                        </Tabs.Item>
                    </Tabs>
                </PageHeading.Navigation>
            </PageHeading>
            <QuestionnaireTemplateCardGridList
                templates={templates}
                onOpen={() => undefined}
                onDuplicate={() => undefined}
                onDelete={(template) =>
                    dispatch({ type: "requestDelete", template })
                }
            />
            <NewQuestionnaireTemplateDrawer
                open={state.isDrawerOpen}
                onClose={() => dispatch({ type: "closeDrawer" })}
                onCreate={handleCreate}
            />
            <ModalDialog
                open={state.templatePendingDeletion !== null}
                onClose={() => dispatch({ type: "cancelDelete" })}
                size="sm"
                title="Delete template?"
                description="This action cannot be undone."
                showCloseButton={false}
                footer={
                    <>
                        <Button
                            variant="secondary"
                            disabled={state.isDeleting}
                            onClick={() => dispatch({ type: "cancelDelete" })}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="danger"
                            disabled={state.isDeleting}
                            onClick={confirmDelete}
                        >
                            {state.isDeleting ? "Deleting..." : "Delete"}
                        </Button>
                    </>
                }
            >
                <Text variant="muted">
                    {state.templatePendingDeletion === null
                        ? ""
                        : `“${state.templatePendingDeletion.name}” will be permanently deleted.`}
                </Text>
            </ModalDialog>
        </>
    );
}
