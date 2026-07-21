'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/ui/Navigation';
import { getAssetPath } from '@/lib/basePath';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  title: string;
  date: string;
  caption?: string;
}

const rawMediaData: MediaItem[] = [
  {
    id: 'img-9',
    type: 'image',
    src: '/images/photo-9.jpeg',
    title: 'Verma ji... ✍️♡',
    date: 'July 21, 2026',
    caption: 'Full page handwritten with "Verma ji" over and over again with endless devotion...',
  },
  {
    id: 'img-1',
    type: 'image',
    src: '/images/photo-1.jpeg',
    title: 'Myra ji ♡',
    date: 'July 14, 2026',
    caption: 'A beautiful moment captured forever.',
  },
  {
    id: 'img-2',
    type: 'image',
    src: '/images/photo-2.jpeg',
    title: 'Sweet Memories',
    date: 'July 13, 2026',
    caption: 'Every smile of yours brightens my day.',
  },
  {
    id: 'img-3',
    type: 'image',
    src: '/images/photo-3.jpeg',
    title: 'Precious Smile',
    date: 'July 13, 2026',
    caption: 'Holding onto this picture with all my heart.',
  },
  {
    id: 'img-4',
    type: 'image',
    src: '/images/photo-4.jpeg',
    title: 'Warm Expressions',
    date: 'July 13, 2026',
    caption: 'Moments like these make everything peaceful.',
  },
  {
    id: 'img-5',
    type: 'image',
    src: '/images/photo-5.jpeg',
    title: 'Cherished Glance',
    date: 'July 13, 2026',
    caption: 'My favorite person in the world.',
  },
  {
    id: 'img-6',
    type: 'image',
    src: '/images/photo-6.jpeg',
    title: 'Pure Grace',
    date: 'July 13, 2026',
    caption: 'So full of elegance and warmth.',
  },
  {
    id: 'img-7',
    type: 'image',
    src: '/images/photo-7.jpeg',
    title: 'Golden Memory',
    date: 'July 13, 2026',
    caption: 'Always in my thoughts, always in my heart.',
  },
  {
    id: 'img-8',
    type: 'image',
    src: '/images/photo-8.jpeg',
    title: 'Sweet Moment ♡',
    date: 'July 20, 2026',
    caption: 'A precious capture shared with love.',
  },
  {
    id: 'vid-1',
    type: 'video',
    src: '/videos/video-1.mp4',
    title: 'Special Memory Video 1',
    date: 'July 13, 2026',
    caption: 'Watching this video brings a smile to my face.',
  },
  {
    id: 'vid-2',
    type: 'video',
    src: '/videos/video-2.mp4',
    title: 'Special Memory Video 2',
    date: 'July 13, 2026',
    caption: 'Moments in motion ♡',
  },
];

export default function GalleryClient() {
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all');
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const mediaData = rawMediaData.map((item) => ({
    ...item,
    src: getAssetPath(item.src),
  }));

  const filteredMedia = mediaData.filter((item) => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-dvh pb-28 relative overflow-hidden bg-sukuun-cream">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-sukuun-rose/20 blur-[100px] -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-[20%] left-0 w-[350px] h-[350px] rounded-full bg-sukuun-lavender/20 blur-[90px] -translate-x-1/3" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">📸</span>
            <span className="text-xs uppercase font-medium tracking-wider text-sukuun-text-light">
              Memories & Moments
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-crimson)] text-sukuun-text">
            Myra ji’s Gallery
          </h1>
          <p className="text-sukuun-text-light text-sm mt-1">
            9 Photos & 2 Videos captured with warmth and love ♡
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-2 mb-6"
        >
          {(['all', 'image', 'video'] as const).map((type) => {
            const label = type === 'all' ? 'All (11)' : type === 'image' ? 'Photos (9)' : 'Videos (2)';
            const isActive = filter === type;
            return (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-sukuun-rose-deep to-sukuun-pink-deep text-white shadow-md'
                    : 'glass text-sukuun-text-light hover:text-sukuun-text'
                }`}
              >
                {label}
              </button>
            );
          })}
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
        >
          <AnimatePresence>
            {filteredMedia.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onClick={() => setSelectedMedia(item)}
                className="group relative cursor-pointer rounded-2xl overflow-hidden glass shadow-soft hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-[4/5] relative bg-sukuun-rose/10 overflow-hidden">
                  {item.type === 'image' ? (
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full relative">
                      <video
                        src={item.src}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur flex items-center justify-center text-sukuun-text shadow-md">
                          ▶
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <p className="text-white text-xs font-semibold font-[family-name:var(--font-crimson)]">
                      {item.title}
                    </p>
                    <p className="text-white/80 text-[10px]">{item.date}</p>
                  </div>

                  <button
                    onClick={(e) => toggleFavorite(item.id, e)}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/70 backdrop-blur flex items-center justify-center text-sm transition-transform active:scale-95 shadow-sm"
                  >
                    {favorites[item.id] ? '❤️' : '🤍'}
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full max-h-[85vh] glass-strong rounded-3xl overflow-hidden shadow-2xl flex flex-col"
            >
              <button
                onClick={() => setSelectedMedia(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors text-lg"
              >
                ✕
              </button>

              <div className="flex-1 bg-black flex items-center justify-center max-h-[60vh] overflow-hidden">
                {selectedMedia.type === 'image' ? (
                  <img
                    src={selectedMedia.src}
                    alt={selectedMedia.title}
                    className="w-full h-full object-contain max-h-[60vh]"
                  />
                ) : (
                  <video
                    src={selectedMedia.src}
                    controls
                    autoPlay
                    className="w-full h-full max-h-[60vh] object-contain"
                  />
                )}
              </div>

              <div className="p-5 bg-white/90">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-lg font-bold font-[family-name:var(--font-crimson)] text-sukuun-text">
                    {selectedMedia.title}
                  </h3>
                  <span className="text-xs text-sukuun-text-light">
                    {selectedMedia.date}
                  </span>
                </div>
                {selectedMedia.caption && (
                  <p className="text-xs text-sukuun-text-light leading-relaxed">
                    {selectedMedia.caption}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navigation />
    </div>
  );
}
