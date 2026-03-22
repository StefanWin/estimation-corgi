import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	messages: defineTable({
		message: v.string(),
		normalizedMessage: v.optional(v.string()),
		likes: v.optional(v.number()),
		isApproved: v.boolean(),
	})
		.index('by_is_approved', ['isApproved'])
		.index('by_normalized_message', ['normalizedMessage']),
});
