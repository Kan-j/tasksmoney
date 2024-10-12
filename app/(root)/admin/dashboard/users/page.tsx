export const dynamic = 'force-dynamic'
import UserManagementTable from '@/components/custom/UserManagementTable';
import React from 'react';
import { getAllNonAdminUsersPaginated } from '@/lib/actions/user.actions';  // Adjust the path according to your file structure

const Users = async ({ searchParams }:{searchParams:any}) => {
  const currentPage = Number(searchParams.page) || 1; // Get current page from query parameters
  const usersData = await getAllNonAdminUsersPaginated(currentPage, 10); // Call the server action with current page and limit

  return (
    <section className="flex flex-col md:w-10/12 lg:w-8/12">
      <section className="flex flex-col mb-4">
        <section className="flex justify-between">
          <h1 className="text-2xl font-extrabold">Users</h1>
        </section>
      </section>

      <section className="my-6">
        <UserManagementTable users={JSON.parse(JSON.stringify(usersData.users))} totalPages={usersData.totalPages} currentPage={currentPage} />
      </section>
    </section>
  );
};

export default Users;
