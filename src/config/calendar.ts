import { type CalendarConfig } from '@/types/config';

export const calendarConfig: CalendarConfig = {
  enabled: true,
  showUpcomingCountdown: true,
  cycleTrackingEnabled: true,
  cycleDuration: 28,
  lastCycleStart: '2026-07-08',
  showCycleEstimate: true,
  showCycleNotification: true,
  cycleNotificationDaysBefore: 2,
};
