"use client"
import { Badge } from '@/components/ui/badge'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { api } from '@/convex/_generated/api'
import { useConvexQuery } from '@/hooks/use-convex-query'
import Autoplay from 'embla-carousel-autoplay'
import { format } from 'date-fns'
import { Calendar, MapPin, Users } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


import React, { use } from 'react'
import { createLocationSlug } from '@/lib/location-utils'

const ExplorePage = () => {

    const router = useRouter();

    //Autoplay Carousel hook
    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )
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
    
    //handle event click
    const handleEventClick = (eventId) => {

        router.push(`/events/${eventId}`);

    }

    //
    const handleViewLocalEvents = () => {
        const city = currentUser?.location?.city || 'Dhaka';
        const state = currentUser?.location?.state || 'Dhaka';
        const slug= createLocationSlug(city, state);
        router.push(`/explore/${slug}`);
     }

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
            {/* Featured Carousel */}
            {
                featuredEvents && featuredEvents.length > 0 && (
                    <div className='mb-16'>
                        <div className="relative">
                            <Carousel className="w-full" plugins={[plugin.current]}
                                onMouseEnter={() => plugin.current.stop()}
                                onMouseLeave={() => plugin.current.reset()}
                            >
                                <CarouselContent>
                                    {featuredEvents.map((event) => (
                                        <CarouselItem key={event._id}>
                                            <div onClick={() => handleEventClick(event._id)}
                                                className='relative h-[400px] rounded-xl overflow-hidden cursor-pointer'>
                                            {
                                                event.coverImage ? (<Image src={event.coverImage} alt={event.title} fill className="object-cover" priority />) : (<div className='absolute inset-0' style={{ backgroundColor: event.themeColor }}>No Image</div>)
                                            }

                                            <div className='absolute inset-0 bg-linear-to-r from-black/60 to-black/30'>

                                            </div>
                                            <div className='relative h-full flex-col justify-end p-8 md:p-12'>
                                                <Badge className="w-fit mb-4" variant="secondary">
                                                    {event.city},{
                                                        event.state || event.country
                                                    }
                                                </Badge>
                                                <h2 className="text-3xl md:text-5xl font-bold mb-3 text-white">
                                                    {event.title}
                                                </h2>
                                                <p className="text-lg text-white/90 mb-4 max-w-2xl line-clamp-2">
                                                    {event.description}
                                                </p>
                                                <div className="flex items-center gap-4 text-white/80">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4" />
                                                        <span className="text-sm">
                                                            {format(event.startDate, "PPP")}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="w-4 h-4" />
                                                        <span className="text-sm">{event.city}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Users className="w-4 h-4" />
                                                        <span className="text-sm">
                                                            {event.registrationCount} registered
                                                        </span>
                                                    </div>
                                                </div>




                                            </div>

                                        </div>

                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2" />
                            <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2" />
                        </Carousel>
                        </div>
                    </div>
                )
            }

            {/* Featured Events Section */}

            {/* Local Events Section */}

            {/* Popular Events Section */}

            {/* Category Counts Section */}

        </>
    )
}

export default ExplorePage
