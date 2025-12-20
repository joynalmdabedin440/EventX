import { query } from "./_generated/server";


export const getFeaturedEvents = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();

    const events = await ctx.db
      .query("events")
      .withIndex("by_start_time")

  }
})