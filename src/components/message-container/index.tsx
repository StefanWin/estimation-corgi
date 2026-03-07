'use client';

import { type Preloaded, usePreloadedQuery } from 'convex/react';
import Image from 'next/image';
import { type FC, useCallback, useEffect, useState } from 'react';
import { Message } from '@/components/message';
import { CORGI_IMAGES, ESTIMATION_UNITS } from '@/constants';
import {
	createUpcomingIndexQueue,
	getNextQueuedIndex,
	getRandomIndex,
} from '@/util';
import type { api } from '../../../convex/_generated/api';
import { Button } from '../button';
import styles from './message-container.module.css';

interface MessageContainerProps {
	approvedMessages: Preloaded<typeof api.messages.getApprovedMessages>;
	initialImageIndex: number;
	initialMessageIndex: number;
	initialEstimateValueIndex: number;
}

type RotationState = {
	currentIndex: number;
	queue: number[];
};

const createRotationState = (
	length: number,
	initialIndex = getRandomIndex(length),
): RotationState => {
	const currentIndex =
		initialIndex >= 0 && initialIndex < length
			? initialIndex
			: getRandomIndex(length);

	return {
		currentIndex,
		queue: createUpcomingIndexQueue(length, currentIndex),
	};
};

export const MessageContainer: FC<MessageContainerProps> = ({
	approvedMessages,
	initialImageIndex,
	initialMessageIndex,
	initialEstimateValueIndex,
}) => {
	const messages = usePreloadedQuery(approvedMessages);
	const [imageRotation, setImageRotation] = useState<RotationState>(() =>
		createRotationState(CORGI_IMAGES.length, initialImageIndex),
	);
	const [messageRotation, setMessageRotation] = useState<RotationState>(() =>
		createRotationState(messages.length, initialMessageIndex),
	);

	const [hasMounted, setHasMounted] = useState(false);
	const [isImageLoaded, setIsImageLoaded] = useState(false);
	const [selectedUnit, setSelectedUnit] = useState(ESTIMATION_UNITS[0]);
	const [estimateValueIndex, setEstimateValueIndex] = useState(
		initialEstimateValueIndex,
	);

	const image = CORGI_IMAGES[imageRotation.currentIndex];
	const message =
		messageRotation.currentIndex >= 0
			? messages[messageRotation.currentIndex]
			: undefined;
	const selectedValue = selectedUnit.values[estimateValueIndex];
	const displayValue = selectedUnit.suffix
		? `${selectedValue} ${selectedUnit.suffix}`
		: selectedValue;

	const onNewMessage = useCallback(() => {
		setMessageRotation((prevState) => {
			const { nextIndex, nextQueue } = getNextQueuedIndex(
				messages.length,
				prevState.currentIndex,
				prevState.queue,
			);

			return {
				currentIndex: nextIndex,
				queue: nextQueue,
			};
		});
		setEstimateValueIndex(getRandomIndex(selectedUnit.values.length));
		setIsImageLoaded(false);
		setImageRotation((prevState) => {
			const { nextIndex, nextQueue } = getNextQueuedIndex(
				CORGI_IMAGES.length,
				prevState.currentIndex,
				prevState.queue,
			);

			return {
				currentIndex: nextIndex,
				queue: nextQueue,
			};
		});
	}, [messages.length, selectedUnit.values.length]);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	useEffect(() => {
		if (messages.length === 0) {
			setMessageRotation({
				currentIndex: -1,
				queue: [],
			});
			return;
		}

		setMessageRotation((prevState) => {
			if (
				prevState.currentIndex >= 0 &&
				prevState.currentIndex < messages.length &&
				prevState.queue.length > 0
			) {
				return prevState;
			}

			return createRotationState(messages.length);
		});
	}, [messages]);

	useEffect(() => {
		setEstimateValueIndex((prevIndex) =>
			prevIndex >= 0 && prevIndex < selectedUnit.values.length
				? prevIndex
				: getRandomIndex(selectedUnit.values.length),
		);
	}, [selectedUnit]);

	useEffect(() => {
		for (const corgiImage of CORGI_IMAGES) {
			const preloadImage = new window.Image();
			preloadImage.src = corgiImage.src.src;
		}
	}, []);

	if (!image) {
		return null;
	}

	if (!hasMounted) {
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
						if (unit) {
							setSelectedUnit(unit);
							setEstimateValueIndex(getRandomIndex(unit.values.length));
						}
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
					key={image.id}
					suppressHydrationWarning
					className={`${styles.image} ${isImageLoaded ? styles.imageLoaded : ''}`}
					src={image.src}
					alt={image.alt}
					priority
					placeholder="blur"
					sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
					onLoad={() => {
						setIsImageLoaded(true);
					}}
				/>
			</div>
			{message && (
				<Message message={message.message} displayValue={displayValue} />
			)}
			<Button label={'get another estimate'} onClick={onNewMessage} />
		</>
	);
};
