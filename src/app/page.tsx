import { preloadedQueryResult, preloadQuery } from 'convex/nextjs';
import { connection } from 'next/server';
import { Link as NextLink } from '@/components/link';
import { MessageContainer } from '@/components/message-container';
import { CORGI_IMAGES, ESTIMATION_UNITS } from '@/constants';
import { getRandomIndex } from '@/util';
import { api } from '../../convex/_generated/api';
import styles from './page.module.css';

export default async function Home() {
	await connection();
	const preloadedMessages = await preloadQuery(
		api.messages.getApprovedMessages,
	);
	const approvedMessages = preloadedQueryResult(preloadedMessages);
	const initialImageIndex = getRandomIndex(CORGI_IMAGES.length);
	const initialMessageIndex = getRandomIndex(approvedMessages.length);
	const initialEstimateValueIndex = getRandomIndex(
		ESTIMATION_UNITS[0].values.length,
	);

	return (
		<div className={styles.container}>
			<NextLink href={`/`}>
				<h1>estimation corgi</h1>
			</NextLink>
			<MessageContainer
				approvedMessages={preloadedMessages}
				initialEstimateValueIndex={initialEstimateValueIndex}
				initialImageIndex={initialImageIndex}
				initialMessageIndex={initialMessageIndex}
			/>
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
