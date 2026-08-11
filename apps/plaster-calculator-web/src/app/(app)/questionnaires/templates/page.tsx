"use client";

import {
    EditQuestionnaireTemplateDrawer,
    NewQuestionnaireTemplateDrawer,
    QuestionnaireTemplateCardGridList,
    useQuestionnairesTranslation,
} from "@libraries/plaster-calculator-ui";
import {
    Breadcrumb,
    Button,
    EmptyState,
    ModalDialog,
    PageHeading,
    Tabs,
    Text,
} from "@libraries/uikit-web";
import { ClipboardList, Home, Plus } from "lucide-react";
import { default as LinkModule } from "next/link.js";
import { useReducer } from "react";

import { RoutedBreadcrumbItem } from "../../../../components/routed-breadcrumb-item.js";
import { useAppTranslation } from "../../../../i18n/index.ts";

import {
    useConfirmDeleteCallback,
    useCreateQuestionnaireTemplateCallback,
    useDeleteQuestionnaireTemplateCallback,
    useQuestionnaireTemplateDetails,
    useQuestionnaireTemplates,
    useRefreshQuestionnaireTemplatesCallback,
    useUpdateQuestionnaireTemplateCallback,
} from "./page.hooks.js";
import {
    createInitialQuestionnaireTemplatesPageState,
    questionnaireTemplatesPageReducer,
} from "./page.reducer.js";

const Link = LinkModule.default;

export default function QuestionnaireTemplatesPage() {
    const { t } = useQuestionnairesTranslation();
    const { t: tApp } = useAppTranslation();
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
    const {
        template: templateBeingEdited,
        isLoading: isLoadingEditedTemplate,
    } = useQuestionnaireTemplateDetails(state.templateBeingEdited?.id ?? null);
    const handleUpdate = useUpdateQuestionnaireTemplateCallback(
        refreshTemplates,
        dispatch,
    );

    return (
        <>
            <PageHeading>
                <PageHeading.Breadcrumbs>
                    <Breadcrumb>
                        <RoutedBreadcrumbItem href="/">
                            <Home
                                size={16}
                                aria-label={tApp("sidebar.navLabels.home")}
                            />
                        </RoutedBreadcrumbItem>
                        <RoutedBreadcrumbItem href="/questionnaires">
                            {tApp("questionnaires.title")}
                        </RoutedBreadcrumbItem>
                        <Breadcrumb.Item current>
                            {tApp("questionnaires.templatesTab")}
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </PageHeading.Breadcrumbs>
                <PageHeading.Content>
                    <PageHeading.Title>
                        {tApp("questionnaires.title")}
                    </PageHeading.Title>
                    <PageHeading.Description>
                        {t("questionnaireTemplatesPage.description")}
                    </PageHeading.Description>
                </PageHeading.Content>
                <PageHeading.Actions>
                    <Button
                        icon={<Plus size={18} />}
                        onClick={() => dispatch({ type: "openDrawer" })}
                    >
                        {t("questionnaireTemplatesPage.newTemplate")}
                    </Button>
                </PageHeading.Actions>
                <PageHeading.Navigation>
                    <Tabs>
                        <Tabs.Item>
                            <Link href="/questionnaires">
                                {tApp("questionnaires.projectsTab")}
                            </Link>
                        </Tabs.Item>
                        <Tabs.Item current>
                            <Link href="/questionnaires/templates">
                                {tApp("questionnaires.templatesTab")}
                            </Link>
                        </Tabs.Item>
                    </Tabs>
                </PageHeading.Navigation>
            </PageHeading>
            {templates.length === 0 ? (
                <EmptyState
                    icon={<ClipboardList />}
                    title={t("questionnaireTemplatesPage.emptyStateTitle")}
                    description={t(
                        "questionnaireTemplatesPage.emptyStateDescription",
                    )}
                    actions={
                        <Button
                            icon={<Plus size={18} />}
                            onClick={() => dispatch({ type: "openDrawer" })}
                        >
                            {t("questionnaireTemplatesPage.newTemplate")}
                        </Button>
                    }
                />
            ) : (
                <QuestionnaireTemplateCardGridList
                    templates={templates}
                    onOpen={(template) =>
                        dispatch({ type: "requestEdit", template })
                    }
                    onDuplicate={() => undefined}
                    onDelete={(template) =>
                        dispatch({ type: "requestDelete", template })
                    }
                />
            )}
            <NewQuestionnaireTemplateDrawer
                open={state.isDrawerOpen}
                onClose={() => dispatch({ type: "closeDrawer" })}
                onCreate={handleCreate}
            />
            <EditQuestionnaireTemplateDrawer
                open={state.templateBeingEdited !== null}
                template={templateBeingEdited}
                isLoading={isLoadingEditedTemplate}
                onClose={() => dispatch({ type: "closeEditDrawer" })}
                onSave={(values) => {
                    if (templateBeingEdited !== null) {
                        void handleUpdate(templateBeingEdited, values);
                    }
                }}
            />
            <ModalDialog
                open={state.templatePendingDeletion !== null}
                onClose={() => dispatch({ type: "cancelDelete" })}
                size="sm"
                title={t("questionnaireTemplatesPage.deleteDialogTitle")}
                description={t(
                    "questionnaireTemplatesPage.deleteDialogDescription",
                )}
                showCloseButton={false}
                footer={
                    <>
                        <Button
                            variant="secondary"
                            disabled={state.isDeleting}
                            onClick={() => dispatch({ type: "cancelDelete" })}
                        >
                            {t("common.cancel")}
                        </Button>
                        <Button
                            variant="danger"
                            disabled={state.isDeleting}
                            onClick={confirmDelete}
                        >
                            {state.isDeleting
                                ? t("questionnaireTemplatesPage.deleting")
                                : t("questionnaireTemplatesPage.delete")}
                        </Button>
                    </>
                }
            >
                <Text variant="muted">
                    {state.templatePendingDeletion === null
                        ? ""
                        : t("questionnaireTemplatesPage.deleteConfirmation", {
                              templateName: state.templatePendingDeletion.name,
                          })}
                </Text>
            </ModalDialog>
        </>
    );
}
