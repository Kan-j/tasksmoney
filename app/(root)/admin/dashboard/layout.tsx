import LeftSideBar from '@/components/custom/LeftSideBar'
import TopBar from '@/components/custom/TopBar'
import React from 'react'

const AdminDashboardLayout = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
  return (
    <section>
        <TopBar isAdmin={true}/>
          <main className="flex flex-row">
            <LeftSideBar isAdmin={true} />
                <section className="flex min-h-screen flex-1 flex-col bg-gray-50">
                    <div className="h-full flex items-center flex-col px-4 pt-28 sm:px-4 2xl:px-32">
                    {children}
                    </div>
                </section>
          </main>
    </section>
  )
}

export default AdminDashboardLayout