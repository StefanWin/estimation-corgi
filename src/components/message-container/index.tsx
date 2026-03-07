'use client';

import { type Preloaded, usePreloadedQuery } from 'convex/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
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

interface InitialEstimateState {
	imageIndex: number;
	messageIndex: number;
	unitId?: string;
	valueIndex: number;
}

interface MessageContainerProps {
	approvedMessages: Preloaded<typeof api.messages.getApprovedMessages>;
	initialEstimateState: InitialEstimateState;
}

type RotationState = {
	currentIndex: number;
	queue: number[];
};

type CopyFeedback = 'idle' | 'copied' | 'error';
type ShareFeedback = 'idle' | 'shared' | 'copied-link' | 'error';

const UNIT_STORAGE_KEY = 'estimation-unit';
const FEEDBACK_RESET_MS = 1800;

const getUnitById = (unitId?: string) =>
	ESTIMATION_UNITS.find((unit) => unit.id === unitId);

const isValidIndex = (length: number, index: number) =>
	index >= 0 && index < length;

const getInitialValueIndex = (length: number, index: number) =>
	isValidIndex(length, index) ? index : getRandomIndex(length);

const createRotationState = (
	length: number,
	initialIndex = getRandomIndex(length),
): RotationState => {
	const currentIndex = isValidIndex(length, initialIndex)
		? initialIndex
		: getRandomIndex(length);

	return {
		currentIndex,
		queue: createUpcomingIndexQueue(length, currentIndex),
	};
};

const isEditableTarget = (target: EventTarget | null) => {
	if (!(target instanceof HTMLElement)) {
		return false;
	}

	const tagName = target.tagName;

	return (
		target.isContentEditable ||
		tagName === 'BUTTON' ||
		tagName === 'INPUT' ||
		tagName === 'SELECT' ||
		tagName === 'TEXTAREA'
	);
};

const buildEstimateUrl = ({
	pathname,
	imageIndex,
	messageIndex,
	unitId,
	valueIndex,
}: {
	pathname: string;
	imageIndex: number;
	messageIndex: number;
	unitId: string;
	valueIndex: number;
}) => {
	const url = new URL(pathname, window.location.origin);
	url.searchParams.set('unit', unitId);
	url.searchParams.set('image', String(imageIndex));
	if (messageIndex >= 0) {
		url.searchParams.set('message', String(messageIndex));
	}
	url.searchParams.set('value', String(valueIndex));
	return url;
};

const CopyIcon = ({ feedback }: { feedback: CopyFeedback }) => {
	if (feedback === 'copied') {
		return (
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				aria-hidden="true"
				focusable="false"
			>
				<path d="M20 6 9 17l-5-5" />
			</svg>
		);
	}

	if (feedback === 'error') {
		return (
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				aria-hidden="true"
				focusable="false"
			>
				<path d="m15 9-6 6" />
				<path d="m9 9 6 6" />
			</svg>
		);
	}

	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			aria-hidden="true"
			focusable="false"
		>
			<rect x="9" y="9" width="11" height="11" rx="2" />
			<path d="M5 15V6a2 2 0 0 1 2-2h9" />
		</svg>
	);
};

const ShareIcon = ({ feedback }: { feedback: ShareFeedback }) => {
	if (feedback === 'shared' || feedback === 'copied-link') {
		return (
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				aria-hidden="true"
				focusable="false"
			>
				<path d="M20 6 9 17l-5-5" />
			</svg>
		);
	}

	if (feedback === 'error') {
		return (
			<svg
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				aria-hidden="true"
				focusable="false"
			>
				<path d="m15 9-6 6" />
				<path d="m9 9 6 6" />
			</svg>
		);
	}

	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			aria-hidden="true"
			focusable="false"
		>
			<circle cx="18" cy="5" r="3" />
			<circle cx="6" cy="12" r="3" />
			<circle cx="18" cy="19" r="3" />
			<path d="m8.6 13.5 6.8 4" />
			<path d="m15.4 6.5-6.8 4" />
		</svg>
	);
};

