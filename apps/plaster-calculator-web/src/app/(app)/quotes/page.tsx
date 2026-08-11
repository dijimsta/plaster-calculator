"use client";

import {
    Box,
    Breadcrumb,
    EmptyState,
    PageHeading,
    Tabs,
} from "@libraries/uikit-web";
import { FileText, Home } from "lucide-react";
import { default as LinkModule } from "next/link.js";

import { RoutedBreadcrumbItem } from "../../../components/routed-breadcrumb-item.js";

const Link = LinkModule.default;

export default function QuotesPage() {
    return (
        <>
            <PageHeading>
                <PageHeading.Breadcrumbs>
                    <Breadcrumb>
                        <RoutedBreadcrumbItem href="/">
                            <Home size={16} aria-label="Home" />
                        </RoutedBreadcrumbItem>
                        <Breadcrumb.Item current>Quotes</Breadcrumb.Item>
                    </Breadcrumb>
                </PageHeading.Breadcrumbs>
                <PageHeading.Content>
                    <PageHeading.Title>Quotes</PageHeading.Title>
                    <PageHeading.Description>
                        All quotes generated from your projects, once pricing is
                        set up.
                    </PageHeading.Description>
                </PageHeading.Content>
                <PageHeading.Navigation>
                    <Tabs>
                        <Tabs.Item current>
                            <Link href="/quotes">All quotes</Link>
                        </Tabs.Item>
                        <Tabs.Item>
                            <Link href="/quotes/template">Quote template</Link>
                        </Tabs.Item>
                    </Tabs>
                </PageHeading.Navigation>
            </PageHeading>
            <Box direction="column" gap="lg" padding="md">
                <EmptyState
                    icon={<FileText />}
                    title="No quotes yet"
                    description="Quotes are generated from a project once pricing is set up."
                />
            </Box>
        </>
    );
}
