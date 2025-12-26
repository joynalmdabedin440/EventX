"use client"
import { api } from '@/convex/_generated/api'
import { useConvexQuery } from '@/hooks/use-convex-query'

import React, { use } from 'react'

const ExplorePage = () => {
    //fetch current users
    const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);


    //fetch featured events
    const { data: featuredEvents, isLoading: loadingFeatured } = useConvexQuery(api.events.getFeaturedEvents, { limit: 3 });

    //fetch event by location

    const { data: localEvents, isLoading: loadingLocalEvents } = useConvexQuery(api.events.getEventsByLocation, { city: currentUser?.location?.city || 'Dhaka', state: currentUser?.location?.state || "Dhaka", limit: 4 });

    //get popular events
    const { data: popularEvents, isLoading: loadingPopular } = useConvexQuery(api.events.getPopularEvents, { limit: 6 });

    //category count
    const { data: categoryCounts } = useConvexQuery(api.events.getCategoryCounts);

    return (
        <>
            {/* Hero Title */}
            <div className="pb-12 text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-4">Discover Events</h1>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                    Explore featured events, find what&apos;s happening locally, or browse
                    events across Bangladesh
                </p>
            </div>

        </>
    )
}

export default ExplorePage
