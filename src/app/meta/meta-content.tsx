'use client';

import { useQuery } from 'convex/react';
import NextImage from 'next/image';
import Link from 'next/link';
import { CORGI_IMAGES } from '@/constants';
import { api } from '../../../convex/_generated/api';
import styles from './meta.module.css';

export function MetaContent() {
	const messages = useQuery(api.messages.getApprovedMessages);
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
							{m.message}
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
