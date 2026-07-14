'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/ui/Navigation';

interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  theme: string;
}

const chapters: Chapter[] = [
  {
    id: 1,
    title: 'Her Favorite Things',
    subtitle: 'All the little details that make her who she is ♡',
    badge: 'Chapter 1',
    icon: '🤎',
    theme: 'from-amber-500/20 to-sukuun-rose/30',
  },
  {
    id: 2,
    title: 'Call Timestamps of Ours',
    subtitle: 'Hours spent listening to her voice',
    badge: 'Chapter 2',
    icon: '📞',
    theme: 'from-sukuun-rose-deep/20 to-sukuun-pink-deep/30',
  },
  {
    id: 3,
    title: 'What She Has',
    subtitle: 'The little things she carries with her',
    badge: 'Chapter 3',
    icon: '💅',
    theme: 'from-sukuun-pink/30 to-sukuun-lavender/30',
  },
  {
    id: 4,
    title: 'What I Feel When She Speaks',
    subtitle: 'Words that heal my soul & make me feel precious',
    badge: 'Chapter 4',
    icon: '💖',
    theme: 'from-sukuun-rose/40 to-sukuun-pink/40',
  },
];

export default function StoriesClient() {
  const [activeChapterId, setActiveChapterId] = useState(1);

  const currentChapter = chapters.find((c) => c.id === activeChapterId) || chapters[0];

  const goNext = () => {
    if (activeChapterId < chapters.length) setActiveChapterId((prev) => prev + 1);
  };

  const goPrev = () => {
    if (activeChapterId > 1) setActiveChapterId((prev) => prev - 1);
  };

  return (
    <div className="min-h-dvh pb-28 relative overflow-hidden bg-sukuun-cream">
      {/* Ambient Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-sukuun-rose/20 blur-[120px] -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-[20%] left-0 w-[400px] h-[400px] rounded-full bg-sukuun-lavender/20 blur-[100px] -translate-x-1/3" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-2">
            <span className="text-sm">📖</span>
            <span className="text-xs font-semibold text-sukuun-text-light uppercase tracking-wider">
              Interactive Storybook
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-[family-name:var(--font-crimson)] text-sukuun-text">
            Stories for Myra ji
          </h1>
          <p className="text-sukuun-text-light text-xs sm:text-sm mt-1">
            Words that unfold line by line with every heartbeat ♡
          </p>
        </motion.div>

        {/* Chapter Tabs Selection */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none justify-start sm:justify-center">
          {chapters.map((ch) => {
            const isActive = ch.id === activeChapterId;
            return (
              <button
                key={ch.id}
                onClick={() => setActiveChapterId(ch.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-gradient-to-r from-sukuun-rose-deep to-sukuun-pink-deep text-white shadow-md scale-105'
                    : 'glass text-sukuun-text-light hover:text-sukuun-text'
                }`}
              >
                <span>{ch.icon}</span>
                <span>{ch.badge}</span>
              </button>
            );
          })}
        </div>

        {/* Story Card Container */}
        <div className="relative min-h-[520px]">
          <AnimatePresence mode="wait">
            {activeChapterId === 1 && (
              <motion.div
                key="ch-1"
                initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
                transition={{ duration: 0.5 }}
                className="glass-strong rounded-3xl p-6 sm:p-8 shadow-soft border border-sukuun-rose/30 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-sukuun-rose/20 pb-3 mb-2">
                  <span className="text-xs uppercase font-bold tracking-widest text-sukuun-rose-deep bg-sukuun-rose/30 px-3 py-1 rounded-full">
                    Chapter 1 🤎
                  </span>
                  <span className="text-xs text-sukuun-text-light font-medium">1 of 4</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-crimson)] text-sukuun-text">
                  Her Favorite Things
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    { title: 'Favorite Color', desc: 'Brown 🤎', icon: '🎨' },
                    { title: 'Favorite Routine', desc: 'Nahana 🚿', icon: '✨' },
                    { title: 'Little Secret', desc: 'Gets hungry quickly... 🍕', icon: '😋' },
                    { title: 'Favorite Fast Food', desc: 'Momos 🥟', icon: '🥟' },
                    { title: 'Favorite Fruit', desc: 'Mangoes 🥭', icon: '🥭' },
                    { title: 'Comfort Clothes', desc: 'Lower & T-shirt 👕', icon: '☁️' },
                    { title: 'Favorite Skincare', desc: 'Chemistry & Play facewash ✨', icon: '🧴' },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ delay: 0.15 * idx, duration: 0.5 }}
                      className="glass rounded-2xl p-4 border border-white/60 flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-xl bg-sukuun-rose/30 flex items-center justify-center text-lg flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-semibold text-sukuun-text-light tracking-wide">
                          {item.title}
                        </p>
                        <p className="text-sm font-bold font-[family-name:var(--font-crimson)] text-sukuun-text">
                          {item.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Special Highlight Quote */}
                <motion.div
                  initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                  className="p-5 rounded-2xl bg-gradient-to-r from-sukuun-rose/30 via-sukuun-pink/30 to-sukuun-lavender/30 border border-sukuun-pink/50 text-center mt-4"
                >
                  <p className="text-xs uppercase tracking-widest text-sukuun-rose-deep font-semibold mb-1">
                    She Says to me ♡
                  </p>
                  <p className="text-lg sm:text-xl font-bold font-[family-name:var(--font-crimson)] text-sukuun-text italic">
                    "Majaa aata hai na tumko baat karne mai"
                  </p>
                </motion.div>
              </motion.div>
            )}

            {activeChapterId === 2 && (
              <motion.div
                key="ch-2"
                initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
                transition={{ duration: 0.5 }}
                className="glass-strong rounded-3xl p-6 sm:p-8 shadow-soft border border-sukuun-rose/30 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-sukuun-rose/20 pb-3 mb-2">
                  <span className="text-xs uppercase font-bold tracking-widest text-sukuun-rose-deep bg-sukuun-rose/30 px-3 py-1 rounded-full">
                    Chapter 2 📞
                  </span>
                  <span className="text-xs text-sukuun-text-light font-medium">2 of 4</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-crimson)] text-sukuun-text">
                  Call Timestamps of Ours
                </h2>
                <p className="text-xs text-sukuun-text-light">
                  Hours & minutes spent talking together across June ♡
                </p>

                <div className="space-y-2.5 pt-2">
                  {[
                    { date: 'First Call · 13 June', note: '11:07 PM Start', duration: '92 mins total', tag: 'Special First Call 💖' },
                    { date: '14 June', note: 'Late Night Talk', duration: '54 mins total', tag: 'Sweet Conversations 🌙' },
                    { date: '15 June', note: 'First Time "Motku"', duration: '73 mins total', tag: 'Unforgettable Memories ✨' },
                    { date: '16 June', note: 'Deep Talks', duration: '35 mins total', tag: 'Comfort & Peace 🕊️' },
                    { date: '24 June', note: 'Precious Moments', duration: '43 mins total', tag: 'Endless Smiles 😊' },
                    { date: '26 June', note: 'Midnight Call', duration: '27 mins total', tag: 'Heartfelt Words ♡' },
                  ].map((call, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -15, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      transition={{ delay: 0.12 * idx, duration: 0.5 }}
                      className="glass rounded-2xl p-4 flex items-center justify-between border border-white/60 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-sukuun-rose-deep text-white flex items-center justify-center font-bold text-sm">
                          📞
                        </div>
                        <div>
                          <h3 className="text-sm font-bold font-[family-name:var(--font-crimson)] text-sukuun-text">
                            {call.date}
                          </h3>
                          <p className="text-[11px] text-sukuun-text-light">{call.note}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-sukuun-rose-deep block">
                          {call.duration}
                        </span>
                        <span className="text-[9px] text-sukuun-text-light bg-sukuun-rose/30 px-2 py-0.5 rounded-full">
                          {call.tag}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeChapterId === 3 && (
              <motion.div
                key="ch-3"
                initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
                transition={{ duration: 0.5 }}
                className="glass-strong rounded-3xl p-6 sm:p-8 shadow-soft border border-sukuun-rose/30 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-sukuun-rose/20 pb-3 mb-2">
                  <span className="text-xs uppercase font-bold tracking-widest text-sukuun-rose-deep bg-sukuun-rose/30 px-3 py-1 rounded-full">
                    Chapter 3 💅
                  </span>
                  <span className="text-xs text-sukuun-text-light font-medium">3 of 4</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-crimson)] text-sukuun-text">
                  What She Has
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    { icon: '💅', title: '5 Nail Paints', desc: 'Shades of brown 🤎' },
                    { icon: '💄', title: '5 Lipsticks', desc: 'Her favorite shades 💋' },
                    { icon: '🪮', title: 'Neem Comb', desc: 'Her wooden care comb ✨' },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      transition={{ delay: 0.2 * idx, duration: 0.5 }}
                      className="glass rounded-2xl p-5 border border-white/60 text-center"
                    >
                      <div className="text-4xl mb-2">{item.icon}</div>
                      <h3 className="text-base font-bold font-[family-name:var(--font-crimson)] text-sukuun-text">
                        {item.title}
                      </h3>
                      <p className="text-xs text-sukuun-text-light mt-1">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>

                {/* Final Sweet Highlight */}
                <motion.div
                  initial={{ opacity: 0, y: 15, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                  className="p-6 rounded-2xl bg-gradient-to-r from-sukuun-rose-deep via-sukuun-pink-deep to-sukuun-lavender-deep text-white text-center mt-6 shadow-md"
                >
                  <p className="text-lg sm:text-2xl font-bold font-[family-name:var(--font-crimson)] italic">
                    "I think she has me too... ♡"
                  </p>
                </motion.div>
              </motion.div>
            )}

            {activeChapterId === 4 && (
              <motion.div
                key="ch-4"
                initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
                transition={{ duration: 0.5 }}
                className="glass-strong rounded-3xl p-6 sm:p-8 shadow-soft border border-sukuun-rose/30 space-y-4"
              >
                <div className="flex items-center justify-between border-b border-sukuun-rose/20 pb-3 mb-2">
                  <span className="text-xs uppercase font-bold tracking-widest text-sukuun-rose-deep bg-sukuun-rose/30 px-3 py-1 rounded-full">
                    Chapter 4 💖
                  </span>
                  <span className="text-xs text-sukuun-text-light font-medium">4 of 4</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-crimson)] text-sukuun-text">
                  When She Says Something... What I Feel
                </h2>
                <p className="text-xs text-sukuun-text-light italic font-[family-name:var(--font-crimson)]">
                  Being with her is the most bestest & most beautiful moments of my life ✨
                </p>

                <div className="space-y-3 pt-2">
                  {[
                    {
                      say: 'kya kar rhe ho kaha ho…',
                      feel: 'Every single time I thanked God... 🙏',
                      emoji: '✨',
                    },
                    {
                      say: 'When she says something with haq...',
                      feel: 'I feel blessed by God... 💖',
                      emoji: '👑',
                    },
                    {
                      say: 'When she says "motku" first time on 15 June...',
                      feel: 'I thought that time I am in a dream... her motku word makes me feel precious and gets rid of all my problems 🥰',
                      emoji: '🌙',
                    },
                    {
                      say: 'ek baat btaye…',
                      feel: 'That makes me smile every time... 😊',
                      emoji: '🌸',
                    },
                    {
                      say: 'chup chap khao aaram se kha lo',
                      feel: 'I feel overwhelmed from inside ♡',
                      emoji: '💖',
                    },
                    {
                      say: 'mote ho jao (15 June)',
                      feel: 'I was getting a little emotional like I have someone who truly cares for me... 🥺',
                      emoji: '🧸',
                    },
                  ].map((dialog, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      transition={{ delay: 0.15 * idx, duration: 0.5 }}
                      className="glass rounded-2xl p-4 border border-sukuun-rose/30 space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs text-sukuun-rose-deep font-bold">
                        <span>When she says: "{dialog.say}"</span>
                        <span>{dialog.emoji}</span>
                      </div>
                      <p className="text-sm font-semibold font-[family-name:var(--font-crimson)] text-sukuun-text italic">
                        ➔ {dialog.feel}
                      </p>
                    </motion.div>
                  ))}
                </div>

                {/* Heartfelt Final Letter Quote */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  transition={{ delay: 1.1, duration: 0.7 }}
                  className="p-6 rounded-3xl bg-gradient-to-br from-sukuun-rose-deep via-sukuun-pink-deep to-sukuun-lavender-deep text-white text-center shadow-lg mt-6 space-y-2 border border-white/40"
                >
                  <p className="text-sm sm:text-base font-medium leading-relaxed italic font-[family-name:var(--font-crimson)]">
                    "If I am gonna write what I feel when she is with me or does something... I can't write because every second makes memories..."
                  </p>
                  <div className="h-0.5 w-12 bg-white/60 mx-auto my-2 rounded-full" />
                  <p className="text-lg sm:text-2xl font-bold font-[family-name:var(--font-crimson)] tracking-wide">
                    You are the sunshine of my darkest life ☀️♡
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Chapter Navigation Controls */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={goPrev}
            disabled={activeChapterId === 1}
            className={`px-5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
              activeChapterId === 1
                ? 'opacity-40 cursor-not-allowed glass text-sukuun-gray-dark'
                : 'glass hover:bg-white/80 text-sukuun-text shadow-sm'
            }`}
          >
            ← Previous Chapter
          </button>

          <span className="text-xs text-sukuun-text-light font-semibold">
            {activeChapterId} / 4
          </span>

          <button
            onClick={goNext}
            disabled={activeChapterId === 4}
            className={`px-5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
              activeChapterId === 4
                ? 'opacity-40 cursor-not-allowed glass text-sukuun-gray-dark'
                : 'px-5 py-2.5 rounded-2xl bg-gradient-to-r from-sukuun-rose-deep to-sukuun-pink-deep text-white shadow-md hover:shadow-lg'
            }`}
          >
            Next Chapter →
          </button>
        </div>
      </div>

      <Navigation />
    </div>
  );
}
