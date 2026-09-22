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
	valueIndex: number;
}

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
		valueIndex: number;
	},
) => {
	const url = new URL(origin);
	url.searchParams.set('i', String(state.imageIndex));
	url.searchParams.set('m', state.messageId);
	url.searchParams.set('v', String(state.valueIndex));
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
	const [messageId, setMessageId] = useState<Id<'messages'> | null>(null);
	const [valueIndex, setValueIndex] = useState(() =>
		getInitialValueIndex(initialEstimateState.valueIndex),
	);
	const [isImageLoaded, setIsImageLoaded] = useState(false);

	const image = CORGI_IMAGES[imageIndex];
	const message = messages?.find((candidate) => candidate._id === messageId);
	const isEstimateLoading =
		messages === undefined || (messages.length > 0 && !message);
	const displayValue = `${ESTIMATION_HOURS[valueIndex]} hours`;

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
		setImageIndex((previousIndex) =>
			getRandomIndexExcluding(CORGI_IMAGES.length, previousIndex),
		);
		setValueIndex(getRandomIndex(ESTIMATION_HOURS.length));
		setIsImageLoaded(false);
	}, [messages, posthog]);

	const onCopyEstimate = useCallback(async () => {
		if (!message) {
			return;
		}

		posthog.capture('copy_estimate');

		try {
			await navigator.clipboard.writeText(
				`${displayValue} - ${message.message}`,
			);
			notify('Estimate copied', 'success');
		} catch (error: unknown) {
			notify('Failed to copy estimate', 'error');
			posthog.captureException(error);
		}
	}, [displayValue, message, posthog, notify]);

	const onShareEstimate = useCallback(async () => {
		if (!message) {
			return;
		}

		posthog.capture('share_estimate');

		const shareUrl = getShareUrl(globalThis.location.origin, {
			imageIndex,
			messageId: message._id,
			valueIndex,
		});
		const shareData = {
			title: 'estimation corgi',
			text: `${displayValue} - ${message.message}`,
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
	}, [displayValue, imageIndex, message, valueIndex, posthog, notify]);

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

	useEffect(() => {
		for (const corgiImage of CORGI_IMAGES) {
			const preloadImage = new globalThis.Image();
			preloadImage.src = corgiImage.src;
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
			sx={{
				width: '100%',
				display: 'grid',
				gridTemplateColumns: 'minmax(0, 1fr) minmax(19rem, 1fr)',
				alignItems: 'center',
				py: 'clamp(1rem, 2vh, 1.5rem)',
				borderBlock: '1px solid rgba(255, 255, 255, 0.08)',
				'@media (max-width: 960px)': {
					gridTemplateColumns: '1fr',
					gap: 3,
				},
			}}
		>
			<Box
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
					sx={{
						position: 'relative',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						width: '100%',
						height: 'clamp(13rem, 31vh, 19rem)',
					}}
				>
					{!isImageLoaded && (
						<Skeleton
							aria-label="Loading corgi image"
							variant="rounded"
							animation="wave"
							sx={{
								position: 'absolute',
								width: 'min(100%, 19rem)',
								height: '100%',
								bgcolor: 'rgba(255, 255, 255, 0.06)',
							}}
						/>
					)}
					<Box
						component="img"
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
							transition: 'opacity 0.15s ease, transform 0.2s ease',
							'&:hover': { transform: 'scale(1.02)' },
						}}
					/>
				</Box>
			</Box>
			<Stack
				spacing={1.5}
				sx={{
					alignItems: 'center',
					minWidth: 0,
					pl: 'clamp(1.5rem, 4vw, 3.5rem)',
					borderLeft: '1px solid rgba(255, 255, 255, 0.08)',
					'@media (max-width: 960px)': {
						width: 'min(100%, 34rem)',
						justifySelf: 'center',
						pt: 3,
						pl: 0,
						borderLeft: 0,
						borderTop: '1px solid rgba(255, 255, 255, 0.08)',
					},
				}}
			>
				<Stack
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
				<Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
					<Button disabled={!message} onClick={onNewMessage}>
						get another estimate
					</Button>
				</Box>
				<Stack
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
					<Typography variant="body2">
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
	border: '1px solid rgba(255, 255, 255, 0.08)',
	color: 'text.primary',
	transition:
		'transform 0.2s ease, background 0.2s ease, border-color 0.2s ease',
	'&:hover': {
		transform: 'translateY(-2px)',
		backgroundColor: 'rgba(139, 124, 247, 0.14)',
		borderColor: 'rgba(139, 124, 247, 0.4)',
	},
};
