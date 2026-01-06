import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import type React from 'react';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { ConvexClientProvider } from '@/components/convex-provider';
import { Footer } from '@/components/footer';
import { ThemeToggle } from '@/components/theme-toggle';
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
	creator: 'swinte.dev',
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
	authors: [{ name: 'swinte.dev', url: 'https://swinte.dev' }],
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
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable}`}>
				<ConvexClientProvider>
					<ThemeToggle />
					<div className={styles.page}>
						<main className={styles.main}>{children}</main>
						<Footer />
					</div>
				</ConvexClientProvider>
				<Analytics />
			</body>
		</html>
	);
}
