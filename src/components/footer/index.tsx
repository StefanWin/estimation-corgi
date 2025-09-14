import Link from 'next/link';
import type { FC } from 'react';
import styles from './footer.module.css';

export const Footer: FC = () => (
	<footer className={styles.footer}>
		<Link
			prefetch={false}
			href="http://theestimategoat.com/"
			target="_blank"
			rel="noopener noreferrer"
		>
			inspired by the Estimate Goat
		</Link>
		<Link
			prefetch={false}
			href="https://www.flaticon.com/free-icons/corgi"
			title="corgi icons"
			target="_blank"
			rel="noopener noreferrer"
		>
			Corgi icons created by AomAm - Flaticon
		</Link>
		<Link
			prefetch={false}
			href="https://swinte.dev"
			target="_blank"
			rel="noopener noreferrer"
		>
			made by swinte.dev
		</Link>
	</footer>
);
