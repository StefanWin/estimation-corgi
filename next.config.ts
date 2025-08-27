import type {NextConfig} from "next";

import "@/env";

const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    serverExternalPackages: ["@prisma/client", ".prisma/client"]
};

export default nextConfig;

import {initOpenNextCloudflareForDev} from "@opennextjs/cloudflare";

void initOpenNextCloudflareForDev();