'use client';

import { usePostHog } from 'posthog-js/react';
import { type FC, useEffect, useState } from 'react';
import { Link } from '@/components/link';
import styles from './footer.module.css';

export const Footer: FC = () => {
	const posthog = usePostHog();
	const [consentStatus, setConsentStatus] = useState<
		ReturnType<typeof posthog.get_explicit_consent_status> | ''
	>('');
	useEffect(() => {
		setConsentStatus(posthog.get_explicit_consent_status());
	}, [posthog]);

	const onOptOut = () => {
		posthog.opt_out_capturing();
		globalThis.location.reload();
	};

	const onOptIn = () => {
		posthog.opt_in_capturing();
		globalThis.location.reload();
	};

	return (
		<footer className={styles.footer}>
			<Link
				prefetch={false}
				href="https://stefanwintergerst.com"
				target="_blank"
				rel="noopener noreferrer"
			>
				made by stefanwintergerst.com
			</Link>
			<Link
				prefetch={false}
				href="https://github.com/StefanWin/estimation-corgi"
				target="_blank"
				rel="noopener noreferrer"
			>
				github
			</Link>
			<Link href="/privacy">data privacy</Link>
			{consentStatus === 'granted' && (
				<button
					className={styles.preferencesButton}
					type="button"
					onClick={onOptOut}
				>
					opt-out
				</button>
			)}
			{consentStatus === 'denied' && (
				<button
					className={styles.preferencesButton}
					type="button"
					onClick={onOptIn}
				>
					opt-in
				</button>
			)}
		</footer>
	);
};
