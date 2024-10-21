"use client";
import { useEffect, useState } from 'react';
import { changePassword } from '@/lib/actions/user.actions'; // Ensure the correct import path
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const AccountSettings = () => {
  const [userId, setUserId] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch the userId from the session on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call the server action to get user session
        const sessionRes = await fetch("/api/auth/session");
        const sessionData = await sessionRes.json();
        const id = sessionData?.user?.id || null;
        setUserId(id);
      } catch (error) {
        console.error('Error fetching user session:', error);
      }
    };

    fetchData();
  }, []);

  const handleChangePassword = async () => {
    setError('');
    setSuccess('');

    // Validate password inputs
    if (newPassword !== confirmPassword) {
      setError("New password and confirmation don't match.");
      return;
    }

    try {
      // Ensure userId is available
      if (!userId) {
        setError('User not found. Please log in again.');
        return;
      }

      // Call the resetUserPassword function
      const response = await changePassword(userId, newPassword);
      if (response.success) {
        setSuccess('Password changed successfully!');
        // Reset the input fields
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError(response.message || 'Failed to change password. Please try again.');
      }
    } catch (err) {
      setError('Failed to change password. Please try again.');
    }
  };

  return (
    <section className="w-full max-w-md mx-auto p-4 border rounded-lg bg-white shadow-md">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <Input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="mb-3"
      />
      <Input
        type="password"
        placeholder="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="mb-3"
      />
      <Button onClick={handleChangePassword} className="bg-mainColor text-white">
        Change Password
      </Button>
    </section>
  );
};

export default AccountSettings;
