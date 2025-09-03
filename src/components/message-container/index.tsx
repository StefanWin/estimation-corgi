'use client';
import { type Preloaded, usePreloadedQuery } from 'convex/react';
import Image from 'next/image';
import { type FC, useCallback, useEffect, useState } from 'react';
import { Message } from '@/components/message';
import { getRandomArrayElement } from '@/util';
import type { api } from '../../../convex/_generated/api';
import blepCorgi from '../../../public/blep-corgi.png';
import chillaxCorgi from '../../../public/ChillaxCorgi.png';
import cuteCorgi from '../../../public/cute-corgi.png';
import fatAssCorgi from '../../../public/phatasscorgi.png';
import runningCorgi from '../../../public/running-corgi.png';
import { Button } from '../button';
import styles from './message-container.module.css';

interface MessageContainerProps {
	approvedMessages: Preloaded<typeof api.messages.getApprovedMessages>;
}

const images = [fatAssCorgi, chillaxCorgi, runningCorgi, cuteCorgi, blepCorgi];

export const MessageContainer: FC<MessageContainerProps> = ({
	approvedMessages,
}) => {
	const messages = usePreloadedQuery(approvedMessages);
	const [image, setImage] = useState(getRandomArrayElement(images));

	const [message, setMessage] = useState(getRandomArrayElement(messages));

	const [isClient, setIsClient] = useState(false);

	const onNewMessage = useCallback(() => {
		setMessage((prev) => {
			return getRandomArrayElement(messages.filter((m) => m._id !== prev?._id));
		});
		setImage((prev) => {
			return getRandomArrayElement(
				images.filter((img) => img.src !== prev?.src),
			);
		});
	}, [messages]);

	useEffect(() => {
		setIsClient(true);
		console.log(`go away, you punk`);
	}, []);

	if (!image) {
		return null;
	}

	return (
		<>
			<Image
				suppressHydrationWarning
				className={styles.image}
				src={image}
				alt="corgi"
				loading="lazy"
				sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
			/>
			{isClient && message && (
				<>
					<Message message={message.message} />
					{message.suggestedBy && (
						<p className={styles.suggestedBy}>
							suggested by {message.suggestedBy}
						</p>
					)}
				</>
			)}
			<Button label={'get another estimate'} onClick={onNewMessage} />
		</>
	);
};
