import Image from 'next/image'
import React from 'react'

const SalaryList = () => {
  return (
    <section className='w-full'>
      <Image src="/assets/images/salaryList.png" className='w-full object-cover' alt="alt" width={500} height={600} />
    </section>
  )
}

export default SalaryList