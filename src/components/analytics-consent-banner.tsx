'use client';

import Button from '@mui/material/Button';
import MuiLink from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { usePostHog } from 'posthog-js/react';
import { useEffect, useState } from 'react';
import { Link } from '@/components/link';

export function AnalyticsConsentBanner() {
	const posthog = usePostHog();
	const [consentGiven, setConsentGiven] = useState('');

	useEffect(() => {
		setConsentGiven(posthog.get_explicit_consent_status());
	}, [posthog]);

	const handleAcceptCookies = () => {
		posthog.opt_in_capturing();
		setConsentGiven('granted');
	};

	const handleDeclineCookies = () => {
		posthog.opt_out_capturing();
		setConsentGiven('denied');
	};

	if (consentGiven !== 'pending') return null;

	return (
		<Paper
			component="aside"
			elevation={12}
			sx={{
				position: 'fixed',
				right: { xs: 1.5, sm: 2 },
				bottom: { xs: 1.5, sm: 2 },
				zIndex: 1000,
				width: {
					xs: 'calc(100vw - 1.5rem)',
					sm: 'min(30rem, calc(100vw - 2rem))',
				},
				display: 'grid',
				gap: 2,
				p: 2,
				backgroundImage:
					'linear-gradient(rgba(255, 123, 74, 0.08), rgba(255, 123, 74, 0.08))',
				border: '1px solid rgba(255, 255, 255, 0.08)',
				borderRadius: 2.5,
				backdropFilter: 'blur(14px)',
			}}
		>
			<Stack spacing={0.75}>
				<Typography sx={{ fontWeight: 700, lineHeight: 1.2 }}>
					Analytics preferences
				</Typography>
				<Typography
					variant="body2"
					color="text.secondary"
					sx={{ lineHeight: 1.45 }}
				>
					We use PostHog to measure page views and feature usage so we can
					improve the site. Read more in our{' '}
					<MuiLink
						component={Link}
						href="/privacy"
						sx={{ color: 'primary.main', fontWeight: 600 }}
					>
						privacy policy
					</MuiLink>
					.
				</Typography>
			</Stack>
			<Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
				<Button
					variant="outlined"
					fullWidth
					type="button"
					onClick={handleDeclineCookies}
				>
					decline
				</Button>
				<Button
					variant="contained"
					color="secondary"
					fullWidth
					type="button"
					onClick={handleAcceptCookies}
					sx={{ color: '#fff' }}
				>
					allow analytics
				</Button>
			</Stack>
		</Paper>
	);
}
