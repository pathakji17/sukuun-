'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/ui/Navigation';
import WordTypewriter from '@/components/ui/WordTypewriter';
import { getAssetPath } from '@/lib/basePath';

export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  chapter: string;
  mood: 'romantic' | 'happy' | 'peaceful' | 'nostalgic' | 'grateful';
  description: string;
  story: string;
  photos?: string[];
  location?: string;
  favorite?: boolean;
}

const initialMemories: MemoryItem[] = [
  {
    id: 'mem-diwali-meeting',
    title: 'Diwali Meeting Promise 🪔✨',
    date: 'July 16 · 12:11 AM',
    chapter: 'Promises & Dreams',
    mood: 'romantic',
    description: 'When she accepted & admitted that yes, we will meet this Diwali...',
    story: `A deeply special moment... when she accepted & admitted that yes, we will meet this Diwali! 🪔✨\n\n"Winter m... Diwali time aana to... Lete aana"\n\nOn July 16 at 12:11 AM... a beautiful promise for our meeting ♡`,
    photos: ['/images/diwali-meeting-1.jpg', '/images/diwali-meeting-2.jpg'],
    location: 'July 16 · 12:11 AM',
    favorite: true,
  },
  {
    id: 'mem-date-reel-reaction',
    title: 'The Date Reel & Butterflies 🦋✨',
    date: 'July 16 · Cute Reaction',
    chapter: 'Butterflies & Smiles',
    mood: 'romantic',
    description: 'When I sent her the date reel & her reaction gave me butterflies...',
    story: `Right after she agreed to meet this Diwali...\n\nI sent her the reel: "Usne date ke liye haa bol diya... and a boy searching every penny in his home!" 😂💰\n\nHer sweet reaction gave me butterflies all over... 🦋✨`,
    photos: ['/images/diwali-meeting-1.jpg'],
    location: 'July 16',
    favorite: true,
  },
  {
    id: 'mem-first-missed-call',
    title: 'First Missed Call 📞🫠',
    date: 'June 15 · 3:58 PM',
    chapter: 'Sweet Missed Moments',
    mood: 'nostalgic',
    description: 'The first time I missed her valuable call at 3:58 PM...',
    story: `The first time I missed her valuable call at 3:58 PM... 🫠\n\n"Sorry dekh nahi paya"\n\nThen we talked from 4:23 PM to 5:42 PM (1 hour 19 mins) ♡`,
    photos: ['/images/missed-call-jun15.jpg'],
    location: 'June 15',
    favorite: true,
  },
  {
    id: 'mem-first-call',
    title: 'Our First Call 📞',
    date: 'Late Night Memory',
    chapter: 'Midnight Conversations',
    mood: 'romantic',
    description: 'Our first call was at 11:07 PM to 11:09 PM...',
    story: `Our first call was at 11:07 PM to 11:09 PM... 2 mins.\n\nThen again when we started, it went from 11:33 PM to 2:06 AM... for 93 mins! 💖\n\nThen again at early morning, a sweet little call at 5:32 AM to 5:35 AM... ☀️`,
    photos: ['/images/first-call-1107pm.jpg'],
    location: 'Midnight Conversations',
    favorite: true,
  },
  {
    id: 'mem-magic-notification',
    title: 'The Magic Notification ✨',
    date: 'June 11 · 1:42 PM',
    chapter: 'Invisible Strings',
    mood: 'romantic',
    description: 'When the invisible strings connected afterwards...',
    story: `When the invisible strings connected afterwards a lot of time later near 3 years...\n\nMagic notification popped up...\n\n...and I found her ♡`,
    photos: ['/images/notification-11june.jpg'],
    location: 'June 11 · 1:42 PM',
    favorite: true,
  },
];

const moodBadgeStyle = {
  romantic: 'bg-sukuun-rose/40 text-sukuun-rose-deep border-sukuun-rose',
  happy: 'bg-amber-100 text-amber-700 border-amber-200',
  peaceful: 'bg-sukuun-blue/40 text-sukuun-text border-sukuun-blue',
  nostalgic: 'bg-sukuun-lavender/40 text-sukuun-lavender-deep border-sukuun-lavender',
  grateful: 'bg-emerald-100 text-emerald-700 border-emerald-200',
};

const moodEmoji = {
  romantic: '💖',
  happy: '🌸',
  peaceful: '🕊️',
  nostalgic: '✨',
  grateful: '🙏',
};

