"use client"
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import React from 'react'

const ExplorePage = () => {
    const data = useQuery(api.events.getFeaturedEvents)
    console.log(data);
    
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Explore Events</h1>
      <p className="text-gray-400">Browse and discover amazing events</p>
    </div>
  )
}

export default ExplorePage
