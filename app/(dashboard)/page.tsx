'use client';

import { Button } from '@/components/ui/button';
import { useNewAccount } from '@/features/accounts/hooks/use-new-account';

export default function HomePage() {
  const { onOpen } = useNewAccount();

  return <div>Home</div>;
}
