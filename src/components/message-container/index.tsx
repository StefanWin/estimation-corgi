'use client';

import { type Preloaded, usePreloadedQuery } from 'convex/react';
import Image from 'next/image';
import { usePostHog } from 'posthog-js/react';
import { useCallback, useEffect, useState } from 'react';
import { Message } from '@/components/message';
import { CORGI_IMAGES, ESTIMATION_HOURS } from '@/constants';
import { getRandomIndex, getRandomIndexExcluding } from '@/util';
import type { api } from '../../../convex/_generated/api';
import { Button } from '../button';
import styles from './message-container.module.css';

interface MessageContainerProps {
	approvedMessages: Preloaded<typeof api.messages.getApprovedMessages>;
	initialEstimateState: InitialEstimateState;
}

export interface InitialEstimateState {
	imageIndex: number;
	messageIndex: number;
	valueIndex: number;
}

const isValidIndex = (length: number, index: number) =>
	index >= 0 && index < length;

const getInitialValueIndex = (index: number) =>
	isValidIndex(ESTIMATION_HOURS.length, index)
		? index
		: getRandomIndex(ESTIMATION_HOURS.length);

const isEditableTarget = (target: EventTarget | null) => {
	if (!(target instanceof HTMLElement)) {
		return false;
	}

	return (
		target.isContentEditable ||
		target.tagName === 'BUTTON' ||
		target.tagName === 'INPUT' ||
		target.tagName === 'SELECT' ||
		target.tagName === 'TEXTAREA'
	);
};

export function MessageContainer({
	approvedMessages,
	initialEstimateState,
}: Readonly<MessageContainerProps>) {
	const posthog = usePostHog();
	const messages = usePreloadedQuery(approvedMessages);
	const [imageIndex, setImageIndex] = useState(() =>
		isValidIndex(CORGI_IMAGES.length, initialEstimateState.imageIndex)
			? initialEstimateState.imageIndex
			: getRandomIndex(CORGI_IMAGES.length),
	);
	const [messageIndex, setMessageIndex] = useState(() =>
		isValidIndex(messages.length, initialEstimateState.messageIndex)
			? initialEstimateState.messageIndex
			: getRandomIndex(messages.length),
	);
	const [valueIndex, setValueIndex] = useState(() =>
		getInitialValueIndex(initialEstimateState.valueIndex),
	);
	const [isImageLoaded, setIsImageLoaded] = useState(false);

	const image = CORGI_IMAGES[imageIndex];
	const message = messageIndex >= 0 ? messages[messageIndex] : undefined;
	const displayValue = `${ESTIMATION_HOURS[valueIndex]} hours`;

	const onNewMessage = useCallback(() => {
		posthog.capture('new_message');
		setMessageIndex((previousIndex) =>
			getRandomIndexExcluding(messages.length, previousIndex),
		);
		setImageIndex((previousIndex) =>
			getRandomIndexExcluding(CORGI_IMAGES.length, previousIndex),
		);
		setValueIndex(getRandomIndex(ESTIMATION_HOURS.length));
		setIsImageLoaded(false);
	}, [messages.length, posthog]);

	useEffect(() => {
		if (messages.length === 0) {
			setMessageIndex(-1);
			return;
		}

		setMessageIndex((previousIndex) =>
			isValidIndex(messages.length, previousIndex)
				? previousIndex
				: isValidIndex(messages.length, initialEstimateState.messageIndex)
					? initialEstimateState.messageIndex
					: getRandomIndex(messages.length),
		);
	}, [initialEstimateState.messageIndex, messages.length]);

	useEffect(() => {
		for (const corgiImage of CORGI_IMAGES) {
			const preloadImage = new globalThis.Image();
			preloadImage.src = corgiImage.src.src;
		}
	}, []);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (
				event.metaKey ||
				event.ctrlKey ||
				event.altKey ||
				isEditableTarget(event.target)
			) {
				return;
			}

			if (event.code === 'Space') {
				event.preventDefault();
				onNewMessage();
			}
		};

		globalThis.addEventListener('keydown', handleKeyDown);
		return () => globalThis.removeEventListener('keydown', handleKeyDown);
	}, [onNewMessage]);

	if (!image) {
		return null;
	}

	return (
		<div className={styles.stage}>
			<div className={styles.visualPane}>
				<div className={styles.imageWrapper}>
					<Image
						key={image.id}
						suppressHydrationWarning
						className={`${styles.image} ${isImageLoaded ? styles.imageLoaded : ''}`}
						src={image.src}
						alt={image.alt}
						priority
						placeholder="blur"
						sizes="(max-width: 960px) 60vw, 34vw"
						onLoad={() => setIsImageLoaded(true)}
					/>
				</div>
			</div>
			<div className={styles.infoPane}>
				{message && (
					<div className={styles.messagePane}>
						<Message message={message.message} displayValue={displayValue} />
					</div>
				)}
				<div className={styles.primaryAction}>
					<Button onClick={onNewMessage}>get another estimate</Button>
				</div>
				<p className={styles.shortcutHint}>Space = next estimate</p>
			</div>
		</div>
	);
}
