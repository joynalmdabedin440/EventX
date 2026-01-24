"use client"
import { CATEGORIES } from '@/lib/data'
import { parseLocationSlug } from '@/lib/location-utils'
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
  if (!isCategory && !isValid) 
  {
    notFound()
    
  }
  


  return (
    <div>DynamicExplorePage</div>
  )
}

export default DynamicExplorePage