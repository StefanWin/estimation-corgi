export const getRandomNumber = (min: number, max: number): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const getRandomArrayElement = <T>(array: T[]): T | undefined => {
	if (array.length === 0) return undefined;
	const randomIndex = Math.floor(Math.random() * array.length);
	return array[randomIndex];
};
