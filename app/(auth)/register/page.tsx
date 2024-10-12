import { RegisterForm } from '@/components/custom/RegisterForm'
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react'

const RegisterPage = async({ searchParams }: { searchParams: any }) => {
  const referralCode = searchParams.ref

  return (
   <section className="flex flex-col w-full h-screen justify-center items-center">
        <RegisterForm referralCode={referralCode}/>
   </section>
  )
}

export default RegisterPage