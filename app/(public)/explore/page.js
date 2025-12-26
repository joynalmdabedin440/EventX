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
    <div>
      <h1 className="text-4xl font-bold mb-8">Explore Events</h1>
      <p className="text-gray-400">Browse and discover amazing events</p>
    </div>
  )
}

export default ExplorePage
