import ReferralClientComponent from '@/components/custom/ReferralClientComponent'
import React from 'react'

const Referrals = () => {
  return (
    <section className="flex flex-col md:w-10/12 lg:w-8/12">
      <section className="flex flex-col mb-7">
        <section className="flex justify-between">
          <h1 className="text-2xl font-extrabold">Recharge Requests</h1>
          
        </section>
        <h3 className="text-gray-700 w-4/5 mt-3">
          Invite your friends and earn 20% on every successful signup through your referral link. Share your personalized link below and start earning rewards today!
        </h3>
      </section>

    <ReferralClientComponent/>

    </section>
  )
}

export default Referrals