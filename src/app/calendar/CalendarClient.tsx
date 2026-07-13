'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/ui/Navigation';

// ============================================================================
// CONSTANTS & CONFIG
// ============================================================================

const CYCLE_LENGTH = 28;
const PERIOD_DURATION = 5;
const LAST_PERIOD_START = new Date(2026, 6, 8); // July 8, 2026

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// ============================================================================
// CYCLE CALCULATION ENGINE
// ============================================================================

type DayType = 'period' | 'fertile' | 'ovulation' | 'normal' | 'pms';

interface CycleInfo {
  dayType: DayType;
  cycleDay: number;
  isToday: boolean;
}

/**
 * Calculate all period start dates within a range
 */
function getPeriodStarts(from: Date, to: Date): Date[] {
  const starts: Date[] = [];
  const current = new Date(LAST_PERIOD_START);

  // Go back enough cycles to cover the range
  while (current > from) {
    current.setDate(current.getDate() - CYCLE_LENGTH);
  }

  // Now go forward
  while (current <= to) {
    if (current >= from || new Date(current.getTime() + PERIOD_DURATION * 86400000) >= from) {
      starts.push(new Date(current));
    }
    current.setDate(current.getDate() + CYCLE_LENGTH);
  }

  return starts;
}

/**
 * Determine what type a specific day is
 */
function getDayInfo(date: Date, periodStarts: Date[], today: Date): CycleInfo {
  const dateTime = date.getTime();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
  const dateStart = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
  const isToday = dateStart === todayStart;

  for (const start of periodStarts) {
    const startTime = start.getTime();
    const diffDays = Math.round((dateTime - startTime) / 86400000);

    if (diffDays >= 0 && diffDays < CYCLE_LENGTH) {
      const cycleDay = diffDays + 1;

      let dayType: DayType = 'normal';

      if (diffDays < PERIOD_DURATION) {
        dayType = 'period';
      } else if (diffDays >= 10 && diffDays <= 16) {
        dayType = diffDays === 14 ? 'ovulation' : 'fertile';
      } else if (diffDays >= CYCLE_LENGTH - 5) {
        dayType = 'pms';
      }

      return { dayType, cycleDay, isToday };
    }
  }

  return { dayType: 'normal', cycleDay: 0, isToday };
}

/**
 * Get next period start from today
 */
function getNextPeriodStart(): Date {
  const today = new Date();
  const current = new Date(LAST_PERIOD_START);

  while (current <= today) {
    current.setDate(current.getDate() + CYCLE_LENGTH);
  }

  return current;
}

/**
 * Get current cycle info
 */
function getCurrentCycleInfo(): {
  currentDay: number;
  nextPeriod: Date;
  daysUntilNext: number;
  phase: string;
  phaseEmoji: string;
} {
  const today = new Date();
  const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();

  // Find the most recent period start
  const current = new Date(LAST_PERIOD_START);
  while (current.getTime() + CYCLE_LENGTH * 86400000 <= todayStart) {
    current.setDate(current.getDate() + CYCLE_LENGTH);
  }

  const diffDays = Math.round((todayStart - current.getTime()) / 86400000);
  const currentDay = diffDays + 1;
  const nextPeriod = getNextPeriodStart();
  const daysUntilNext = Math.round((nextPeriod.getTime() - todayStart) / 86400000);

  let phase: string;
  let phaseEmoji: string;

  if (diffDays < PERIOD_DURATION) {
    phase = 'Period';
    phaseEmoji = '🌸';
  } else if (diffDays < 10) {
    phase = 'Follicular';
    phaseEmoji = '🌱';
  } else if (diffDays >= 10 && diffDays <= 16) {
    phase = diffDays === 14 ? 'Ovulation' : 'Fertile Window';
    phaseEmoji = '✨';
  } else if (diffDays >= CYCLE_LENGTH - 5) {
    phase = 'PMS / Luteal';
    phaseEmoji = '🫂';
  } else {
    phase = 'Luteal';
    phaseEmoji = '🌙';
  }

  return { currentDay, nextPeriod, daysUntilNext, phase, phaseEmoji };
}

