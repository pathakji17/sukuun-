'use client';

import ClientAuthGuard from '@/components/ui/ClientAuthGuard';
import HomeClient from './HomeClient';

export default function HomePage() {
  return (
    <ClientAuthGuard>
      <HomeClient />
    </ClientAuthGuard>
  );
}
