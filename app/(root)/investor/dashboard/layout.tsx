import AuthProvider from '@/components/custom/AuthProvider';
import LeftSideBar from '@/components/custom/LeftSideBar'
import TopBar from '@/components/custom/TopBar'
import { authOptions } from '@/lib/config/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'
import { Toaster } from 'sonner';

const InvestorDashboardLayout = async({
    children,
  }: {
    children: React.ReactNode;
  }) => {

  return (
    <section>
        <TopBar isAdmin={false}/>
          <main className="flex flex-row">
            <LeftSideBar isAdmin={false} />
                <section className="flex min-h-screen flex-1 flex-col bg-gray-50">
                    <div className="h-full flex items-center flex-col px-4 pt-28 sm:px-4 2xl:px-32">
                    {children}
                    <Toaster position='top-center' richColors={true} />
                    </div>
                </section>
          </main>
    </section>
  
  )
}

export default InvestorDashboardLayout