import { defineSchema } from "convex/server";


export default defineSchema({
    users: defineTable({
         name: v.string(),
         tokenIdentifier: v.string(),
  })
})