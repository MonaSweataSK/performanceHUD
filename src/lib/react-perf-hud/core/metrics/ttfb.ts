import { onTTFB } from 'web-vitals';
import type { MetricDefinition } from '../types';

export const TTFBDefinition: MetricDefinition = {
  id: 'TTFB',
  name: 'Time to First Byte',
  thresholds: { good: 800, poor: 1800 },
  supportedBrowsers: { chrome: true, firefox: true, safari: true },
  observe: (cb) => {
    onTTFB((metric) => {
      cb({
        value: metric.value,
        delta: metric.delta,
      });
    }, { reportAllChanges: true });

    return () => {};
  }
};
