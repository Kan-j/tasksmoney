"use client"
import FAQSection from '@/components/custom/FAQSection';
import Footer from '@/components/custom/Footer';
import HowItWorks from '@/components/custom/HowItWorks';
import NavigationBar from '@/components/custom/NavigationBar';
import TestimonialSection from '@/components/custom/TestimonialSection';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

import { redirect, useRouter } from 'next/navigation';
import React from 'react'

const Home = () => {
   const router = useRouter()
  return(
    <section className='w-full mx-auto max-w-[1436px]'>
        <NavigationBar/>
        {/* <HeroSection/> */}
        <section className="w-full bg-gray-100 flex items-center justify-center pt-14  md:pb-0 mt-10 md:mt-0 md:pt-0">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl px-6 md:px-12 place-items-center">
            {/* Text Section */}
            <section className="flex items-center justify-center">
              <section className="flex flex-col items-center md:items-start text-center md:text-left">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Get Paid for Your Honest <span className="text-[#BD5D55]">Opinions!</span>
                </h1>
                <p className="mt-4 text-lg md:text-xl max-w-lg text-gray-600">
                  Join thousands of users who are earning extra cash by sharing their honest feedback on everyday products.
                </p>
                <Button className="w-fit mt-6 text-lg" onClick={()=>{router.push('/login')}}>Start Earning Now</Button>
              </section>
            </section>
            {/* Image Section */}
            <section className="flex items-center justify-center">
            <Image src="/assets/images/logo.png" className="object-cover" alt="alt" width={180} height={140} />
            </section>
          </section>
        </section>

        
      <HowItWorks/>
      
      <TestimonialSection/>

      <FAQSection/>

       <Footer/>





    </section>

  )
}

export default Home