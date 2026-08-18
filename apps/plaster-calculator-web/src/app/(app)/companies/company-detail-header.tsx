import { Breadcrumb, Button, PageHeading } from "@libraries/uikit-web";
import { Home, RefreshCcw } from "lucide-react";
import type { ReactElement } from "react";

import { RoutedBreadcrumbItem } from "../../../components/routed-breadcrumb-item.js";
import { useAppTranslation } from "../../../i18n/index.ts";
import type { CompanyDetail } from "../../../types.js";

type CompanyDetailHeaderProps = {
    readonly company: CompanyDetail | null;
    readonly refresh: () => void;
};

export function CompanyDetailHeader({
    company,
    refresh,
}: CompanyDetailHeaderProps): ReactElement {
    const { t } = useAppTranslation();
    const companyName =
        company?.companyName ?? t("companies.detailHeader.companyFallback");

    return (
        <PageHeading>
            <PageHeading.Breadcrumbs>
                <Breadcrumb>
                    <RoutedBreadcrumbItem href="/">
                        <Home
                            size={16}
                            aria-label={t("sidebar.navLabels.home")}
                        />
                    </RoutedBreadcrumbItem>
                    <RoutedBreadcrumbItem href="/companies">
                        {t("companies.title")}
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
                    {t("companies.detailHeader.refresh")}
                </Button>
            </PageHeading.Actions>
        </PageHeading>
    );
}
