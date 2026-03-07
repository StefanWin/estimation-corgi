'use client';

import { useQuery } from 'convex/react';
import NextImage from 'next/image';
import { useRef, useState } from 'react';
import { Link } from '@/components/link';
import { CORGI_IMAGES } from '@/constants';
import { api } from '../../../convex/_generated/api';
import styles from './meta.module.css';

export function MetaContent() {
	const messages = useQuery(api.messages.getApprovedMessages);
	const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
	const resetTimeoutRef = useRef<number | null>(null);

	const copyMessage = async (messageId: string, message: string) => {
		try {
			await navigator.clipboard.writeText(message);
			setCopiedMessageId(messageId);

			if (resetTimeoutRef.current) {
				window.clearTimeout(resetTimeoutRef.current);
			}

			resetTimeoutRef.current = window.setTimeout(() => {
				setCopiedMessageId(null);
			}, 1800);
		} catch (_error) {
			setCopiedMessageId(null);
		}
	};

	return (
		<div className={styles.container}>
			<Link href={`/`}>
				<h1>estimation corgi</h1>
			</Link>

			<section className={styles.section}>
				<h2 className={styles.header}>available messages:</h2>
				<ul className={styles.list}>
					{messages?.map((m) => (
						<li key={m._id} className={styles.listItem}>
							<button
								type="button"
								className={styles.copyButton}
								onClick={() => copyMessage(m._id, m.message)}
								aria-label={`Copy message: ${m.message}`}
							>
								<span className={styles.messageText}>{m.message}</span>
								<span className={styles.copyMeta} aria-hidden="true">
									<span className={styles.copyIcon}>
										<svg
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<title>Copy</title>
											<rect x="9" y="9" width="11" height="11" rx="2" />
											<path d="M5 15V6a2 2 0 0 1 2-2h9" />
										</svg>
									</span>
									<span className={styles.copyLabel}>
										{copiedMessageId === m._id ? 'copied' : 'copy'}
									</span>
								</span>
							</button>
						</li>
					))}
				</ul>
			</section>

			<section className={styles.section}>
				<h2 className={styles.header}>images:</h2>
				<div className={styles.grid}>
					{CORGI_IMAGES.map((img) => (
						<div key={img.id} className={styles.imageWrapper}>
							<NextImage
								src={img.src}
								style={{ objectFit: 'contain' }}
								alt={img.alt}
								width={200}
								height={200}
								priority
								sizes="200px"
							/>
							{img.attribution && (
								<Link
									className={styles.attribution}
									prefetch={false}
									href={img.attribution.href}
									target="_blank"
									title={img.attribution.name}
									rel="noopener noreferrer"
								>
									Image Attribution: {img.attribution.name}
								</Link>
							)}
						</div>
					))}

					<div className={styles.imageWrapper}>
						<div
							style={{
								width: 200,
								height: 200,
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
						>
							<span>🐶</span>
						</div>
						<Link
							className={styles.attribution}
							prefetch={false}
							href="https://www.flaticon.com/free-icons/corgi"
							title="corgi icons"
							target="_blank"
							rel="noopener noreferrer"
						>
							Corgi icons created by AomAm - Flaticon
						</Link>
					</div>
				</div>
			</section>

			<Link href="/" className={styles.backLink}>
				go back
			</Link>
		</div>
	);
}
