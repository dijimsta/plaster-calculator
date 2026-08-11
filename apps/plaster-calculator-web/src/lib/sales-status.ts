import type { SalesStatus } from "@libraries/plaster-calculator-common";

import { useAppTranslation } from "../i18n/index.ts";

export function useSalesStatusLabel(): (status: SalesStatus) => string {
    const { t } = useAppTranslation();
    return (status: SalesStatus) => t(`salesStatus.statusLabels.${status}`);
}
