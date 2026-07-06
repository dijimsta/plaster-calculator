"use client";

import {
    connectorConfig,
    listQuestionnaireTemplatesRef,
} from "@generated/questionnaires-data-connector-web";
import {
    useCreateQuestionnaireTemplate,
    useCreateQuestionnaireTemplateQuestion,
    useListQuestionnaireTemplates,
} from "@generated/questionnaires-data-connector-web/react";
import {
    NewQuestionnaireTemplateDrawer,
    QuestionnaireTemplateCardGridList,
} from "@libraries/plaster-calculator-ui";
import { FirebaseService } from "@libraries/plaster-calculator-web-core";
import {
    Breadcrumb,
    Button,
    Notification,
    PageHeading,
    Tabs,
} from "@libraries/uikit-web";
import { Home, Plus } from "lucide-react";
import { default as LinkModule } from "next/link.js";
import { useState } from "react";

import { RoutedBreadcrumbItem } from "../../../../components/routed-breadcrumb-item.js";

import type { QuestionnaireTemplateFormValues } from "@libraries/plaster-calculator-ui";

const Link = LinkModule.default;
const dataConnect = FirebaseService.getDataConnect(connectorConfig);

export default function QuestionnaireTemplatesPage() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [createdTemplateName, setCreatedTemplateName] = useState<
        string | null
    >(null);
    const [creationFailed, setCreationFailed] = useState(false);

    const { data } = useListQuestionnaireTemplates(dataConnect);
    const createTemplate = useCreateQuestionnaireTemplate(dataConnect, {
        invalidate: [listQuestionnaireTemplatesRef],
    });
    const createQuestion = useCreateQuestionnaireTemplateQuestion(dataConnect);

    async function handleCreate(
        values: QuestionnaireTemplateFormValues,
    ): Promise<void> {
        try {
            const { questionnaireTemplate_insert } =
                await createTemplate.mutateAsync({
                    id: crypto.randomUUID(),
                    name: values.name,
                });

            await Promise.all(
                values.questions.map((question, position) =>
                    createQuestion.mutateAsync({
                        id: crypto.randomUUID(),
                        templateId: questionnaireTemplate_insert.id,
                        label: question.label,
                        description: question.description,
                        position,
                    }),
                ),
            );

            setIsDrawerOpen(false);
            setCreatedTemplateName(values.name);
        } catch {
            setCreationFailed(true);
        }
    }

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
                        onClick={() => setIsDrawerOpen(true)}
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
            {createdTemplateName !== null && (
                <Notification
                    intent="success"
                    title="Template created"
                    description={`"${createdTemplateName}" is ready to use.`}
                    onDismiss={() => setCreatedTemplateName(null)}
                />
            )}
            {creationFailed && (
                <Notification
                    intent="error"
                    title="Couldn't create template"
                    description="Something went wrong while saving. Please try again."
                    onDismiss={() => setCreationFailed(false)}
                />
            )}
            <QuestionnaireTemplateCardGridList
                templates={data?.questionnaireTemplates ?? []}
                onOpen={() => undefined}
                onDuplicate={() => undefined}
                onDelete={() => undefined}
            />
            <NewQuestionnaireTemplateDrawer
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                onCreate={handleCreate}
            />
        </>
    );
}
