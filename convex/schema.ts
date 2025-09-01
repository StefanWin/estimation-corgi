import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values";


export default defineSchema({
    messages: defineTable({
        message: v.string(),
        suggestedBy: v.optional(v.string()),
        isApproved: v.boolean(),
    })
})