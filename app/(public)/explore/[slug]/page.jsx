"use client"
import { api } from '@/convex/_generated/api'
import { useConvexQuery } from '@/hooks/use-convex-query'
import { CATEGORIES } from '@/lib/data'
import { parseLocationSlug } from '@/lib/location-utils'
import { Loader2 } from 'lucide-react'
import { notFound, useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { use } from 'react'

const DynamicExplorePage = () => {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug


  console.log(params);

  //check valid category
  const categoryInfo = CATEGORIES.find((cat) => cat.id === slug);
  const isCategory = !!categoryInfo;

  //validate location
  const { city, state, isValid } = !isCategory ? parseLocationSlug(slug) : { city: null, state: null, isValid: false };

  //if not valid category or location, redirect to explore page
  if (!isCategory && !isValid) {
    notFound()

  }

  // get events based on category or location
  const { data: events, isLoading } = useConvexQuery(
    isCategory ? api.events.getEventsByCategory : api.events.getEventsByLocation,
    isCategory ? { category: slug, limit: 50 }
      : city && state ? { city, state, limit: 50 }
        : "skip"
  );

  const handleEventClick = (eventSlug) => { 
    router.push(`/events/${eventSlug}`);
  }

  if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="animate-spin w-8 h-8 text-purple-500" />
            </div>
        );
    }

  return (
    <div>DynamicExplorePage</div>
  )
}

export default DynamicExplorePage