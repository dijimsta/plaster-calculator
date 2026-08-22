import { Breadcrumb, PageHeading } from "@libraries/uikit-web";
import { Home } from "lucide-react";
import type { ReactElement } from "react";

import { RoutedBreadcrumbItem } from "../../../components/routed-breadcrumb-item.js";
import { useAppTranslation } from "../../../i18n/index.ts";
import type { Supplier } from "../../../types.js";

type SupplierDetailHeaderProps = {
    readonly supplier: Supplier | null;
};

export function SupplierDetailHeader({
    supplier,
}: SupplierDetailHeaderProps): ReactElement {
    const { t } = useAppTranslation();
    const supplierName =
        supplier?.name ?? t("suppliers.detailHeader.supplierFallback");

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
                    <RoutedBreadcrumbItem href="/suppliers">
                        {t("suppliers.title")}
                    </RoutedBreadcrumbItem>
                    <Breadcrumb.Item current>{supplierName}</Breadcrumb.Item>
                </Breadcrumb>
            </PageHeading.Breadcrumbs>
            <PageHeading.Content>
                <PageHeading.Title>{supplierName}</PageHeading.Title>
            </PageHeading.Content>
        </PageHeading>
    );
}
