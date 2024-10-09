"use client"
import ActiveTaskComponent from '@/components/custom/ActiveTaskComponent'
import UserProfile from '@/components/custom/UserProfile'
import UserTaskAssignment from '@/components/custom/UserTaskAssignment'
import { Button } from '@/components/ui/button'
import { resetUserPassword } from '@/lib/actions/user.actions'
import React, { useState } from 'react'
import { IoRefreshCircle } from 'react-icons/io5'

interface Params {
    params:{
      id : string
    }
  }

const UserDetails = ({params}:Params) => {
const userId = params.id

const [resetLoading, setResetLoading] = useState(false) // Track loading state
const [resetSuccess, setResetSuccess] = useState<string | null>(null) // Track success message

// Handle reset password button click
const handleResetPassword = async () => {
  setResetLoading(true)
  setResetSuccess(null)
  
  try {
    await resetUserPassword(userId) // Call the reset password action
    setResetSuccess('Password reset successfully to qwertyuiop@123') // Show success message
  } catch (error) {
    setResetSuccess('Failed to reset password')
    console.error('Error resetting password:', error)
  } finally {
    setResetLoading(false)
  }
}
  return (
    <section className="flex flex-col md:w-10/12 lg:w-8/12">
        <section className="flex flex-col mb-7">
            <section className="flex justify-between">
                <h1 className="text-2xl font-extrabold">User Detail</h1>
                
            </section>
        </section>
        <UserProfile userId={userId}/>
        <UserTaskAssignment userId={userId}/>
        <ActiveTaskComponent userId={userId} />
         
         {/* Reset Password Section */}
            <section className="my-6 ">
                <h2 className="font-bold text-lg mb-3">Account Actions</h2>
                <Button 
                className="bg-red-500 flex items-center gap-2" 
                onClick={handleResetPassword} 
                disabled={resetLoading}
                >
                {resetLoading ? 'Resetting...' : <><IoRefreshCircle /> Reset Password</>}
                </Button>
                {resetSuccess && <p className="mt-2 text-sm text-green-600">{resetSuccess}</p>}
            </section>
            
    </section>
  )
}

export default UserDetails