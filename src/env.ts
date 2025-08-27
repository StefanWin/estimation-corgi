import {createEnv} from "@t3-oss/env-nextjs";
import {z} from 'zod';

export const env = createEnv({
    server: {
        // DATABASE_URL: z.string(),
        RESEND_API_KEY: z.string(),
        ON_SUGGEST_EMAIL: z.email(),
        CF_TURNSTILE_VERIFY_ENDPOINT: z.url(),
        TURNSTILE_SECRET_KEY: z.string(),
    },
    client: {
        NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string(),
    },
    runtimeEnv: {
        // server
        // DATABASE_URL: process.env.DATABASE_URL,
        RESEND_API_KEY: process.env.RESEND_API_KEY,
        ON_SUGGEST_EMAIL: process.env.ON_SUGGEST_EMAIL,
        CF_TURNSTILE_VERIFY_ENDPOINT: process.env.CF_TURNSTILE_VERIFY_ENDPOINT,
        TURNSTILE_SECRET_KEY: process.env.TURNSTILE_SECRET_KEY,
        // client
        NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    },
    skipValidation: process.env.SKIP_ENV_VAR_VALIDATION === 'true',
});