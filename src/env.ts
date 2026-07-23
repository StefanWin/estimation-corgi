import { z } from 'zod';

const clientEnv = z.object({
	VITE_TURNSTILE_SITE_KEY: z.string().optional(),
	VITE_CONVEX_URL: z.url(),
	VITE_POSTHOG_KEY: z.string(),
	VITE_POSTHOG_HOST: z.url(),
});

export const env = clientEnv.parse(import.meta.env);
