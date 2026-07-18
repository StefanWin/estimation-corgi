'use client';

import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import type { ReactNode } from 'react';

const theme = createTheme({
	palette: {
		mode: 'dark',
		background: {
			default: '#0f0f1a',
			paper: '#1a1a2e',
		},
		text: {
			primary: '#f0f0f5',
			secondary: 'rgba(240, 240, 245, 0.72)',
		},
		primary: {
			main: '#8b7cf7',
			light: '#b8b0ff',
		},
		secondary: {
			main: '#ff7b4a',
		},
	},
	shape: {
		borderRadius: 12,
	},
	typography: {
		fontFamily: 'var(--font-geist-sans)',
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
		backgroundImage:
			'radial-gradient(circle at 50% -15%, rgba(139, 124, 247, 0.14), transparent 34rem)',
		backgroundColor: 'background.default',
		backgroundRepeat: 'no-repeat',
	},
	a: {
		color: 'inherit',
	},
};

export function MuiProvider({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<GlobalStyles styles={globalStyles} />
			{children}
		</ThemeProvider>
	);
}
