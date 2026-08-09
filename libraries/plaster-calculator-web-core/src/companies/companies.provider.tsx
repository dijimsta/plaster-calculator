"use client";

import { useMemo } from "react";

import { CompaniesServiceContext } from "./companies.context.ts";
import { CompaniesService } from "./companies.service.ts";

import type { PropsWithChildren, ReactElement } from "react";

export interface CompaniesServiceProviderProps extends PropsWithChildren {
    readonly companiesService?: CompaniesService;
}

export function CompaniesServiceProvider({
    children,
    companiesService,
}: CompaniesServiceProviderProps): ReactElement {
    const value = useMemo(
        () => companiesService ?? new CompaniesService(),
        [companiesService],
    );

    return (
        <CompaniesServiceContext.Provider value={value}>
            {children}
        </CompaniesServiceContext.Provider>
    );
}
