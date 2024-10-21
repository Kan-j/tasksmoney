"use client"; // Indicate this component is a client component
import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import BalanceCard from './BalanceCard';
import { getUserProfile, updateUserBalance } from '@/lib/actions/user.actions';
 // Ensure the path is correct

const UserProfile = ({ userId }: any) => {
  const [balance, setBalance] = useState<number | null>(null); // State for user balance
  const [newBalance, setNewBalance] = useState<number | null>(null); // State for updated balance
  const [loading, setLoading] = useState(true); // Loading state for fetching user data
  const [error, setError] = useState<string | null>(null); // State for error messages

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      setError(null); // Reset error state
      try {
        const fetchedBalance = await getUserProfile(userId);
        setBalance(fetchedBalance);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleUpdateBalance = async () => {
    if (newBalance === null || newBalance < 0) {
      alert('Please enter a valid balance.');
      return;
    }
    
    try {
      const updatedBalance = await updateUserBalance(userId, newBalance);
      setBalance(updatedBalance); // Update the local balance state
      setNewBalance(null); // Reset the new balance input
    } catch (error: any) {
      setError(error.message);
    }
  };

  const formattedDate = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true, // 12-hour clock, or set to false for 24-hour clock
  });

  if (loading) {
    return <p>Loading user profile...</p>;
  }

  return (
    <section className="flex flex-col md:flex-row justify-between gap-6">
      <section className="">
        <BalanceCard title='Total Assets' amount={balance?.toString() || '0'} time={formattedDate} />
      </section>

      <section className="border  bg-white px-6 py-4 w-full md:w-7/12">
        <h1 className="font-extrabold mb-3 text-sm">Update Balance</h1>
        <section className="flex flex-col gap-4">
          <Input 
            type='number' 
            placeholder='Enter new balance'
            value={newBalance !== null ? newBalance : ''} 
            onChange={(e) => setNewBalance(Number(e.target.value))} 
          />
          <Button className='bg-mainColor' onClick={handleUpdateBalance}>Update Balance</Button>
        </section>
        {error && <p className="text-red-500 mt-2">{error}</p>} {/* Display error message */}
      </section>
    </section>
  );
};

export default UserProfile;
