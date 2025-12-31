import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	messages: defineTable({
		message: v.string(),
		isApproved: v.boolean(),
	}).index('by_is_approved', ['isApproved']),
});
