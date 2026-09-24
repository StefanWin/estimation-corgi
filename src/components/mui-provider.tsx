'use client';

import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
	createContext,
	type ReactNode,
	useContext,
	useLayoutEffect,
	useMemo,
	useState,
} from 'react';

type ColorMode = 'light' | 'dark';

const ColorModeContext = createContext<{
	mode: ColorMode;
	toggleMode: () => void;
} | null>(null);

const getSavedMode = (): ColorMode => {
	try {
		return localStorage.getItem('estimation-corgi-theme') === 'dark'
			? 'dark'
			: 'light';
	} catch {
		return 'light';
	}
};

const makeTheme = (mode: ColorMode) =>
	createTheme({
		palette: {
			mode,
			background: {
				default: mode === 'dark' ? '#151716' : '#f4f0e6',
				paper: mode === 'dark' ? '#242524' : '#fffdf6',
			},
			text: {
				primary: mode === 'dark' ? '#efe9d9' : '#22201e',
				secondary: mode === 'dark' ? '#bcb2a2' : '#66615a',
			},
			primary: {
				main: mode === 'dark' ? '#ff8b60' : '#ad4628',
				light: mode === 'dark' ? '#ffae8c' : '#dc5f35',
			},
			secondary: {
				main: mode === 'dark' ? '#ff8b60' : '#ee693f',
			},
		},
		shape: {
			borderRadius: 4,
		},
		typography: {
			fontFamily: '"Geist Variable", Arial, sans-serif',
		},
		components: {
			MuiButton: {
				styleOverrides: {
					root: {
						fontWeight: 650,
						textTransform: 'none',
					},
				},
			},
		},
	});

const globalStyles = {
	html: {
		maxWidth: '100vw',
		overflowX: 'hidden',
	},
	body: {
		maxWidth: '100vw',
		overflowX: 'hidden',
		backgroundImage: 'radial-gradient(var(--line) 0.6px, transparent 0.6px)',
		backgroundSize: '18px 18px',
		backgroundColor: 'background.default',
		backgroundRepeat: 'repeat',
	},
	a: {
		color: 'inherit',
	},
};

export function MuiProvider({ children }: Readonly<{ children: ReactNode }>) {
	const [mode, setMode] = useState<ColorMode>(getSavedMode);
	const theme = useMemo(() => makeTheme(mode), [mode]);

	useLayoutEffect(() => {
		document.documentElement.dataset.theme = mode;
		document.documentElement.style.colorScheme = mode;
		try {
			localStorage.setItem('estimation-corgi-theme', mode);
		} catch {
			// The toggle still works when browser storage is unavailable.
		}
	}, [mode]);

	return (
		<ColorModeContext
			value={{
				mode,
				toggleMode: () =>
					setMode((current) => (current === 'light' ? 'dark' : 'light')),
			}}
		>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<GlobalStyles styles={globalStyles} />
				{children}
			</ThemeProvider>
		</ColorModeContext>
	);
}

export function useColorMode() {
	const colorMode = useContext(ColorModeContext);
	if (!colorMode)
		throw new Error('useColorMode must be used within MuiProvider');
	return colorMode;
}
