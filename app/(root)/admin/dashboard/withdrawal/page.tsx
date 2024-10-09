"use client"; // Ensures this runs on the client side
import TransactionTableWithActions from '@/components/custom/TransactionTableWithActions';
import React, { useState, useEffect } from 'react';
import { getAllWithdrawRequests } from '@/lib/actions/withdrawalRequest.actions'; 

const Withdrawal = () => {
  const [withdrawRequests, setWithdrawRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // Items per page

  useEffect(() => {
    const fetchWithdrawRequests = async () => {
      setLoading(true);
      try {
        // Fetch withdrawal requests based on the current page
        const { withdrawRequests, totalPages } = await getAllWithdrawRequests(currentPage, limit);
        setWithdrawRequests(withdrawRequests);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Failed to fetch withdraw requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWithdrawRequests();
  }, [currentPage]); // Re-run when currentPage changes

  // Function to handle next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Function to handle previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Display a loading state
  }

  return (
    <section className="flex flex-col md:w-10/12 lg:w-8/12">
      <section className="flex flex-col mb-4">
        <section className="flex justify-between">
          <h1 className="text-2xl font-extrabold">Withdrawal Requests</h1>
        </section>
      </section>

      <section className="my-6">
        {/* Render the Transaction Table with data */}
        <TransactionTableWithActions withdrawRequests={withdrawRequests} />
      </section>

      {/* Pagination controls */}
      <section className="flex justify-between items-center">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300' : 'bg-orange-500 text-white'}`}
        >
          Previous
        </button>

        <p className="text-gray-700">
          Page {currentPage} of {totalPages}
        </p>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300' : 'bg-orange-500 text-white'}`}
        >
          Next
        </button>
      </section>
    </section>
  );
};

export default Withdrawal;
