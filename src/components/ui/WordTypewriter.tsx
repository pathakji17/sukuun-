'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAssetPath } from '@/lib/basePath';

interface WordTypewriterProps {
  text: string;
  imageSrc?: string;
  images?: string[];
  wordDelay?: number; // ms per word
  title?: string;
  date?: string;
  chapter?: string;
}

export default function WordTypewriter({
  text,
  imageSrc,
  images,
  wordDelay = 140, // Elegant slow premium pacing
  title,
  date,
  chapter,
}: WordTypewriterProps) {
  // Split by space to get individual words
  const words = text.split(' ');
  const [visibleWordCount, setVisibleWordCount] = useState(0);

  const photosList = images && images.length > 0 ? images : imageSrc ? [imageSrc] : [];

  useEffect(() => {
    setVisibleWordCount(0);
    let count = 0;

    const timer = setInterval(() => {
      if (count < words.length) {
        count++;
        setVisibleWordCount(count);
      } else {
        clearInterval(timer);
      }
    }, wordDelay);

    return () => clearInterval(timer);
  }, [text, wordDelay, words.length]);

  return (
    <div className="glass-strong rounded-3xl p-6 sm:p-8 shadow-soft relative overflow-hidden border border-sukuun-rose/30 my-4">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-sukuun-pink/30 blur-2xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-sukuun-rose/30 blur-2xl" />

      {/* Header Info */}
      {(title || date || chapter) && (
        <div className="mb-4 border-b border-sukuun-rose/30 pb-3">
          {chapter && (
            <span className="text-[10px] font-semibold uppercase tracking-wider text-sukuun-rose-deep bg-sukuun-rose/30 px-3 py-1 rounded-full">
              {chapter}
            </span>
          )}
          {title && (
            <h3 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-crimson)] text-sukuun-text mt-2">
              {title}
            </h3>
          )}
          {date && (
            <p className="text-xs text-sukuun-text-light mt-1 font-medium">{date}</p>
          )}
        </div>
      )}

      {/* 1. PHOTOS ON TOP */}
      {photosList.length > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className={`mb-6 grid ${photosList.length > 1 ? 'grid-cols-2 gap-3' : 'grid-cols-1 max-w-xs mx-auto'}`}
        >
          {photosList.map((img, idx) => (
            <div
              key={idx}
              className="rounded-2xl overflow-hidden glass shadow-soft border border-sukuun-rose/30"
            >
              <img
                src={getAssetPath(img)}
                alt={title || 'Memory Image'}
                className="w-full h-auto object-cover max-h-80"
              />
            </div>
          ))}
        </motion.div>
      )}

      {/* 2. AUTOMATIC WORD-BY-WORD REVEAL WITH CRISP WORD SPACING & SOFT BLUR */}
      <div className="min-h-[100px] font-[family-name:var(--font-crimson)] text-lg sm:text-xl text-sukuun-text leading-relaxed">
        {words.slice(0, visibleWordCount).map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, filter: 'blur(8px)', y: 4, scale: 0.95 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0, scale: 1 }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block mr-[0.3em] mb-1"
          >
            {word.includes('\n') ? (
              word.split('\n').map((linePart, lineIdx, arr) => (
                <span key={lineIdx}>
                  {linePart}
                  {lineIdx < arr.length - 1 && <span className="block h-3" />}
                </span>
              ))
            ) : (
              word
            )}
          </motion.span>
        ))}

        {visibleWordCount < words.length && (
          <motion.span
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 0.6, repeat: Infinity }}
            className="inline-block w-1.5 h-4 bg-sukuun-rose-deep/70 ml-1 rounded-full align-middle"
          />
        )}
      </div>

      {/* Footer Signature */}
      <div className="mt-6 text-right text-sukuun-rose-deep text-xs font-semibold italic">
        Preserved for Myra ji ♡
      </div>
    </div>
  );
}
