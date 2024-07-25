import ThemeToggle from '@/components/theme-toggle';


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <div className='relative'>
      {children}
      <div className='absolute right-5 top-5'>
        <ThemeToggle />
      </div>
    </div>
  );
}
