import React from "react";
import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import styles from "./page.module.css";
import {Footer} from "@/components/footer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "estimation-corgi",
    description: "properly estimate your tasks",
    creator: "swinte.dev",
    openGraph: {
        type: "website",
        images: [{
            url: 'https://estimation-corgi.swinte.dev/phatasscorgi.png',
            width: 500,
            height: 479,
        }]
    },
    twitter: {
        title: "estimation corgi",
        description: "properly estimate your tasks",
        images: [
            'https://estimation-corgi.swinte.dev/phatasscorgi.png'
        ]
    },
    metadataBase: new URL('https://swinte.dev'),
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className={styles.page}>
            <main className={styles.main}>
                {children}
            </main>
            <Footer/>
        </div>
        </body>
        </html>
    );
}
