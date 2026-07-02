"use client";

import { Breadcrumb, Button, PageHeading, Tabs } from "@libraries/uikit-web";
import { Home, Plus } from "lucide-react";
import { default as LinkModule } from "next/link.js";

import { RoutedBreadcrumbItem } from "../../../../components/routed-breadcrumb-item.js";

const Link = LinkModule.default;

export default function QuestionnaireTemplatesPage() {
    return (
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
                    project. Use the built-in standards or duplicate a template
                    to make your own.
                </PageHeading.Description>
            </PageHeading.Content>
            <PageHeading.Actions>
                <Button icon={<Plus size={18} />} onClick={() => undefined}>
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
    );
}
