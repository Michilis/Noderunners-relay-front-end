'use client';

import { formatTimeRemaining } from '@/lib/utils/time';

interface StatusMessageProps {
  isWhitelisted: boolean;
  timeRemaining: number | null;
  error?: string;
}

export function StatusMessage({ isWhitelisted, timeRemaining, error }: StatusMessageProps) {
  if (error) {
    return <div className="text-destructive text-center mt-4">{error}</div>;
  }

  if (isWhitelisted) {
    return (
      <div className="bg-green-500/10 text-green-500 p-4 rounded-lg text-center mt-4">
        ✓ Your key is whitelisted - You can connect to the relay
      </div>
    );
  }

  if (timeRemaining !== null && timeRemaining > 0) {
    const { days, hours } = formatTimeRemaining(timeRemaining);
    return (
      <div className="bg-primary/10 text-primary p-4 rounded-lg text-center mt-4">
        Access time remaining: {days} days {hours} hours
      </div>
    );
  }

  return null;
}