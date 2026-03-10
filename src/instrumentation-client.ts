import posthog from 'posthog-js';
import { env } from '@/env';

posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
	api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
	defaults: '2026-01-30',
	cookieless_mode: 'on_reject',
});
