import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

export const createMessage = mutation({
	args: {
		message: v.string(),
		suggestedBy: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		return ctx.db.insert('messages', {
			message: args.message,
			suggestedBy: args.suggestedBy,
			isApproved: false,
		});
	},
});

export const getApprovedMessages = query({
	args: {},
	handler: async (ctx) => {
		return ctx.db.query('messages').order('desc').collect();
	},
});
