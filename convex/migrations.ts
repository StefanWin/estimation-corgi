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

export const runAll = migrations.runner([
	internal.migrations.backfillNormalizedMessages,
]);
