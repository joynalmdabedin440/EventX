"use client"
import { CATEGORIES } from '@/lib/data'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { use } from 'react'

const DynamicExplorePage = () => {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug


  console.log(params);

  //check valid category
  const categoryInfo = CATEGORIES.find((cat)=>cat.id === slug)
  


  return (
    <div>DynamicExplorePage</div>
  )
}

export default DynamicExplorePage