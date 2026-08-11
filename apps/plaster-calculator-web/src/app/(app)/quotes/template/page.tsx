"use client";

import { QuoteTemplatePanel } from "@libraries/plaster-calculator-ui";
import { Box, Breadcrumb, PageHeading, Tabs } from "@libraries/uikit-web";
import { Home } from "lucide-react";
import { default as LinkModule } from "next/link.js";
import { useRouter } from "next/navigation.js";

import { RoutedBreadcrumbItem } from "../../../../components/routed-breadcrumb-item.js";

const Link = LinkModule.default;

export default function QuoteTemplatePage() {
    const router = useRouter();

    return (
        <>
            <PageHeading>
                <PageHeading.Breadcrumbs>
                    <Breadcrumb>
                        <RoutedBreadcrumbItem href="/">
                            <Home size={16} aria-label="Home" />
                        </RoutedBreadcrumbItem>
                        <RoutedBreadcrumbItem href="/quotes">
                            Quotes
                        </RoutedBreadcrumbItem>
                        <Breadcrumb.Item current>
                            Quote template
                        </Breadcrumb.Item>
                    </Breadcrumb>
                </PageHeading.Breadcrumbs>
                <PageHeading.Content>
                    <PageHeading.Title>Quote template</PageHeading.Title>
                    <PageHeading.Description>
                        The default items and pricing used when quotes are
                        generated from a project.
                    </PageHeading.Description>
                </PageHeading.Content>
                <PageHeading.Navigation>
                    <Tabs>
                        <Tabs.Item>
                            <Link href="/quotes">All quotes</Link>
                        </Tabs.Item>
                        <Tabs.Item current>
                            <Link href="/quotes/template">Quote template</Link>
                        </Tabs.Item>
                    </Tabs>
                </PageHeading.Navigation>
            </PageHeading>
            <Box direction="column" gap="lg" padding="md">
                <QuoteTemplatePanel onCancel={() => router.push("/quotes")} />
            </Box>
        </>
    );
}
