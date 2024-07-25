import { SignIn, ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function SignInPage() {
  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2'>
      {/* FIRST COLUMN */}
      <div className='h-full lg:flex flex-col items-center justify-center px-4'>
        <div className='text-center space-y-4 pt-16'>
          <h1 className='text-3xl font-bold text-gray-600'>Welcome Back!</h1>
          <p className='text-base text-[#7e8ca0]'>
            Log in or Create account to get back to your dashboard
          </p>
        </div>
        <div className='flex items-center justify-center mt-8'>
          <ClerkLoaded>
            <SignIn />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className='animate-spin text-muted-foreground h-8 w-8' />
          </ClerkLoading>
        </div>
      </div>
      {/* SECOND COLUMN */}
      <div className='h-full  bg-sky-600 hidden lg:flex flex-col items-center justify-center'>
        <Image src='/logo.svg' alt='logo' width={150} height={150} />
        <p>Secured by Beekeeper Software</p>
      </div>
    </div>
  );
}
