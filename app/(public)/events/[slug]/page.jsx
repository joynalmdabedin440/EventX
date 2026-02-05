"use client"
import { api } from '@/convex/_generated/api';
import { useConvexQuery } from '@/hooks/use-convex-query';
import { useUser } from '@clerk/nextjs';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'

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
    
    return (
        <div>EventPage</div>
    )
}

export default EventPage