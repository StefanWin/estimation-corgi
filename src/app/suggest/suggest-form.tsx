'use client';

import { Turnstile } from '@marsidev/react-turnstile';
import { useAction } from 'convex/react';
import { useRouter } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';
import { type SubmitEventHandler, useState } from 'react';
import { Button } from '@/components/button';
import { Link as NextLink } from '@/components/link';
import { env } from '@/env';
import { api } from '../../../convex/_generated/api';
import styles from './suggest.module.css';

const MAX_MESSAGE_LENGTH = 72;

export function SuggestForm() {
	const router = useRouter();
	const posthog = usePostHog();
	const createMessage = useAction(api.messages.createMessage);

	const [input, setInput] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
	const [captchaRenderKey, setCaptchaRenderKey] = useState(0);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const turnStileKey = env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
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
				posthog.capture('message_suggested');
				router.push('/');
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

	return (
		<div className={styles.container}>
			<NextLink href={`/`}>
				<h1>estimation corgi</h1>
			</NextLink>
			<form className={styles.form} onSubmit={onSubmit}>
				<div className={styles.inputGroup}>
					<input
						className={styles.input}
						type="text"
						name="message"
						placeholder={`message (max ${MAX_MESSAGE_LENGTH} characters)`}
						required
						maxLength={MAX_MESSAGE_LENGTH}
						value={input}
						onChange={(e) => setInput(e.target.value)}
					/>
				</div>
				<p className={styles.helperText}>
					{normalizedInput.length}/{MAX_MESSAGE_LENGTH} characters
				</p>
				{requiresCaptcha && (
					<div className={styles.captcha}>
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
					</div>
				)}
				{error && <p className={styles.error}>{error}</p>}
				<Button disabled={!canSubmit} type="submit">
					{isSubmitting ? 'suggesting...' : 'suggest'}
				</Button>
			</form>
			<NextLink href="/" className={styles.backLink}>
				go back
			</NextLink>
		</div>
	);
}
