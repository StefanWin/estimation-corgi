export const getRandomIndex = (length: number): number => {
	if (length <= 0) {
		return -1;
	}

	return Math.floor(Math.random() * length);
};

export const getRandomIndexExcluding = (
	length: number,
	currentIndex: number,
): number => {
	if (length <= 1) {
		return currentIndex;
	}

	let nextIndex = getRandomIndex(length);

	while (nextIndex === currentIndex) {
		nextIndex = getRandomIndex(length);
	}

	return nextIndex;
};
