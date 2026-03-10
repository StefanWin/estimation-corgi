'use client';

import { usePostHog } from 'posthog-js/react';
import { useEffect, useState } from 'react';
import { Link } from '@/components/link';
import styles from './analytics-consent-banner.module.css';

export function AnalyticsConsentBanner() {
	const posthog = usePostHog();
	const [consentGiven, setConsentGiven] = useState('');

	useEffect(() => {
		setConsentGiven(posthog.get_explicit_consent_status());
	}, [posthog]);

	const handleAcceptCookies = () => {
		posthog.opt_in_capturing();
		setConsentGiven('granted');
	};

	const handleDeclineCookies = () => {
		posthog.opt_out_capturing();
		setConsentGiven('denied');
	};

	if (consentGiven !== 'pending') return null;

	return (
		<aside className={styles.banner}>
			<div className={styles.copy}>
				<p className={styles.title}>Analytics preferences</p>
				<p className={styles.description}>
					We use PostHog to measure page views and feature usage so we can
					improve the site. Read more in our{' '}
					<Link href="/privacy" className={styles.link}>
						privacy policy
					</Link>
					.
				</p>
			</div>
			<div className={styles.actions}>
				<button
					className={styles.secondaryAction}
					type="button"
					onClick={handleDeclineCookies}
				>
					decline
				</button>
				<button
					className={styles.primaryAction}
					type="button"
					onClick={handleAcceptCookies}
				>
					allow analytics
				</button>
			</div>
		</aside>
	);
}
