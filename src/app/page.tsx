import { preloadedQueryResult, preloadQuery } from 'convex/nextjs';
import { Link as NextLink } from '@/components/link';
import { MessageContainer } from '@/components/message-container';
import { CORGI_IMAGES, ESTIMATION_HOURS } from '@/constants';
import { getRandomIndex } from '@/util';
import { api } from '../../convex/_generated/api';
import styles from './page.module.css';

interface HomeProps {
	searchParams: Promise<{
		i?: string | string[];
		m?: string | string[];
		v?: string | string[];
	}>;
}

const getSearchParamValue = (value?: string | string[]) =>
	Array.isArray(value) ? value[0] : value;

const getIndexFromSearchParam = (value?: string | string[]) => {
	const normalizedValue = getSearchParamValue(value);

	if (normalizedValue === undefined) {
		return undefined;
	}

	const parsedValue = Number.parseInt(normalizedValue, 10);

	return Number.isNaN(parsedValue) ? undefined : parsedValue;
};

export default async function Home({ searchParams }: Readonly<HomeProps>) {
	const params = await searchParams;
	const preloadedMessages = await preloadQuery(
		api.messages.getApprovedMessages,
	);
	const approvedMessages = preloadedQueryResult(preloadedMessages);
	const imageIndex = getIndexFromSearchParam(params.i);
	const messageIndex = getIndexFromSearchParam(params.m);
	const valueIndex = getIndexFromSearchParam(params.v);

	return (
		<div className={styles.container}>
			<NextLink href={`/`} className={styles.titleLink}>
				<h1 className={styles.title}>estimation corgi</h1>
			</NextLink>
			<MessageContainer
				approvedMessages={preloadedMessages}
				initialEstimateState={{
					imageIndex: imageIndex ?? getRandomIndex(CORGI_IMAGES.length),
					messageIndex: messageIndex ?? getRandomIndex(approvedMessages.length),
					valueIndex: valueIndex ?? getRandomIndex(ESTIMATION_HOURS.length),
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
