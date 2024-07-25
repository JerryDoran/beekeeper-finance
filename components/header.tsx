import HeaderLogo from '@/components/header-logo';
import Navigation from '@/components/navigation';
import ThemeToggle from '@/components/theme-toggle';
import { UserButton } from '@clerk/nextjs';

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
            <ThemeToggle />
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
}
