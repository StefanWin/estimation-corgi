import { preloadedQueryResult, preloadQuery } from 'convex/nextjs';
import { Link as NextLink } from '@/components/link';
import { MessageContainer } from '@/components/message-container';
import { CORGI_IMAGES, ESTIMATION_HOURS } from '@/constants';
import { getRandomIndex } from '@/util';
import { api } from '../../convex/_generated/api';
import styles from './page.module.css';

export default async function Home() {
	const preloadedMessages = await preloadQuery(
		api.messages.getApprovedMessages,
	);
	const approvedMessages = preloadedQueryResult(preloadedMessages);

	return (
		<div className={styles.container}>
			<NextLink href={`/`} className={styles.titleLink}>
				<h1 className={styles.title}>estimation corgi</h1>
			</NextLink>
			<MessageContainer
				approvedMessages={preloadedMessages}
				initialEstimateState={{
					imageIndex: getRandomIndex(CORGI_IMAGES.length),
					messageIndex: getRandomIndex(approvedMessages.length),
					valueIndex: getRandomIndex(ESTIMATION_HOURS.length),
				}}
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
