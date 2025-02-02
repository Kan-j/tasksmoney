"use client"
import React from 'react'
import { Rating } from 'react-simple-star-rating'

const StarsRatingComponent = ({rating}: {rating: number}) => {
  return (
    <section className='flex'>
        <Rating size={25} initialValue={rating} allowHover={false} readonly={true} allowFraction={true}/>
    </section>
    
  )
}

export default StarsRatingComponent