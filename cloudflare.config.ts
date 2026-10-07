import { bindings, defineConfig } from 'cf/config';

/**
 * Secret-like files were detected but not read or migrated: .env.local, dist\estimation_corgi\.dev.vars. Only `secrets.required` entries are migrated.
 * @see https://developers.cloudflare.com/workers/configuration/secrets/
 */

export default defineConfig({
	worker: {
		name: 'estimation-corgi',
		compatibilityDate: '2026-07-23',
		entrypoint: './worker/index.tsx',
		observability: {
			enabled: true,
			headSamplingRate: 1,
		},
		assets: {
			notFoundHandling: 'single-page-application',
			runWorkerFirst: ['/', '/og'],
		},
		domains: ['estimation-corgi.com'],
		env: {
			ASSETS: bindings.assets(),
		},
	},
});
