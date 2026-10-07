import { bindings, defineConfig } from 'cf/config';

export default defineConfig({
	worker: {
		name: 'estimation-corgi',
		compatibilityDate: '2026-07-23',
		entrypoint: './worker/index.tsx',
		// Workers Logs for the invocations below. Plain asset requests don't run
		// the Worker, so they aren't logged.
		observability: {
			enabled: true,
			headSamplingRate: 1,
		},
		assets: {
			notFoundHandling: 'single-page-application',
			// The home page gets per-estimate link preview tags, and /og renders
			// the preview image. Everything else is served straight from assets.
			runWorkerFirst: ['/', '/og'],
		},
		domains: ['estimation-corgi.com'],
		env: {
			ASSETS: bindings.assets(),
		},
	},
});
