import { usePathname } from 'next/navigation'
import React from 'react'

const ExploreLayout = () => {
    const pathname = usePathname();

  return (
      <div className='pb-16 min-h-screen'>
          <div className='max-w-7xl mx-auto px-6'>
              {/* back button */}
              
              
          </div>
    </div>
  )
}

export default ExploreLayout