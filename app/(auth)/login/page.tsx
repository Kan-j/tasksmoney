import { LoginForm } from '@/components/custom/LoginForm';
import { authOptions } from '@/lib/config/authOptions';
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';

const LoginPage = async () => {


  const session = await getServerSession(authOptions);
    
  // if (session && session.user.isAdmin) {
  //   return redirect('/admin/dashboard/users'); // Or any other route you want to redirect non-admin users to
  // }else if(session && !session.user.isAdmin){
  //   return redirect('/investor/dashboard/profile');
  // }

  return (
    <section className="flex flex-col w-full h-screen justify-center items-center">
      <LoginForm />
    </section>
  );
};

export default LoginPage;
