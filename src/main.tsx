import '@fontsource-variable/geist/wght.css';
import '@fontsource-variable/geist-mono/wght.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AnalyticsConsentProvider } from '@/components/analytics-consent-provider';
import App from './App';
import './instrumentation-client';

// biome-ignore lint/style/noNonNullAssertion: i know more than you
createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AnalyticsConsentProvider>
			<App />
		</AnalyticsConsentProvider>
	</StrictMode>,
);
