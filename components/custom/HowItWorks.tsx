import React from 'react'
import { StepItem } from './StepItem'

const HowItWorks = () => {
  return (
    <section className='w-full bg-gray-100 pt-20 md:pt-2'>
          <h1 className="flex justify-center text-4xl font-bold">How it Works</h1>


          <section className="w-full mx-auto bg-gray-100 py-16 flex justify-center items-center">
            <div className="md:w-8/12 w-10/12 grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Step 1 */}
              <StepItem number={'1'} header="Create an account." detail="Create a free account and start your journey towards earning money." reverse={false}/>
              <StepItem number={'2'} header="Perform tasks." detail="Tasks are assigned to you where you for each task you get products to review." reverse={true}/>
              <StepItem number={'3'} header="Share Your Honest Opinion" detail="Submit detailed reviews based on your experience with the product." reverse={false}/>
              <StepItem number={'4'} header="Get Paid. 💰" detail="Earn money for each review and cash out easily anytime you want." reverse={true}/>
              
              {/* Step 2 */}
            
              {/* Step 3 */}
              
              {/* Step 4 */}

            </div>
          </section>


        </section>
  )
}

export default HowItWorks