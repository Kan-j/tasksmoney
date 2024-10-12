"use client";
import React, { useState, useEffect } from 'react';
import RechargeRequestTable from "@/components/custom/RechargeRequestTable";
import { getAllRechargeRequests } from "@/lib/actions/recharge.actions";

const RechargeClientComponent = () => {
  const [rechargeRequests, setRechargeRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // Items per page

  // Fetch recharge requests based on the current page
  useEffect(() => {
    const fetchRechargeRequests = async () => {
      setLoading(true);
      try {
        const { rechargeRequests, totalPages } = await getAllRechargeRequests(currentPage, limit);
        setRechargeRequests(rechargeRequests);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Failed to fetch recharge requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRechargeRequests();
  }, [currentPage]);

  // Handle Next Page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle Previous Page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <p>Loading...</p>; // Loading state
  }

  return (
    <section className="flex flex-col md:w-10/12 lg:w-8/12">
      <section className="flex flex-col mb-4">
        <section className="flex justify-between">
          <h1 className="text-2xl font-extrabold">Recharge Requests</h1>
        </section>
      </section>

      <section className="my-6">
        {/* Render Recharge Request Table */}
        <RechargeRequestTable rechargeRequests={rechargeRequests} />
      </section>

      {/* Pagination Controls */}
      <section className="flex justify-between items-center my-4">
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

export default RechargeClientComponent;