export default function MemoriesClient() {
  const [memories, setMemories] = useState<MemoryItem[]>(initialMemories);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Memory Form State
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newChapter, setNewChapter] = useState('Sweet Moments');
  const [newMood, setNewMood] = useState<'romantic' | 'happy' | 'peaceful' | 'nostalgic' | 'grateful'>('romantic');
  const [newStory, setNewStory] = useState('');
  const [newLocation, setNewLocation] = useState('');

  const filteredMemories = memories.filter((mem) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'favorites') return mem.favorite;
    return mem.mood === activeFilter;
  });

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMemories((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, favorite: !item.favorite } : item
      )
    );
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newStory) return;

    const newItem: MemoryItem = {
      id: `mem-${Date.now()}`,
      title: newTitle,
      date: newDate || new Date().toISOString().split('T')[0],
      chapter: newChapter || 'Special Moments',
      mood: newMood,
      description: newStory.slice(0, 60) + '...',
      story: newStory,
      location: newLocation || 'With Love',
      favorite: true,
    };

    setMemories([newItem, ...memories]);
    setShowAddModal(false);
    setNewTitle('');
    setNewDate('');
    setNewStory('');
    setNewLocation('');
  };

  return (
    <div className="min-h-dvh pb-28 relative overflow-hidden bg-sukuun-cream">
      {/* Background Ambient Orbs */}
      <div className="absolute top-0 left-0 w-[450px] h-[450px] rounded-full bg-sukuun-rose/20 blur-[110px] -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-[20%] right-0 w-[350px] h-[350px] rounded-full bg-sukuun-lavender/20 blur-[90px] translate-x-1/3" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-start justify-between mb-8"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">💝</span>
              <span className="text-xs uppercase font-medium tracking-wider text-sukuun-text-light">
                Preserved Moments
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-crimson)] text-sukuun-text">
              Memories Vault
            </h1>
            <p className="text-sukuun-text-light text-sm mt-1">
              Stories & heartfelt memories saved for Myra ji ♡
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-sukuun-rose-deep via-sukuun-pink-deep to-sukuun-lavender-deep text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-1.5"
          >
            <span>+</span>
            <span>Add Memory</span>
          </button>
        </motion.div>

        {/* Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-none"
        >
          {[
            { id: 'all', label: 'All Moments' },
            { id: 'favorites', label: 'Favorites ♡' },
            { id: 'romantic', label: 'Romantic 💖' },
            { id: 'peaceful', label: 'Peaceful 🕊️' },
            { id: 'happy', label: 'Happy 🌸' },
          ].map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-sukuun-rose-deep to-sukuun-pink-deep text-white shadow-md'
                    : 'glass text-sukuun-text-light hover:text-sukuun-text'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </motion.div>

        {/* Memories List */}
        {filteredMemories.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong rounded-3xl p-8 sm:p-12 text-center shadow-soft"
          >
            <div className="w-16 h-16 rounded-full bg-sukuun-pink/30 flex items-center justify-center text-3xl mx-auto mb-4">
              💝
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-crimson)] text-sukuun-text mb-2">
              Ready for Memories
            </h2>
            <p className="text-sm text-sukuun-text-light max-w-sm mx-auto mb-6">
              Send me your photos, texts, and heartfelt notes — I will populate this vault with all your special moments for Myra ji!
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-sukuun-rose-deep to-sukuun-pink-deep text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all"
            >
              + Create First Memory
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence>
              {filteredMemories.map((mem, i) => (
                <motion.div
                  key={mem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  onClick={() => setSelectedMemory(mem)}
                  className="glass-strong rounded-3xl p-5 sm:p-6 shadow-soft hover:shadow-lg cursor-pointer transition-all duration-300 group border border-sukuun-rose/30"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-[10px] font-semibold px-3 py-1 rounded-full border ${
                          moodBadgeStyle[mem.mood]
                        }`}
                      >
                        {moodEmoji[mem.mood]} {mem.chapter}
                      </span>
                      {mem.location && (
                        <span className="text-[10px] text-sukuun-text-light flex items-center gap-1">
                          📍 {mem.location}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-sukuun-text-light font-medium">
                        {mem.date}
                      </span>
                      <button
                        onClick={(e) => toggleFavorite(mem.id, e)}
                        className="text-base transition-transform active:scale-125"
                      >
                        {mem.favorite ? '❤️' : '🤍'}
                      </button>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-crimson)] text-sukuun-text mb-2 group-hover:text-sukuun-rose-deep transition-colors">
                    {mem.title}
                  </h3>

                  {/* Plain, Clean Photo Thumbnail & Story Preview */}
                  {mem.photos && mem.photos.length > 0 && (
                    <div className={`my-3 grid ${mem.photos.length > 1 ? 'grid-cols-2 gap-2 max-w-sm' : 'grid-cols-1 max-w-xs'}`}>
                      {mem.photos.map((ph, phIdx) => (
                        <div
                          key={phIdx}
                          className="rounded-2xl overflow-hidden glass shadow-soft border border-sukuun-rose/30"
                        >
                          <img
                            src={getAssetPath(ph)}
                            alt={mem.title}
                            className="w-full h-auto object-cover max-h-56 group-hover:scale-102 transition-transform duration-500"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-sm text-sukuun-text-light font-[family-name:var(--font-crimson)] italic line-clamp-2 mb-3">
                    "{mem.description || mem.story.split('\n')[0]}"
                  </p>

                  <div className="flex items-center justify-between text-xs text-sukuun-rose-deep font-medium pt-2 border-t border-sukuun-rose/20">
                    <span>Tap to view live story animation</span>
                    <span className="group-hover:translate-x-1 transition-transform font-semibold">
                      Open Memory →
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Memory Detail Modal with Real Live Word-by-Word Typewriter */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMemory(null)}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full max-h-[90vh] glass-strong rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 overflow-y-auto"
            >
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 transition-colors text-sm font-semibold"
              >
                ✕
              </button>

              <WordTypewriter
                key={selectedMemory.id}
                title={selectedMemory.title}
                date={selectedMemory.date}
                chapter={selectedMemory.chapter}
                images={selectedMemory.photos}
                text={selectedMemory.story}
                wordDelay={140}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add New Memory Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAddModal(false)}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full glass-strong rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[90vh]"
            >
              <button
                onClick={() => setShowAddModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-sukuun-gray-light text-sukuun-text flex items-center justify-center hover:bg-sukuun-gray transition-colors text-sm font-semibold"
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold font-[family-name:var(--font-crimson)] text-sukuun-text mb-1">
                Add a New Memory ♡
              </h2>
              <p className="text-xs text-sukuun-text-light mb-6">
                Preserve a new story or heartfelt moment for Myra ji.
              </p>

              <form onSubmit={handleAddMemory} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-sukuun-text mb-1">
                    Memory Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. A Beautiful Surprise"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-white/70 rounded-2xl px-4 py-3 text-sm text-sukuun-text outline-none ring-1 ring-sukuun-gray/40 focus:ring-2 focus:ring-sukuun-pink"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-sukuun-text mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      className="w-full bg-white/70 rounded-2xl px-4 py-3 text-sm text-sukuun-text outline-none ring-1 ring-sukuun-gray/40 focus:ring-2 focus:ring-sukuun-pink"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-sukuun-text mb-1">
                      Mood
                    </label>
                    <select
                      value={newMood}
                      onChange={(e) => setNewMood(e.target.value as any)}
                      className="w-full bg-white/70 rounded-2xl px-3 py-3 text-sm text-sukuun-text outline-none ring-1 ring-sukuun-gray/40 focus:ring-2 focus:ring-sukuun-pink"
                    >
                      <option value="romantic">Romantic 💖</option>
                      <option value="happy">Happy 🌸</option>
                      <option value="peaceful">Peaceful 🕊️</option>
                      <option value="nostalgic">Nostalgic ✨</option>
                      <option value="grateful">Grateful 🙏</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-sukuun-text mb-1">
                    Chapter / Category
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Special Days"
                    value={newChapter}
                    onChange={(e) => setNewChapter(e.target.value)}
                    className="w-full bg-white/70 rounded-2xl px-4 py-3 text-sm text-sukuun-text outline-none ring-1 ring-sukuun-gray/40 focus:ring-2 focus:ring-sukuun-pink"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-sukuun-text mb-1">
                    Story & Thoughts
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Write the full memory or message here..."
                    value={newStory}
                    onChange={(e) => setNewStory(e.target.value)}
                    className="w-full bg-white/70 rounded-2xl p-4 text-sm text-sukuun-text outline-none ring-1 ring-sukuun-gray/40 focus:ring-2 focus:ring-sukuun-pink resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-sukuun-text mb-1">
                    Location (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Garden Café"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full bg-white/70 rounded-2xl px-4 py-3 text-sm text-sukuun-text outline-none ring-1 ring-sukuun-gray/40 focus:ring-2 focus:ring-sukuun-pink"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-sukuun-rose-deep via-sukuun-pink-deep to-sukuun-lavender-deep text-white font-medium text-sm tracking-wide shadow-md hover:shadow-lg transition-all duration-300 mt-2"
                >
                  Save Memory ♡
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navigation />
    </div>
  );
}
