import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    devIndicators: {
        position: "bottom-right",
    },
    reactStrictMode: true,
    turbopack: {
        resolveAlias: {
            canvas: "./canvas-empty.ts",
        },
    },
    webpack: (config) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            canvas: false,
        };
        return config;
    },
};

export default nextConfig;
