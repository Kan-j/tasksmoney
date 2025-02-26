// components/MessageBroadcast.tsx
'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { fetchAllMessageBroadcasts } from '@/lib/actions/messageBroadcast.actions'; // Import the server action
import MessageBroadcastItem from '@/components/custom/MessageBroadcastItem';  // Import the new item component

const MessageBroadcastClient = () => {
  const [broadcasts, setBroadcasts] = useState<any[]>([]); // Adjust the type according to your data model
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBroadcasts = async () => {
      const fetchedBroadcasts = await fetchAllMessageBroadcasts();
      setBroadcasts(fetchedBroadcasts);
      setLoading(false);
    };

    loadBroadcasts();
  }, []);

  if (loading) {
    return <p>Loading broadcasts...</p>;
  }

  return (
    <section className="flex flex-col md:w-10/12 lg:w-8/12">
      <section className="flex flex-col mb-7">
        <section className="flex justify-between">
          <h1 className="text-lg md:text-2xl font-extrabold">Message Broadcast</h1>
          <Link href="/admin/dashboard/message-broadcast/create" className="bg-mainColor flex justify-center items-center h-fit text-white hover:bg-mainColorOnHover px-4 py-2 rounded-md">
            New Broadcast
          </Link>
        </section>
        <h3 className="text-gray-700 mt-4 text-sm md:text-base">Welcome to the message broadcast page! Here, you can send important updates or announcements to all users quickly and easily</h3>
      </section>

      <section className="my-6 flex flex-col gap-4">
        {broadcasts.length === 0 ? (
          <p>No broadcasts found.</p>
        ) : (
          broadcasts.map(broadcast => (
            <MessageBroadcastItem 
              key={broadcast._id} 
              id={broadcast._id} 
              message={broadcast.message} 
              createdAt={broadcast.createdAt}
            />
          ))
        )}
      </section>
    </section>
  );
};

export default MessageBroadcastClient;

