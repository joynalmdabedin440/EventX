"use client"
import { api } from '@/convex/_generated/api'
import { useConvexQuery } from '@/hooks/use-convex-query'

import React from 'react'

const ExplorePage = () => {
    const { data:featuredEvents, isLoading:loadingFeatured } = useConvexQuery(api.events.getFeaturedEvents)
    
    
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Explore Events</h1>
      <p className="text-gray-400">Browse and discover amazing events</p>
    </div>
  )
}

export default ExplorePage
