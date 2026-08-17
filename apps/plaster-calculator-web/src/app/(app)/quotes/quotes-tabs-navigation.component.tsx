"use client";

import { Tabs } from "@libraries/uikit-web";
import { default as LinkModule } from "next/link.js";
import type { ReactElement } from "react";

import { useAppTranslation } from "../../../i18n/index.ts";

const Link = LinkModule.default;

/** Which quotes-area tab a page hosting {@link QuotesTabsNavigation} represents. */
export type QuotesTabsNavigationCurrentTab =
    "all-quotes" | "template" | "appearance";

export type QuotesTabsNavigationProps = {
    readonly current: QuotesTabsNavigationCurrentTab;
};

/**
 * The tab row shared by every page under `/quotes` (all quotes, quote
 * template, quote appearance, and the template variation detail page).
 * Centralised so a new quotes-area tab only needs to be added once, and so
 * no page under `/quotes` can be missing one.
 */
export function QuotesTabsNavigation({
    current,
}: QuotesTabsNavigationProps): ReactElement {
    const { t: tApp } = useAppTranslation();

    return (
        <Tabs>
            <Tabs.Item current={current === "all-quotes"}>
                <Link href="/quotes">{tApp("quotes.allQuotesTab")}</Link>
            </Tabs.Item>
            <Tabs.Item current={current === "template"}>
                <Link href="/quotes/template">
                    {tApp("quotes.templateTab")}
                </Link>
            </Tabs.Item>
            <Tabs.Item current={current === "appearance"}>
                <Link href="/quotes/appearance">
                    {tApp("quotes.appearanceTab")}
                </Link>
            </Tabs.Item>
        </Tabs>
    );
}
