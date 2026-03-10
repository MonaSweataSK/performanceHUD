import type { Rating } from './types';

export function getRating(value: number, thresholds: { good: number, poor: number }): Rating {
  if (value <= thresholds.good) return 'good';
  if (value > thresholds.poor) return 'poor';
  return 'needs-improvement';
}

export function isChromium(): boolean {
  return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
}

export function getNavigationType(): string {
  const pnt = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  return pnt ? pnt.type : 'navigate';
}

let sessionId = '';
export function getSessionId(): string {
  if (!sessionId) {
    sessionId = crypto.randomUUID();
  }
  return sessionId;
}
