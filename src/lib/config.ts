import {
  AppConfigSchema,
  type AppConfig,
} from '@/types/config';
import { websiteConfig } from '@/config/website';
import { themeConfig } from '@/config/theme';
import { animationsConfig } from '@/config/animations';
import { musicConfig } from '@/config/music';
import { featuresConfig } from '@/config/features';
import { securityConfig } from '@/config/security';
import { contentConfig } from '@/config/content';
import { calendarConfig } from '@/config/calendar';

let cachedConfig: AppConfig | null = null;

/**
 * Load and cache application configuration
 * TypeScript configs are pre-validated, but we parse for runtime safety
 */
export function loadConfig(): AppConfig {
  if (cachedConfig) {
    return cachedConfig;
  }

  try {
    const config: AppConfig = {
      website: websiteConfig,
      theme: themeConfig,
      animations: animationsConfig,
      music: musicConfig,
      features: featuresConfig,
      security: securityConfig,
      content: contentConfig,
      calendar: calendarConfig,
    };

    // Validate entire config structure for runtime safety
    cachedConfig = AppConfigSchema.parse(config);
    return cachedConfig;
  } catch (error) {
    console.error('Failed to load configuration:', error);
    throw new Error('Configuration validation failed');
  }
}

/**
 * Reset cached configuration (useful for testing or reloading)
 */
export function resetConfigCache(): void {
  cachedConfig = null;
}

/**
 * Get a specific configuration section
 */
export function getConfigSection<K extends keyof AppConfig>(section: K): AppConfig[K] {
  const config = loadConfig();
  return config[section];
}
