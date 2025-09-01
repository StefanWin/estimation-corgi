import {createEnv} from "@t3-oss/env-nextjs";
import {z} from 'zod';

export const env = createEnv({
    server: {
        CF_TURNSTILE_VERIFY_ENDPOINT: z.url(),
        TURNSTILE_SECRET_KEY: z.string(),
    },
    client: {
        NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string(),
        NEXT_PUBLIC_CONVEX_URL: z.url(),
    },
    runtimeEnv: {
        // server
        CF_TURNSTILE_VERIFY_ENDPOINT: process.env.CF_TURNSTILE_VERIFY_ENDPOINT,
        TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
        // client
        NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
        NEXT_PUBLIC_CONVEX_URL: process.env.NEXT_PUBLIC_CONVEX_URL
    },
    skipValidation: process.env.SKIP_ENV_VAR_VALIDATION === 'true',
});