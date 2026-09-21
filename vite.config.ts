import { execFileSync } from 'node:child_process';
import { fileURLToPath, URL } from 'node:url';
import { cloudflare } from '@cloudflare/vite-plugin';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const commitSha = (
	process.env.CF_PAGES_COMMIT_SHA ??
	process.env.GITHUB_SHA ??
	execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim()
).slice(0, 7);
const buildDate = new Date()
	.toISOString()
	.replace('T', ' ')
	.replace(/\.\d{3}Z$/, ' UTC');

export default defineConfig({
	plugins: [react(), cloudflare()],
	define: {
		__BUILD_DATE__: JSON.stringify(buildDate),
		__COMMIT_SHA__: JSON.stringify(commitSha),
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
});
