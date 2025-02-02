"use client"
import React from 'react';

const PaginationControls = ({ currentPage, totalPages }:{ currentPage:number, totalPages:number }) => {
  const handlePageChange = (newPage:number) => {
    // Implement page change logic (can redirect or fetch new data)
    if (newPage > 0 && newPage <= totalPages) {
      window.location.href = `/investor/dashboard/recharge?page=${newPage}`; // Navigate to the new page
    }
  };

  return (
    <div className="flex justify-between mt-4 text-sm">
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};

export default PaginationControls;
