import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table'; // Assuming these are your table components
import { MdArrowDropDown } from 'react-icons/md';

const RechargeRequestsTransactionTable = ({ transactions }:{transactions: any}) => {
  return (
    <div className="w-full overflow-auto">
      <Table className="min-w-full border-collapse bg-white">
        {/* Table Head */}
        <TableHeader>
          <TableRow className="bg-gray-100">
            
            <TableHead className="px-6 py-4 text-left text-gray-600">
              Amount
              <MdArrowDropDown className="inline ml-1" />
            </TableHead>
            <TableHead className="px-6 py-4 text-right text-gray-600">
              Status
              <MdArrowDropDown className="inline ml-1" />
            </TableHead>
          </TableRow>
        </TableHeader>
        {/* Table Body */}
        <TableBody>
          {transactions.map((transaction:any, index:any) => (
            <TableRow key={index} className="bg-white hover:bg-gray-100">
              <TableCell className="px-6 py-4 text-left font-medium text-gray-600">
                {transaction.amount} USDT
              </TableCell>
              <TableCell className={`px-6 py-4 text-right font-medium ${
                    transaction.status === 'approved'
                    ? 'text-green-600' // Green for approved
                    : transaction.status === 'pending'
                    ? 'text-orange-600' // Orange for pending
                    : 'text-red-600' // Red for rejected
                }`}>
                {transaction.status}
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RechargeRequestsTransactionTable;
