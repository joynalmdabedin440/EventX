"use client"
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { api } from '@/convex/_generated/api';
import { useConvexQuery } from '@/hooks/use-convex-query';
import { getCategoryIcon, getCategoryLabel } from '@/lib/data';
import { useUser } from '@clerk/nextjs';
import { Calendar, Clock, Loader2 } from 'lucide-react';
import { notFound, useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';


// Utility function to darken a color
function darkenColor(color, amount) {
  const colorWithoutHash = color.replace("#", "");
  const num = parseInt(colorWithoutHash, 16);
  const r = Math.max(0, (num >> 16) - amount * 255);
  const g = Math.max(0, ((num >> 8) & 0x00ff) - amount * 255);
  const b = Math.max(0, (num & 0x0000ff) - amount * 255);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

const EventPage = () => {

    const params = useParams();
    const router = useRouter();
    const { user } = useUser();
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    // Fetch event details
    const { data: event, isLoading } = useConvexQuery(api.events.getEventBySlug, {
        slug: params.slug,
    });

    // Check if user is already registered
    const { data: registration } = useConvexQuery(
        api.registrations.checkRegistration,
        event?._id ? { eventId: event._id } : "skip"
    );

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
            </div>
        );
    }

    if (!event) {
        notFound();
    }

    return (
        <div
            style={{
                backgroundColor: event.themeColor || "#1e3a8a",
            }}
            className="min-h-screen py-8 -mt-6 md:-mt-16 lg:-mx-5"
        >
            {/* Ui */}
            <div className="max-w-7xl mx-auto px-8" >
                {/* title card */}
                <div className="mb-8">
                    <Badge variant="secondary" className="mb-3">
                        {getCategoryIcon(event.category)} {getCategoryLabel(event.category)}
                    </Badge>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            <span>{format(event.startDate, "EEEE, MMMM dd, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5" />
                            <span>
                                {format(event.startDate, "h:mm a")} -{" "}
                                {format(event.endDate, "h:mm a")}
                            </span>
                        </div>
                    </div>
                </div>


                {/* Hero Image */}
                {event.coverImage && (
                    <div className="relative h-[250px] md:h-[400px] rounded-2xl overflow-hidden mb-6 ">
                        <Image
                            src={event.coverImage}
                            alt={event.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}
            </div>

            {/* main content */}
            <div className="grid lg:grid-cols-[1fr_380px] gap-8">
                <div className="space-y-8">
                    {/* description */}
                    <Card
                        className={"pt-0"}
                        style={{
                            backgroundColor: event.themeColor
                                ? darkenColor(event.themeColor, 0.04)
                                : "#1e3a8a",
                        }}
                    >
                        <CardContent className="pt-6">
                            <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                            <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                                {event.description}
                            </p>
                        </CardContent>
                    </Card>


                    {/* location */}

                    {/* organizer info */}

                </div>

                {/* sidebar */}
                <div className="lg:sticky lg:top-24 h-fit">

                </div>
            </div>



            {/* register modal */}


        </div>
    )
}

export default EventPage