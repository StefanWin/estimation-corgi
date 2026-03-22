// noinspection JSUnusedGlobalSymbols

import { ConvexError, v } from 'convex/values';
import { z } from 'zod';
import { internal } from './_generated/api';
import type { Id } from './_generated/dataModel';
import { action, query } from './_generated/server';

const turnstileResponseSchema = z.object({
	success: z.boolean(),
});

const verifyTurnstileToken = async (token: string) => {
	const endpoint = process.env.CF_TURNSTILE_VERIFY_ENDPOINT;
	const secret = process.env.TURNSTILE_SECRET_KEY;

	if (!endpoint || !secret) {
		return;
	}

	const response = await fetch(endpoint, {
		method: 'POST',
		body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
		headers: {
			'content-type': 'application/x-www-form-urlencoded',
		},
	});

	if (!response.ok) {
		throw new ConvexError('failed to verify captcha');
	}

	const responseData = await response.json();
	const validation = turnstileResponseSchema.safeParse(responseData);

	if (!validation.success || !validation.data.success) {
		throw new ConvexError('failed to verify captcha');
	}
};

export const createMessage: ReturnType<typeof action> = action({
	args: {
		message: v.string(),
		turnstileToken: v.optional(v.string()),
	},
	handler: async (ctx, args): Promise<Id<'messages'>> => {
		const requiresCaptcha = Boolean(
			process.env.CF_TURNSTILE_VERIFY_ENDPOINT &&
				process.env.TURNSTILE_SECRET_KEY,
		);

		if (requiresCaptcha && !args.turnstileToken) {
			throw new ConvexError('captcha is required');
		}

		if (args.turnstileToken) {
			await verifyTurnstileToken(args.turnstileToken);
		}

		return ctx.runMutation(internal.message_submissions.createMessageInternal, {
			message: args.message,
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
