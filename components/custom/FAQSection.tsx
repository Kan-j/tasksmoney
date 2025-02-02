import React from 'react'
import FAQAccordion from './FaqSectionAccordion'
import { faqData } from '@/constants/faqData'

const FAQSection = () => {
  return (
    <section className='w-full bg-gray-100 pt-20 md:pt-2' id='faq'>
          <h1 className="flex justify-center text-4xl font-bold text-center">Frequently Asked Question</h1>
          <section className="w-full mx-auto bg-gray-100 py-16 flex justify-center items-center">
            <div className="md:w-8/12 w-10/12">
              <FAQAccordion faqData={faqData} />
            </div>
          </section>
        </section>
  )
}

export default FAQSection