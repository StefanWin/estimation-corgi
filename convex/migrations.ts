import { Migrations } from "@convex-dev/migrations";
import { components, internal} from "./_generated/api.js";
import {DataModel} from "./_generated/dataModel.js";

export const migrations = new Migrations<DataModel>(components.migrations);
export const run = migrations.runner();

export const runAll = migrations.runner([
    internal.migrations.removeSuggestedBy
]);

export const removeSuggestedBy = migrations.define({
    table: "messages",
    migrateOne: async (ctx, doc) => {
        if (doc.suggestedBy !== undefined) {
            await ctx.db.patch(doc._id, { suggestedBy: undefined });
        }
    },
});