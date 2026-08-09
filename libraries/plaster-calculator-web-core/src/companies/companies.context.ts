"use client";

import { createContext } from "react";

import type { CompaniesService } from "./companies.service.ts";

export const CompaniesServiceContext = createContext<
    CompaniesService | undefined
>(undefined);
