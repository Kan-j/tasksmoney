import React from 'react'


const BalanceCard = ({title, amount, time, isGreen, otherStyles}:{title: string, amount: any, time: any, isGreen?: boolean, otherStyles?: any}) => {
  return (
    <section className="border rounded-lg px-6 py-4 w-full bg-white">
        <h1 className="font-extrabold mb-3 text-sm">{title}</h1>
        <h1 style={otherStyles} className={`${isGreen ? 'text-green-500': 'text-mainColor'} text-2xl font-extrabold mb-6`}>{amount} USDT</h1>
        <p className="text-gray-400 text-sm">Balance at {time}</p>
    </section>
  )
}

export default BalanceCard