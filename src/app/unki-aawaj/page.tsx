'use client';

import ClientAuthGuard from '@/components/ui/ClientAuthGuard';
import UnkiAawajClient from './UnkiAawajClient';

export default function UnkiAawajPage() {
  return (
    <ClientAuthGuard>
      <UnkiAawajClient />
    </ClientAuthGuard>
  );
}
