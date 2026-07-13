'use client';

import ClientAuthGuard from '@/components/ui/ClientAuthGuard';
import GalleryClient from './GalleryClient';

export default function GalleryPage() {
  return (
    <ClientAuthGuard>
      <GalleryClient />
    </ClientAuthGuard>
  );
}
