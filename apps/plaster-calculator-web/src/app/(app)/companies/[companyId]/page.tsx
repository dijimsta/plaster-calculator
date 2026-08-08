"use client";

import { useRouter } from "next/navigation.js";
import { use } from "react";

import { CompanyDetailView } from "../company-detail-view.js";

export type CompanyDetailPageParams = {
    readonly companyId: string;
};

export type CompanyDetailPageProps = {
    readonly params: Promise<CompanyDetailPageParams>;
};

export default function CompanyDetailPage({ params }: CompanyDetailPageProps) {
    const { companyId } = use(params);
    const router = useRouter();
    return (
        <CompanyDetailView
            companyId={companyId}
            onCompanyDeleted={() => router.replace("/companies")}
        />
    );
}
