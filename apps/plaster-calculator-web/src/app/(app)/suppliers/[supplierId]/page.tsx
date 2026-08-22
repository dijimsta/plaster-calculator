"use client";

import { useRouter } from "next/navigation.js";
import { use } from "react";

import { SupplierDetailView } from "../supplier-detail-view.js";

export type SupplierDetailPageParams = {
    readonly supplierId: string;
};

export type SupplierDetailPageProps = {
    readonly params: Promise<SupplierDetailPageParams>;
};

export default function SupplierDetailPage({
    params,
}: SupplierDetailPageProps) {
    const { supplierId } = use(params);
    const router = useRouter();
    return (
        <SupplierDetailView
            supplierId={supplierId}
            onSupplierDeleted={() => router.replace("/suppliers")}
        />
    );
}
