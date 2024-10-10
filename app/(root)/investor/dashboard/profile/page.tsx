import Profile from '@/components/custom/ProfileClientComponent'
import { authOptions } from '@/lib/config/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

const ProfileMain = async() => {
  
  const session = await getServerSession(authOptions);

  if (session && session.user.isAdmin) {
    redirect('/admin/dashboard/users'); 
  }
  return (
    <Profile/>
  )
}

export default ProfileMain