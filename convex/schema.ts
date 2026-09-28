import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	messages: defineTable({
		message: v.string(),
		normalizedMessage: v.string(),
		likes: v.optional(v.number()),
		isApproved: v.boolean(),
	})
		.index('by_is_approved', ['isApproved'])
		.index('by_normalized_message', ['normalizedMessage']),
	// One row per anonymous browser that liked a message, so a like only
	// counts once.
	likes: defineTable({
		messageId: v.id('messages'),
		clientId: v.string(),
	})
		.index('by_message_and_client', ['messageId', 'clientId'])
		.index('by_client', ['clientId']),
});
