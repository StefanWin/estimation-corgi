'use client';

import { Turnstile } from '@marsidev/react-turnstile';
import { useMutation } from 'convex/react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import posthog from 'posthog-js';
import { Suspense, useState } from 'react';
import { verifyTurnstile } from '@/captcha';
import { Button } from '@/components/button';
import { env } from '@/env';
import { api } from '../../../convex/_generated/api';
import styles from './suggest.module.css';

function Suggest() {
	const router = useRouter();
	const createMessage = useMutation(api.messages.createMessage);

	const [input, setInput] = useState('');
	const [suggestedBy, setSuggestedBy] = useState('');
	const [error, setError] = useState<string | null>(null);
	const [isVerified, setIsVerified] = useState<boolean>(false);

	const turnStileKey = env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

	const onSubmit = async () => {
		try {
			await createMessage({
				message: input,
				suggestedBy: suggestedBy === '' ? undefined : suggestedBy,
			});
			setInput('');
			setSuggestedBy('');
			setError(null);
			setIsVerified(false);
			posthog.capture('new_suggestion');
			router.push('/');
		} catch (_error) {
			posthog.captureException(_error);
			console.error(_error);
			setError('failed to suggest a message');
		}
	};

	return (
		<div className={styles.container}>
			<NextLink href={`/`}>
				<h1>estimation corgi</h1>
			</NextLink>
			<div className={styles.form}>
				<input
					className={styles.input}
					type="text"
					name="message"
					placeholder="message (max 72 characters)"
					required
					onChange={(e) => setInput(e.target.value)}
				/>
				<input
					className={styles.input}
					type="text"
					name="suggestedBy"
					placeholder="your name (optional)"
					onChange={(e) => setSuggestedBy(e.target.value)}
				/>
				{turnStileKey && (
					<Turnstile
						siteKey={turnStileKey}
						onSuccess={(token) => {
							void verifyTurnstile(token)
								.then((_) => {
									setIsVerified(true);
								})
								.catch((_) => {
									setIsVerified(false);
									setError('failed to verify captcha');
								});
						}}
					/>
				)}
				{error && <p className={styles.error}>{error}</p>}
				{isVerified && (
					<Button type="button" label="suggest" onClick={onSubmit} />
				)}
			</div>
		</div>
	);
}

export default function SuggestPage() {
	return (
		<Suspense>
			<Suggest />
		</Suspense>
	);
}
