import Box from '@mui/material/Box';
import { useEffect } from 'react';
import Meta from '@/app/meta/page';
import NotFound from '@/app/not-found';
import Home from '@/app/page';
import PrivacyPage from '@/app/privacy/page';
import SuggestPage from '@/app/suggest/page';
import { AnalyticsConsentBanner } from '@/components/analytics-consent-banner';
import { ConvexClientProvider } from '@/components/convex-provider';
import { Footer } from '@/components/footer';
import { MuiProvider } from '@/components/mui-provider';
import { NotificationProvider } from '@/components/notification-provider';
import { ThemeToggle } from '@/components/theme-toggle';

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
			<NotificationProvider>
				<ConvexClientProvider>
					<Box
						sx={{
							minHeight: '100svh',
							px: { xs: 2, sm: 3 },
							pt: { xs: 2, sm: 3 },
							pb: 3,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							gap: 4,
						}}
					>
						{globalThis.location.pathname !== '/' && (
							<Box className="secondary-theme-bar">
								<ThemeToggle />
							</Box>
						)}
						<Box
							component="main"
							sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
						>
							<Page />
						</Box>
						<Footer />
					</Box>
					<AnalyticsConsentBanner />
				</ConvexClientProvider>
			</NotificationProvider>
		</MuiProvider>
	);
}
