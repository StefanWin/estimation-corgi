import Box from '@mui/material/Box';
import { useEffect } from 'react';
import { Toaster } from 'sonner';
import Meta from '@/app/meta/page';
import NotFound from '@/app/not-found';
import Home from '@/app/page';
import PrivacyPage from '@/app/privacy/page';
import SuggestPage from '@/app/suggest/page';
import { AnalyticsConsentBanner } from '@/components/analytics-consent-banner';
import { ConvexClientProvider } from '@/components/convex-provider';
import { Footer } from '@/components/footer';
import { MuiProvider } from '@/components/mui-provider';

const pages = {
	'/': { component: Home, title: 'estimation corgi' },
	'/meta': {
		component: Meta,
		title: 'Available Messages & Images | estimation corgi',
	},
	'/privacy': {
		component: PrivacyPage,
		title: 'Privacy Policy | estimation corgi',
	},
	'/suggest': {
		component: SuggestPage,
		title: 'Suggest a message | estimation corgi',
	},
} as const;

export default function App() {
	const page = pages[globalThis.location.pathname as keyof typeof pages];
	const Page = page?.component ?? NotFound;

	useEffect(() => {
		document.title = page?.title ?? 'Not Found | estimation corgi';
	}, [page]);

	return (
		<MuiProvider>
			<ConvexClientProvider>
				<Box
					sx={{
						minHeight: '100svh',
						px: { xs: 2, sm: 2.5 },
						pt: 'clamp(1.5rem, 4vh, 3.5rem)',
						pb: 2.5,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'center',
						gap: 'clamp(1.5rem, 3vh, 2.5rem)',
					}}
				>
					<Box
						component="main"
						sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
					>
						<Page />
					</Box>
					<Footer />
				</Box>
				<AnalyticsConsentBanner />
				<Toaster position="bottom-center" theme="dark" />
			</ConvexClientProvider>
		</MuiProvider>
	);
}
