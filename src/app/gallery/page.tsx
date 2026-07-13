import { redirect } from 'next/navigation';
import { isAuthenticated } from '../actions/auth';
import Navigation from '@/components/ui/Navigation';

export default async function GalleryPage() {
  const authed = await isAuthenticated();
  if (!authed) redirect('/login');

  return (
    <div className="min-h-dvh pb-28 relative overflow-hidden bg-sukuun-cream">
      <div className="max-w-lg mx-auto px-5 pt-12 sm:pt-16">
        <h1 className="text-4xl font-bold font-[family-name:var(--font-crimson)] text-sukuun-text mb-2">
          Gallery
        </h1>
        <p className="text-sukuun-text-light text-sm mb-8">
          Captured smiles and beautiful days ♡
        </p>

        <div className="glass-strong rounded-3xl p-8 text-center shadow-soft">
          <div className="text-4xl mb-4">📸</div>
          <h2 className="text-xl font-semibold font-[family-name:var(--font-crimson)] text-sukuun-text mb-2">
            Photo Gallery
          </h2>
          <p className="text-sm text-sukuun-text-light">
            Photos of Myra ji can be uploaded and organized here.
          </p>
        </div>
      </div>
      <Navigation />
    </div>
  );
}
