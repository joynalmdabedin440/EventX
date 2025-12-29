"use client"
import { Badge } from '@/components/ui/badge'

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { api } from '@/convex/_generated/api'
import { useConvexQuery } from '@/hooks/use-convex-query'
import Autoplay from 'embla-carousel-autoplay'
import { format } from 'date-fns'
import { ArrowRight, Calendar, Loader2, MapPin, Users } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'


import React, { use } from 'react'
import { createLocationSlug } from '@/lib/location-utils'
import { Button } from '@/components/ui/button'
import EventCard from '@/components/event-card'
import { CATEGORIES } from '@/lib/data'
import { Card, CardContent } from '@/components/ui/card'

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

    const { data: localEvents, isLoading: loadingLocalEvents } = useConvexQuery(api.events.getEventsByLocation, { city: currentUser?.location?.city || 'Gurgaon', state: currentUser?.location?.state || "Haryana", limit: 4 });

    console.log(localEvents);


    //get popular events
    const { data: popularEvents, isLoading: loadingPopular } = useConvexQuery(api.events.getPopularEvents, { limit: 6 });

    //category count
    const { data: categoryCounts } = useConvexQuery(api.events.getCategoryCounts);

    const categoriesWithCounts = CATEGORIES.map(cat => {
        return {
            ...cat,
            count: categoryCounts?.[cat.id] || 0,
        };
    })

    //handle event click
    const handleEventClick = (eventId) => {

        router.push(`/events/${eventId}`);

    }
    const handleCategoryClick = (categoryId) => {

        router.push(`/events/${categoryId}`);

    }

    // handle view local events
    const handleViewLocalEvents = () => {
        const city = currentUser?.location?.city || 'Gurgaon';
        const state = currentUser?.location?.state || 'Haryana';
        const slug = createLocationSlug(city, state);
        router.push(`/explore/${slug}`);
    }

    const isLoading = loadingFeatured || loadingLocalEvents || loadingPopular;

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="animate-spin w-8 h-8 text-purple-500" />
            </div>
        );
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



            {/* Local Events Section */}

            {localEvents && localEvents.length > 0 && (
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-3xl font-bold mb-1">Events Near You</h2>
                            <p className="text-muted-foreground">
                                Happening in {currentUser?.location?.city || "your area"}
                            </p>
                        </div>
                        <Button
                            variant="outline"
                            className="gap-2 text-purple-600 hover:bg-purple-50 cursor-pointer"
                            onClick={handleViewLocalEvents}
                        >
                            View All <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {localEvents.map((event) => (
                            <EventCard
                                key={event._id}
                                event={event}
                                variant="compact"
                                onClick={() => handleEventClick(event.slug)}
                            />
                        ))}
                    </div>
                </div>
            )}
            {/* Browse by category */}
            <div className='mb-16'>
                <h2 className='text-3xl font-bold mb-6'>Browse by Category</h2>
                <div className='grid grid-cols-2 md:grid-cols-4  gap-4'>
                    {categoriesWithCounts.map((category) => (
                        <Card key={category.id}
                            className="py-2 cursor-pointer hover:shadow-lg transition-all hover:border-purple-500"
                            onClick={() => handleCategoryClick(category.id)}
                        >
                            <CardContent className="flex sm:p-6 px-3 items-center gap-3">
                                <div className='text-3xl sm:text-4xl'>{category.icon}</div>

                                <div className='flex-1 min-w-0'>
                                    <h3 className='font-semibold text-lg mb-1 group-hover:text-purple-400 transition-colors'>{category.label}</h3>
                                    <p className='text-sm text-muted-foreground'>
                                        {category.count} Event
                                        {category.count === 1 ? '' : 's'}
                                    </p>
                                </div>

                            </CardContent>
                        </Card>
                    ))}

                </div>
            </div>

            {/* Featured Events Section */}

            {/* Popular Events Section */}
            {popularEvents && popularEvents.length > 0 && (
                <div className="mb-16">
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold mb-1">Popular Across India</h2>
                        <p className="text-muted-foreground">Trending events nationwide</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {popularEvents.map((event) => (
                            <EventCard
                                key={event._id}
                                event={event}
                                variant="list"
                                onClick={() => handleEventClick(event.slug)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Empty State */}
            {!loadingFeatured &&
                !loadingLocal &&
                !loadingPopular &&
                (!featuredEvents || featuredEvents.length === 0) &&
                (!localEvents || localEvents.length === 0) &&
                (!popularEvents || popularEvents.length === 0) && (
                    <Card className="p-12 text-center">
                        <div className="max-w-md mx-auto space-y-4">
                            <div className="text-6xl mb-4">🎉</div>
                            <h2 className="text-2xl font-bold">No events yet</h2>
                            <p className="text-muted-foreground">
                                Be the first to create an event in your area!
                            </p>
                            <Button asChild className="gap-2">
                                <a href="/create-event">Create Event</a>
                            </Button>
                        </div>
                    </Card>
                )}
            
           



        </>
    )
}

export default ExplorePage
