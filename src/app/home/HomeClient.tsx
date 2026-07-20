'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Navigation from '@/components/ui/Navigation';
import { getAssetPath } from '@/lib/basePath';

const MYRA_BIRTHDAY_MONTH = 9; // October (0-indexed)
const MYRA_BIRTHDAY_DAY = 5;
const MYRA_BIRTHDAY_HOUR = 5; // 5 AM
const MYRA_NAME = 'Myra ji';

function getNextBirthday(): Date {
  const now = new Date();
  const thisYear = now.getFullYear();
  let birthday = new Date(thisYear, MYRA_BIRTHDAY_MONTH, MYRA_BIRTHDAY_DAY, MYRA_BIRTHDAY_HOUR, 0, 0);

  if (now > birthday) {
    birthday = new Date(thisYear + 1, MYRA_BIRTHDAY_MONTH, MYRA_BIRTHDAY_DAY, MYRA_BIRTHDAY_HOUR, 0, 0);
  }

  return birthday;
}

function getTimeUntil(target: Date) {
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isBirthday: true };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds, isBirthday: false };
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 6) return 'Good night';
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  if (hour < 21) return 'Good evening';
  return 'Good night';
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="glass rounded-2xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center shadow-soft">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-crimson)] text-sukuun-text"
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </div>
      <span className="text-[10px] sm:text-xs text-sukuun-text-light mt-2 tracking-widest uppercase font-medium">
        {label}
      </span>
    </div>
  );
}

