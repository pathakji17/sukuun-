'use client';

import ClientAuthGuard from '@/components/ui/ClientAuthGuard';
import Navigation from '@/components/ui/Navigation';

export default function MemoriesPage() {
  return (
    <ClientAuthGuard>
      <div className="min-h-dvh pb-28 relative overflow-hidden bg-sukuun-cream">
        <div className="max-w-lg mx-auto px-5 pt-12 sm:pt-16">
          <h1 className="text-4xl font-bold font-[family-name:var(--font-crimson)] text-sukuun-text mb-2">
            Memories
          </h1>
          <p className="text-sukuun-text-light text-sm mb-8">
            A collection of our special moments together ♡
          </p>

          <div className="glass-strong rounded-3xl p-8 text-center shadow-soft">
            <div className="text-4xl mb-4">💝</div>
            <h2 className="text-xl font-semibold font-[family-name:var(--font-crimson)] text-sukuun-text mb-2">
              Memories Vault
            </h2>
            <p className="text-sm text-sukuun-text-light">
              Memories and special moments can be added here anytime.
            </p>
          </div>
        </div>
        <Navigation />
      </div>
    </ClientAuthGuard>
  );
}
