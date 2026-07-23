'use client';

import { Turnstile } from '@marsidev/react-turnstile';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useAction } from 'convex/react';
import { usePostHog } from 'posthog-js/react';
import { type SubmitEventHandler, useState } from 'react';
import { Button } from '@/components/button';
import { Link as NextLink } from '@/components/link';
import { env } from '@/env';
import { api } from '../../../convex/_generated/api';

const MAX_MESSAGE_LENGTH = 72;

export function SuggestForm() {
	const posthog = usePostHog();
	const createMessage = useAction(api.messages.createMessage);

	const [input, setInput] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
	const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
	const [captchaRenderKey, setCaptchaRenderKey] = useState(0);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const turnStileKey = env.VITE_TURNSTILE_SITE_KEY;
	const requiresCaptcha = Boolean(turnStileKey);
	const normalizedInput = input.trim().replaceAll(/\s+/g, ' ');
	const canSubmit =
		normalizedInput.length > 0 &&
		normalizedInput.length <= MAX_MESSAGE_LENGTH &&
		(!requiresCaptcha || Boolean(turnstileToken)) &&
		!isSubmitting;

	const resetCaptcha = () => {
		setTurnstileToken(null);
		setCaptchaRenderKey((currentValue) => currentValue + 1);
	};

	const handleCaptchaSuccess = (token: string) => {
		setTurnstileToken(token);
		setError(null);
	};

	const onSubmit: SubmitEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();

		if (!canSubmit) {
			return;
		}

		setIsSubmitting(true);

		createMessage({
			message: normalizedInput,
			turnstileToken: turnstileToken ?? undefined,
		})
			.then(() => {
				setInput('');
				setError(null);
				setIsSubmitted(true);
				posthog.capture('message_suggested');
			})
			.catch((error) => {
				console.error(error);
				setError(
					error instanceof Error
						? error.message
						: 'failed to suggest a message',
				);
				posthog.captureException(error, {
					input,
					normalizedInput,
				});
			})
			.finally(() => {
				if (requiresCaptcha) {
					resetCaptcha();
				}
				setIsSubmitting(false);
			});
	};

	if (isSubmitted) {
		return (
			<Stack sx={containerStyles}>
				<MuiLink component={NextLink} href="/" color="text.primary">
					<Typography component="h1" variant="h4" sx={{ fontWeight: 700 }}>
						estimation corgi
					</Typography>
				</MuiLink>
				<Box
					sx={{
						width: '100%',
						py: 2.5,
						borderBlock: '1px solid rgba(255, 123, 74, 0.3)',
						textAlign: 'center',
					}}
				>
					<Typography sx={{ fontSize: '1.1rem', fontWeight: 800, mb: 1 }}>
						message received
					</Typography>
					<Typography color="text.secondary">
						Thanks. Your suggestion is now waiting for approval.
					</Typography>
				</Box>
				<Stack
					direction={{ xs: 'column', sm: 'row' }}
					spacing={2}
					sx={{ alignItems: 'center' }}
				>
					<Button type="button" onClick={() => setIsSubmitted(false)}>
						suggest another
					</Button>
					<MuiLink component={NextLink} href="/" sx={backLinkStyles}>
						back home
					</MuiLink>
				</Stack>
			</Stack>
		);
	}

	return (
		<Stack sx={containerStyles}>
			<MuiLink component={NextLink} href="/" color="text.primary">
				<Typography component="h1" variant="h4" sx={{ fontWeight: 700 }}>
					estimation corgi
				</Typography>
			</MuiLink>
			<Stack
				component="form"
				spacing={3}
				sx={{ width: '100%' }}
				onSubmit={onSubmit}
			>
				<TextField
					variant="standard"
					fullWidth
					type="text"
					name="message"
					placeholder={`message (max ${MAX_MESSAGE_LENGTH} characters)`}
					required
					value={input}
					onChange={(e) => setInput(e.target.value)}
					slotProps={{ htmlInput: { maxLength: MAX_MESSAGE_LENGTH } }}
					sx={{ '& .MuiInputBase-input': { px: 2.5, py: 2 } }}
				/>
				<Typography
					variant="caption"
					color="text.secondary"
					sx={{ textAlign: 'right' }}
				>
					{normalizedInput.length}/{MAX_MESSAGE_LENGTH} characters
				</Typography>
				{requiresCaptcha && (
					<Box
						sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
					>
						<Turnstile
							key={captchaRenderKey}
							siteKey={turnStileKey ?? ''}
							onSuccess={handleCaptchaSuccess}
							onExpire={resetCaptcha}
							onError={() => {
								resetCaptcha();
								setError('failed to verify captcha');
							}}
						/>
					</Box>
				)}
				{error && <Alert severity="error">{error}</Alert>}
				<Button disabled={!canSubmit} type="submit">
					{isSubmitting ? 'suggesting...' : 'suggest'}
				</Button>
			</Stack>
			<MuiLink component={NextLink} href="/" sx={backLinkStyles}>
				go back
			</MuiLink>
		</Stack>
	);
}

const containerStyles = {
	alignItems: 'center',
	gap: 4.5,
	width: '100%',
	maxWidth: 560,
	py: 2,
};

const backLinkStyles = {
	py: 1,
	borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
	color: 'primary.light',
	fontWeight: 700,
	textDecoration: 'none',
	'&:hover': { color: '#ff9a70', borderColor: '#ff9a70' },
};
