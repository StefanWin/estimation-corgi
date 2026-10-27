import { z } from 'zod';

const clientEnv = z.object({
	VITE_TURNSTILE_SITE_KEY: z.string().trim().min(1),
	VITE_CONVEX_URL: z.url(),
});

export const env = clientEnv.parse(import.meta.env);
