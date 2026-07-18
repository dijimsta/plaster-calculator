import { Breadcrumb, PageHeading, Tabs } from "@libraries/uikit-web";
import { Home } from "lucide-react";
import { default as LinkModule } from "next/link.js";

import { RoutedBreadcrumbItem } from "../../../components/routed-breadcrumb-item.js";

const Link = LinkModule.default;

export type UserPageTab = "general" | "email-signature";

export interface UserPageHeaderProps {
    readonly activeTab: UserPageTab;
}

export function UserPageHeader({ activeTab }: UserPageHeaderProps) {
    return (
        <PageHeading>
            <PageHeading.Breadcrumbs>
                <Breadcrumb>
                    <RoutedBreadcrumbItem href="/app">
                        <Home size={16} aria-label="Home" />
                    </RoutedBreadcrumbItem>
                    <Breadcrumb.Item current>User</Breadcrumb.Item>
                </Breadcrumb>
            </PageHeading.Breadcrumbs>
            <PageHeading.Content>
                <PageHeading.Title>User</PageHeading.Title>
                <PageHeading.Description>
                    Profile and settings
                </PageHeading.Description>
            </PageHeading.Content>
            <PageHeading.Navigation>
                <Tabs>
                    <Tabs.Item current={activeTab === "general"}>
                        <Link href="/app/user">General</Link>
                    </Tabs.Item>
                    <Tabs.Item current={activeTab === "email-signature"}>
                        <Link href="/app/user/email-signature">
                            Email signature
                        </Link>
                    </Tabs.Item>
                </Tabs>
            </PageHeading.Navigation>
        </PageHeading>
    );
}
