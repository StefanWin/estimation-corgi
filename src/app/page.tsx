import { preloadQuery } from 'convex/nextjs';
import NextLink from 'next/link';
import { connection } from 'next/server';
import { MessageContainer } from '@/components/message-container';
import { api } from '../../convex/_generated/api';
import styles from './page.module.css';

export default async function Home() {
	await connection();
	const preloadedMessages = await preloadQuery(
		api.messages.getApprovedMessages,
	);
	return (
		<div className={styles.container}>
			<NextLink href={`/`}>
				<h1>estimation corgi</h1>
			</NextLink>
			<MessageContainer approvedMessages={preloadedMessages} />
			<div className={styles.links}>
				<NextLink className={styles.link} href={'/suggest'}>
					suggest a message
				</NextLink>
				<NextLink className={styles.link} href={'/meta'}>
					show available messages &amp; images
				</NextLink>
			</div>
		</div>
	);
}
