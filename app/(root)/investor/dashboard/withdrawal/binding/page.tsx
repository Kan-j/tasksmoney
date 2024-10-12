"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createWallet } from '@/lib/actions/wallet.actions'; // Import the createWallet action

const WithdrawalBinding = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [exchangeName, setExchangeName] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Fetch session to get the user's ID
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch('/api/auth/session'); // Replace with your actual session route
        const sessionData = await res.json();
        setUserId(sessionData?.user?.id || null);
      } catch (error) {
        console.error('Failed to fetch session', error);
      }
    };

    fetchSession();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure all fields are filled
    if (!exchangeName || !walletAddress) {
      alert('Please fill all the fields.');
      return;
    }

    // Ensure user is authenticated
    if (!userId) {
      alert('User not authenticated.');
      return;
    }

    setIsLoading(true); // Set loading to true

    try {
      // Call createWallet server action instead of making fetch request
      const walletResponse = await createWallet({
        userId,
        exchangeName,
        address: walletAddress,
      });

      if (walletResponse) {
        alert('Wallet bound successfully');
        router.push('/investor/dashboard/withdrawal/create'); // Navigate to the withdrawal creation page
      } else {
        alert('Failed to bind wallet. Please try again later.');
      }
    } catch (error) {
      console.error('Wallet binding failed:', error);
      alert('Failed to bind wallet. Please try again later.');
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <section className="flex flex-col md:w-10/12 lg:w-8/12">
      <section className="flex flex-col mb-7">
        <section className="flex justify-between">
          <h1 className="text-2xl font-extrabold">Withdraw Binding</h1>
          <Link
            href="/investor/dashboard/withdrawal/create"
            className="bg-gray-500 flex justify-center items-center h-fit text-white hover:bg-gray-600 px-4 py-2 rounded-md"
          >
            Back
          </Link>
        </section>
        <h3 className="text-gray-700 mt-4">
          To ensure a smooth withdrawal process, please provide accurate account details for binding. We currently support USDT, BTC, TRC20, ETH, and more. Inaccurate information may delay your withdrawals.
        </h3>
      </section>

      <form onSubmit={handleSubmit} className="my-8">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="">
            <h1 className="mb-2 text-sm font-bold">Exchange Name</h1>
            <Input
              placeholder="USDT"
              value={exchangeName}
              onChange={(e) => setExchangeName(e.target.value)}
              required
            />
          </div>
          <div className="">
            <h1 className="mb-2 text-sm font-bold">Wallet Address</h1>
            <Input
              placeholder="Eg. 123534356765689"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              required
            />
          </div>

          <div className="col-span-2 flex justify-center mt-4">
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600"
              disabled={isLoading}
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </section>
      </form>
    </section>
  );
};

export default WithdrawalBinding;
