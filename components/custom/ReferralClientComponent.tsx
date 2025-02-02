"use client"
import React, { useEffect, useState } from 'react'
import ReferralCodeAndLink from './ReferralCodeAndLink'
import ReferredUsers from './ReferredUsers'

const ReferralClientComponent = () => {

    const [userId, setUserId] = useState<string | null>(null); // Store userId
    const [loading, setLoading] = useState<boolean>(true); // Loading state
    const [error, setError] = useState<string | null>(null); // Error state
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true); // Start loading
          setError(null); // Reset any previous errors
  
          // Fetch user session from the server
          const sessionRes = await fetch("/api/auth/session");
  
          if (!sessionRes.ok) {
            throw new Error("Failed to fetch user session.");
          }
  
          const sessionData = await sessionRes.json();
          const id = sessionData?.user?.id || null;
  
          if (!id) {
            throw new Error("User ID not found.");
          }
  
          setUserId(id); // Set the userId to state
        } catch (error: any) {
          console.error('Error fetching user session:', error);
          setError(error.message || "An unknown error occurred.");
        } finally {
          setLoading(false); // Stop loading once fetching is done
        }
      };
  
      fetchData();
    }, []);


  return (
    <section className="flex flex-col">
        
      <section className="my-6">
        <ReferralCodeAndLink userId={userId}/>
      </section>

      <section className="my-6">
        <ReferredUsers userId={userId}/>
      </section>
    </section>
  )
}

export default ReferralClientComponent