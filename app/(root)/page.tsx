"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from Next.js

const Main = () => {
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    // Redirect to login page when the component mounts
    router.replace('/login'); // Change '/login' to your actual login route if different
  }, [router]); // Run this effect once on mount

  return null; // Optionally return null since we are redirecting
};

export default Main;
