import { z } from 'zod';

// ============================================================================
// Theme Configuration
// ============================================================================

export const ThemeSchema = z.object({
  name: z.enum([
    'soft',
    'minimal',
    'dark',
    'vintage',
    'sakura',
    'autumn',
    'winter',
    'custom',
  ]),
  colors: z
    .object({
      primary: z.string().optional(),
      secondary: z.string().optional(),
      background: z.string().optional(),
      text: z.string().optional(),
      accent: z.string().optional(),
    })
    .optional(),
});

export type Theme = z.infer<typeof ThemeSchema>;

// ============================================================================
// Animation Configuration
// ============================================================================

export const AnimationConfigSchema = z.object({
  enabled: z.boolean().default(true),
  defaultSpeed: z.enum(['slow', 'normal', 'fast']).default('normal'),
  speedMultiplier: z.number().min(0.1).max(5).default(1),
  pageTransition: z.enum(['fade', 'blur', 'slide']).default('fade'),
  transitionDuration: z.number().min(100).max(2000).default(600),
  respectMotionPreference: z.boolean().default(true),
});

export type AnimationConfig = z.infer<typeof AnimationConfigSchema>;

// ============================================================================
// Music Configuration
// ============================================================================

export const MusicConfigSchema = z.object({
  enabled: z.boolean().default(true),
  autoplay: z.boolean().default(false),
  defaultVolume: z.number().min(0).max(1).default(0.3),
  loop: z.boolean().default(true),
  fadeInDuration: z.number().default(2000),
  fadeOutDuration: z.number().default(2000),
});

export type MusicConfig = z.infer<typeof MusicConfigSchema>;

// ============================================================================
// Feature Flags
// ============================================================================

export const FeaturesSchema = z.object({
  gallery: z.boolean().default(true),
  stories: z.boolean().default(true),
  timeline: z.boolean().default(true),
  chat: z.boolean().default(true),
  videos: z.boolean().default(true),
  audio: z.boolean().default(false),
  letters: z.boolean().default(true),
  birthday: z.boolean().default(true),
  calendar: z.boolean().default(true),
  music: z.boolean().default(true),
  secrets: z.boolean().default(true),
  customModules: z.boolean().default(true),
});

export type Features = z.infer<typeof FeaturesSchema>;

// ============================================================================
// Security Configuration
// ============================================================================

export const SecuritySchema = z.object({
  passwordRequired: z.boolean().default(true),
  sessionTimeout: z.number().default(3600000), // 1 hour in ms
  rememberDevice: z.boolean().default(false),
  enableBackups: z.boolean().default(true),
  backupFrequency: z.enum(['daily', 'weekly', 'monthly']).default('weekly'),
});

export type Security = z.infer<typeof SecuritySchema>;

// ============================================================================
// Website Configuration
// ============================================================================

export const WebsiteConfigSchema = z.object({
  siteName: z.string().default('Project Sukuun'),
  description: z.string().optional(),
  author: z.string().optional(),
  favicon: z.string().optional(),
  language: z.string().default('en'),
  timezone: z.string().default('UTC'),
});

export type WebsiteConfig = z.infer<typeof WebsiteConfigSchema>;

// ============================================================================
// Content Configuration
// ============================================================================

export const ContentConfigSchema = z.object({
  itemsPerPage: z.number().min(1).default(12),
  memoriesPerChapter: z.number().min(1).default(20),
  showDates: z.boolean().default(true),
  showMood: z.boolean().default(true),
  showTags: z.boolean().default(true),
  defaultSortBy: z.enum(['date', 'importance', 'mood', 'chapter']).default('date'),
  defaultSortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type ContentConfig = z.infer<typeof ContentConfigSchema>;

// ============================================================================
// Calendar Configuration (with cycle tracking)
// ============================================================================

export const CalendarEventSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(), // ISO date
  type: z.enum([
    'anniversary',
    'birthday',
    'firstChat',
    'firstCall',
    'firstMeeting',
    'proposal',
    'travel',
    'custom',
    'cycleStart',
  ]),
  color: z.string().optional(),
  icon: z.string().optional(),
  description: z.string().optional(),
});

export const CalendarConfigSchema = z.object({
  enabled: z.boolean().default(true),
  showUpcomingCountdown: z.boolean().default(true),
  cycleTrackingEnabled: z.boolean().default(false),
  cycleDuration: z.number().min(20).max(40).default(28), // days
  lastCycleStart: z.string().optional(), // ISO date
  showCycleEstimate: z.boolean().default(true),
  showCycleNotification: z.boolean().default(false),
  cycleNotificationDaysBefore: z.number().min(0).max(7).default(1),
});

export type CalendarEvent = z.infer<typeof CalendarEventSchema>;
export type CalendarConfig = z.infer<typeof CalendarConfigSchema>;

// ============================================================================
// Complete Application Configuration
// ============================================================================

export const AppConfigSchema = z.object({
  website: WebsiteConfigSchema,
  theme: ThemeSchema,
  animations: AnimationConfigSchema,
  music: MusicConfigSchema,
  features: FeaturesSchema,
  security: SecuritySchema,
  content: ContentConfigSchema,
  calendar: CalendarConfigSchema,
});

export type AppConfig = z.infer<typeof AppConfigSchema>;
