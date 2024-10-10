import { authOptions } from '@/lib/config/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

const Home = async() => {
    const session = await getServerSession(authOptions);

    if (session && session.user.isAdmin) {
      return redirect('/admin/dashboard/users'); // Or any other route you want to redirect non-admin users to
    }else if(session && session.user.isAdmin){
      return redirect('/investor/dashboard/profile');
    }
  return (
    <div>Home</div>
  )
}

export default Home