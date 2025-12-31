'use client';

import { Turnstile } from '@marsidev/react-turnstile';
import { useMutation } from 'convex/react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { verifyTurnstile } from '@/captcha';
import { Button } from '@/components/button';
import { env } from '@/env';
import { api } from '../../../convex/_generated/api';
import styles from './suggest.module.css';

export function SuggestForm() {
	const router = useRouter();
	const createMessage = useMutation(api.messages.createMessage);

	const [input, setInput] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isVerified, setIsVerified] = useState<boolean>(false);
	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

	const turnStileKey = env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

	const onSubmit = async () => {
		if (isSubmitting) return;
		setIsSubmitting(true);
		try {
			await createMessage({
				message: input,
			});
			setInput('');
			setError(null);
			setIsVerified(false);
			router.push('/');
		} catch (_error) {
			console.error(_error);
			setError('failed to suggest a message');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<div className={styles.container}>
			<NextLink href={`/`}>
				<h1>estimation corgi</h1>
			</NextLink>
			<div className={styles.form}>
				<div className={styles.inputGroup}>
					<input
						className={styles.input}
						type="text"
						name="message"
						placeholder="message (max 72 characters)"
						required
						onChange={(e) => setInput(e.target.value)}
					/>
				</div>
				{turnStileKey && (
					<div
						style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
					>
						<Turnstile
							siteKey={turnStileKey}
							onSuccess={(token) => {
								verifyTurnstile(token)
									.then((_) => {
										setIsVerified(true);
									})
									.catch((_) => {
										setIsVerified(false);
										setError('failed to verify captcha');
									});
							}}
						/>
					</div>
				)}
				{error && <p className={styles.error}>{error}</p>}
				<Button
					isDisabled={
						!isVerified ||
						input.length === 0 ||
						input.length > 72 ||
						isSubmitting
					}
					type="button"
					label={isSubmitting ? 'suggesting...' : 'suggest'}
					onClick={onSubmit}
				/>
			</div>
			<NextLink href="/" className={styles.backLink}>
				go back
			</NextLink>
		</div>
	);
}