// ============================================================================
// CALENDAR GRID
// ============================================================================

function getCalendarDays(year: number, month: number): (Date | null)[] {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay();
  const totalDays = lastDay.getDate();

  const days: (Date | null)[] = [];

  // Leading empty cells
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  // Actual days
  for (let i = 1; i <= totalDays; i++) {
    days.push(new Date(year, month, i));
  }

  return days;
}

// ============================================================================
// DAY CELL COMPONENT
// ============================================================================

function DayCell({ date, info }: { date: Date; info: CycleInfo }) {
  const dayNum = date.getDate();

  const bgClass = (() => {
    switch (info.dayType) {
      case 'period':
        return 'bg-sukuun-period-red/20 text-sukuun-period-red';
      case 'fertile':
        return 'bg-sukuun-fertile-green/15 text-sukuun-fertile-green';
      case 'ovulation':
        return 'bg-sukuun-ovulation-blue/20 text-sukuun-ovulation-blue';
      case 'pms':
        return 'bg-sukuun-lavender/30 text-sukuun-lavender-deep';
      default:
        return 'text-sukuun-text';
    }
  })();

  const dotColor = (() => {
    switch (info.dayType) {
      case 'period':
        return 'bg-sukuun-period-red';
      case 'fertile':
        return 'bg-sukuun-fertile-green';
      case 'ovulation':
        return 'bg-sukuun-ovulation-blue';
      case 'pms':
        return 'bg-sukuun-lavender-deep';
      default:
        return '';
    }
  })();

  return (
    <div className="flex flex-col items-center py-1">
      <div
        className={`
          w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-medium
          transition-all duration-200
          ${bgClass}
          ${info.isToday ? 'ring-2 ring-sukuun-text ring-offset-2 ring-offset-sukuun-cream' : ''}
        `}
      >
        {dayNum}
      </div>
      {info.dayType !== 'normal' && (
        <div className={`w-1 h-1 rounded-full ${dotColor} mt-1`} />
      )}
    </div>
  );
}

// ============================================================================
// STATUS CARD
// ============================================================================

