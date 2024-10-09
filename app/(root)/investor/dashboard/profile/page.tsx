"use client"; // To ensure the page runs on the client side
import BalanceCard from '@/components/custom/BalanceCard';
import DepositHistoryItem from '@/components/custom/DepositHistoryItem';
import PromotionCarousel from '@/components/custom/PromotionalCarousel';
import React, { useState, useEffect } from 'react';
import { getUserFinancialSummary } from '@/lib/actions/user.actions'; // Assuming this is the action we created
import Link from 'next/link';

const Profile = () => {
  const [loading, setLoading] = useState(true); // Loading state
  const [financialSummary, setFinancialSummary] = useState<any>(null); // Holds financial data

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call the server action to get user financial summary
        const sessionRes = await fetch("/api/auth/session");
        const sessionData = await sessionRes.json();
        const userId = sessionData?.user?.id || null;

        if (userId) {
          const summary = await getUserFinancialSummary(userId);
          setFinancialSummary(summary); // Set the fetched financial summary data
        }
      } catch (error) {
        console.error("Error fetching financial summary:", error);
      } finally {
        setLoading(false); // Data has been fetched, disable loading state
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Display a loading message or spinner
  }

  if (!financialSummary) {
    return <p>No data available.</p>; // Display a message if no data was fetched
  }

  // Destructure data from financial summary
  const { totalAssets, totalCommissions, last10ApprovedRecharges, activePromotions } = financialSummary;

  return (
    <section className="flex flex-col md:w-10/12 lg:w-8/12">
      <section className="flex flex-col mb-7">
        <section className="flex justify-between">
          <h1 className="text-2xl font-extrabold">Profile</h1>
          <Link href="/investor/dashboard/withdrawal/create" className="bg-orange-500 flex justify-center items-center h-fit text-white hover:bg-orange-600 px-4 py-2 rounded-md">
            Withdraw
          </Link>
        </section>
        <h3 className="text-gray-700">Contact customer support to make a deposit</h3>
      </section>

      {/* Display total assets and commissions */}
      <section className="flex justify-between gap-6">
        <BalanceCard title='Total Assets' amount={totalAssets} time='2pm 21,09,2024'/>
        <BalanceCard title='Commissions' amount={totalCommissions} time='2pm 21,09,2024' isGreen={true}/>
      </section>

      {/* Display active promotions */}
      <section className="my-6">
        <PromotionCarousel promotions={activePromotions} />
      </section>

      {/* Display deposit history */}
      <section className="my-8">
        <section className="border px-9 py-6 bg-white rounded-lg">
          <h1 className="font-extrabold text-lg mb-6">Deposit History</h1>
          <article className="flex flex-col gap-6">
            {last10ApprovedRecharges.length > 0 ? (
              last10ApprovedRecharges.map((recharge:any) => (
                <DepositHistoryItem
                  key={recharge._id}
                  id={recharge._id}
                  amount={recharge.amount}
                  status={recharge.status}
                  createdAt={recharge.createdAt}
                />
              ))
            ) : (
              <p>No deposit history available</p>
            )}
          </article>
        </section>
      </section>
    </section>
  );
};

export default Profile;
