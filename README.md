# Estimation Corgi

Properly estimate your tasks with the help of a corgi.

## Stack

- React 19 + Vite
- Cloudflare Workers via the Cloudflare Vite plugin
- Convex for the message data and submissions
- Material UI and TypeScript

## Local development

Use Node.js 22 and pnpm 11.

```powershell
pnpm install
Copy-Item env.example .env.local
pnpm dev:convex
```

In a second terminal, run:

```powershell
pnpm dev
```

The Vite development server uses the Workers runtime integration. Set the client-side variables in `.env.local`:

```dotenv
VITE_CONVEX_URL=https://your-deployment.convex.cloud
VITE_TURNSTILE_SITE_KEY=
VITE_POSTHOG_KEY=
VITE_POSTHOG_HOST=https://eu.i.posthog.com
```

Convex secrets such as `TURNSTILE_SECRET_KEY` remain in the Convex deployment; they are not exposed to the browser or Worker.

Message submissions require Turnstile. Set `VITE_TURNSTILE_SITE_KEY` for the frontend and `TURNSTILE_SECRET_KEY` in Convex. Use the test keys in `env.example` for development and real keys in production. Missing captcha configuration rejects submissions; there is no verification bypass.

## Deploy to Cloudflare Workers

Before deploying the required `normalizedMessage` schema for the first time, run the already-deployed `migrations:runAll` function in the production Convex dashboard. Wait for `backfillNormalizedMessages` to finish in the migrations component. Migration runners return before their background work finishes. If any message still lacks a normalized key, schema validation will reject the deployment. New submissions always write the key, and duplicate detection uses only the `by_normalized_message` index.

Deployments run through Cloudflare's Git integration, never locally. Configure:

- Build command: `pnpm run build`
- Deploy command: `pnpm run deploy:convex`
- Build environment: the production `CONVEX_DEPLOY_KEY` and the `VITE_*` values above. `VITE_CONVEX_URL` must point to the same production deployment as the deploy key because Vite embeds it during the separate build step.

The build command creates the SPA assets and `dist/wrangler.json`. The deploy command deploys Convex first, invokes production migrations with `--prod`, then calls Wrangler to publish the already-built assets. A failed Convex deployment or migration invocation stops the chain before publishing the frontend. Migrations run in the background, so successful invocation does not mean their backfills have finished; schema-tightening changes require the completed backfill described above.

`pnpm run deploy` only calls Wrangler; it does not build the SPA. Do not commit `dist`.

`wrangler.jsonc` enables `single-page-application` fallback, so direct navigation to `/suggest`, `/meta`, and `/privacy` works on the Worker. Configure a custom domain or Workers route in Cloudflare after the first deploy.

## Useful commands

```powershell
pnpm types
pnpm build
pnpm preview
```
