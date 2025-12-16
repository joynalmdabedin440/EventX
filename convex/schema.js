import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { Venus } from "lucide-react";


export default defineSchema({
    users: defineTable({
        name: v.string(),
        tokenIdentifier: v.string(),
        email: v.string(),
        imageUrl: v.optional(v.string()),

        //onboarding fields
        hasCompletedOnboarding: v.boolean(),
        location: v.optional(
            v.object({
                city: v.string(),
                state: v.optional(v.string()),
                country: v.string(),
            })
        ),
        interests: v.optional(v.array(v.string())),
        //organizer tracking
        freeEventsCreated: v.number(),

        //timestamps
        createdAt: v.number(),
        updatedAt: v.number(),
    }).index("by_token", ["tokenIdentifier"]),
    
    events: defineTable({
        title: v.string(),
        description: v.string(),
        slug: v.string(),

        //organizer
        organizerId: v.id("users"),
        organizerName: v.string(),

        //date and time
        startTime: v.number(),
        endTime: v.number(),
        timezone: v.string(),

        //location
        locationType: v.union(v.literal("physical"), v.literal("online")),
        venue: v.optional(v.string()),
        address: v.optional(v.string()),
        city: v.string(),
        state: v.optional(v.string()),

        //capacity and tickets
        capacity: v.number(),
        ticketType: v.union(v.literal("free"), v.literal("paid")),
        ticketPrice: v.optional(v.number()),
        registrationCount: v.number(),

        //customization
        coverImage: v.optional(v.string()),
        themeColor: v.optional(v.string()),

        //timestamps
        createdAt: v.number(),
        updatedAt: v.number(),
    }).index("by_organizer", ["organizerId"]).index("by_category",["category"]).index("by_start_date",["startDate"]).index("by_slug", ["slug"]).searchIndex("search_title",{searchField:"title"}),

    registrations: defineTable({
        eventId: v.id("events"),
        userId: v.id("users"),
        
        //attendance status
        attendeeName: v.string(),
        attendeeEmail: v.string(),
        
        //qr code for entry
        qrCode: v.string(),

        //check-in 
        checkedIn: v.boolean(),
        checkedInAt: v.optional(v.number()),
        //status
        status: v.union(v.literal("confirmed"), v.literal("cancelled")),



    }).index("by_user", ["userId"]).index("by_event", ["eventId"]).index("by_event_user", ["eventId", "userId"]).index("by_qr_code", ["qrCode"]),


})