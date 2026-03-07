export const getRandomNumber = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomArrayElement = <T>(array: T[]): T | undefined => {
	if (array.length === 0) return undefined;
	const randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
};

export const getRandomIndex = (length: number): number => {
	if (length <= 0) {
		return -1;
	}

	return Math.floor(Math.random() * length);
};

export const createUpcomingIndexQueue = (
	length: number,
	currentIndex: number,
): number[] => {
	if (length <= 1) {
		return [];
	}

	const queue = Array.from({ length }, (_, index) => index).filter(
		(index) => index !== currentIndex,
	);

	for (let index = queue.length - 1; index > 0; index -= 1) {
		const swapIndex = Math.floor(Math.random() * (index + 1));
		[queue[index], queue[swapIndex]] = [queue[swapIndex], queue[index]];
	}

	return queue;
};

export const getNextQueuedIndex = (
	length: number,
	currentIndex: number,
	queue: number[],
): { nextIndex: number; nextQueue: number[] } => {
	if (length <= 1) {
		return {
			nextIndex: currentIndex,
			nextQueue: [],
		};
	}

	const availableQueue =
		queue.length > 0
			? [...queue]
			: createUpcomingIndexQueue(length, currentIndex);
	const nextIndex = availableQueue.shift();

	if (nextIndex === undefined) {
		return {
			nextIndex: currentIndex,
			nextQueue: [],
		};
	}

	return {
		nextIndex,
		nextQueue:
			availableQueue.length > 0
				? availableQueue
				: createUpcomingIndexQueue(length, nextIndex),
	};
};
