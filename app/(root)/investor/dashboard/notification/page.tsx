"use client";

import React, { useEffect, useState } from 'react';// Ensure this function is correctly imported
import { Skeleton } from '@/components/ui/skeleton'; // Import Skeleton from your UI library
import { fetchAllMessageBroadcasts } from '@/lib/actions/messageBroadcast.actions';

const Notification = () => {
  const [notifications, setNotifications] = useState<any>([]); // Stores fetched notifications
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<any>(null); // Error state

  // Fetch notifications when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllMessageBroadcasts(); // Fetch data from the backend
        setNotifications(data); // Set the fetched notifications
      } catch (err) {
        setError('Failed to fetch notifications'); // Set error if the fetch fails
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="flex flex-col md:w-10/12 lg:w-8/12 gap-4">
        <h1 className="text-2xl font-extrabold mb-4">Notification</h1>
        {/* Display Skeleton placeholders for loading state */}
        {Array.from({ length: 5 }).map((_, index) => (
          <section key={index} className="flex gap-4 border bg-white px-4 py-4 rounded-lg">
            <Skeleton className="h-10 w-10 rounded-full" />
            <section className="flex flex-col w-full">
              <Skeleton className="h-4 w-1/3 mb-1" />
              <Skeleton className="h-4 w-full" />
            </section>
          </section>
        ))}
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex flex-col items-center justify-center h-96">
        <p className="text-red-500 text-lg">{error}</p>
      </section>
    );
  }

  if (notifications.length === 0) {
    return (
      <section className="flex flex-col items-center justify-center h-96">
        <p className="text-gray-600 text-lg">No notifications available at the moment.</p>
      </section>
    );
  }

  return (
    <section className="flex flex-col md:w-10/12 lg:w-8/12">
      <section className="flex flex-col mb-7">
        <section className="flex justify-between gap-4">
          <section className="flex flex-col">
            <h1 className="text-2xl font-extrabold mb-4">Notification</h1>
            <h3 className="text-gray-700 w-4/5">
              Stay updated with the latest news and offers from your account.
            </h3>
          </section>
        </section>
      </section>

      {/* List of Notifications */}
      <section className="flex flex-col gap-4 mb-4">
        {notifications.map((notification:any) => (
          <section
            key={notification._id}
            className="flex gap-4 border bg-white px-4 py-4 rounded-lg"
          >
            {/* <div className="bg-gray-500 p-2 rounded-full flex justify-center items-center">
              
            </div> */}
            <section className="flex flex-col w-full">
              <section className="flex justify-between font-bold w-full text-sm">
                <h1 className="">From Admin</h1>
                <h1 className="">{new Date(notification.createdAt).toLocaleTimeString()}</h1>
              </section>
              <section className="mt-2">
                <h1 className="text-gray-700 text-sm">{notification.message}</h1>
              </section>
            </section>
          </section>
        ))}
      </section>
    </section>
  );
};

export default Notification;
