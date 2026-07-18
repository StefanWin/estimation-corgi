import Box from '@mui/material/Box';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import type React from 'react';
import { Toaster } from 'sonner';
import { AnalyticsConsentBanner } from '@/components/analytics-consent-banner';
import { ConvexClientProvider } from '@/components/convex-provider';
import { Footer } from '@/components/footer';
import { MuiProvider } from '@/components/mui-provider';
import { siteDescription } from '@/site';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: {
		default: 'estimation corgi',
		template: '%s | estimation corgi',
	},
	description: siteDescription,
	creator: 'stefanwintergerst.com',
	keywords: [
		'estimation',
		'task estimation',
		'project management',
		'corgi',
		'developer tools',
		'agile',
		'scrum',
		'planning',
	],
	authors: [
		{ name: 'stefanwintergerst.com', url: 'https://stefanwintergerst.com' },
	],
	applicationName: 'estimation corgi',
	category: 'Developer Tools',
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	openGraph: {
		type: 'website',
		siteName: 'estimation corgi',
		title: 'estimation corgi',
		description: siteDescription,
		url: 'https://estimation-corgi.com',
		locale: 'en_US',
		images: [
			{
				url: '/phatasscorgi.png',
				width: 500,
				height: 479,
				alt: 'estimation corgi mascot',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'estimation corgi',
		description: siteDescription,
		images: ['/phatasscorgi.png'],
	},
	metadataBase: new URL('https://estimation-corgi.com'),
	alternates: {
		canonical: '/',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<AppRouterCacheProvider>
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
									sx={{
										width: '100%',
										display: 'flex',
										justifyContent: 'center',
									}}
								>
									{children}
								</Box>
								<Footer />
							</Box>
							<AnalyticsConsentBanner />
							<Toaster
								position="bottom-center"
								theme="dark"
								toastOptions={{
									style: {
										background: '#1a1a2e',
										border: '1px solid rgba(255, 255, 255, 0.08)',
										color: '#f0f0f5',
									},
								}}
							/>
						</ConvexClientProvider>
					</MuiProvider>
				</AppRouterCacheProvider>
			</body>
		</html>
	);
}
