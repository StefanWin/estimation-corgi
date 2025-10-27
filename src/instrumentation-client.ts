import posthog from 'posthog-js';
import { env } from '@/env';

posthog.init(env.NEXT_PUBLIC_POSTHOG_KEY, {
	api_host: env.NEXT_PUBLIC_POSTHOG_HOST,
	defaults: '2025-05-24',
	capture_pageview: 'history_change',
	capture_pageleave: 'if_capture_pageview',
	cookieless_mode: 'on_reject',
});
