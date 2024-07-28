import HeaderLogo from '@/components/header-logo';
import Navigation from '@/components/navigation';
import ThemeToggle from '@/components/theme-toggle';
import { UserButton, ClerkLoading, ClerkLoaded } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';
import WelcomeMessage from '@/components/welcome-message';

export default function Header() {
  return (
    <header
      className='bg-gradient-to-b from-neutral-900 
    to-neutral-800 px-6 py-8 lg:px-14 pb-36'
    >
      <div className='max-w-screen-2xl mx-auto'>
        <div className='w-full flex items-center justify-between mb-14'>
          <div className='flex items-center lg:gap-x-16'>
            <HeaderLogo />
            <Navigation />
          </div>
          <div className=''>
            <ClerkLoaded>
              <ThemeToggle />
              <UserButton />
            </ClerkLoaded>
            <ClerkLoading>
              <Loader2 className='size-8 animate-spin text-slate-400' />
            </ClerkLoading>
          </div>
        </div>
        <WelcomeMessage />
      </div>
    </header>
  );
}
