'use client';

import { useActionState, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { login } from '../actions/auth';

// Floating petal component
function Petal({ delay, left, size, duration }: {
  delay: number;
  left: string;
  size: number;
  duration: number;
}) {
  return (
    <div
      className="petal"
      style={{
        left,
        width: `${size}px`,
        height: `${size}px`,
        background: `linear-gradient(135deg, rgba(245, 224, 224, 0.6), rgba(240, 217, 232, 0.4))`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        top: '-20px',
      }}
    />
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(login, {
    success: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.success) {
      router.push('/home');
    }
  }, [state.success, router]);

  // Generate random petals
  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    delay: Math.random() * 8,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 12 + 6,
    duration: Math.random() * 6 + 8,
  }));

  return (
    <div className="min-h-dvh flex items-center justify-center relative overflow-hidden bg-gradient-sukuun">
      {/* Floating petals */}
      {petals.map((petal) => (
        <Petal key={petal.id} {...petal} />
      ))}

      {/* Ambient glow orbs */}
      <div className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-sukuun-rose/30 blur-[80px] animate-pulse-soft" />
      <div className="absolute bottom-[20%] right-[10%] w-80 h-80 rounded-full bg-sukuun-lavender/30 blur-[100px] animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-[60%] left-[50%] w-48 h-48 rounded-full bg-sukuun-pink/20 blur-[60px] animate-pulse-soft" style={{ animationDelay: '3s' }} />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="glass-strong rounded-3xl p-8 sm:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          {/* Logo / Branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center mb-10"
          >
            {/* Decorative heart */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block mb-4"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sukuun-rose to-sukuun-pink flex items-center justify-center shadow-glow-rose mx-auto">
                <span className="text-2xl">♡</span>
              </div>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight font-[family-name:var(--font-crimson)] text-sukuun-text">
              Sukuun
            </h1>
            <p className="text-sukuun-text-light text-sm mt-2 tracking-wide">
              a space made with love
            </p>
          </motion.div>

          {/* Login Form */}
          <motion.form
            action={formAction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-6"
          >
            {/* Password Input */}
            <div className="relative">
              <div
                className={`relative rounded-2xl transition-all duration-300 ${
                  isFocused
                    ? 'ring-2 ring-sukuun-pink/50 shadow-glow-pink'
                    : 'ring-1 ring-sukuun-gray/40'
                }`}
              >
                <input
                  ref={inputRef}
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter the secret word..."
                  autoComplete="current-password"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="w-full bg-white/60 rounded-2xl px-5 py-4 pr-12 text-sukuun-text placeholder:text-sukuun-gray-dark/60 outline-none text-base tracking-wide"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sukuun-gray-dark hover:text-sukuun-text transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {state.error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-sm text-sukuun-period-red text-center"
                >
                  {state.error}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isPending}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-sukuun-rose-deep via-sukuun-pink-deep to-sukuun-lavender-deep text-white font-medium text-base tracking-wide shadow-lg shadow-sukuun-pink/30 hover:shadow-xl hover:shadow-sukuun-pink/40 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Opening...
                </span>
              ) : (
                'Enter ♡'
              )}
            </motion.button>
          </motion.form>

          {/* Bottom decoration */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-8 text-center"
          >
            <p className="text-xs text-sukuun-gray-dark/60 tracking-widest uppercase">
              made with ♡ for you
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
