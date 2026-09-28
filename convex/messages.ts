// noinspection JSUnusedGlobalSymbols

import { HOUR, MINUTE, RateLimiter } from '@convex-dev/rate-limiter';
import { ConvexError, v } from 'convex/values';
import { z } from 'zod';
import { components, internal } from './_generated/api';
import type { Id } from './_generated/dataModel';
import { action, mutation, query } from './_generated/server';

const turnstileResponseSchema = z.object({
	success: z.boolean(),
});

const verifyTurnstileToken = async (token: string) => {
	const secret = process.env.TURNSTILE_SECRET_KEY;

	if (!secret) {
		throw new ConvexError('captcha is not configured');
	}

	const response = await fetch(
		'https://challenges.cloudflare.com/turnstile/v0/siteverify',
		{
			method: 'POST',
			body: `secret=${encodeURIComponent(secret)}&response=${encodeURIComponent(token)}`,
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
			},
		},
	);

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
		turnstileToken: v.string(),
	},
	handler: async (ctx, args): Promise<Id<'messages'>> => {
		if (!args.turnstileToken.trim()) {
			throw new ConvexError('captcha is required');
		}

		await verifyTurnstileToken(args.turnstileToken);

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

export const getApprovedMessage = query({
	args: { id: v.string() },
	handler: async (ctx, args) => {
		const id = ctx.db.normalizeId('messages', args.id);
		if (!id) {
			return null;
		}

		const message = await ctx.db.get(id);
		return message?.isApproved ? message.message : null;
	},
});

// Likes are anonymous, so a client id stored in the browser is all that
// identifies a liker. It stops repeat likes from one browser; the rate limits
// cap scripts that mint a fresh id per request.
const rateLimiter = new RateLimiter(components.rateLimiter, {
	likeByClient: { kind: 'token bucket', rate: 20, period: MINUTE, capacity: 5 },
	likeByMessage: {
		kind: 'token bucket',
		rate: 60,
		period: HOUR,
		capacity: 20,
	},
});

const CLIENT_ID_PATTERN =
	/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const assertClientId = (clientId: string) => {
	if (!CLIENT_ID_PATTERN.test(clientId)) {
		throw new ConvexError('invalid client id');
	}
};

export const getLikedMessageIds = query({
	args: { clientId: v.string() },
	handler: async (ctx, args) => {
		assertClientId(args.clientId);
		const likes = await ctx.db
			.query('likes')
			.withIndex('by_client', (q) => q.eq('clientId', args.clientId))
			.collect();
		return likes.map((like) => like.messageId);
	},
});

export const likeMessage = mutation({
	args: { id: v.id('messages'), clientId: v.string() },
	handler: async (
		ctx,
		args,
	): Promise<'liked' | 'already_liked' | 'rate_limited'> => {
		assertClientId(args.clientId);

		const message = await ctx.db.get(args.id);
		if (!message?.isApproved) {
			throw new ConvexError('message not found');
		}

		const existingLike = await ctx.db
			.query('likes')
			.withIndex('by_message_and_client', (q) =>
				q.eq('messageId', args.id).eq('clientId', args.clientId),
			)
			.first();
		if (existingLike) {
			return 'already_liked';
		}

		const byClient = await rateLimiter.limit(ctx, 'likeByClient', {
			key: args.clientId,
		});
		if (!byClient.ok) {
			return 'rate_limited';
		}
		const byMessage = await rateLimiter.limit(ctx, 'likeByMessage', {
			key: args.id,
		});
		if (!byMessage.ok) {
			return 'rate_limited';
		}

		await ctx.db.insert('likes', {
			messageId: args.id,
			clientId: args.clientId,
		});
		await ctx.db.patch('messages', args.id, {
			likes: (message.likes ?? 0) + 1,
		});
		return 'liked';
	},
});
