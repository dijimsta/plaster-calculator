import { Breadcrumb, Button, PageHeading } from "@libraries/uikit-web";
import { Home, RefreshCcw } from "lucide-react";

import { RoutedBreadcrumbItem } from "../../../components/routed-breadcrumb-item.js";

import type { CompanyDetail } from "../../../types.js";
import type { ReactElement } from "react";

interface CompanyDetailHeaderProps {
    readonly company: CompanyDetail | null;
    readonly refresh: () => void;
}

export function CompanyDetailHeader({
    company,
    refresh,
}: CompanyDetailHeaderProps): ReactElement {
    const companyName = company?.companyName ?? "Company";

    return (
        <PageHeading>
            <PageHeading.Breadcrumbs>
                <Breadcrumb>
                    <RoutedBreadcrumbItem href="/">
                        <Home size={16} aria-label="Home" />
                    </RoutedBreadcrumbItem>
                    <RoutedBreadcrumbItem href="/companies">
                        Companies
                    </RoutedBreadcrumbItem>
                    <Breadcrumb.Item current>{companyName}</Breadcrumb.Item>
                </Breadcrumb>
            </PageHeading.Breadcrumbs>
            <PageHeading.Content>
                <PageHeading.Title>{companyName}</PageHeading.Title>
            </PageHeading.Content>
            <PageHeading.Actions>
                <Button
                    icon={<RefreshCcw aria-hidden="true" />}
                    variant="secondary"
                    onClick={refresh}
                    type="button"
                >
                    Refresh
                </Button>
            </PageHeading.Actions>
        </PageHeading>
    );
}
