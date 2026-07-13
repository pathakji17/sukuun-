import { z } from 'zod';

// ============================================================================
// Memory Mood Enumeration
// ============================================================================

export const MoodSchema = z.enum([
  'happy',
  'sad',
  'peaceful',
  'excited',
  'romantic',
  'nostalgic',
  'grateful',
  'thoughtful',
  'bittersweet',
  'hopeful',
]);

export type Mood = z.infer<typeof MoodSchema>;

// ============================================================================
// Memory Animation Styles
// ============================================================================

export const AnimationStyleSchema = z.enum([
  'fadeIn',
  'slideUp',
  'slideDown',
  'slideLeft',
  'slideRight',
  'zoomIn',
  'blur',
  'wordReveal',
  'characterReveal',
  'typingEffect',
  'maskReveal',
  'scrollReveal',
  'cardFlip',
  'imageFade',
  'letterReveal',
]);

export type AnimationStyle = z.infer<typeof AnimationStyleSchema>;

// ============================================================================
// Base Memory Object
// ============================================================================

const BaseMemorySchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  date: z.string().or(z.date()), // ISO date string or Date object
  chapter: z.string(),
  mood: MoodSchema,
  tags: z.array(z.string()).optional(),
  animation: AnimationStyleSchema.optional(),
  backgroundMusic: z.string().optional(),
  visibility: z.enum(['public', 'private', 'hidden']).default('private'),
  importance: z.enum(['low', 'medium', 'high']).default('medium'),
  hidden: z.boolean().default(false),
  unlocked: z.boolean().default(true),
  relatedMemories: z.array(z.string()).optional(), // IDs of related memories
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const BaseMemory = BaseMemorySchema.parse({});
export type BaseMemory = z.infer<typeof BaseMemorySchema>;

// ============================================================================
// Photo Memory
// ============================================================================

export const PhotoMemorySchema = BaseMemorySchema.extend({
  type: z.literal('photo'),
  photos: z.array(z.string()).min(1), // file paths or URLs
  story: z.string().optional(),
  location: z.string().optional(),
  cameraInfo: z.string().optional(),
  favorite: z.boolean().default(false),
});

export type PhotoMemory = z.infer<typeof PhotoMemorySchema>;

// ============================================================================
// Story Memory
// ============================================================================

export const StoryMemorySchema = BaseMemorySchema.extend({
  type: z.literal('story'),
  story: z.string().min(1),
  photos: z.array(z.string()).optional(),
  excerpt: z.string().optional(),
  wordCount: z.number().optional(),
});

export type StoryMemory = z.infer<typeof StoryMemorySchema>;

// ============================================================================
// Chat Memory
// ============================================================================

export const ChatMessageSchema = z.object({
  sender: z.string(),
  message: z.string(),
  timestamp: z.string().optional(),
  reaction: z.string().optional(),
});

export const ChatMemorySchema = BaseMemorySchema.extend({
  type: z.literal('chat'),
  messages: z.array(ChatMessageSchema),
  participantName: z.string(),
  originalScreenshot: z.string().optional(), // path to screenshot
  recreated: z.boolean().default(false),
});

export type ChatMemory = z.infer<typeof ChatMemorySchema>;

// ============================================================================
// Video Memory
// ============================================================================

export const VideoMemorySchema = BaseMemorySchema.extend({
  type: z.literal('video'),
  videoUrl: z.string(),
  posterImage: z.string().optional(),
  duration: z.number().optional(),
  caption: z.string().optional(),
  subtitles: z.boolean().default(false),
});

export type VideoMemory = z.infer<typeof VideoMemorySchema>;

// ============================================================================
// Audio Memory
// ============================================================================

export const AudioMemorySchema = BaseMemorySchema.extend({
  type: z.literal('audio'),
  audioUrl: z.string(),
  duration: z.number().optional(),
  transcript: z.string().optional(),
  speaker: z.string().optional(),
});

export type AudioMemory = z.infer<typeof AudioMemorySchema>;

// ============================================================================
// Letter Memory
// ============================================================================

export const LetterMemorySchema = BaseMemorySchema.extend({
  type: z.literal('letter'),
  content: z.string().min(1),
  author: z.string(),
  recipientName: z.string(),
  sealed: z.boolean().default(false),
  sealedUntil: z.string().optional(), // ISO date string
});

export type LetterMemory = z.infer<typeof LetterMemorySchema>;

// ============================================================================
// Timeline Memory
// ============================================================================

export const TimelineMemorySchema = BaseMemorySchema.extend({
  type: z.literal('timeline'),
  events: z.array(
    z.object({
      title: z.string(),
      date: z.string(),
      description: z.string().optional(),
      photo: z.string().optional(),
    })
  ),
});

export type TimelineMemory = z.infer<typeof TimelineMemorySchema>;

// ============================================================================
// Special Event Memory
// ============================================================================

export const SpecialEventMemorySchema = BaseMemorySchema.extend({
  type: z.literal('specialEvent'),
  eventType: z.enum([
    'birthday',
    'anniversary',
    'firstChat',
    'firstCall',
    'firstMeeting',
    'proposal',
    'travel',
    'custom',
  ]),
  photos: z.array(z.string()).optional(),
  story: z.string().optional(),
  celebrationDetails: z.record(z.string(), z.unknown()).optional(),
});

export type SpecialEventMemory = z.infer<typeof SpecialEventMemorySchema>;

// ============================================================================
// Union Type: All Memory Types
// ============================================================================

export const MemorySchema = z.union([
  PhotoMemorySchema,
  StoryMemorySchema,
  ChatMemorySchema,
  VideoMemorySchema,
  AudioMemorySchema,
  LetterMemorySchema,
  TimelineMemorySchema,
  SpecialEventMemorySchema,
]);

export type Memory =
  | PhotoMemory
  | StoryMemory
  | ChatMemory
  | VideoMemory
  | AudioMemory
  | LetterMemory
  | TimelineMemory
  | SpecialEventMemory;

// ============================================================================
// Memory Filter for Querying
// ============================================================================

export const MemoryFilterSchema = z.object({
  chapter: z.string().optional(),
  mood: MoodSchema.optional(),
  type: z.string().optional(),
  hidden: z.boolean().optional(),
  tags: z.array(z.string()).optional(),
  dateRange: z
    .object({
      start: z.string(),
      end: z.string(),
    })
    .optional(),
});

export type MemoryFilter = z.infer<typeof MemoryFilterSchema>;
