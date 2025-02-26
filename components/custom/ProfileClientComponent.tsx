"use client"; // Ensure the page runs on the client side
import BalanceCard from '@/components/custom/BalanceCard';
import DepositHistoryItem from '@/components/custom/DepositHistoryItem';
import PromotionCarousel from '@/components/custom/PromotionalCarousel';
import React, { useState, useEffect } from 'react';
import { getUserFinancialSummary } from '@/lib/actions/user.actions';
import { fetchCustomerService } from '@/lib/actions/customerService.actions'; // Assuming this is the server action for customer service
import Link from 'next/link';
import { FaTelegram, FaWhatsapp } from 'react-icons/fa6';
import { getNegativeBalance } from '@/lib/actions/usertasks.action';

const Profile = () => {
  const [loading, setLoading] = useState(true); // Loading state
  const [financialSummary, setFinancialSummary] = useState<any>(null); // Holds financial data
  const [showCustomerService, setShowCustomerService] = useState(false); // For showing customer service options
  const [customerServiceData, setCustomerServiceData] = useState<any>(null); // Holds customer service data
  const [fetchError, setFetchError] = useState(false); // Error state for fetching issues

    // Get the current date
    const now = new Date();

    // Format the date and time as needed
    const formattedTime = `${now.getHours() % 12 || 12}${now.getHours() >= 12 ? 'pm' : 'am'} ${now.getDate().toString().padStart(2, '0')},${(now.getMonth() + 1).toString().padStart(2, '0')},${now.getFullYear()}`;
    const [negativeBalance, setNegativeBalance] = useState<{ amount: number; isAvailable: boolean }>({
      amount: 0,
      isAvailable: false,
    });

  // Fetch customer service data and financial summary
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call the server action to get user financial summary
        const sessionRes = await fetch("/api/auth/session");
        const sessionData = await sessionRes.json();
        const userId = sessionData?.user?.id || null;

         // Proceed if we have a valid userId
        if (userId) {
          // Fetch user financial summary
          const summary = await getUserFinancialSummary(userId);

          const result = await getNegativeBalance(userId);
          if (result.isAvailable) {
            setNegativeBalance({ amount: -result.amount, isAvailable: true });
            console.log(`Negative Balance: ${result.amount} USDT`);
          } else {
            setNegativeBalance({ amount: 0, isAvailable: false });
            console.log('No negative balance');
          }

          // Ensure summary is valid and set it in state
          if (summary) {
            setFinancialSummary(summary);
          } else {
            // If summary is invalid or empty, set an appropriate error or default state
            setFetchError(true);
          }
        }

        // Fetch customer service data
        const customerServiceRes = await fetchCustomerService();

        if (customerServiceRes.status === 'success') {
          setCustomerServiceData(customerServiceRes.data); // Set customer service data if successful
        } else if (customerServiceRes.status === 'not_found') {
          // Handle case where no customer service data is found
          console.warn(customerServiceRes.message);
          setCustomerServiceData(null); // Set customer service data to null if not found
        } else {
          // Handle error status returned from the API
          setFetchError(true); 
          console.error(customerServiceRes.message); // Log error message
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setFetchError(true); // Set error if there's an issue with fetching
      } finally {
        setLoading(false); // Data has been fetched, disable loading state
      }
    };

    fetchData();
  }, []);

  // Handle click for showing customer service options
  const handleCustomerServiceClick = () => {
    setShowCustomerService(!showCustomerService); // Toggle the dropdown
  };

  // Redirect to Telegram or WhatsApp DM
  const handleContactOption = (option: string) => {
    if (option === 'telegram' && customerServiceData?.telegramUrl) {
      window.open(customerServiceData.telegramUrl, '_blank');
    } else if (option === 'whatsapp' && customerServiceData?.whatsappUrl) {
      window.open(customerServiceData.whatsappUrl, '_blank');
    }
  };

  // Render loading state
  if (loading) {
    return <p>Loading...</p>; // Display a loading message or spinner
  }

  // Render error state
  if (fetchError) {
    return <p className="text-red-500">Error fetching data. Please try again later.</p>;
  }

  // Render no data state
  if (!financialSummary) {
    return <p>No data available.</p>;
  }

  // Destructure data from financial summary
  const { totalAssets = 0, totalCommissions = 0, last10ApprovedRecharges = [], activePromotions = [] } = financialSummary || {};

  return (
    <section className="relative w-full flex flex-col md:w-10/12 lg:w-8/12">
      <section className="flex flex-col mb-7">
        <section className="flex justify-between">
          <h1 className="md:text-2xl text-lg font-extrabold">Profile</h1>
          <Link href="/investor/dashboard/withdrawal/create" className="bg-mainColor flex justify-center items-center h-fit text-white hover:bg-mainColorOnHover px-4 py-2 rounded-md">
            Withdraw
          </Link>
        </section>
        <h3 className="text-gray-700 mt-2">Contact customer support to make a deposit</h3>
      </section>

      {/* Display total assets and commissions */}
      <section className="flex flex-col md:flex-row justify-between gap-6">
        <BalanceCard title='Total Assets' amount={totalAssets} time='2pm 21,09,2024'/>
        <BalanceCard title='Commissions' amount={totalCommissions} time='2pm 21,09,2024' isGreen={true}/>
       {negativeBalance.amount < 0 && (<BalanceCard title='Negative Balance' otherStyles={{color: 'red'}} amount={`${negativeBalance.amount}`} time={formattedTime} isGreen={false}/>)}
      </section>

      {/* Display active promotions */}
      <section className="my-6">
        {activePromotions.length > 0 ? (
          <PromotionCarousel promotions={activePromotions} />
        ) : (
          <p>No active promotions available.</p>
        )}
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

      {/* Floating customer service button */}
      <section className="fixed bottom-6 right-6">
        <button 
          className="bg-mainColor text-white p-4 rounded-full shadow-lg hover:bg-mainColorOnHover transition-all"
          onClick={handleCustomerServiceClick}
        >
          💬
        </button>
        
        {/* Animated Customer service options (WhatsApp, Telegram) */}
        <div className={`transition-transform duration-300 ease-in-out ${showCustomerService ? 'translate-x-0 opacity-100 block' : 'translate-x-16 opacity-0 hidden'} fixed bottom-20 right-6 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10`}>
          {/* Telegram button */}
          {customerServiceData?.telegramUrl ? (
            <button
              className="flex items-center gap-3 text-left w-full py-2 px-4 hover:bg-gray-100 rounded-md transition-all"
              onClick={() => handleContactOption('telegram')}
            >
              <FaTelegram size={24} className="text-blue-500" />
              Telegram
            </button>
          ) : (
            <button
              className="flex items-center gap-3 text-left w-full py-2 px-4 text-gray-400 cursor-not-allowed rounded-md"
              disabled
            >
              <FaTelegram size={24} className="text-gray-400" />
              Telegram (Not Available)
            </button>
          )}

          {/* WhatsApp button */}
          {customerServiceData?.whatsappUrl ? (
            <button
              className="flex items-center gap-3 text-left w-full py-2 px-4 hover:bg-gray-100 rounded-md transition-all"
              onClick={() => handleContactOption('whatsapp')}
            >
              <FaWhatsapp size={24} className="text-green-500" />
              WhatsApp
            </button>
          ) : (
            <button
              className="flex items-center gap-3 text-left w-full py-2 px-4 text-gray-400 cursor-not-allowed rounded-md"
              disabled
            >
              <FaWhatsapp size={24} className="text-gray-400" />
              WhatsApp (Not Available)
            </button>
          )}
        </div>

        {/* Error message if fetching customer service data fails */}
        {fetchError && (
          <p className="text-red-500 text-sm mt-2">
            Failed to fetch customer service details. Please try again later.
          </p>
        )}
      </section>
    </section>
  );
};

export default Profile;
