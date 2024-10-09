// app/admin/dashboard/promotions/page.tsx
import PromotionsCard from '@/components/custom/PromotionsCard';// import to include PromotionsCard
import { deletePromotion, fetchAllPromotions, togglePromotionActive } from '@/lib/actions/promotion.actions'; // Import the actions
import Link from 'next/link';
import React from 'react';

const Promotions = async () => {
  const promotions = await fetchAllPromotions(); // Fetch promotions from the database

 
  return (
    <section className="flex flex-col md:w-10/12 lg:w-8/12">
      <section className="flex flex-col mb-7">
        <section className="flex justify-between">
          <h1 className="text-2xl font-extrabold">Promotions</h1>
          <Link href="/admin/dashboard/promotions/create" className="bg-orange-500 flex justify-center items-center h-fit text-white hover:bg-orange-600 px-4 py-2 rounded-md">
            Create Promotion
          </Link>
        </section>
        <h3 className="text-gray-700 mt-4">Welcome to your promotions page! You can view existing promotions or create new ones to keep users engaged.</h3>
      </section>

      <section className="my-4">
        <PromotionsCard 
          promotions={promotions} 
        /> {/* Pass the delete and toggle functions */}
      </section>
    </section>
  );
};

export default Promotions;
