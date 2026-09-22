import { usePostHog } from 'posthog-js/react';
import { createContext, type ReactNode, useContext, useState } from 'react';

type ConsentStatus = 'pending' | 'granted' | 'denied';

const AnalyticsConsentContext = createContext<{
	consentStatus: ConsentStatus;
	setConsent: (consent: 'granted' | 'denied') => void;
} | null>(null);

export function AnalyticsConsentProvider({
	children,
}: Readonly<{ children: ReactNode }>) {
	const posthog = usePostHog();
	const [consentStatus, setConsentStatus] = useState(() =>
		posthog.get_explicit_consent_status(),
	);

	const setConsent = (consent: 'granted' | 'denied') => {
		if (consent === 'granted') {
			posthog.opt_in_capturing();
		} else {
			posthog.opt_out_capturing();
		}
		setConsentStatus(posthog.get_explicit_consent_status());
	};

	return (
		<AnalyticsConsentContext value={{ consentStatus, setConsent }}>
			{children}
		</AnalyticsConsentContext>
	);
}

export function useAnalyticsConsent() {
	const consent = useContext(AnalyticsConsentContext);
	if (!consent) {
		throw new Error(
			'useAnalyticsConsent must be used within AnalyticsConsentProvider',
		);
	}
	return consent;
}
