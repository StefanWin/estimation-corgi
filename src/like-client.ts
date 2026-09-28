const CLIENT_ID_KEY = 'estimation-corgi-client-id';

let fallbackClientId: string | undefined;

/** The anonymous like id for this browser, if it has liked anything yet. */
export const readLikeClientId = () => {
	try {
		return localStorage.getItem(CLIENT_ID_KEY) ?? fallbackClientId ?? null;
	} catch {
		return fallbackClientId ?? null;
	}
};

/**
 * Creates the anonymous id on the first like. It only exists so a like counts
 * once per message. Falls back to a per-page-load id when storage is
 * unavailable.
 */
export const getOrCreateLikeClientId = () => {
	const existingId = readLikeClientId();
	if (existingId) {
		return existingId;
	}

	const clientId = crypto.randomUUID();
	try {
		localStorage.setItem(CLIENT_ID_KEY, clientId);
	} catch {
		fallbackClientId = clientId;
	}
	return clientId;
};
