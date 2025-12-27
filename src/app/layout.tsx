import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import type React from 'react';
import './globals.css';
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
	creator: 'swinte.dev',
	openGraph: {
		type: 'website',
		images: [
			{
				url: '/phatasscorgi.png',
				width: 500,
				height: 479,
			},
		],
	},
	twitter: {
		title: 'estimation corgi',
		description: 'properly estimate your tasks with the help of a corgi',
		images: ['/phatasscorgi.png'],
	},
	metadataBase: new URL('https://estimation-corgi.com'),
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
					<div className={styles.page}>
						<main className={styles.main}>{children}</main>
						<Footer />
					</div>
				</ConvexClientProvider>
			</body>
		</html>
	);
}
