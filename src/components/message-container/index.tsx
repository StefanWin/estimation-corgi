import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useMutation, useQuery } from 'convex/react';
import { Copy, LucideThumbsUp, Share2 } from 'lucide-react';
import { usePostHog } from 'posthog-js/react';
import { useCallback, useEffect, useState } from 'react';
import { Message } from '@/components/message';
import { useNotification } from '@/components/notification-provider';
import { CORGI_IMAGES, ESTIMATION_HOURS } from '@/constants';
import { getRandomIndex, getRandomIndexExcluding } from '@/util';
import { api } from '../../../convex/_generated/api';
import type { Id } from '../../../convex/_generated/dataModel';
import { Button } from '../button';

interface MessageContainerProps {
	initialEstimateState: InitialEstimateState;
}

export interface InitialEstimateState {
	imageIndex: number;
	messageId: string | null;
	task: string;
	valueIndex: number;
}

const MAX_TASK_LENGTH = 80;

const normalizeTask = (value: string) =>
	value.trim().replaceAll(/\s+/g, ' ').slice(0, MAX_TASK_LENGTH);

const formatEstimate = (task: string, displayValue: string, message: string) =>
	task
		? `${task}: ${displayValue} - ${message}`
		: `${displayValue} - ${message}`;

const isValidIndex = (length: number, index: number) =>
	index >= 0 && index < length;

const getInitialValueIndex = (index: number) =>
	isValidIndex(ESTIMATION_HOURS.length, index)
		? index
		: getRandomIndex(ESTIMATION_HOURS.length);

