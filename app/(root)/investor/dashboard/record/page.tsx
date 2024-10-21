import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Image from 'next/image'


const Record = () => {
  return (
    <section className="flex flex-col md:w-10/12 lg:w-8/12">
        <section className="flex flex-col mb-7">
            <section className="flex justify-between gap-4">
                <section className="flex flex-col">
                  <h1 className="text-2xl font-extrabold mb-4">Records</h1>
                  <h3 className="text-gray-700 w-4/5">View all your past transactions and activity in one place.</h3>
                </section>
                
                {/* <Button className='bg-mainColor'>Withdraw</Button> */}
                <section className=" ">
                  <Select >
                    <SelectTrigger className="">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">All</SelectItem>
                      <SelectItem value="dark">Completed</SelectItem>
                      <SelectItem value="system">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </section>
            </section>
            {/* <h3 className="text-gray-700 w-3/5">The system will auto-refresh the commission for each product and add it to your current balance.</h3> */}
        </section>


        <section className="flex flex-col gap-4 mb-4">
           

          <section className="bg-white border px-8 py-4 rounded-lg">
              <section className="flex justify-between mb-2">
                <h1 className="font-medium text-sm">Order time: <span className='text-gray-500'>2024-09-17  23: 24: 02</span></h1>
                <p className="bg-green-300 px-2 py-1 rounded-md text-sm">Completed</p>
              </section>
              <section className="flex">
                <div className="">
                <Image src={'/assets/images/small_iphone.png'} alt={'product'} className='aspect-square ' width={100} height={200}/>
                </div>
                <section className="w-full">
                  <section className="flex justify-between w-full items-center  mt-2 text-gray-600">
                    <h1 className=" text-gray-900 font-semibold">Apple iPhone 13 Pro</h1>
                    <h1 className="">Qty: <span className="text-gray-900">1</span> </h1>
                  </section>
                  <section className="flex justify-between w-full items-center text-sm mt-2 text-gray-600">
                    <h1 className="">Price</h1>
                    <h1 className="">Commission</h1>
                  </section>
                  <section className="flex justify-between text-gray-700 text-xl mt-1 mb-2">
                    <h1 className="">$899</h1>
                    <h1 className="">$39</h1>
                  </section>
                  </section>
              </section>
          </section>

          <section className="bg-white border px-8 py-4 rounded-lg">
              <section className="flex justify-between mb-2">
                <h1 className="font-medium text-sm">Order time: <span className='text-gray-500'>2024-09-17  23: 24: 02</span></h1>
                <p className="bg-red-300 px-2 py-1 rounded-md text-sm">Pending</p>
              </section>
              <section className="flex">
                <div className="">
                <Image src={'/assets/images/small_iphone.png'} alt={'product'} className='aspect-square ' width={100} height={200}/>
                </div>
                <section className="w-full">
                  <section className="flex justify-between w-full items-center  mt-2 text-gray-600">
                    <h1 className=" text-gray-900 font-semibold">Apple iPhone 13 Pro</h1>
                    <h1 className="">Qty: <span className="text-gray-900">1</span> </h1>
                  </section>
                  <section className="flex justify-between w-full items-center text-sm mt-2 text-gray-600">
                    <h1 className="">Price</h1>
                    <h1 className="">Commission</h1>
                  </section>
                  <section className="flex justify-between text-gray-700 text-xl mt-1 mb-2">
                    <h1 className="">$899</h1>
                    <h1 className="">$39</h1>
                  </section>
                  </section>
              </section>
          </section>

          
          <section className="bg-white border px-8 py-4 rounded-lg">
              <section className="flex justify-between mb-2">
                <h1 className="font-medium text-sm">Order time: <span className='text-gray-500'>2024-09-17  23: 24: 02</span></h1>
                <p className="bg-red-300 px-2 py-1 rounded-md text-sm">Pending</p>
              </section>
              <section className="flex">
                <div className="">
                <Image src={'/assets/images/small_iphone.png'} alt={'product'} className='aspect-square ' width={100} height={200}/>
                </div>
                <section className="w-full">
                  <section className="flex justify-between w-full items-center  mt-2 text-gray-600">
                    <h1 className=" text-gray-900 font-semibold">Apple iPhone 13 Pro</h1>
                    <h1 className="">Qty: <span className="text-gray-900">1</span> </h1>
                  </section>
                  <section className="flex justify-between w-full items-center text-sm mt-2 text-gray-600">
                    <h1 className="">Price</h1>
                    <h1 className="">Commission</h1>
                  </section>
                  <section className="flex justify-between text-gray-700 text-xl mt-1 mb-2">
                    <h1 className="">$899</h1>
                    <h1 className="">$39</h1>
                  </section>
                  </section>
              </section>
          </section>

        </section>


        
      </section>
  )
}

export default Record