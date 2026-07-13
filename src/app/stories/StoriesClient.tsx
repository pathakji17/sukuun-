'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/ui/Navigation';
import TypewriterStory from '@/components/ui/TypewriterStory';

interface StoryData {
  id: string;
  title: string;
  chapter: string;
  date: string;
  lines: string[];
}

const defaultStories: StoryData[] = [
  {
    id: 'story-first-call',
    title: 'Our Very First Call 📞',
    chapter: 'Chapter 1: The Connection',
    date: 'March 15',
    lines: [
      "It started with a nervous breath before dialing the number.",
      "The moment I heard your voice, every ounce of nervousness disappeared.",
      "Minutes turned into hours without either of us noticing the time pass.",
      "That call wasn't just a conversation — it was the beginning of our world together.",
      "Even long after hanging up, your voice kept echoing sweetly in my mind ♡",
    ],
  },
];

export default function StoriesClient() {
  const [stories, setStories] = useState<StoryData[]>(defaultStories);
  const [selectedStoryId, setSelectedStoryId] = useState<string>('story-first-call');

  const currentStory = stories.find((s) => s.id === selectedStoryId) || stories[0];

  return (
    <div className="min-h-dvh pb-28 relative overflow-hidden bg-sukuun-cream">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-sukuun-rose/20 blur-[110px] -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-[20%] left-0 w-[350px] h-[350px] rounded-full bg-sukuun-lavender/20 blur-[90px] -translate-x-1/3" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">📖</span>
            <span className="text-xs uppercase font-medium tracking-wider text-sukuun-text-light">
              Interactive Storybook
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-crimson)] text-sukuun-text">
            Stories for Myra ji
          </h1>
          <p className="text-sukuun-text-light text-sm mt-1">
            Words that unfold line by line with every heartbeat ♡
          </p>
        </motion.div>

        {/* Story Tabs Selection */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-none">
          {stories.map((story) => {
            const isActive = story.id === selectedStoryId;
            return (
              <button
                key={story.id}
                onClick={() => setSelectedStoryId(story.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-sukuun-rose-deep to-sukuun-pink-deep text-white shadow-md'
                    : 'glass text-sukuun-text-light hover:text-sukuun-text'
                }`}
              >
                {story.title}
              </button>
            );
          })}
        </div>

        {/* Animated Typewriter Line-by-Line Story */}
        {currentStory && (
          <TypewriterStory
            key={currentStory.id}
            title={currentStory.title}
            subtitle={currentStory.chapter}
            date={currentStory.date}
            lines={currentStory.lines}
          />
        )}
      </div>

      <Navigation />
    </div>
  );
}
