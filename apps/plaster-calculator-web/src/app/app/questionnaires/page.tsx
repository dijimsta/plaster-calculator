"use client";

import { Breadcrumb, PageHeading } from "@libraries/uikit-web";
import { Home } from "lucide-react";

import { RoutedBreadcrumbItem } from "../../../components/routed-breadcrumb-item.js";

export default function QuestionnairesPage() {
    return (
        <>
            <PageHeading>
                <PageHeading.Breadcrumbs>
                    <Breadcrumb>
                        <RoutedBreadcrumbItem href="/app">
                            <Home size={16} aria-label="Home" />
                        </RoutedBreadcrumbItem>
                        <Breadcrumb.Item current>
                            Questionnaires
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </PageHeading.Breadcrumbs>
                <PageHeading.Content>
                    <PageHeading.Title>Questionnaires</PageHeading.Title>
                    <PageHeading.Description>
                        This page is under construction.
                    </PageHeading.Description>
                </PageHeading.Content>
            </PageHeading>
        </>
    );
}
