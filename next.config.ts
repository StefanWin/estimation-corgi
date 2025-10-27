import type { NextConfig } from 'next';

// TODO: does not work well with cloudflare workers builds
// TODO: since build env vars need to be set manually and cannot be synced with normal env vars
// import "@/env";

const nextConfig: NextConfig = {
	experimental: {
		turbopackFileSystemCacheForDev: true,
	},
};

export default nextConfig;
