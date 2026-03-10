export type MetricId = 'LCP' | 'INP' | 'CLS' | 'FCP' | 'TTFB' | 'TBT' | 'Memory';
export type Rating = 'good' | 'needs-improvement' | 'poor';

export interface VitalPayload {
  metric: MetricId;
  value: number;
  rating: Rating;
  delta: number;
  navigationType: string;
  sessionId: string;
  url: string;
  timestamp: number;
}

export interface Thresholds {
  good: number;
  poor: number;
}

export interface BrowserSupport {
  chrome?: boolean;
  firefox?: boolean;
  safari?: boolean;
}

export interface MetricDefinition {
  id: MetricId;
  name: string;
  thresholds: Thresholds;
  supportedBrowsers: BrowserSupport;
  observe: (callback: (payload: Partial<VitalPayload>) => void) => () => void;
}
