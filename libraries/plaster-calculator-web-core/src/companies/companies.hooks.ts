"use client";

import { useContext } from "react";

import { CompaniesServiceContext } from "./companies.context.ts";
import type { CompaniesService } from "./companies.service.ts";

export function useCompaniesService(): CompaniesService {
    const context = useContext(CompaniesServiceContext);
    if (context) {
        return context;
    } else {
        throw new Error(
            "useCompaniesService must be used within a CompaniesServiceProvider",
        );
    }
}
