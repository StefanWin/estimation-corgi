import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import type React from 'react';
import { Toaster } from 'sonner';
import './globals.css';
import { AnalyticsConsentBanner } from '@/components/analytics-consent-banner';
import { ConvexClientProvider } from '@/components/convex-provider';
import { Footer } from '@/components/footer';
import styles from './page.module.css';

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
	description: 'properly estimate your tasks with the help of a corgi',
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
		description: 'properly estimate your tasks with the help of a corgi',
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
		description: 'properly estimate your tasks with the help of a corgi',
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
		<html lang="en" data-theme="dark">
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<ConvexClientProvider>
					<div className={styles.page}>
						<main className={styles.main}>{children}</main>
						<Footer />
					</div>
					<AnalyticsConsentBanner />
					<Toaster
						position="bottom-center"
						theme="dark"
						toastOptions={{
							style: {
								background: 'var(--card-bg)',
								border: '1px solid var(--border-subtle)',
								color: 'var(--foreground)',
							},
						}}
					/>
				</ConvexClientProvider>
			</body>
		</html>
	);
}
