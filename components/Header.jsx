"use client";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { Authenticated, Unauthenticated } from 'convex/react'
import { BarLoader } from 'react-spinners'
import { useStoreUserEffect } from '@/hooks/use-store-user';

const Header = () => {

    const { isLoading } = useStoreUserEffect();
    return (
        <>
            <nav className='fixed top-0 left-0 right-0 bg-black/50 border-b border-white/10 backdrop-blur-xl z-20 '>
                <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between '>
                    {/* Logo */}
                    <Link href="/" className=' flex items-center'>
                        <Image
                            src="/event.png" alt="EventX Logo" width={500} height={500}
                            className="w-full h-11"
                            priority
                        />
                        {/* pro badge */}
                    </Link>

                    {/* Search and location desktop view */}
                    {/* Right side actions */}
                    <div className='flex items-center'>
                        {/* Sign In / Sign Up buttons or User Profile */}
                        <Authenticated>
                            <UserButton />
                        </Authenticated>

                        <Unauthenticated>
                            <SignInButton>
                                <Button className="hover:cursor-pointer hover:bg-blue-600">Sign In</Button>

                            </SignInButton>
                            <SignUpButton>

                            </SignUpButton>
                        </Unauthenticated>

                    </div>
                </div>
                {/* Mobile search and location -below header */}

                {/* loader */}
                {
                    isLoading &&
                    (<div className="absolute bottom-0 left-0 w-full">
                        <BarLoader width={"100%"} color="#a855f7" />
                    </div>)

                }


            </nav>

            {/* Modals */}
        </>
    )
}

export default Header