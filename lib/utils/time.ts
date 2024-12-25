export function formatTimeRemaining(seconds: number): { days: number; hours: number } {
  return {
    days: Math.floor(seconds / (24 * 60 * 60)),
    hours: Math.floor((seconds % (24 * 60 * 60)) / 3600)
  };
}