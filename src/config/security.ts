import { type Security } from '@/types/config';

export const securityConfig: Security = {
  passwordRequired: true,
  sessionTimeout: 3600000,
  rememberDevice: false,
  enableBackups: true,
  backupFrequency: 'weekly',
};
