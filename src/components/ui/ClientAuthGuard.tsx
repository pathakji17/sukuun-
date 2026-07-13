'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isUserAuthenticated } from '@/lib/clientAuth';

export default function ClientAuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!isUserAuthenticated()) {
      router.push('/login');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  if (!isAuthorized) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-sukuun-cream">
        <div className="text-sukuun-text-light text-sm animate-pulse">Loading sukuun ♡...</div>
      </div>
    );
  }

  return <>{children}</>;
}
