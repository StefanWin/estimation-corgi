'use client';

import { type Preloaded, usePreloadedQuery } from 'convex/react';
import Image from 'next/image';
import { type FC, useCallback, useEffect, useState } from 'react';
import { Message } from '@/components/message';
import { CORGI_IMAGES, ESTIMATION_UNITS } from '@/constants';
import { getRandomArrayElement } from '@/util';
import type { api } from '../../../convex/_generated/api';
import { Button } from '../button';
import styles from './message-container.module.css';

interface MessageContainerProps {
	approvedMessages: Preloaded<typeof api.messages.getApprovedMessages>;
}

export const MessageContainer: FC<MessageContainerProps> = ({
	approvedMessages,
}) => {
	const messages = usePreloadedQuery(approvedMessages);
	const [image, setImage] = useState(getRandomArrayElement(CORGI_IMAGES));

	const [message, setMessage] = useState(getRandomArrayElement(messages));

	const [isClient, setIsClient] = useState(false);

	const [selectedUnit, setSelectedUnit] = useState(ESTIMATION_UNITS[0]);

	const onNewMessage = useCallback(() => {
		setMessage((prev) => {
			const newElement = getRandomArrayElement(
				messages.filter((m) => m._id !== prev?._id),
			);
			return newElement ?? prev;
		});
		setImage((prev) => {
			const newImage = getRandomArrayElement(
				CORGI_IMAGES.filter((img) => img.src.src !== prev?.src.src),
			);
			return newImage ?? prev;
		});
	}, [messages]);

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (!image) {
		return null;
	}

	return (
		<>
			<div className={styles.unitSelector}>
				<label htmlFor="unit-select">Estimation Unit:</label>
				<select
					id="unit-select"
					value={selectedUnit.id}
					onChange={(e) => {
						const unit = ESTIMATION_UNITS.find((u) => u.id === e.target.value);
						if (unit) setSelectedUnit(unit);
					}}
					className={styles.select}
				>
					{ESTIMATION_UNITS.map((unit) => (
						<option key={unit.id} value={unit.id}>
							{unit.name}
						</option>
					))}
				</select>
			</div>
			<div className={styles.imageWrapper}>
				<Image
					suppressHydrationWarning
					className={styles.image}
					src={image.src}
					alt={image.alt}
					loading="lazy"
					sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
				/>
			</div>
			{isClient && message && (
				<>
					<Message message={message.message} estimationUnit={selectedUnit} />
					<p className={styles.suggestedBy}>
						{message.suggestedBy ? `suggested by ${message.suggestedBy}` : '\u00A0'}
					</p>
				</>
			)}
			<Button label={'get another estimate'} onClick={onNewMessage} />
		</>
	);
};
