"use client";

import React, { useEffect, useState } from 'react';
import { getUserRechargeRequests } from '@/lib/actions/recharge.actions'; // Importing the server action
import RechargeRequestsTransactionTable from '@/components/custom/RechargeRequestsTransactionTable';
import PaginationControls from '@/components/custom/PaginationControls';
import Link from 'next/link';

const RechargeRequestsPage = ({ searchParams }: { searchParams: any }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [rechargeRequests, setRechargeRequests] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true); // New loading state
  const [error, setError] = useState<string | null>(null); // Error state in case of failure

  // Fetch the user session and extract the userId
  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true); // Set loading to true when the session fetch starts
      setError(null); // Clear previous errors
      try {
        const res = await fetch('http://localhost:3000/api/auth/session');
        const sessionData = await res.json();
        const fetchedUserId = sessionData?.user?.id || null;
        setUserId(fetchedUserId);

        // Fetch recharge requests if user ID is available
        if (fetchedUserId) {
          const page = parseInt(searchParams.page as string) || 1;
          const { rechargeRequests, totalPages, currentPage } = await getUserRechargeRequests(fetchedUserId, page);
          
          setRechargeRequests(rechargeRequests);
          setTotalPages(totalPages);
          setCurrentPage(currentPage);
        }
      } catch (error) {
        console.error('Failed to fetch session or recharge requests', error);
        setError('Failed to load recharge requests. Please try again later.');
      } finally {
        setLoading(false); // Set loading to false when data fetching is done (either success or failure)
      }
    };

    fetchSession();
  }, [searchParams.page]);

  return (
    <section className="flex flex-col md:w-10/12 lg:w-8/12">
      <section className="flex flex-col mb-7">
        <section className="flex justify-between">
          <h1 className="text-2xl font-extrabold">Recharge Requests</h1>
          <Link href="/investor/dashboard/recharge/create" className="bg-orange-500 flex justify-center items-center h-fit text-white hover:bg-orange-600 px-4 py-2 rounded-md">
            Request Recharge
          </Link>
        </section>
      </section>

      {/* Error State */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="p-4 text-center">
          Loading...
        </div>
      ) : (
        <>
          {/* Render the table only if the user is logged in */}
          {userId ? (
            <>
              <RechargeRequestsTransactionTable transactions={rechargeRequests} />
              <PaginationControls currentPage={currentPage} totalPages={totalPages} />
            </>
          ) : (
            <div className="p-4 text-center">Please log in to view your recharge requests.</div>
          )}
        </>
      )}
    </section>
  );
};

export default RechargeRequestsPage;
