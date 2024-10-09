// components/custom/DeleteTaskGroupButton.tsx

'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { IoTrashBin } from 'react-icons/io5';

// Import the server action directly
import { deleteTaskGroupAction } from '@/lib/actions/taskGroup.action'; // Ensure this path is correct
import { FiTrash2 } from 'react-icons/fi';

interface DeleteTaskGroupButtonProps {
  id: string;
}

const DeleteTaskGroupButton: React.FC<DeleteTaskGroupButtonProps> = ({ id }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/taskgroup/delete?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete task group');
      }

      // Refresh the page after successful deletion
      window.location.reload();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button 
        variant="ghost" 
        onClick={handleDelete} 
        disabled={loading}
        className="flex items-center gap-2"
      >
         <FiTrash2 className="text-gray-500" size={20} />
        
      </Button>
      {error && <p className="text-red-500 text-sm">{error}</p>} {/* Show error message if any */}
    </>
  );
};

export default DeleteTaskGroupButton;
