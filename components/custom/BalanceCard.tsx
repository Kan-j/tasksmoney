import React from 'react'

const BalanceCard = ({title, amount, time, isGreen}:{title: string, amount: string, time: any, isGreen?: boolean}) => {
  return (
    <section className="border rounded-lg px-6 py-4 w-full bg-white">
        <h1 className="font-extrabold mb-3 text-sm">{title}</h1>
        <h1 className={`${isGreen ? 'text-green-500': 'text-orange-500'} text-2xl font-extrabold mb-6`}>{amount} USDT</h1>
        <p className="text-gray-400 text-sm">Balance at {time}</p>
    </section>
  )
}

export default BalanceCard