'use client';

import Link from 'next/link';
import type { FC } from 'react';
import styles from './footer.module.css';

export const Footer: FC = () => {
	return (
		<footer className={styles.footer}>
			<Link
				prefetch={false}
				href="https://swinte.dev"
				target="_blank"
				rel="noopener noreferrer"
			>
				made by swinte.dev
			</Link>
			<Link
				prefetch={false}
				href="https://github.com/StefanWin/estimation-corgi"
				target="_blank"
				rel="noopener noreferrer"
			>
				github
			</Link>
			<Link href="/privacy">data privacy</Link>
		</footer>
	);
};
