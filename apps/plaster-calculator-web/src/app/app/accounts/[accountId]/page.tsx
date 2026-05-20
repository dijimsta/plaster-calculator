"use client";

import { use } from "react";

import { AccountDetailView } from "../account-detail-view.js";

export default function AccountDetailPage({
    params,
}: {
    params: Promise<{ accountId: string }>;
}) {
    const { accountId } = use(params);
    return <AccountDetailView accountId={accountId} />;
}
