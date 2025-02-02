"use client";
import React, { useState, useEffect } from "react";
import UserManagementTable from "@/components/custom/UserManagementTable";
import { getAllNonAdminUsersPaginated } from "@/lib/actions/user.actions";

const Users =  ({ searchParams }: { searchParams: any }) => {
  const currentPage = Number(searchParams.page) || 1;
  const initialSearchQuery = searchParams.searchQuery || ""; // Get search query from URL parameters
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery); // Store search input in state
  const [usersData, setUsersData] = useState<any>(null); // Store users data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch users data with search query
  const fetchUsersData = async () => {
    setLoading(true);
    try {
      const usersData = await getAllNonAdminUsersPaginated(currentPage, 10, searchQuery);
      setUsersData(usersData);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch users data when component mounts or when searchQuery/currentPage changes
  useEffect(() => {
    fetchUsersData();
  }, [ currentPage]);

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle form submit to trigger search
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsersData(); // Trigger fetch when search is submitted
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading state
  }

  return (
    <section className="flex flex-col md:w-10/12 lg:w-8/12">
      <section className="flex flex-col mb-4">
        <section className="flex justify-between items-center">
          <h1 className="text-2xl font-extrabold">Users</h1>
          {/* Search Form */}
          <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by username or email"
              className="border p-2 rounded"
            />
            <button type="submit" className="bg-mainColor text-white px-4 py-2 rounded">
              Search
            </button>
          </form>
        </section>
      </section>

      <section className="my-6">
        {/* Pass users data to the table */}
        <UserManagementTable
          users={JSON.parse(JSON.stringify(usersData?.users || []))}
          totalPages={usersData?.totalPages || 1}
          currentPage={currentPage}
        />
      </section>
    </section>
  );
};

export default Users;
