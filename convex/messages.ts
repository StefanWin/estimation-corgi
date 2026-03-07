import { ConvexError, v } from 'convex/values';
import { mutation, query } from './_generated/server';

const MAX_MESSAGE_LENGTH = 72;

const normalizeMessage = (message: string) =>
	message.trim().replace(/\s+/g, ' ');

export const createMessage = mutation({
	args: {
		message: v.string(),
	},
	handler: async (ctx, args) => {
		const normalizedMessage = normalizeMessage(args.message);

		if (normalizedMessage.length === 0) {
			throw new ConvexError('message must not be empty');
		}

		if (normalizedMessage.length > MAX_MESSAGE_LENGTH) {
			throw new ConvexError(
				`message must be ${MAX_MESSAGE_LENGTH} characters or fewer`,
			);
		}

		const existingMessages = await ctx.db.query('messages').collect();
		const duplicateMessage = existingMessages.find(
			(existingMessage) =>
				normalizeMessage(existingMessage.message).toLowerCase() ===
				normalizedMessage.toLowerCase(),
		);

		if (duplicateMessage) {
			throw new ConvexError('that message already exists');
		}

		return ctx.db.insert('messages', {
			message: normalizedMessage,
			isApproved: false,
		});
	},
});

export const getApprovedMessages = query({
	args: {},
	handler: async (ctx) => {
		return ctx.db
			.query('messages')
			.withIndex('by_is_approved', (q) => q.eq('isApproved', true))
			.order('desc')
			.collect();
	},
});

export const getMessageStats = query({
	args: {},
	handler: async (ctx) => {
		const allMessages = await ctx.db.query('messages').collect();
		const approvedMessages = await ctx.db
			.query('messages')
			.withIndex('by_is_approved', (q) => q.eq('isApproved', true))
			.collect();

		return {
			approvedCount: approvedMessages.length,
			submissionCount: allMessages.length,
		};
	},
});
