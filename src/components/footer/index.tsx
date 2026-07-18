'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiLink from '@mui/material/Link';
import { usePostHog } from 'posthog-js/react';
import { type FC, useEffect, useState } from 'react';
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
	const posthog = usePostHog();
	const [consentStatus, setConsentStatus] = useState<
		ReturnType<typeof posthog.get_explicit_consent_status> | ''
	>('');
	useEffect(() => {
		setConsentStatus(posthog.get_explicit_consent_status());
	}, [posthog]);

	const onOptOut = () => {
		posthog.opt_out_capturing();
		globalThis.location.reload();
	};

	const onOptIn = () => {
		posthog.opt_in_capturing();
		globalThis.location.reload();
	};

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
			{consentStatus === 'granted' && (
				<Button sx={footerActionStyles} type="button" onClick={onOptOut}>
					opt-out
				</Button>
			)}
			{consentStatus === 'denied' && (
				<Button sx={footerActionStyles} type="button" onClick={onOptIn}>
					opt-in
				</Button>
			)}
		</Box>
	);
};
