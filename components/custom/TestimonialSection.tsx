import React from 'react'
import TestimonialsList from './TestimonialList'

const TestimonialSection = () => {
  return (
    <section className='w-full bg-gray-100 pt-20 md:pt-2' id='testimonial'>
          <h1 className="flex justify-center text-4xl font-bold">Testimonials</h1>
          <section className="w-full mx-auto bg-gray-100 py-16 flex justify-center items-center">
            <div className="md:w-9/12 w-10/12">
              <TestimonialsList/>
            </div>
          </section>
        </section>
  )
}

export default TestimonialSection