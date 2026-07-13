'use client';

import ClientAuthGuard from '@/components/ui/ClientAuthGuard';
import CalendarClient from './CalendarClient';

export default function CalendarPage() {
  return (
    <ClientAuthGuard>
      <CalendarClient />
    </ClientAuthGuard>
  );
}
