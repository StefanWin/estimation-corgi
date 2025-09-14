import { preloadQuery } from 'convex/nextjs';
import NextLink from 'next/link';
import { connection } from 'next/server';
import { MessageContainer } from '@/components/message-container';
import { api } from '../../convex/_generated/api';

const linkStyles = { marginBottom: '0.25rem' };

export default async function Home() {
	await connection();
	const preloadedMessages = await preloadQuery(
		api.messages.getApprovedMessages,
	);
	return (
		<>
			<NextLink href={`/`}>
				<h1>estimation corgi</h1>
			</NextLink>
			<MessageContainer approvedMessages={preloadedMessages} />
			<NextLink style={linkStyles} href={'/suggest'}>
				suggest a message
			</NextLink>
			<NextLink style={linkStyles} href={'/meta'}>
				show available messages &amp; images
			</NextLink>
		</>
	);
}
