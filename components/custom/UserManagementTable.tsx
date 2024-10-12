"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MdEdit, MdDelete } from "react-icons/md";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { deleteUserAction } from "@/lib/actions/user.actions";
import { useState, useTransition } from "react";

// Define the User interface
interface User {
  _id: string
  username: string;
  email: string;
}

// Define the props for UserManagementTable component
interface UserManagementTableProps {
  users: User[];
  totalPages: number;
  currentPage: number;
}

const UserManagementTable: React.FC<UserManagementTableProps> = ({ users, totalPages, currentPage }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const handleDeleteClick = (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return; // Confirm the delete action
    
    setLoading(id); // Set loading state for this specific user
    
    startTransition(async () => {
      try {
        await deleteUserAction(id); // Call server action to delete the user
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user. Please try again.");
      } finally {
        setLoading(null); // Reset the loading state
      }
    });
  };

  const handleViewClick = (id: string) => {
    router.push(`/admin/dashboard/users/${id}`)
  };
  return (
    <div className="w-full">
      <div className="overflow-auto">
        <Table className="min-w-full border-collapse">
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="px-6 py-4 text-left text-gray-600">Name</TableHead>
              <TableHead className="px-6 py-4 text-left text-gray-600">Email</TableHead>
              <TableHead className="px-6 py-4 text-center text-gray-600">Action</TableHead>
              <TableHead className="px-6 py-4 text-center text-gray-600">View</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index} className="bg-gray-50 hover:bg-gray-100">
                <TableCell className="flex items-center px-6 py-4 whitespace-nowrap">
                  <span className="font-medium text-gray-900">{user.username}</span>
                </TableCell>
                <TableCell className="px-6 py-4 font-medium text-gray-900">{user.email}</TableCell>
                <TableCell className="px-6 py-4 text-center">
                  <div className="flex justify-center space-x-2">
                    
                  <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteClick(user._id)}
                      disabled={loading === user._id || isPending} // Disable if loading or pending
                    >
                      {loading === user._id ? "Deleting..." : <MdDelete className="text-gray-500" size={20} />}
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="px-6 py-4 text-center">
                  <Button variant="ghost" size="sm" onClick={()=> handleViewClick(user._id) }>
                    <AiOutlineArrowRight className="text-gray-500" size={20} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination Controls */}
        <div className="flex justify-center my-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index}
              variant={currentPage === index + 1 ? 'default' : 'outline'}
              onClick={() => window.location.href = `?page=${index + 1}`} // Change page
              className="mx-1"
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserManagementTable;

