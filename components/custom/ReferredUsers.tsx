import React, { useEffect, useState } from 'react';
import { getReferredUsers } from '@/lib/actions/user.actions'; // Import server action

interface Props {
  userId: string | null;
}

const ReferredUsers: React.FC<Props> = ({ userId }) => {
  const [referredUsers, setReferredUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReferredUsers = async () => {
      try {
        if (!userId) return;
        setLoading(true);
        const users = await getReferredUsers(userId);
        setReferredUsers(users);
      } catch (error: any) {
        console.error("Error fetching referred users:", error);
        setError(error.message || "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchReferredUsers();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="p-4 border border-gray-200 rounded-lg my-6">
      <h2 className="text-xl font-bold mb-4">Referred Users</h2>
      {referredUsers.length > 0 ? (
        referredUsers.map((user, index) => (
        //   <div key={index} className="mb-2">
        //     <p>{user.username || 'Anonymous User'}</p>
        //     <p>{user.email || 'Anonymous User'}</p>
        //   </div>
          <div key={index} className="mb-4 p-4 bg-white border rounded-lg hover:shadow-sm transition-shadow duration-200">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold text-gray-800">{user.username || 'Anonymous User'}</p>
              <p className="text-sm text-gray-500">{user.email || 'No email provided'}</p>
            </div>
          </div>
        </div>
        ))
      ) : (
        <p>No referred users found</p>
      )}
    </section>
  );
};

export default ReferredUsers;
