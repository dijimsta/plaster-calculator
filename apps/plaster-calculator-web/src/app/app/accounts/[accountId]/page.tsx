"use client";

import { useRouter } from "next/navigation.js";
import { use } from "react";

import { AccountDetailView } from "../account-detail-view.js";

export type AccountDetailPageParams = {
    readonly accountId: string;
};

export type AccountDetailPageProps = {
    readonly params: Promise<AccountDetailPageParams>;
};

export default function AccountDetailPage({ params }: AccountDetailPageProps) {
    const { accountId } = use(params);
    const router = useRouter();
    return (
        <AccountDetailView
            accountId={accountId}
            onAccountDeleted={() => router.replace("/app/accounts")}
        />
    );
}
