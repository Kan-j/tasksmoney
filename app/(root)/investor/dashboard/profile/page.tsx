import Profile from '@/components/custom/ProfileClientComponent'
import { authOptions } from '@/lib/config/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

const ProfileMain = async() => {

  return (
    <Profile/>
  )
}

export default ProfileMain