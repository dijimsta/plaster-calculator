import { Breadcrumb, Button, PageHeading } from "@libraries/uikit-web";
import { RefreshCcw } from "lucide-react";

import { RoutedBreadcrumbItem } from "../../../components/routed-breadcrumb-item.js";

import type { AccountDetail } from "../../../types.js";
import type { ReactElement } from "react";

interface AccountDetailHeaderProps {
    readonly account: AccountDetail | null;
    readonly refresh: () => void;
}

export function AccountDetailHeader({
    account,
    refresh,
}: AccountDetailHeaderProps): ReactElement {
    const accountName = account?.companyName ?? "Account";

    return (
        <PageHeading>
            <PageHeading.Breadcrumbs>
                <Breadcrumb>
                    <RoutedBreadcrumbItem href="/app/accounts">
                        Accounts
                    </RoutedBreadcrumbItem>
                    <Breadcrumb.Item current>{accountName}</Breadcrumb.Item>
                </Breadcrumb>
            </PageHeading.Breadcrumbs>
            <PageHeading.Content>
                <PageHeading.Title>{accountName}</PageHeading.Title>
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
