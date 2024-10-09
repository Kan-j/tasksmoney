"use client"
import BalanceCard from '@/components/custom/BalanceCard'
import React, { useEffect, useState } from 'react'
import UserTasksWorks from '@/components/custom/UserTasksWorks'



const Tasks = () => {
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

  if (loading) {
    // Show loading message while fetching userId
    return <div>Loading...</div>;
  }

  if (error) {
    // Render error message if there's an error
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!userId) {
    // In case userId is null after fetching, we can handle it accordingly
    return <div>No user ID found.</div>;
  }


  return (
    <>
    <UserTasksWorks userId={userId}/>
    </>
  )
}

export default Tasks

