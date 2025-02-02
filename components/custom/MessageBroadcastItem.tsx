'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { IoTrashBin } from 'react-icons/io5';
import { deleteMessageBroadcast } from '@/lib/actions/messageBroadcast.actions'; // Make sure this import path is correct
import { toast } from 'sonner';

interface MessageBroadcastItemProps {
  id: string;
  message: string;
  createdAt: Date;
}

const MessageBroadcastItem: React.FC<MessageBroadcastItemProps> = ({ id, message, createdAt }) => {
  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this broadcast?");
    if (confirmed) {
      await deleteMessageBroadcast(id); // Call your delete function here
      window.location.reload(); // Refresh page to see the updated list
      toast.success("Message Broadcast Deleted")
    }
  };

  return (
    <section className="flex gap-4 border bg-white px-4 py-4 rounded-lg">
      <section className="flex flex-col w-full">
        <section className="flex justify-between font-bold w-full text-sm">
          <h1 className="">From Admin</h1>
          <h1 className="">{new Date(createdAt).toLocaleString()}</h1>
        </section>
        <section className="mt-2">
          <h1 className="text-gray-700 text-sm">{message}</h1>
        </section> 
        <section className="flex justify-end">
            <Button onClick={handleDelete} variant={'outline'} className="flex items-center w-fit justify-center">
            <IoTrashBin size={20} />
        </Button>
        </section>
        
      </section>
     
    </section>
  );
};

export default MessageBroadcastItem;
