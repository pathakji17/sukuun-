'use client';

import { motion } from 'framer-motion';
import { getAssetPath } from '@/lib/basePath';

interface TypewriterStoryProps {
  lines: string[];
  title?: string;
  date?: string;
  subtitle?: string;
  imageSrc?: string;
}

export default function TypewriterStory({ lines, title, date, subtitle, imageSrc }: TypewriterStoryProps) {
  return (
    <div className="glass-strong rounded-3xl p-6 sm:p-8 shadow-soft relative overflow-hidden my-4">
      {/* Decorative ambient glowing circles */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-sukuun-pink/30 blur-2xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-sukuun-rose/30 blur-2xl" />

      {/* Decorative Quote Mark */}
      <div className="text-4xl text-sukuun-rose-deep/30 font-serif leading-none select-none mb-2">
        “
      </div>

      {title && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 border-b border-sukuun-rose/30 pb-3"
        >
          <h3 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-crimson)] text-sukuun-text">
            {title}
          </h3>
          <div className="flex items-center justify-between text-xs text-sukuun-text-light mt-1">
            {subtitle && <span>{subtitle}</span>}
            {date && <span className="font-medium">{date}</span>}
          </div>
        </motion.div>
      )}

      {/* Image Attachment preview */}
      {imageSrc && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="my-5 rounded-2xl overflow-hidden glass shadow-soft max-w-xs mx-auto border border-sukuun-rose/30"
        >
          <img
            src={getAssetPath(imageSrc)}
            alt="Memory Screenshot"
            className="w-full h-auto object-cover max-h-80"
          />
        </motion.div>
      )}

      {/* Sequential Line-by-Line Staggered Animation */}
      <div className="space-y-4 font-[family-name:var(--font-crimson)] text-base sm:text-lg text-sukuun-text leading-relaxed">
        {lines.map((line, index) => (
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              duration: 0.7,
              delay: index * 0.4 + (imageSrc ? 0.3 : 0),
              ease: [0.22, 1, 0.36, 1],
            }}
            className="tracking-wide"
          >
            {line}
          </motion.p>
        ))}
      </div>

      {/* Closing Heart Accent */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: lines.length * 0.4 + 0.4, duration: 0.5 }}
        className="mt-6 text-right text-sukuun-rose-deep text-sm font-semibold italic flex items-center justify-end gap-1"
      >
        <span>Preserved for Myra ji</span>
        <span>♡</span>
      </motion.div>
    </div>
  );
}
