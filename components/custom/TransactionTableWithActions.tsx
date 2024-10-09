import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '../ui/button';
import { approveWithdrawRequest, rejectWithdrawRequest } from '@/lib/actions/withdrawalRequest.actions'; // Assuming this is where the actions are
import { Loader2 } from 'lucide-react';

const TransactionTableWithActions = ({ withdrawRequests }: { withdrawRequests: any[] }) => {
  const [loading, setLoading] = useState<string | null>(null); // To handle loading state for each request

  // Approve handler
  const handleApprove = async (withdrawRequestId: string) => {
    setLoading(withdrawRequestId); // Set loading state for the current row
    try {
      await approveWithdrawRequest(withdrawRequestId); // Call approve action
      alert('Withdrawal request approved successfully.');
      window.location.reload(); // Reload to reflect changes
    } catch (error) {
      console.error('Error approving withdrawal request:', error);
      alert('Failed to approve withdrawal request.');
    } finally {
      setLoading(null); // Reset loading state
    }
  };

  // Reject handler
  const handleReject = async (withdrawRequestId: string) => {
    setLoading(withdrawRequestId); // Set loading state for the current row
    try {
      await rejectWithdrawRequest(withdrawRequestId); // Call reject action
      alert('Withdrawal request rejected successfully.');
      window.location.reload(); // Reload to reflect changes
    } catch (error) {
      console.error('Error rejecting withdrawal request:', error);
      alert('Failed to reject withdrawal request.');
    } finally {
      setLoading(null); // Reset loading state
    }
  };

  return (
    <div className="w-full">
      {/* Table */}
      <div className="overflow-auto rounded-lg shadow-md">
        <Table className="min-w-full border border-gray-200">
          {/* Table Header */}
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="px-6 py-4 text-left text-gray-700 font-semibold">
                Wallet Address
              </TableHead>
              <TableHead className="px-6 py-4 text-left text-gray-700 font-semibold">
                Exchange Name
              </TableHead>
              <TableHead className="px-6 py-4 text-right text-gray-700 font-semibold">
                Amount
              </TableHead>
              <TableHead className="px-6 py-4 text-center text-gray-700 font-semibold">
                Status
              </TableHead>
              <TableHead className="px-6 py-4 text-center text-gray-700 font-semibold">
                Date
              </TableHead>
              <TableHead className="px-6 py-4 text-center text-gray-700 font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {withdrawRequests.length > 0 ? (
              withdrawRequests.map((request) => (
                <TableRow key={request._id} className="bg-white hover:bg-gray-50 transition duration-150 ease-in-out">
                  
                  <TableCell className="px-6 py-4 text-left font-medium text-gray-900">
                    {request.walletId.address}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-left font-medium text-gray-900">
                    {request.walletId.exchangeName}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right font-medium text-gray-900">
                    {request.amount} USDT
                  </TableCell>
                  <TableCell className="px-6 py-4 text-left font-medium text-gray-900">
                    <span className={`px-2 py-1 rounded-full text-sm font-semibold 
                    ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-600' 
                      : request.status === 'approved' ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'}`}>
                      {request.status}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-left font-medium text-gray-900">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </TableCell>
                  {request.status === 'pending' ? (
                    <TableCell className="px-6 py-4 text-center">
                      <div className="flex justify-center space-x-3">
                        <Button
                          className="bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-500"
                          onClick={() => handleApprove(request._id)}
                          disabled={loading === request._id} // Disable while loading
                        >
                          {loading === request._id ? (
                            <Loader2 className="animate-spin w-5 h-5" />
                          ) : 'Approve'}
                        </Button>
                        <Button
                          className="bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500"
                          onClick={() => handleReject(request._id)}
                          disabled={loading === request._id} // Disable while loading
                        >
                          {loading === request._id ? (
                            <Loader2 className="animate-spin w-5 h-5" />
                          ) : 'Reject'}
                        </Button>
                      </div>
                    </TableCell>
                  ) : (
                    <TableCell className="px-6 py-4 text-center">
                      <p className="text-gray-500">{request.status}</p>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  No Withdrawal Requests Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

    </div>
  );
};

export default TransactionTableWithActions;
