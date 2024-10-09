import { LoginForm } from '@/components/custom/LoginForm';
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';

const LoginPage = async () => {
  const session = await getServerSession();

  // Check if the user is already signed in
  if (session) {
    // Redirect to the user's dashboard if authenticated
    redirect('/investor/dashboard/profile');
  }

  return (
    <section className="flex flex-col w-full h-screen justify-center items-center">
      <LoginForm />
    </section>
  );
};

export default LoginPage;
