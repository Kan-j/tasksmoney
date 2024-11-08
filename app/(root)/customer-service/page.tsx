// ContactService.tsx
"use client";
import React, { useEffect, useState } from 'react';
import { FaTelegram, FaWhatsapp } from 'react-icons/fa';
import { fetchCustomerService } from '@/lib/actions/customerService.actions';
import { useRouter } from 'next/router';

const ContactService = () => {
  const [customerServiceData, setCustomerServiceData] = useState<any>(null);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await fetchCustomerService();
        if (response.status === 'success') {
          setCustomerServiceData(response.data);
        } else {
          setFetchError(true);
        }
      } catch (error) {
        console.error("Failed to fetch customer service data:", error);
        setFetchError(true);
      }
    };

    fetchServiceData();
  }, []);

  const handleContactOption = (option: string) => {
    if (option === 'telegram' && customerServiceData?.telegramUrl) {
      window.open(customerServiceData.telegramUrl, '_blank');
    } else if (option === 'whatsapp' && customerServiceData?.whatsappUrl) {
      window.open(customerServiceData.whatsappUrl, '_blank');
    }
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen">
    <section className="flex flex-col w-4/6 items-center ">
        <section className="flex flex-col mb-7">
        <section className="flex justify-between gap-4 ">
          <section className="flex flex-col">
            <h1 className="text-2xl font-extrabold mb-4">Contact Customer Service</h1>
          </section>
        </section>
        <h3 className="text-gray-700 w-4/5">Your recharge request has been submitted successfully. Please contact customer service for further assistance:</h3>
      </section>


      {/* Display contact options */}
      <div className="bg-white p-6 shadow-lg rounded-lg ">
        {/* Telegram button */}
        {customerServiceData?.telegramUrl ? (
          <button
            className="flex items-center gap-3 text-left w-full py-2 px-4 hover:bg-mainColorOnHover rounded-md transition-all mb-4"
            onClick={() => handleContactOption('telegram')}
          >
            <FaTelegram size={24} className="text-blue-500" />
            <span className="">Contact on Telegram</span> 
          </button>
        ) : (
          <button
            className="flex items-center gap-3 text-left w-full py-2 px-4 text-mainColor cursor-not-allowed rounded-md mb-4"
            disabled
          >
            <FaTelegram size={24} className="text-gray-400" />
            Telegram (Not Available)
          </button>
        )}

        {/* WhatsApp button */}
        {customerServiceData?.whatsappUrl ? (
          <button
            className="flex items-center gap-3 text-left w-full py-2 px-4 hover:bg-mainColorOnHover rounded-md transition-all"
            onClick={() => handleContactOption('whatsapp')}
          >
            <FaWhatsapp size={24} className="text-green-500" />
            <span className="">Contact on Whatsapp</span> 
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

      {/* Error handling */}
      {fetchError && (
        <p className="text-red-500 text-sm mt-4">
          Failed to fetch customer service details. Please try again later.
        </p>
      )}
    </section>
    </div>
  );
};

export default ContactService;
