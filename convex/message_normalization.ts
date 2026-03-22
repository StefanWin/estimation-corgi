export const normalizeMessage = (message: string) =>
	message.normalize('NFKC').trim().replaceAll(/\s+/g, ' ');

export const normalizeMessageKey = (message: string) =>
	normalizeMessage(message).toLowerCase();
