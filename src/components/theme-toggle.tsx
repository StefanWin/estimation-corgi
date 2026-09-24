import { Moon, Sun } from 'lucide-react';
import { useColorMode } from '@/components/mui-provider';

export function ThemeToggle() {
	const { mode, toggleMode } = useColorMode();
	const isDark = mode === 'dark';

	return (
		<button
			className="theme-toggle"
			type="button"
			onClick={toggleMode}
			aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
			aria-pressed={isDark}
		>
			{isDark ? (
				<Sun size={16} aria-hidden="true" />
			) : (
				<Moon size={16} aria-hidden="true" />
			)}
			<span>{isDark ? 'LIGHT MODE' : 'DARK MODE'}</span>
		</button>
	);
}
