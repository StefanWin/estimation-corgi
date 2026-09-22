'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiLink from '@mui/material/Link';
import type { FC } from 'react';
import { useAnalyticsConsent } from '@/components/analytics-consent-provider';
import { Link } from '@/components/link';

const footerActionStyles = {
	minWidth: 0,
	p: 0,
	color: 'primary.light',
	fontSize: '0.85rem',
	textDecoration: 'none',
	'&:hover': { color: 'primary.main', textDecoration: 'none' },
};

export const Footer: FC = () => {
	const { consentStatus, setConsent } = useAnalyticsConsent();

	return (
		<Box
			component="footer"
			sx={{
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'center',
				gap: 2,
				mt: 0.5,
				pt: 1.5,
				borderTop: '1px solid rgba(255, 255, 255, 0.08)',
				width: '100%',
			}}
		>
			<MuiLink
				component={Link}
				prefetch={false}
				href="https://stefanwintergerst.com"
				target="_blank"
				rel="noopener noreferrer"
				sx={footerActionStyles}
			>
				made by stefanwintergerst.com
			</MuiLink>
			<MuiLink
				component={Link}
				prefetch={false}
				href="https://github.com/StefanWin/estimation-corgi"
				target="_blank"
				rel="noopener noreferrer"
				sx={footerActionStyles}
			>
				github
			</MuiLink>
			<MuiLink component={Link} href="/privacy" sx={footerActionStyles}>
				data privacy
			</MuiLink>
			<MuiLink
				href={`https://github.com/StefanWin/estimation-corgi/commit/${__COMMIT_SHA__}`}
				target="_blank"
				rel="noopener noreferrer"
				sx={footerActionStyles}
			>
				built {__BUILD_DATE__} · {__COMMIT_SHA__}
			</MuiLink>
			{consentStatus === 'granted' && (
				<Button
					sx={footerActionStyles}
					type="button"
					onClick={() => setConsent('denied')}
				>
					opt-out
				</Button>
			)}
			{consentStatus === 'denied' && (
				<Button
					sx={footerActionStyles}
					type="button"
					onClick={() => setConsent('granted')}
				>
					opt-in
				</Button>
			)}
		</Box>
	);
};
