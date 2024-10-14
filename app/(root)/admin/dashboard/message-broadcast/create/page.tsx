'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // For navigation
import { createMessageBroadcast } from '@/lib/actions/messageBroadcast.actions';
import { toast } from 'sonner';

const CreateMessageBroadcast = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Use Next.js router for navigation

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state

    const formData = new FormData();
    formData.append('message', message);

    try {
      const result = await createMessageBroadcast(formData);

      if (result.success) {
        setMessage(''); // Reset the form field after successful broadcast
        router.push('/admin/dashboard/message-broadcast'); // Redirect to the dashboard
        toast.success("Message Broadcast Created")
      } else {
        setError('Failed to create the broadcast'); // Handle errors here
        toast.error('Failed to create the broadcast')
      }
    } catch (error) {
      setError('An error occurred while creating the broadcast');
      toast.error('An error occurred while creating the broadcast')
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <section className="flex flex-col md:w-10/12 lg:w-8/12">
      <section className="flex flex-col mb-7">
        <section className="flex justify-between">
          <h1 className="text-lg md:text-2xl font-extrabold">New Broadcast</h1>
          <Link
            href="/admin/dashboard/message-broadcast"
            className="bg-gray-500 flex justify-center items-center h-fit text-white hover:bg-gray-600 px-4 py-2 rounded-md text-sm md:text-base"
          >
            Back
          </Link>
        </section>
        <h3 className="text-gray-700 mt-4">
          Welcome to the message broadcast page! Here, you can send important updates or announcements to all users quickly and easily.
        </h3>
      </section>

      {/* The form directly submits to the server action */}
      <form onSubmit={handleSubmit} className="my-4 flex flex-col gap-4">
        <section className="my-6">
          <div className="mb-2">
            <h1 className="mb-4 font-bold">Message</h1>
            <Textarea 
              name="message" 
              value={message} // Control the value with React state
              onChange={(e) => setMessage(e.target.value)} // Update state on change
              placeholder="Type your message here." 
              required
            />
          </div>

          {error && <p className="text-red-500">{error}</p>} {/* Display any error messages */}

          <div className="flex justify-end mt-3">
            <Button 
              className="bg-orange-500 px-4" 
              type="submit" 
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Sending...' : 'Send Broadcast'}
            </Button>
          </div>
        </section>
      </form>
    </section>
  );
};

export default CreateMessageBroadcast;
