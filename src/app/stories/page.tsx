'use client';

import ClientAuthGuard from '@/components/ui/ClientAuthGuard';
import StoriesClient from './StoriesClient';

export default function StoriesPage() {
  return (
    <ClientAuthGuard>
      <StoriesClient />
    </ClientAuthGuard>
  );
}