function StatusCard({
  emoji,
  label,
  value,
  subtext,
  gradient,
}: {
  emoji: string;
  label: string;
  value: string;
  subtext?: string;
  gradient: string;
}) {
  return (
    <div className={`${gradient} rounded-2xl p-4 sm:p-5`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{emoji}</span>
        <span className="text-xs font-medium text-sukuun-text-light uppercase tracking-wider">
          {label}
        </span>
      </div>
      <p className="text-xl sm:text-2xl font-bold font-[family-name:var(--font-crimson)] text-sukuun-text">
        {value}
      </p>
      {subtext && (
        <p className="text-xs text-sukuun-text-light mt-1">{subtext}</p>
      )}
    </div>
  );
}

// ============================================================================
// MAIN CALENDAR CLIENT COMPONENT
// ============================================================================

export default function CalendarClient() {
  const today = useMemo(() => new Date(), []);
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const cycleInfo = useMemo(() => getCurrentCycleInfo(), []);

  const calendarDays = useMemo(
    () => getCalendarDays(currentYear, currentMonth),
    [currentYear, currentMonth]
  );

  const periodStarts = useMemo(() => {
    const from = new Date(currentYear, currentMonth - 1, 1);
    const to = new Date(currentYear, currentMonth + 2, 0);
    return getPeriodStarts(from, to);
  }, [currentYear, currentMonth]);

  const goToPrevMonth = useCallback(() => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  }, [currentMonth]);

  const goToNextMonth = useCallback(() => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  }, [currentMonth]);

  const goToToday = useCallback(() => {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
  }, [today]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-dvh pb-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-sukuun-rose/15 blur-[100px] -translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-[20%] right-0 w-[350px] h-[350px] rounded-full bg-sukuun-lavender/15 blur-[80px] translate-x-1/3" />

      <div className="relative z-10 max-w-lg mx-auto px-4 sm:px-5 pt-8 sm:pt-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-crimson)] text-sukuun-text">
            Calendar
          </h1>
          <p className="text-sm text-sukuun-text-light mt-1">
            Cycle tracking & care reminders
          </p>
        </motion.div>

        {/* Current Cycle Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-2 gap-3 mb-6"
        >
          <StatusCard
            emoji={cycleInfo.phaseEmoji}
            label="Current Phase"
            value={cycleInfo.phase}
            subtext={`Day ${cycleInfo.currentDay} of ${CYCLE_LENGTH}`}
            gradient="bg-gradient-to-br from-sukuun-rose/30 to-sukuun-pink/20"
          />
          <StatusCard
            emoji="📅"
            label="Next Period"
            value={`${cycleInfo.daysUntilNext}d`}
            subtext={formatDate(cycleInfo.nextPeriod)}
            gradient="bg-gradient-to-br from-sukuun-lavender/30 to-sukuun-blue/20"
          />
        </motion.div>

        {/* Cycle Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="glass-strong rounded-2xl p-4 sm:p-5 mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-sukuun-text-light uppercase tracking-wider">
              Cycle Progress
            </span>
            <span className="text-xs text-sukuun-text-light">
              Day {cycleInfo.currentDay}/{CYCLE_LENGTH}
            </span>
          </div>
          <div className="w-full h-2.5 bg-sukuun-gray-light rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(cycleInfo.currentDay / CYCLE_LENGTH) * 100}%` }}
              transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-sukuun-period-red via-sukuun-fertile-green to-sukuun-lavender-deep"
            />
          </div>
          {/* Phase markers */}
          <div className="flex mt-2 text-[9px] sm:text-[10px] text-sukuun-gray-dark">
            <span style={{ width: `${(PERIOD_DURATION / CYCLE_LENGTH) * 100}%` }}>🌸</span>
            <span style={{ width: `${(5 / CYCLE_LENGTH) * 100}%` }}>🌱</span>
            <span style={{ width: `${(7 / CYCLE_LENGTH) * 100}%` }}>✨</span>
            <span className="flex-1 text-right">🌙</span>
          </div>
        </motion.div>

        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="glass-strong rounded-3xl p-4 sm:p-6 mb-6"
        >
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-5">
            <button
              onClick={goToPrevMonth}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-sukuun-gray-light transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-sukuun-text-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>

            <button onClick={goToToday} className="text-center">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={`${currentYear}-${currentMonth}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-lg font-semibold font-[family-name:var(--font-crimson)] text-sukuun-text"
                >
                  {MONTHS[currentMonth]} {currentYear}
                </motion.h2>
              </AnimatePresence>
            </button>

            <button
              onClick={goToNextMonth}
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-sukuun-gray-light transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-sukuun-text-light" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS_OF_WEEK.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-sukuun-gray-dark py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-y-1">
            {calendarDays.map((date, i) =>
              date ? (
                <DayCell
                  key={date.toISOString()}
                  date={date}
                  info={getDayInfo(date, periodStarts, today)}
                />
              ) : (
                <div key={`empty-${i}`} />
              )
            )}
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="glass rounded-2xl p-4 sm:p-5"
        >
          <h3 className="text-xs font-semibold text-sukuun-text-light uppercase tracking-wider mb-3">
            Legend
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-sukuun-period-red/40" />
              <span className="text-xs text-sukuun-text-light">Period</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-sukuun-fertile-green/40" />
              <span className="text-xs text-sukuun-text-light">Fertile Window</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-sukuun-ovulation-blue/40" />
              <span className="text-xs text-sukuun-text-light">Ovulation Day</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-sukuun-lavender-deep/40" />
              <span className="text-xs text-sukuun-text-light">PMS Phase</span>
            </div>
          </div>
        </motion.div>

        {/* Note */}
        <p className="text-center text-[10px] text-sukuun-gray-dark/50 mt-6 mb-4 tracking-wide">
          Predictions based on a {CYCLE_LENGTH}-day cycle · For awareness only ♡
        </p>
      </div>

      {/* Navigation */}
      <Navigation />
    </div>
  );
}
