"use client";

import { useState } from "react";

import { AccountListPanel } from "./account-list-panel.js";
import { NewAccountPanel } from "./new-account-panel.js";
import { cx, ui } from "../../../lib/styles.js";

export default function AccountsPage() {
    const [accountListRefreshKey, setAccountListRefreshKey] = useState(0);

    return (
        <main className={ui.shell}>
            <section className={cx(ui.topbar, "items-start")}>
                <div>
                    <h1 className="m-0 text-2xl leading-tight">Accounts</h1>
                    <p className={ui.muted}>
                        Manage customer accounts and contacts.
                    </p>
                </div>
            </section>

            <section className={cx(ui.layoutGrid, "items-start")}>
                <NewAccountPanel
                    onCreated={() =>
                        setAccountListRefreshKey((current) => current + 1)
                    }
                />
                <AccountListPanel refreshKey={accountListRefreshKey} />
            </section>
        </main>
    );
}