const getShareUrl = (
	origin: string,
	state: {
		imageIndex: number;
		messageId: Id<'messages'>;
		task: string;
		valueIndex: number;
	},
) => {
	const url = new URL(origin);
	url.searchParams.set('i', String(state.imageIndex));
	url.searchParams.set('m', state.messageId);
	url.searchParams.set('v', String(state.valueIndex));
	if (state.task) {
		url.searchParams.set('t', state.task);
	}
	return url.toString();
};

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
	initialEstimateState,
}: Readonly<MessageContainerProps>) {
	const posthog = usePostHog();
	const notify = useNotification();
	const messages = useQuery(api.messages.getApprovedMessages);
	const likeMessage = useMutation(api.messages.likeMessage);
	const [imageIndex, setImageIndex] = useState(() =>
		isValidIndex(CORGI_IMAGES.length, initialEstimateState.imageIndex)
			? initialEstimateState.imageIndex
			: getRandomIndex(CORGI_IMAGES.length),
	);
	const [nextImageIndex, setNextImageIndex] = useState(() =>
		getRandomIndexExcluding(CORGI_IMAGES.length, imageIndex),
	);
	const [messageId, setMessageId] = useState<Id<'messages'> | null>(null);
	const [valueIndex, setValueIndex] = useState(() =>
		getInitialValueIndex(initialEstimateState.valueIndex),
	);
	const [isImageLoaded, setIsImageLoaded] = useState(false);
	const [task, setTask] = useState(() =>
		initialEstimateState.task.slice(0, MAX_TASK_LENGTH),
	);

	const image = CORGI_IMAGES[imageIndex];
	const message = messages?.find((candidate) => candidate._id === messageId);
	const isEstimateLoading =
		messages === undefined || (messages.length > 0 && !message);
	const displayValue = `${ESTIMATION_HOURS[valueIndex]} hours`;
	const normalizedTask = normalizeTask(task);

	const onNewMessage = useCallback(() => {
		if (!messages || messages.length === 0) {
			return;
		}

		posthog.capture('new_message');
		setMessageId((previousId) => {
			const previousIndex = messages.findIndex(
				(candidate) => candidate._id === previousId,
			);
			const nextIndex =
				previousIndex < 0
					? getRandomIndex(messages.length)
					: getRandomIndexExcluding(messages.length, previousIndex);
			return messages[nextIndex]._id;
		});
		setImageIndex(nextImageIndex);
		setNextImageIndex(
			getRandomIndexExcluding(CORGI_IMAGES.length, nextImageIndex),
		);
		setValueIndex(getRandomIndex(ESTIMATION_HOURS.length));
		setIsImageLoaded(false);
	}, [messages, nextImageIndex, posthog]);

	const onCopyEstimate = useCallback(async () => {
		if (!message) {
			return;
		}

		posthog.capture('copy_estimate', { has_task: normalizedTask.length > 0 });

		try {
			await navigator.clipboard.writeText(
				formatEstimate(normalizedTask, displayValue, message.message),
			);
			notify('Estimate copied', 'success');
		} catch (error: unknown) {
			notify('Failed to copy estimate', 'error');
			posthog.captureException(error);
		}
	}, [displayValue, message, normalizedTask, posthog, notify]);

	const onShareEstimate = useCallback(async () => {
		if (!message) {
			return;
		}

		posthog.capture('share_estimate', { has_task: normalizedTask.length > 0 });

		const shareUrl = getShareUrl(globalThis.location.origin, {
			imageIndex,
			messageId: message._id,
			task: normalizedTask,
			valueIndex,
		});
		const shareData = {
			title: 'estimation corgi',
			text: formatEstimate(normalizedTask, displayValue, message.message),
			url: shareUrl,
		};

		try {
			if (navigator.share) {
				await navigator.share(shareData);
				notify('Estimate shared', 'success');
				return;
			}

			await navigator.clipboard.writeText(shareUrl);
			notify('Share link copied', 'success');
		} catch (error: unknown) {
			notify('Failed to share estimate', 'error');
			posthog.captureException(error);
		}
	}, [
		displayValue,
		imageIndex,
		message,
		normalizedTask,
		valueIndex,
		posthog,
		notify,
	]);

	const onMessageLiked = useCallback(async () => {
		if (!message) {
			return;
		}

		posthog.capture('message_liked');
		try {
			await likeMessage({ id: message._id });
			notify('Message liked', 'success');
		} catch (err: unknown) {
			notify('Failed to like message', 'error');
			posthog.captureException(err);
		}
	}, [likeMessage, message, posthog, notify]);

	useEffect(() => {
		if (messages === undefined) {
			return;
		}

		if (messages.length === 0) {
			setMessageId(null);
			return;
		}

		setMessageId((previousId) => {
			if (messages.some((candidate) => candidate._id === previousId)) {
				return previousId;
			}
			const sharedMessage = messages.find(
				(candidate) => candidate._id === initialEstimateState.messageId,
			);
			if (sharedMessage) {
				return sharedMessage._id;
			}
			return messages[getRandomIndex(messages.length)]._id;
		});
	}, [initialEstimateState.messageId, messages]);

	// Preload only the image the next reroll will show, once the current one is
	// on screen, so it never competes with the visible image.
	useEffect(() => {
		if (!isImageLoaded) {
			return;
		}

		const preloadImage = new globalThis.Image();
		preloadImage.src = CORGI_IMAGES[nextImageIndex].src;
	}, [isImageLoaded, nextImageIndex]);

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
				if (!message) {
					return;
				}

				event.preventDefault();
				onNewMessage();
			}
		};

		globalThis.addEventListener('keydown', handleKeyDown);
		return () => globalThis.removeEventListener('keydown', handleKeyDown);
	}, [message, onNewMessage]);

	if (!image) {
		return null;
	}

	return (
		<Box
			className="estimate-ticket"
			sx={{
				width: '100%',
				display: 'grid',
				gridTemplateColumns: 'minmax(0, 1fr) minmax(19rem, 1fr)',
				alignItems: 'center',
				py: 'clamp(1rem, 2vh, 1.5rem)',
				borderBlock: '1px solid var(--line)',
				'@media (max-width: 960px)': {
					gridTemplateColumns: '1fr',
					gap: 3,
				},
			}}
		>
			<Box
				className="portrait-panel"
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					minWidth: 0,
					minHeight: 0,
					pr: 'clamp(1.5rem, 4vw, 3.5rem)',
					'@media (max-width: 960px)': { pr: 0 },
				}}
			>
				<Box
					className="portrait-frame"
					sx={{
						position: 'relative',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						width: '100%',
						height: 'clamp(13rem, 31vh, 19rem)',
					}}
				>
					<Box className="portrait-label">
						MEET YOUR CONSULTANT <span>↘</span>
					</Box>
					{!isImageLoaded && (
						<Skeleton
							aria-label="Loading corgi image"
							variant="rounded"
							animation="wave"
							sx={{
								position: 'absolute',
								inset: 0,
								width: '100%',
								height: '100%',
								borderRadius: 0,
								bgcolor: 'var(--input)',
							}}
						/>
					)}
					<Box
						component="img"
						className="corgi-portrait"
						key={image.id}
						src={image.src}
						alt={image.alt}
						loading="eager"
						fetchPriority="high"
						decoding="async"
						onLoad={() => setIsImageLoaded(true)}
						sx={{
							objectFit: 'contain',
							maxWidth: '100%',
							maxHeight: '100%',
							borderRadius: 1.5,
							filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))',
							opacity: isImageLoaded ? 1 : 0,
							transition: 'opacity 0.15s ease',
						}}
					/>
					<Box className="portrait-stamp" aria-hidden="true">
						100%
						<br />
						CERTAIN
					</Box>
				</Box>
			</Box>
			<Stack
				className="estimate-panel"
				spacing={1.5}
				sx={{
					alignItems: 'center',
					minWidth: 0,
					pl: 'clamp(1.5rem, 4vw, 3.5rem)',
					borderLeft: '1px solid var(--line)',
					'@media (max-width: 960px)': {
						width: 'min(100%, 34rem)',
						justifySelf: 'center',
						pt: 3,
						pl: 0,
						borderLeft: 0,
						borderTop: '1px solid var(--line)',
					},
				}}
			>
				<Box className="ticket-heading">
					<span>OFFICIAL ESTIMATE</span>
					<span>NO. {String(valueIndex + 1).padStart(3, '0')}</span>
				</Box>
				<Box component="label" className="task-field">
					<span className="task-field-label">TASK</span>
					<input
						type="text"
						name="task"
						value={task}
						maxLength={MAX_TASK_LENGTH}
						placeholder="what are we estimating?"
						autoComplete="off"
						onChange={(event) => setTask(event.target.value)}
						onKeyDown={(event) => {
							if (event.key === 'Enter' && message) {
								event.preventDefault();
								onNewMessage();
							}
						}}
					/>
				</Box>
				<Stack
					className="estimate-result"
					aria-busy={isEstimateLoading}
					aria-label={isEstimateLoading ? 'Loading estimate' : undefined}
					sx={{ width: '100%', alignItems: 'center' }}
				>
					{isEstimateLoading ? (
						<EstimateSkeleton />
					) : message ? (
						<Message message={message.message} displayValue={displayValue} />
					) : (
						<Typography
							sx={{
								minHeight: '5.75rem',
								display: 'flex',
								alignItems: 'center',
							}}
						>
							No messages are available yet.
						</Typography>
					)}
				</Stack>
				<Box
					className="reroll-action"
					sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}
				>
					<Button disabled={!message} onClick={onNewMessage}>
						<span aria-hidden="true">↻</span> Get another estimate
					</Button>
				</Box>
				<Stack
					className="ticket-actions"
					direction="row"
					spacing={1.5}
					sx={{ justifyContent: 'center', width: '100%' }}
				>
					<IconButton
						type="button"
						disabled={!message}
						aria-label="Like message"
						title="Like message"
						onClick={() => {
							void onMessageLiked();
						}}
						sx={secondaryActionStyles}
					>
						<LucideThumbsUp size={18} strokeWidth={2.25} />
					</IconButton>
					<IconButton
						type="button"
						disabled={!message}
						aria-label="Copy estimate"
						title="Copy estimate"
						onClick={() => {
							void onCopyEstimate();
						}}
						sx={secondaryActionStyles}
					>
						<Copy size={18} strokeWidth={2.25} />
					</IconButton>
					<IconButton
						type="button"
						disabled={!message}
						aria-label="Share estimate"
						title="Share estimate"
						onClick={() => {
							void onShareEstimate();
						}}
						sx={secondaryActionStyles}
					>
						<Share2 size={18} strokeWidth={2.25} />
					</IconButton>
				</Stack>
				{isEstimateLoading ? (
					<Skeleton width="11rem" aria-label="Loading message likes" />
				) : (
					<Typography variant="body2" className="ticket-likes">
						{message?.likes
							? `${message.likes} likes`
							: 'be the first to like the message!'}
					</Typography>
				)}
			</Stack>
		</Box>
	);
}

function EstimateSkeleton() {
	return (
		<Stack sx={{ width: '100%', minHeight: '5.75rem', alignItems: 'center' }}>
			<Skeleton variant="text" animation="wave" width="8rem" height="2.75rem" />
			<Skeleton
				variant="text"
				animation="wave"
				width="min(80%, 22rem)"
				height="2.5rem"
			/>
		</Stack>
	);
}

const secondaryActionStyles = {
	width: '2.9rem',
	height: '2.9rem',
	border: '1px solid var(--line)',
	color: 'text.primary',
	transition:
		'transform 0.2s ease, background 0.2s ease, border-color 0.2s ease',
	'&:hover': {
		transform: 'translateY(-2px)',
		backgroundColor: 'var(--mustard)',
		borderColor: 'var(--ink)',
	},
};
