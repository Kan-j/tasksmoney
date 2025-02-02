"use client"

import RechargeOptionsSelector from '@/components/custom/RechargeOptionsSelector'
import React, { useEffect, useState } from 'react';

const Recharge = () => {
  const [userId, setUserId] = useState<string | null>(null);

  // Fetch the user session and extract the userId
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch('/api/auth/session');
        const sessionData = await res.json();
        setUserId(sessionData?.user?.id || null);
      } catch (error) {
        console.error('Failed to fetch session', error);
      }
    };

    fetchSession();
  }, []);

  return (
    <section className="flex flex-col md:w-10/12 lg:w-8/12">
      <section className="my-8">
        <section>
          <h1 className="text-xl font-bold">Select Recharge Option</h1>
          <p className="mt-2 text-gray-700">
            Choose from our preset recharge amounts, or enter your own custom amount to top up your account!
          </p>
        </section>

        {/* Pass the userId to RechargeOptionsSelector */}
        <RechargeOptionsSelector userId={userId} />
      </section>
    </section>
  );
};

export default Recharge;
