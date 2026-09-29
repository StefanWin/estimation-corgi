export const MAX_MESSAGE_LENGTH = 72;

export const normalizeMessage = (message: string) =>
	message.normalize('NFKC').trim().replaceAll(/\s+/g, ' ');

export const normalizeMessageKey = (message: string) =>
	normalizeMessage(message).toLowerCase();
