'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isUserAuthenticated } from '@/lib/clientAuth';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    if (isUserAuthenticated()) {
      router.push('/home');
    } else {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-dvh flex items-center justify-center bg-sukuun-cream text-sukuun-text-light text-sm">
      Loading sukuun ♡...
    </div>
  );
}
