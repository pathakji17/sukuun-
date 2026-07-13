'use client';

import ClientAuthGuard from '@/components/ui/ClientAuthGuard';
import Navigation from '@/components/ui/Navigation';

export default function StoriesPage() {
  return (
    <ClientAuthGuard>
      <div className="min-h-dvh pb-28 relative overflow-hidden bg-sukuun-cream">
        <div className="max-w-lg mx-auto px-5 pt-12 sm:pt-16">
          <h1 className="text-4xl font-bold font-[family-name:var(--font-crimson)] text-sukuun-text mb-2">
            Stories
          </h1>
          <p className="text-sukuun-text-light text-sm mb-8">
            Chapters written for you ♡
          </p>

          <div className="glass-strong rounded-3xl p-8 text-center shadow-soft">
            <div className="text-4xl mb-4">📖</div>
            <h2 className="text-xl font-semibold font-[family-name:var(--font-crimson)] text-sukuun-text mb-2">
              Our Story Reader
            </h2>
            <p className="text-sm text-sukuun-text-light">
              Read and edit stories written for Myra ji.
            </p>
          </div>
        </div>
        <Navigation />
      </div>
    </ClientAuthGuard>
  );
}
