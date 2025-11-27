import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <>
            <nav className='fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-xl z-20 border-b'>
                <div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between '>
                    {/* Logo */}
                    <Link href="/" className=' flex items-center'>
                        <Image
                            src="/event.png" alt="EventX Logo" width={500} height={500}
                            className="w-full h-40"
                            priority
                        />
                        {/* pro badge */}
                    </Link>

                    {/* Search and location desktop view */}
                    {/* Right side actions */}
                </div>
                {/* Mobile search and location -below header */}
            </nav>

            {/* Modals */}
        </>
    )
}

export default Header