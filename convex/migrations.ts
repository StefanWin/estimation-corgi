// noinspection JSUnusedGlobalSymbols

import { Migrations } from '@convex-dev/migrations';
import { components, internal } from './_generated/api.js';
import type { DataModel } from './_generated/dataModel.js';
import { normalizeMessageKey } from './message_normalization.js';

export const migrations = new Migrations<DataModel>(components.migrations);
export const run = migrations.runner();

export const backfillNormalizedMessages = migrations.define({
	table: 'messages',
	migrateOne: (_ctx, message) => {
		const normalizedMessage = normalizeMessageKey(message.message);

		if (message.normalizedMessage === normalizedMessage) {
			return;
		}

		return {
			normalizedMessage,
		};
	},
});

export const backfillMessageLikes = migrations.define({
	table: 'messages',
	migrateOne: (_ctx, message) => {
		if (message.likes !== undefined) {
			return;
		}
		return {
			likes: 0,
		};
	},
});

// Likes before per-browser tracking can't be verified, so counts are rebuilt
// from the `likes` table. That discards the old counts and keeps any real
// likes made since the new schema was deployed.
export const recountLikes = migrations.define({
	table: 'messages',
	migrateOne: async (ctx, message) => {
		const likes = await ctx.db
			.query('likes')
			.withIndex('by_message_and_client', (q) => q.eq('messageId', message._id))
			.collect();

		if (message.likes === likes.length) {
			return;
		}
		return {
			likes: likes.length,
		};
	},
});

export const runAll = migrations.runner([
	internal.migrations.backfillNormalizedMessages,
	internal.migrations.backfillMessageLikes,
	internal.migrations.recountLikes,
]);
