import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { initializeApp } from "firebase/app";

import type { Decorator } from "@storybook/react-vite";
import type { ReactElement, ReactNode } from "react";

initializeApp({
    projectId: "storybook-stub",
    apiKey: "storybook-stub-api-key",
});

/**
 * A fresh QueryClient per story so cached results never leak between stories;
 * retries are disabled so a failed real network call fails fast instead of
 * retrying for several seconds.
 */
function createStoryQueryClient(): QueryClient {
    return new QueryClient({
        defaultOptions: {
            queries: { retry: false },
            mutations: { retry: false },
        },
    });
}

export function DataConnectQueryClientProvider({
    children,
}: {
    readonly children: ReactNode;
}): ReactElement {
    return (
        <QueryClientProvider client={createStoryQueryClient()}>
            {children}
        </QueryClientProvider>
    );
}

export const withDataConnectQueryClient: Decorator = (Story) => (
    <DataConnectQueryClientProvider>
        <Story />
    </DataConnectQueryClientProvider>
);
