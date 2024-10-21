"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useState, useEffect } from 'react';

// Server action to fetch customer service data
import { fetchCustomerService, updateOrCreateCustomerService } from '@/lib/actions/customerService.actions'; 
import { toast } from 'sonner';

const CustomerServiceClient = () => {
  const [telegramUrl, setTelegramUrl] = useState('');
  const [whatsappUrl, setWhatsappUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [hasData, setHasData] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch customer service data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await fetchCustomerService(); // Fetch customer service details
        if (data) {
          setTelegramUrl(data.telegramUrl);
          setWhatsappUrl(data.whatsappUrl);
          setHasData(true);
        } else {
          setHasData(false);
        }
      } catch (error) {
        setError('Error fetching customer service data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    setLoading(true); // Set loading state

    try {
      await updateOrCreateCustomerService(telegramUrl, whatsappUrl); // Update or create customer service data
      toast.success("Customer Service links updated")
      setHasData(true); // Assume data was successfully created or updated
      setError(null); // Reset error state
    } catch (error) {
      setError('Error updating customer service data');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  if (loading) {
    return <p>Loading customer service data...</p>; // Show loading state
  }

  return (
    <section className="flex flex-col md:w-10/12 lg:w-8/12">
      <section className="flex flex-col mb-7">
        <section className="flex justify-between">
          <h1 className="text-2xl font-extrabold">Customer Service</h1>
        </section>
        <h3 className="text-gray-700 mt-3">
          Manage your customer service links here. You can easily set or update the Telegram and WhatsApp URLs to ensure users always have the latest support access.
        </h3>
      </section>

      {/* Show message if no customer service data exists */}
      {!hasData && (
        <section className="my-6 bg-yellow-100 p-4 rounded-lg">
          <p className="text-yellow-700">
            No customer service data found. Please enter both WhatsApp and Telegram links.
          </p>
        </section>
      )}

      {/* Form to create or update customer service URLs */}
      <section className="my-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Telegram URL */}
          <div>
            <h1 className="mb-2 font-bold">Telegram URL</h1>
            <Input
              placeholder="Enter Telegram URL"
              value={telegramUrl}
              onChange={(e) => setTelegramUrl(e.target.value)}
              required
            />
          </div>

          {/* WhatsApp URL */}
          <div>
            <h1 className="mb-2 font-bold">WhatsApp URL</h1>
            <Input
              placeholder="Enter WhatsApp URL"
              value={whatsappUrl}
              onChange={(e) => setWhatsappUrl(e.target.value)}
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Submit Button */}
          <div className="flex justify-end mt-3">
            <Button className="bg-mainColor px-4" type="submit" disabled={loading}>
              {loading ? 'Saving...' : hasData ? 'Update' : 'Create'}
            </Button>
          </div>
        </form>
      </section>
    </section>
  );
};

export default CustomerServiceClient;
