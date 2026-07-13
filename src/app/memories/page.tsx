'use client';

import ClientAuthGuard from '@/components/ui/ClientAuthGuard';
import MemoriesClient from './MemoriesClient';

export default function MemoriesPage() {
  return (
    <ClientAuthGuard>
      <MemoriesClient />
    </ClientAuthGuard>
  );
}
