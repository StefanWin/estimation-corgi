'use client';

import { useEffect, useState } from 'react';
import styles from './theme-toggle.module.css';

export const ThemeToggle = () => {
	const [theme, setTheme] = useState<'light' | 'dark'>('light');
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
		const prefersDark = globalThis.matchMedia(
			'(prefers-color-scheme: dark)',
		).matches;
		const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
		setTheme(initialTheme);
		document.documentElement.dataset.theme = initialTheme;
	}, []);

	const toggleTheme = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		localStorage.setItem('theme', newTheme);
		document.documentElement.dataset.theme = newTheme;
	};

	if (!mounted) {
		return (
			<button type="button" className={styles.toggle} aria-label="Toggle theme">
				<span className={styles.icon}>◐</span>
			</button>
		);
	}

	return (
		<button
			type="button"
			className={styles.toggle}
			onClick={toggleTheme}
			aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
		>
			<span className={styles.icon}>{theme === 'light' ? '☀️' : '🌙'}</span>
		</button>
	);
};
