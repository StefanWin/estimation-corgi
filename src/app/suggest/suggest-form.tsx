'use client';

import { Turnstile } from '@marsidev/react-turnstile';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import { usePostHog } from 'posthog-js/react';
import { type FormEvent, useState } from 'react';
import { verifyTurnstile } from '@/captcha';
import { Button } from '@/components/button';
import { Link as NextLink } from '@/components/link';
import { env } from '@/env';
import { api } from '../../../convex/_generated/api';
import styles from './suggest.module.css';

const MAX_MESSAGE_LENGTH = 72;

export function SuggestForm() {
	const router = useRouter();
	const posthog = usePostHog();
	const createMessage = useMutation(api.messages.createMessage);

	const [input, setInput] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isVerified, setIsVerified] = useState<boolean>(false);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const turnStileKey = env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
	const requiresCaptcha = Boolean(turnStileKey);
	const normalizedInput = input.trim().replaceAll(/\s+/g, ' ');
	const canSubmit =
		normalizedInput.length > 0 &&
		normalizedInput.length <= MAX_MESSAGE_LENGTH &&
		(!requiresCaptcha || isVerified) &&
		!isSubmitting;

	const handleCaptchaSuccess = async (token: string) => {
		try {
			const verification = await verifyTurnstile(token);
			setIsVerified(verification.success);
			setError(verification.success ? null : 'failed to verify captcha');
		} catch {
			setIsVerified(false);
			setError('failed to verify captcha');
		}
	};

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!canSubmit) {
			return;
		}

		setIsSubmitting(true);

		try {
			await createMessage({
				message: normalizedInput,
			});
			setInput('');
			setError(null);
			setIsVerified(false);
			posthog.capture('message_suggested');
			router.push('/');
		} catch (error) {
			console.error(error);
			setError(
				error instanceof Error ? error.message : 'failed to suggest a message',
			);
			posthog.captureException(error, {
				input,
				normalizedInput,
			});
		} finally {
			setIsSubmitting(false);
		}
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
							siteKey={turnStileKey ?? ''}
							onSuccess={handleCaptchaSuccess}
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
