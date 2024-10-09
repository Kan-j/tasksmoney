"use client"; // To ensure this runs on the client-side

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getUserWallets } from "@/lib/actions/wallet.actions"; // Import the server action to get wallets
import { createWithdrawalRequest } from "@/lib/actions/withdrawalRequest.actions"; // Server action to create a withdrawal
import { useRouter } from "next/navigation";

const CreateWithdrawalRequest = () => {
  const [wallets, setWallets] = useState<any>([]);
  const [selectedWallet, setSelectedWallet] = useState<any>(null);
  const [amount, setAmount] = useState<string>("");
  const [userId, setUserId] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state for fetching wallets
  const [submitting, setSubmitting] = useState<boolean>(false); // Loading state for submitting withdrawal
  const router = useRouter();

  // Effect to fetch user's session and wallets
  useEffect(() => {
    const fetchSessionAndWallets = async () => {
      try {
        // Fetch the session from the session API
        const sessionRes = await fetch("/api/auth/session"); // Adjust this to your actual session route if different
        const sessionData = await sessionRes.json();
        const userIdFromSession = sessionData?.user?.id || null;

        setUserId(userIdFromSession);

        if (userIdFromSession) {
          // Fetch the user's wallets using the userId
          const userWallets = await getUserWallets(userIdFromSession);
          setWallets(userWallets.data); // Set the fetched wallets into the state
        }
      } catch (error) {
        console.error("Failed to fetch session or wallets", error);
      } finally {
        setLoading(false); // Data has been fetched, disable loading state
      }
    };

    fetchSessionAndWallets();
  }, []);

  const handleWalletSelect = (walletId: string) => {
    setSelectedWallet(walletId);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleSubmit = async () => {
    if (selectedWallet && amount) {
      setSubmitting(true); // Start submission loading
      try {
        // Create a withdrawal request using the server action
        await createWithdrawalRequest({
          walletId: selectedWallet,
          amount: parseFloat(amount),
          userId: userId, // Include the userId when submitting withdrawal
        });
        alert(`Withdrawal request submitted for ${amount} USDT from wallet ID: ${selectedWallet}`);
        router.push('/investor/dashboard/withdrawal')
      } catch (error) {
        console.error("Withdrawal request failed", error);
        alert("Failed to submit withdrawal request. Please try again later.");
      } finally {
        setSubmitting(false); // End submission loading
      }
    } else {
      alert("Please select a wallet and enter an amount.");
    }
  };

  if (loading) {
    return (
      <section className="flex flex-col items-center justify-center w-full h-full">
        <h3 className="text-gray-700">Loading your wallets...</h3>
      </section>
    );
  }

  return (
    <section className="flex flex-col w-full md:w-8/12 lg:w-6/12 mx-auto">
      <section className="flex flex-col mb-7">
        <section className="flex justify-between">
          <h1 className="text-2xl font-extrabold">Create Withdrawal Request</h1>
          <Link
            href="/investor/dashboard/withdrawal/binding"
            className="bg-orange-500 flex justify-center items-center h-fit text-white hover:bg-orange-600 px-4 py-2 rounded-md"
          >
            Create Wallet
          </Link>
        </section>
        <p className="mt-4 text-gray-500">
          To ensure a smooth withdrawal process, please provide accurate account details for binding. We currently support USDT, BTC, TRC20, ETH, and more. Inaccurate information may delay your withdrawals.
        </p>
      </section>

      {wallets.length > 0 ? (
        <section className="my-6">
          <h3 className="text-gray-700 text-lg font-semibold">Select a wallet for withdrawal:</h3>

          {/* Wallet List */}
          {wallets.map((wallet: { _id: string; exchangeName: string; address: string }) => (
            <div
              key={wallet._id}
              className={`flex justify-between p-4 my-2 border rounded-md ${
                selectedWallet === wallet._id ? "border-orange-500" : "border-gray-300"
              } cursor-pointer`}
              onClick={() => handleWalletSelect(wallet._id)}
            >
              <span className="text-lg">{wallet.exchangeName}</span>
              <span className="text-gray-500">{wallet.address}</span>
            </div>
          ))}

          {/* Amount Input */}
          <section className="my-4">
            <h3 className="mb-2 font-bold">Amount</h3>
            <input
              type="number"
              value={amount}
              onChange={handleAmountChange}
              placeholder="Enter amount"
              className="p-2 border rounded-md w-full"
            />
          </section>

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <Button
              className="bg-orange-500"
              onClick={handleSubmit}
              disabled={submitting} // Disable button during submission
            >
              {submitting ? "Submitting..." : "Submit Withdrawal"}
            </Button>
          </div>
        </section>
      ) : (
        // No Wallets Found
        <section className="flex flex-col items-center mt-6">
          <h3 className="text-gray-700">No wallets found. Please create a wallet to proceed.</h3>
          <Link href="/investor/dashboard/withdrawal/binding">
            <Button className="mt-4 bg-orange-500">Create Wallet</Button>
          </Link>
        </section>
      )}
    </section>
  );
};

export default CreateWithdrawalRequest;