function FeatureCard({
  href,
  icon,
  title,
  description,
  gradient,
  delay,
}: {
  href: string;
  icon: string;
  title: string;
  description: string;
  gradient: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={href} className="block group">
        <div className="glass rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group-hover:ring-1 group-hover:ring-sukuun-pink/30">
          <div
            className={`w-12 h-12 rounded-xl ${gradient} flex items-center justify-center text-xl mb-4 shadow-sm`}
          >
            {icon}
          </div>
          <h3 className="text-base font-semibold text-sukuun-text mb-1 font-[family-name:var(--font-crimson)]">
            {title}
          </h3>
          <p className="text-sm text-sukuun-text-light leading-relaxed">
            {description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export default function HomeClient() {
  const [countdown, setCountdown] = useState(getTimeUntil(getNextBirthday()));
  const nextBirthday = useMemo(() => getNextBirthday(), []);
  const greeting = useMemo(() => getGreeting(), []);

  // Audio state for front page popup player
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [showAutoPopup, setShowAutoPopup] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getTimeUntil(nextBirthday));
    }, 1000);
    return () => clearInterval(interval);
  }, [nextBirthday]);

  const togglePlayAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().then(() => setIsPlayingAudio(true)).catch(() => setIsPlayingAudio(false));
    }
  };

  const handleAudioTimeUpdate = () => {
    if (audioRef.current && audioRef.current.duration) {
      setAudioProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
    }
  };

  const features = [
    {
      href: '/calendar',
      icon: '📅',
      title: 'Calendar',
      description: 'Track important dates & cycles',
      gradient: 'bg-gradient-to-br from-sukuun-rose to-sukuun-pink',
    },
    {
      href: '/unki-aawaj',
      icon: '🎙️',
      title: 'Unki Aawaj',
      description: 'Voice notes & audio recordings',
      gradient: 'bg-gradient-to-br from-sukuun-rose-deep to-sukuun-pink-deep',
    },
    {
      href: '/memories',
      icon: '💝',
      title: 'Memories',
      description: 'Our precious moments together',
      gradient: 'bg-gradient-to-br from-sukuun-pink to-sukuun-lavender',
    },
    {
      href: '/gallery',
      icon: '📸',
      title: 'Gallery',
      description: 'Photos & Videos',
      gradient: 'bg-gradient-to-br from-sukuun-lavender to-sukuun-blue',
    },
    {
      href: '/stories',
      icon: '📖',
      title: 'Stories',
      description: 'Written words from the heart',
      gradient: 'bg-gradient-to-br from-sukuun-blue to-sukuun-rose',
    },
  ];

  return (
    <div className="min-h-dvh pb-28 relative overflow-hidden bg-sukuun-cream">
      {/* Background Ambient Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-sukuun-rose/20 blur-[120px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-[30%] left-0 w-[400px] h-[400px] rounded-full bg-sukuun-lavender/20 blur-[100px] -translate-x-1/3" />
      <div className="absolute top-[40%] right-[20%] w-[300px] h-[300px] rounded-full bg-sukuun-pink/15 blur-[80px]" />

      {/* Hidden Audio Tag for Best Thing Voice Note */}
      <audio
        ref={audioRef}
        src={getAssetPath('/audio/vn-bestthing.mp4')}
        onTimeUpdate={handleAudioTimeUpdate}
        onEnded={() => setIsPlayingAudio(false)}
      />

      {/* Auto Welcome Popup Modal for Best Thing Voice Note */}
      <AnimatePresence>
        {showAutoPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-w-sm w-full glass-strong rounded-3xl p-6 sm:p-8 shadow-2xl text-center border border-sukuun-rose/40 overflow-hidden"
            >
              <button
                onClick={() => {
                  if (audioRef.current) audioRef.current.pause();
                  setIsPlayingAudio(false);
                  setShowAutoPopup(false);
                }}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors text-xs font-semibold"
              >
                ✕
              </button>

              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-sukuun-rose-deep via-sukuun-pink-deep to-sukuun-lavender-deep text-white flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg animate-pulse">
                🎙️
              </div>

              <span className="text-[10px] font-bold uppercase tracking-widest text-sukuun-rose-deep bg-sukuun-rose/30 px-3 py-1 rounded-full">
                Welcome to Sukuun 🌟
              </span>

              <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-crimson)] text-sukuun-text mt-3 mb-1">
                Best Thing ♡
              </h2>

              <p className="text-xs text-sukuun-text-light italic font-[family-name:var(--font-crimson)] mb-6">
                "A special voice recording saved just for you..."
              </p>

              {/* Glowing Play Button */}
              <div className="flex flex-col items-center gap-4 mb-6">
                <button
                  onClick={togglePlayAudio}
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-sukuun-rose-deep via-sukuun-pink-deep to-sukuun-lavender-deep text-white flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all text-3xl ring-4 ring-sukuun-pink/40"
                >
                  {isPlayingAudio ? '⏸' : '▶'}
                </button>

                {/* Progress bar */}
                <div className="w-full h-1.5 bg-sukuun-rose/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-sukuun-rose-deep transition-all duration-300"
                    style={{ width: `${audioProgress}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  setShowAutoPopup(false);
                }}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-sukuun-rose-deep to-sukuun-pink-deep text-white text-xs font-semibold tracking-wide shadow-md hover:shadow-lg transition-all"
              >
                Enter Sukuun ♡
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 max-w-lg mx-auto px-5 pt-10 sm:pt-14">
        {/* Greeting & Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-2"
        >
          <p className="text-sukuun-text-light text-xs uppercase tracking-widest font-semibold">
            {greeting},
          </p>
        </motion.div>

        {/* Myra ji Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-4"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold font-[family-name:var(--font-crimson)] text-sukuun-text leading-tight tracking-tight">
            {MYRA_NAME}
          </h1>
          <div className="h-1 w-20 bg-gradient-to-r from-sukuun-rose-deep via-sukuun-pink-deep to-sukuun-lavender-deep rounded-full mt-2 origin-left" />
        </motion.div>

        {/* Circular Avatar Photo beneath Myra ji on Left side of screen */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex items-center gap-4 mb-6"
        >
          {/* Circular Photo Frame on Left */}
          <div className="relative group flex-shrink-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-sukuun-rose-deep via-sukuun-pink-deep to-sukuun-lavender-deep rounded-full blur opacity-70 group-hover:opacity-100 transition duration-500" />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden glass-strong border-2 border-white shadow-lg">
              <img
                src={getAssetPath('/images/myra-portrait.jpg')}
                alt="Myra ji"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Subtitle Quote on Right of Circle */}
          <div>
            <p className="text-sm font-[family-name:var(--font-crimson)] text-sukuun-text font-medium leading-snug italic">
              "Every moment with you is a memory worth keeping ♡"
            </p>
            <p className="text-[11px] text-sukuun-text-light mt-1 font-semibold tracking-wide">
              Welcome to Sukuun
            </p>
          </div>
        </motion.div>

        {/* Front Page Audio Card: Best Thing ♡ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mb-8 p-5 rounded-3xl bg-gradient-to-r from-sukuun-rose/30 via-sukuun-pink/30 to-sukuun-lavender/30 border border-sukuun-rose/40 shadow-soft relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm">🌟</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-sukuun-rose-deep bg-white/70 px-2.5 py-0.5 rounded-full">
                Front Page Voice Note
              </span>
            </div>
            <span className="text-[10px] text-sukuun-text-light font-semibold">
              Tap to Play
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold font-[family-name:var(--font-crimson)] text-sukuun-text">
                Best Thing ♡
              </h3>
              <p className="text-xs text-sukuun-text-light italic">
                "Her voice recording saved for Myra ji ✨"
              </p>
            </div>

            <button
              onClick={togglePlayAudio}
              className="w-12 h-12 rounded-full bg-gradient-to-r from-sukuun-rose-deep to-sukuun-pink-deep text-white flex items-center justify-center shadow-md hover:shadow-lg active:scale-95 transition-all text-xl flex-shrink-0"
            >
              {isPlayingAudio ? '⏸' : '▶'}
            </button>
          </div>

          {/* Simple Progress Bar */}
          <div className="w-full h-1.5 bg-white/60 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sukuun-rose-deep to-sukuun-pink-deep transition-all duration-300"
              style={{ width: `${audioProgress}%` }}
            />
          </div>
        </motion.div>

        {/* Birthday Countdown Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="mb-8"
        >
          <div className="glass-strong rounded-3xl p-6 sm:p-8 shadow-soft border border-sukuun-rose/30">
            {countdown.isBirthday ? (
              <div className="text-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-5xl mb-4"
                >
                  🎂
                </motion.div>
                <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-crimson)] text-sukuun-text mb-2">
                  Happy Birthday!
                </h2>
                <p className="text-sukuun-text-light">
                  Today is your special day, Myra ji ♡
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-5 justify-center">
                  <span className="text-lg">🎂</span>
                  <h2 className="text-base font-semibold text-sukuun-text font-[family-name:var(--font-crimson)]">
                    Birthday Countdown
                  </h2>
                </div>

                <div className="flex items-center justify-center gap-3 sm:gap-5">
                  <CountdownUnit value={countdown.days} label="Days" />
                  <span className="text-2xl text-sukuun-gray-dark font-light mt-[-20px]">:</span>
                  <CountdownUnit value={countdown.hours} label="Hours" />
                  <span className="text-2xl text-sukuun-gray-dark font-light mt-[-20px]">:</span>
                  <CountdownUnit value={countdown.minutes} label="Min" />
                  <span className="text-2xl text-sukuun-gray-dark font-light mt-[-20px]">:</span>
                  <CountdownUnit value={countdown.seconds} label="Sec" />
                </div>

                <p className="text-center text-xs text-sukuun-text-light mt-4 tracking-wide">
                  October 5 · 5:00 AM ✦ The day the world got brighter
                </p>
              </>
            )}
          </div>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.href}
              {...feature}
              delay={0.6 + i * 0.1}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="text-center text-xs text-sukuun-gray-dark/50 mt-10 tracking-widest"
        >
          SUKUUN · made with love ♡
        </motion.p>
      </div>

      <Navigation />
    </div>
  );
}
