import { onLCP } from 'web-vitals';
import type { MetricDefinition } from '../types';

export const LCPDefinition: MetricDefinition = {
  id: 'LCP',
  name: 'Largest Contentful Paint',
  thresholds: { good: 2500, poor: 4000 },
  supportedBrowsers: { chrome: true },
  observe: (cb) => {
    onLCP((metric) => {
      cb({
        value: metric.value,
        delta: metric.delta,
      });
    }, { reportAllChanges: true });
    // Note: web-vitals doesn't currently expose a way to unobserve a specific callback
    // easily without a custom wrapper, but for our HUD usage, it's typically a singleton.
    return () => {};
  }
};
