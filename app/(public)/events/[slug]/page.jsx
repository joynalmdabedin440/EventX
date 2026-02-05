"use client"
import { useUser } from '@clerk/nextjs';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'

const EventPage = () => {

    const params = useParams();
    const router = useRouter();
    const { user } = useUser();
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    return (
        <div>EventPage</div>
    )
}

export default EventPage