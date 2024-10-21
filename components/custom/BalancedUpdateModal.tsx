import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';

interface BalanceUpdateModalProps {
  message: string;
  onClose: () => void;
  onUpdateBalance: () => void;
}

const BalanceUpdateModal: React.FC<BalanceUpdateModalProps> = ({ message, onClose, onUpdateBalance }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Update Balance</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            &times;
          </button>
        </div>
        <p className="text-gray-700 mb-6">{message}</p>
        <Link href="/investor/dashboard/recharge/create" className="bg-mainColor flex justify-center items-center h-fit text-white hover:bg-mainColorOnHover px-4 py-2 rounded-md">
            Update Balance
          </Link>
      </div>
    </div>
  );
};

export default BalanceUpdateModal;
