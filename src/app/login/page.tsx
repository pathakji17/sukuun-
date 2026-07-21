'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Special password for Myra ji
    if (password === '11juneshaluji') {
      localStorage.setItem('sukuun_auth', 'true');
      router.push('/home');
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center p-4 relative overflow-hidden bg-sukuun-cream">
      {/* Background Ambient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-sukuun-rose/30 blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-sukuun-lavender/30 blur-[100px] animate-pulse" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm glass-strong rounded-3xl p-8 shadow-soft border border-sukuun-rose/30 relative z-10 text-center"
      >
        {/* Heart Icon Header */}
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sukuun-rose-deep to-sukuun-pink-deep flex items-center justify-center text-white text-2xl mx-auto mb-6 shadow-md"
        >
          ♡
        </motion.div>

        <h1 className="text-3xl font-bold font-[family-name:var(--font-crimson)] text-sukuun-text mb-2">
          Sukuun
        </h1>
        <p className="text-xs text-sukuun-text-light mb-8 tracking-wide font-medium">
          Enter the secret key to unlock your space ✨
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <input
              type="password"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full bg-white/70 rounded-2xl px-5 py-3.5 text-sm text-sukuun-text placeholder:text-sukuun-text-light/50 outline-none transition-all duration-300 ring-1 ${
                error
                  ? 'ring-rose-500 bg-rose-50/50'
                  : 'ring-sukuun-rose/30 focus:ring-sukuun-rose-deep focus:bg-white'
              }`}
            />
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[11px] text-rose-500 font-medium mt-1.5 text-left pl-2"
              >
                Incorrect key. Please try again ♡
              </motion.p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sukuun-rose-deep via-sukuun-pink-deep to-sukuun-lavender-deep text-white font-semibold text-xs tracking-wider uppercase shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-300"
          >
            Open Sukuun
          </button>
        </form>

        <div className="mt-8 text-[11px] text-sukuun-text-light/70 font-medium">
          For Myra ji · a space made with care
        </div>
      </motion.div>
    </div>
  );
}
