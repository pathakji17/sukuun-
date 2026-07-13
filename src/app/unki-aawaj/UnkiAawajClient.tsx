'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/ui/Navigation';
import { getAssetPath } from '@/lib/basePath';

export interface VoiceNote {
  id: string;
  title: string;
  date: string;
  duration?: string;
  src: string;
  note?: string;
  favorite?: boolean;
}

const defaultVoiceNotes: VoiceNote[] = [
  {
    id: 'vn-1',
    title: 'First Sweet Voice Note 🎙️',
    date: 'June 11',
    duration: '0:45',
    src: '/audio/voice-note-1.mp3',
    note: 'The voice that melts away every worry ♡',
    favorite: true,
  },
  {
    id: 'vn-2',
    title: 'Good Morning Memory ☀️',
    date: 'July 8',
    duration: '1:12',
    src: '/audio/voice-note-2.mp3',
    note: 'Waking up to this sweet voice message.',
    favorite: false,
  },
];

export default function UnkiAawajClient() {
  const [voiceNotes, setVoiceNotes] = useState<VoiceNote[]>(defaultVoiceNotes);
  const [currentTrack, setCurrentTrack] = useState<VoiceNote | null>(defaultVoiceNotes[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = getAssetPath(currentTrack.src);
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  }, [currentTrack]);

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setVoiceNotes((prev) =>
      prev.map((vn) => (vn.id === id ? { ...vn, favorite: !vn.favorite } : vn))
    );
  };

  return (
    <div className="min-h-dvh pb-28 relative overflow-hidden bg-sukuun-cream">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-sukuun-rose/20 blur-[110px] -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-[20%] left-0 w-[350px] h-[350px] rounded-full bg-sukuun-lavender/20 blur-[90px] -translate-x-1/3" />

      {/* Hidden Audio Tag */}
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">🎙️</span>
            <span className="text-xs uppercase font-medium tracking-wider text-sukuun-text-light">
              Voice Recordings & Memories
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-crimson)] text-sukuun-text">
            Unki Aawaj (उनकी आवाज़)
          </h1>
          <p className="text-sukuun-text-light text-sm mt-1">
            Voice notes and audio moments stored with love ♡
          </p>
        </motion.div>

        {/* Currently Playing Highlight Player Card */}
        {currentTrack && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="glass-strong rounded-3xl p-6 sm:p-8 shadow-soft mb-8 relative overflow-hidden border border-sukuun-rose/30"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase font-semibold tracking-widest text-sukuun-rose-deep">
                Now Playing 🎧
              </span>
              <span className="text-xs text-sukuun-text-light">{currentTrack.date}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-crimson)] text-sukuun-text mb-2">
              {currentTrack.title}
            </h2>
            {currentTrack.note && (
              <p className="text-xs text-sukuun-text-light mb-6 italic">
                "{currentTrack.note}"
              </p>
            )}

            {/* Audio Progress Bar */}
            <div className="space-y-2 mb-6">
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-sukuun-gray-light rounded-lg appearance-none cursor-pointer accent-sukuun-rose-deep"
              />
              <div className="flex items-center justify-between text-xs text-sukuun-text-light font-medium">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={togglePlayPause}
                className="w-16 h-16 rounded-full bg-gradient-to-r from-sukuun-rose-deep via-sukuun-pink-deep to-sukuun-lavender-deep text-white flex items-center justify-center shadow-lg hover:shadow-xl active:scale-95 transition-all text-2xl"
              >
                {isPlaying ? '⏸' : '▶'}
              </button>
            </div>
          </motion.div>
        )}

        {/* Voice Note Playlist */}
        <div className="space-y-3">
          <h3 className="text-xs uppercase font-semibold tracking-wider text-sukuun-text-light mb-3">
            Saved Voice Recordings ({voiceNotes.length})
          </h3>

          {voiceNotes.map((note) => {
            const isSelected = currentTrack?.id === note.id;
            return (
              <motion.div
                key={note.id}
                whileHover={{ scale: 1.01 }}
                onClick={() => {
                  setCurrentTrack(note);
                  setIsPlaying(true);
                }}
                className={`glass rounded-2xl p-4 sm:p-5 flex items-center justify-between cursor-pointer transition-all duration-300 ${
                  isSelected ? 'ring-2 ring-sukuun-pink shadow-md bg-white/80' : 'hover:bg-white/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                      isSelected
                        ? 'bg-sukuun-rose-deep text-white'
                        : 'bg-sukuun-pink/30 text-sukuun-text'
                    }`}
                  >
                    {isSelected && isPlaying ? '🎵' : '🎙️'}
                  </div>
                  <div>
                    <h4 className="text-base font-semibold font-[family-name:var(--font-crimson)] text-sukuun-text">
                      {note.title}
                    </h4>
                    <p className="text-xs text-sukuun-text-light">
                      {note.date} {note.duration ? `· ${note.duration}` : ''}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={(e) => toggleFavorite(note.id, e)}
                    className="text-base"
                  >
                    {note.favorite ? '❤️' : '🤍'}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Note on how to add MP3 files */}
        <div className="glass rounded-2xl p-4 mt-8 text-center text-xs text-sukuun-text-light">
          💡 Place your audio MP3 files in <code className="bg-white/60 px-2 py-0.5 rounded text-sukuun-rose-deep font-mono">public/audio/</code> to add new voice recordings!
        </div>
      </div>

      <Navigation />
    </div>
  );
}
