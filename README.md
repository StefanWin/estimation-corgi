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

## Deploy to Cloudflare Workers

1. Log in once with `pnpm wrangler login`.
2. Deploy the Convex functions and migrations with `pnpm deploy:convex`.
3. Set the `VITE_*` values above in your CI environment (or `.env.production.local` for a local deployment).
4. Run:

   ```powershell
   pnpm deploy
   ```

`pnpm deploy` builds the SPA and calls Wrangler. The Cloudflare Vite plugin writes the deployable Worker configuration to `dist/wrangler.json`; do not commit `dist`.

`wrangler.jsonc` enables `single-page-application` fallback, so direct navigation to `/suggest`, `/meta`, and `/privacy` works on the Worker. Configure a custom domain or Workers route in Cloudflare after the first deploy.

## Useful commands

```powershell
pnpm types
pnpm build
pnpm preview
pnpm deploy
```
