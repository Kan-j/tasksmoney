"use client"
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react'; // For loading spinner
import { approveRechargeRequest, rejectRechargeRequest } from '@/lib/actions/recharge.actions';
import { format } from 'date-fns';

const RechargeRequestTable = ({ rechargeRequests }: { rechargeRequests: any[] }) => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleApprove = async (rechargeRequestId: string) => {
    setLoading(rechargeRequestId);
    try {
      await approveRechargeRequest(rechargeRequestId);
      alert('Recharge request approved successfully.');
      window.location.reload();
    } catch (error) {
      console.error('Error approving recharge request:', error);
      alert('Failed to approve recharge request.');
    } finally {
      setLoading(null);
    }
  };

  const handleReject = async (rechargeRequestId: string) => {
    setLoading(rechargeRequestId);
    try {
      await rejectRechargeRequest(rechargeRequestId);
      alert('Recharge request rejected successfully.');
      window.location.reload();
    } catch (error) {
      console.error('Error rejecting recharge request:', error);
      alert('Failed to reject recharge request.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="w-full mt-8">
      <div className="overflow-hidden w-[300px] sm:w-[500px] md:w-[700px] shadow-md">
        <Table className="min-w-full  border border-gray-200">
          {/* Table Head */}
          <TableHeader>
            <TableRow className="bg-gray-100">
              
              <TableHead className="px-6 py-4 text-left text-gray-700 font-semibold">
                User Email
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
            {rechargeRequests.length > 0 ? (
              rechargeRequests.map((request) => (
                <TableRow key={request._id} className="bg-white hover:bg-gray-50">
                  
                  <TableCell className="px-6 py-4 text-left font-medium text-gray-900">
                    {request.userId.email}
                  </TableCell>
                  <TableCell className="px-6 py-4 text-right font-medium text-gray-900">
                    {request.amount} USDT
                  </TableCell>
                  <TableCell className="px-6 py-4 text-center font-medium">
                    <span className={`px-2 py-1 rounded-full text-sm font-semibold 
                      ${request.status === 'pending' ? 'bg-yellow-100 text-yellow-600' 
                      : request.status === 'approved' ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'}`}>
                      {request.status}
                    </span>
                  </TableCell>
                  <TableCell className="px-6 py-4 text-center font-medium">
                    <p className="">
                    {format(new Date(request.createdAt), 'MM/dd/yyyy')}
                    </p>
                  
                  </TableCell>
                  {request.status === 'pending' ? (
                    <TableCell className="px-6 py-4 text-center">
                      <div className="flex justify-center space-x-3">
                        <Button
                          className="bg-green-500 text-white hover:bg-green-600"
                          onClick={() => handleApprove(request._id)}
                          disabled={loading === request._id}
                        >
                          {loading === request._id ? (
                            <Loader2 className="animate-spin w-5 h-5" />
                          ) : 'Approve'}
                        </Button>
                        <Button
                          className="bg-red-500 text-white hover:bg-red-600"
                          onClick={() => handleReject(request._id)}
                          disabled={loading === request._id}
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
                <TableCell colSpan={5} className="text-center py-6">
                  No Recharge Requests Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RechargeRequestTable;
