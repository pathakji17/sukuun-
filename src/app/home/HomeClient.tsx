'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getTimeUntil(nextBirthday));
    }, 1000);
    return () => clearInterval(interval);
  }, [nextBirthday]);

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

      <div className="relative z-10 max-w-lg mx-auto px-5 pt-10 sm:pt-14">
        {/* Top Greeting & Premium Portrait Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 text-center flex flex-col items-center"
        >
          <p className="text-sukuun-text-light text-xs uppercase tracking-widest font-semibold mb-4">
            {greeting},
          </p>

          {/* Featured Portrait Photo Frame with Soft Romantic Glow */}
          <div className="relative mb-6 group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-sukuun-rose-deep via-sukuun-pink-deep to-sukuun-lavender-deep rounded-3xl blur-md opacity-75 group-hover:opacity-100 transition duration-500" />
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative w-44 h-56 sm:w-52 sm:h-64 rounded-3xl overflow-hidden glass-strong shadow-2xl border-2 border-white/60"
            >
              <img
                src={getAssetPath('/images/myra-portrait.jpg')}
                alt="Myra ji Portrait"
                className="w-full h-full object-cover object-top"
              />
            </motion.div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-[family-name:var(--font-crimson)] text-sukuun-text leading-tight tracking-tight">
            {MYRA_NAME}
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="h-1 w-16 bg-gradient-to-r from-sukuun-rose-deep via-sukuun-pink-deep to-sukuun-lavender-deep rounded-full mt-3 origin-center"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-sukuun-text-light text-sm mt-3 tracking-wide italic font-[family-name:var(--font-crimson)]"
          >
            "Every moment with you is a memory worth keeping ♡"
          </motion.p>
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
