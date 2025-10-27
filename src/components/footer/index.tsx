'use client';

import Link from 'next/link';
import { usePostHog } from 'posthog-js/react';
import { type FC, useState } from 'react';
import CookieConsent from 'react-cookie-consent';
import styles from './footer.module.css';

export const Footer: FC = () => {
	const posthog = usePostHog();
	const [consentGiven, setConsentGiven] = useState(
		posthog.get_explicit_consent_status(),
	);

	const handleAcceptCookies = () => {
		posthog.opt_in_capturing();
		setConsentGiven('granted');
	};

	const handleDeclineCookies = () => {
		posthog.opt_out_capturing();
		setConsentGiven('denied');
	};
	return (
		<footer className={styles.footer}>
			<Link
				prefetch={false}
				href="http://theestimategoat.com/"
				target="_blank"
				rel="noopener noreferrer"
			>
				inspired by the Estimate Goat
			</Link>
			<Link
				prefetch={false}
				href="https://www.flaticon.com/free-icons/corgi"
				title="corgi icons"
				target="_blank"
				rel="noopener noreferrer"
			>
				Corgi icons created by AomAm - Flaticon
			</Link>
			<Link
				prefetch={false}
				href="https://swinte.dev"
				target="_blank"
				rel="noopener noreferrer"
			>
				made by swinte.dev
			</Link>
			{consentGiven === 'pending' && (
				<CookieConsent
					onAccept={handleAcceptCookies}
					onDecline={handleDeclineCookies}
					enableDeclineButton
				>
					We use tracking cookies to understand how you use the product and help
					us improve it. Please accept cookies to help us improve.
				</CookieConsent>
			)}
		</footer>
	);
};