export const MessageContainer: FC<MessageContainerProps> = ({
	approvedMessages,
	initialEstimateState,
}) => {
	const pathname = usePathname();
	const messages = usePreloadedQuery(approvedMessages);
	const initialUnit =
		getUnitById(initialEstimateState.unitId) ?? ESTIMATION_UNITS[0];

	const [imageRotation, setImageRotation] = useState<RotationState>(() =>
		createRotationState(CORGI_IMAGES.length, initialEstimateState.imageIndex),
	);
	const [messageRotation, setMessageRotation] = useState<RotationState>(() =>
		createRotationState(messages.length, initialEstimateState.messageIndex),
	);
	const [hasMounted, setHasMounted] = useState(false);
	const [isImageLoaded, setIsImageLoaded] = useState(false);
	const [selectedUnit, setSelectedUnit] = useState(initialUnit);
	const [estimateValueIndex, setEstimateValueIndex] = useState(() =>
		getInitialValueIndex(
			initialUnit.values.length,
			initialEstimateState.valueIndex,
		),
	);
	const [copyFeedback, setCopyFeedback] = useState<CopyFeedback>('idle');
	const [shareFeedback, setShareFeedback] = useState<ShareFeedback>('idle');

	const image = CORGI_IMAGES[imageRotation.currentIndex];
	const message =
		messageRotation.currentIndex >= 0
			? messages[messageRotation.currentIndex]
			: undefined;
	const selectedValue = selectedUnit.values[estimateValueIndex];
	const displayValue = selectedUnit.suffix
		? `${selectedValue} ${selectedUnit.suffix}`
		: selectedValue;

	const selectUnit = useCallback((unitId: string) => {
		const unit = getUnitById(unitId);

		if (!unit) {
			return;
		}

		setSelectedUnit(unit);
		setEstimateValueIndex(getRandomIndex(unit.values.length));
		setCopyFeedback('idle');
		setShareFeedback('idle');
	}, []);

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
		setCopyFeedback('idle');
		setShareFeedback('idle');
	}, [messages.length, selectedUnit]);

	const copyEstimate = useCallback(async () => {
		if (!message) {
			return;
		}

		try {
			const url = buildEstimateUrl({
				pathname,
				imageIndex: imageRotation.currentIndex,
				messageIndex: messageRotation.currentIndex,
				unitId: selectedUnit.id,
				valueIndex: estimateValueIndex,
			});

			await navigator.clipboard.writeText(
				`estimation corgi says: ${displayValue} - ${message.message}\n${url.toString()}`,
			);
			setCopyFeedback('copied');
		} catch (_error) {
			setCopyFeedback('error');
		}
	}, [
		displayValue,
		estimateValueIndex,
		imageRotation.currentIndex,
		message,
		messageRotation.currentIndex,
		pathname,
		selectedUnit.id,
	]);

	const shareEstimate = useCallback(async () => {
		if (!message) {
			return;
		}

		const url = buildEstimateUrl({
			pathname,
			imageIndex: imageRotation.currentIndex,
			messageIndex: messageRotation.currentIndex,
			unitId: selectedUnit.id,
			valueIndex: estimateValueIndex,
		});
		const shareText = `${displayValue} - ${message.message}`;

		try {
			if (typeof navigator.share === 'function') {
				await navigator.share({
					title: 'estimation corgi',
					text: shareText,
					url: url.toString(),
				});
				setShareFeedback('shared');
				return;
			}

			await navigator.clipboard.writeText(url.toString());
			setShareFeedback('copied-link');
		} catch (error) {
			if (error instanceof DOMException && error.name === 'AbortError') {
				return;
			}

			setShareFeedback('error');
		}
	}, [
		displayValue,
		estimateValueIndex,
		imageRotation.currentIndex,
		message,
		messageRotation.currentIndex,
		pathname,
		selectedUnit.id,
	]);

	useEffect(() => {
		if (initialEstimateState.unitId) {
			setHasMounted(true);
			return;
		}

		const savedUnitId = localStorage.getItem(UNIT_STORAGE_KEY);
		const savedUnit = getUnitById(savedUnitId ?? undefined);

		if (savedUnit) {
			setSelectedUnit(savedUnit);
			setEstimateValueIndex(getRandomIndex(savedUnit.values.length));
		}

		setHasMounted(true);
	}, [initialEstimateState.unitId]);

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
				isValidIndex(messages.length, prevState.currentIndex) &&
				prevState.queue.length > 0
			) {
				return prevState;
			}

			return createRotationState(
				messages.length,
				initialEstimateState.messageIndex,
			);
		});
	}, [initialEstimateState.messageIndex, messages.length]);

	useEffect(() => {
		setEstimateValueIndex((prevIndex) =>
			getInitialValueIndex(selectedUnit.values.length, prevIndex),
		);
	}, [selectedUnit]);

	useEffect(() => {
		for (const corgiImage of CORGI_IMAGES) {
			const preloadImage = new window.Image();
			preloadImage.src = corgiImage.src.src;
		}
	}, []);

	useEffect(() => {
		if (!hasMounted) {
			return;
		}

		localStorage.setItem(UNIT_STORAGE_KEY, selectedUnit.id);
	}, [hasMounted, selectedUnit.id]);

	useEffect(() => {
		if (!hasMounted) {
			return;
		}

		const url = buildEstimateUrl({
			pathname,
			imageIndex: imageRotation.currentIndex,
			messageIndex: messageRotation.currentIndex,
			unitId: selectedUnit.id,
			valueIndex: estimateValueIndex,
		});

		window.history.replaceState(null, '', url.toString());
	}, [
		estimateValueIndex,
		hasMounted,
		imageRotation.currentIndex,
		messageRotation.currentIndex,
		pathname,
		selectedUnit.id,
	]);

	useEffect(() => {
		if (copyFeedback === 'idle') {
			return;
		}

		const timeoutId = window.setTimeout(() => {
			setCopyFeedback('idle');
		}, FEEDBACK_RESET_MS);

		return () => window.clearTimeout(timeoutId);
	}, [copyFeedback]);

	useEffect(() => {
		if (shareFeedback === 'idle') {
			return;
		}

		const timeoutId = window.setTimeout(() => {
			setShareFeedback('idle');
		}, FEEDBACK_RESET_MS);

		return () => window.clearTimeout(timeoutId);
	}, [shareFeedback]);

	useEffect(() => {
		if (!hasMounted) {
			return;
		}

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
				return;
			}

			const selectedUnitIndex = Number.parseInt(event.key, 10);

			if (
				Number.isInteger(selectedUnitIndex) &&
				selectedUnitIndex >= 1 &&
				selectedUnitIndex <= ESTIMATION_UNITS.length
			) {
				event.preventDefault();
				selectUnit(ESTIMATION_UNITS[selectedUnitIndex - 1].id);
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [hasMounted, onNewMessage, selectUnit]);

	if (!image || !hasMounted) {
		return null;
	}

	return (
		<>
			<div className={styles.controls}>
				<div className={styles.unitSelector}>
					<label htmlFor="unit-select">Estimation Unit:</label>
					<select
						id="unit-select"
						value={selectedUnit.id}
						onChange={(event) => selectUnit(event.target.value)}
						className={styles.select}
					>
						{ESTIMATION_UNITS.map((unit, index) => (
							<option key={unit.id} value={unit.id}>
								{index + 1}. {unit.name}
							</option>
						))}
					</select>
				</div>
			</div>
			<p className={styles.shortcutHint}>
				Space = next estimate, 1-5 = switch unit
			</p>
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
				<>
					<Message message={message.message} displayValue={displayValue} />
					<div className={styles.actions}>
						<button
							type="button"
							className={styles.actionButton}
							onClick={copyEstimate}
							aria-label={
								copyFeedback === 'copied'
									? 'Estimate copied'
									: copyFeedback === 'error'
										? 'Copy failed'
										: 'Copy estimate'
							}
							title={
								copyFeedback === 'copied'
									? 'Estimate copied'
									: copyFeedback === 'error'
										? 'Copy failed'
										: 'Copy estimate'
							}
						>
							<CopyIcon feedback={copyFeedback} />
						</button>
						<button
							type="button"
							className={styles.actionButton}
							onClick={shareEstimate}
							aria-label={
								shareFeedback === 'shared'
									? 'Estimate shared'
									: shareFeedback === 'copied-link'
										? 'Share link copied'
										: shareFeedback === 'error'
											? 'Share failed'
											: 'Share estimate'
							}
							title={
								shareFeedback === 'shared'
									? 'Estimate shared'
									: shareFeedback === 'copied-link'
										? 'Share link copied'
										: shareFeedback === 'error'
											? 'Share failed'
											: 'Share estimate'
							}
						>
							<ShareIcon feedback={shareFeedback} />
						</button>
					</div>
				</>
			)}
			<Button label={'get another estimate'} onClick={onNewMessage} />
		</>
	);
};
