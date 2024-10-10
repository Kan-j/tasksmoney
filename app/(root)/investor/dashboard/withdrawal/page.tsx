// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import React from 'react'

// const Withdrawal = () => {
//   return (
//     <section className="flex flex-col md:w-10/12 lg:w-8/12">
        // <section className="flex flex-col mb-7">
        //     <section className="flex justify-between">
        //         <h1 className="text-2xl font-extrabold">Withdraw Amount</h1>
        //         <Button className='bg-orange-500'>Bind Account</Button>
        //     </section>
        //     <h3 className="text-gray-700 mt-4">To ensure a smooth withdrawal process, please provide accurate account details for binding. We currently support USDT, BTC, TRC20, ETH, and more. Inaccurate information may delay your withdrawals.</h3>
        // </section>


  
          

//         <section className="my-8 ">
//             <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="">
//                 <h1 className="mb-2 text-sm font-bold">Exchange Name</h1>
//                 <Input placeholder='Eg. John Doe'/>
//               </div>
//               <div className="">
//                 <h1 className="mb-2 text-sm font-bold">Withdrawal Amount</h1>
//                 <Input placeholder='280'/>
//               </div>
//               <div className="">
//                 <h1 className="mb-2 text-sm font-bold">Wallet Address</h1>
//                 <Input placeholder='Eg. 123534356765689'/>
//               </div>
//               <div className="">
//                 <h1 className="mb-2 text-sm font-bold">Withdrawal Password</h1>
//                 <Input placeholder='Eg. #@32jlkaeiiTRLK'/>
//               </div>

//               <div className="col-span-2  flex justify-center mt-4">
//                 <Button className='w-full bg-orange-500 hover:bg-orange-600'>Submit</Button>
//               </div>
              
//             </section>
//         </section>
        
//     </section>
//   )
// }

// export default Withdrawal
"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { getUserWithdrawRequests } from "@/lib/actions/withdrawalRequest.actions";  // Import the server action

const WithdrawalsPage = ({ searchParams }: { searchParams: any }) => {
  const [withdrawals, setWithdrawals] = useState([]); // Withdrawal data
  const [userId, setUserId] = useState<string | null>(null); // Current user ID
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  // Fetch user's withdrawal requests and session data from the server
  useEffect(() => {
    const fetchSessionAndWithdrawals = async () => {
      setLoading(true); // Start loading
      setError(null); // Clear previous errors
      try {
        // Fetch the session to get user ID
        const sessionRes = await fetch("/api/auth/session");
        const sessionData = await sessionRes.json();
        const fetchedUserId = sessionData?.user?.id || null;
        setUserId(fetchedUserId);

        // Fetch withdrawal requests directly using getUserWithdrawRequests server action
        if (fetchedUserId) {
          const page = parseInt(searchParams.page as string) || 1;

          // Use the server action to get the user's withdrawal requests
          const { withdrawRequests, totalPages, currentPage } = await getUserWithdrawRequests(fetchedUserId, page);
          console.log(withdrawRequests)
          setWithdrawals(withdrawRequests);
          setTotalPages(totalPages);
          setCurrentPage(currentPage);
        }
      } catch (error) {
        console.error("Failed to fetch session or withdrawal requests", error);
        setError("Failed to load withdrawal requests. Please try again later.");
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchSessionAndWithdrawals();
  }, [searchParams.page]);

  // Pagination controls
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // You can also add logic to update URL or searchParams here
  };

  return (
    <section className="flex flex-col md:w-10/12 lg:w-8/12">
      <section className="flex flex-col mb-7">
        <section className="flex justify-between">
          <h1 className="text-2xl font-extrabold">Withdraw Requests</h1>
          <Link
            href="/investor/dashboard/withdrawal/create"
            className="bg-orange-500 flex justify-center items-center h-fit text-white hover:bg-orange-600 px-4 py-2 rounded-md"
          >
            Create Withdrawal Request
          </Link>
        </section>
      </section>

      {/* Error state */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="text-center mt-8">
          <p>Loading...</p> {/* You can replace this with a loading spinner if desired */}
        </div>
      ) : (
        <>
          {/* Withdrawal Table */}
          <div className="mt-6">
            <Table className="min-w-full border-collapse bg-white">
              <TableHeader>
                <TableRow>
                  <TableCell className="px-6 py-4 text-left font-bold">Wallet</TableCell>
                  <TableCell className="px-6 py-4 text-left font-bold">Exchange</TableCell>
                  <TableCell className="px-6 py-4 text-left font-bold">Amount</TableCell>
                  <TableCell className="px-6 py-4 text-left font-bold">Status</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {withdrawals.length > 0 ? (
                  withdrawals.map((withdrawal:any, index) => (
                    <TableRow key={index} className="bg-white hover:bg-gray-100">
                      <TableCell className="px-6 py-4">{withdrawal.walletId.address}</TableCell>
                      <TableCell className="px-6 py-4">{withdrawal.walletId.exchangeName}</TableCell>
                      <TableCell className="px-6 py-4">{withdrawal.amount} USDT</TableCell>
                      <TableCell
                        className={`px-6 py-4 ${
                          withdrawal.status === "approved"
                            ? "text-green-600"
                            : withdrawal.status === "pending"
                            ? "text-orange-600"
                            : "text-red-600"
                        }`}
                      >
                        {withdrawal.status}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="px-6 py-4 text-center">
                      No withdrawal requests found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <Button
              className="bg-gray-500 text-white hover:bg-gray-600"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </Button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <Button
              className="bg-gray-500 text-white hover:bg-gray-600"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </section>
  );
};

export default WithdrawalsPage;
