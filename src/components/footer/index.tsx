'use client';

import type { FC } from 'react';
import { Link } from '@/components/link';
import styles from './footer.module.css';

export const Footer: FC = () => {
	return (
		<footer className={styles.footer}>
			<Link
				prefetch={false}
				href="https://stefanwintergerst.com"
				target="_blank"
				rel="noopener noreferrer"
			>
				made by stefanwintergerst.com
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
