import { preloadedQueryResult, preloadQuery } from 'convex/nextjs';
import { connection } from 'next/server';
import { Link as NextLink } from '@/components/link';
import { MessageContainer } from '@/components/message-container';
import { CORGI_IMAGES, ESTIMATION_UNITS } from '@/constants';
import { getRandomIndex } from '@/util';
import { api } from '../../convex/_generated/api';
import styles from './page.module.css';

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

const getSingleSearchParam = (value: string | string[] | undefined) =>
	Array.isArray(value) ? value[0] : value;

const getInitialIndex = (
	value: string | string[] | undefined,
	length: number,
	fallbackIndex: number,
) => {
	const parsedValue = Number.parseInt(getSingleSearchParam(value) ?? '', 10);

	if (
		!Number.isInteger(parsedValue) ||
		parsedValue < 0 ||
		parsedValue >= length
	) {
		return fallbackIndex;
	}

	return parsedValue;
};

const getInitialUnitId = (value: string | string[] | undefined) => {
	const unitId = getSingleSearchParam(value);

	return ESTIMATION_UNITS.find((unit) => unit.id === unitId)?.id;
};

export default async function Home({
	searchParams,
}: {
	searchParams: SearchParams;
}) {
	await connection();
	const resolvedSearchParams = await searchParams;
	const preloadedMessages = await preloadQuery(
		api.messages.getApprovedMessages,
	);
	const preloadedStats = await preloadQuery(api.messages.getMessageStats);
	const approvedMessages = preloadedQueryResult(preloadedMessages);
	const messageStats = preloadedQueryResult(preloadedStats);
	const initialImageIndex = getRandomIndex(CORGI_IMAGES.length);
	const initialMessageIndex = getRandomIndex(approvedMessages.length);
	const requestedUnitId = getInitialUnitId(resolvedSearchParams.unit);
	const initialUnit =
		ESTIMATION_UNITS.find((unit) => unit.id === requestedUnitId) ??
		ESTIMATION_UNITS[0];
	const initialEstimateValueIndex = getRandomIndex(initialUnit.values.length);

	return (
		<div className={styles.container}>
			<NextLink href={`/`}>
				<h1>estimation corgi</h1>
			</NextLink>
			<MessageContainer
				approvedMessages={preloadedMessages}
				initialEstimateState={{
					imageIndex: getInitialIndex(
						resolvedSearchParams.image,
						CORGI_IMAGES.length,
						initialImageIndex,
					),
					messageIndex: getInitialIndex(
						resolvedSearchParams.message,
						approvedMessages.length,
						initialMessageIndex,
					),
					unitId: requestedUnitId,
					valueIndex: getInitialIndex(
						resolvedSearchParams.value,
						initialUnit.values.length,
						initialEstimateValueIndex,
					),
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
			<div className={styles.stats}>
				<div className={styles.statCard}>
					<span className={styles.statLabel}>approved messages</span>
					<strong className={styles.statValue}>
						{messageStats.approvedCount}
					</strong>
				</div>
				<div className={styles.statCard}>
					<span className={styles.statLabel}>community submissions</span>
					<strong className={styles.statValue}>
						{messageStats.submissionCount}
					</strong>
				</div>
			</div>
		</div>
	);
}
