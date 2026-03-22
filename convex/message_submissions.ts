import { ConvexError, v } from 'convex/values';
import { internalMutation } from './_generated/server';
import { normalizeMessage, normalizeMessageKey } from './message_normalization';

const MAX_MESSAGE_LENGTH = 72;

export const createMessageInternal = internalMutation({
	args: {
		message: v.string(),
	},
	handler: async (ctx, args) => {
		const normalizedMessage = normalizeMessage(args.message);
		const normalizedMessageKey = normalizeMessageKey(args.message);

		if (normalizedMessage.length === 0) {
			throw new ConvexError('message must not be empty');
		}

		if (normalizedMessage.length > MAX_MESSAGE_LENGTH) {
			throw new ConvexError(
				`message must be ${MAX_MESSAGE_LENGTH} characters or fewer`,
			);
		}

		const duplicateMessage = await ctx.db
			.query('messages')
			.withIndex('by_normalized_message', (q) =>
				q.eq('normalizedMessage', normalizedMessageKey),
			)
			.first();

		if (duplicateMessage) {
			throw new ConvexError('that message already exists');
		}

		// Transitional fallback until older rows are backfilled with normalized keys.
		const legacyMessages = await ctx.db.query('messages').collect();
		const legacyMessage = legacyMessages.find(
			(message) =>
				message.normalizedMessage === undefined &&
				normalizeMessageKey(message.message) === normalizedMessageKey,
		);

		if (legacyMessage) {
			throw new ConvexError('that message already exists');
		}

		return ctx.db.insert('messages', {
			message: normalizedMessage,
			normalizedMessage: normalizedMessageKey,
			isApproved: false,
		});
	},
});
