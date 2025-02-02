import React from 'react';

interface DepositHistoryItemProps {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
}

const DepositHistoryItem: React.FC<DepositHistoryItemProps> = ({ id, amount, status, createdAt }) => {
  console.log(status)
  return (
    <section className="flex flex-col gap-3">
      <div className="flex justify-between text-sm">
        <h1 className="font-semibold text-sm">ID: {id}</h1>
        <h1 className="text-gray-500 text-sm">{new Date(createdAt).toLocaleDateString()}</h1>
      </div>
      <div className="flex justify-between text-sm">
        <h1 className="text-mainColor font-extrabold">{amount} USDT</h1>
        <h1 className={`px-2 py-1 rounded-lg ${status === 'approved' ? 'bg-green-300' : 'bg-red-300'}`}>
          {status}
        </h1>
      </div>
    </section>
  );
};

export default DepositHistoryItem;
