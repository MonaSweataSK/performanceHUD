import { onCLS } from 'web-vitals';
import type { MetricDefinition } from '../types';

export const CLSDefinition: MetricDefinition = {
  id: 'CLS',
  name: 'Cumulative Layout Shift',
  thresholds: { good: 0.1, poor: 0.25 },
  supportedBrowsers: { chrome: true },
  observe: (cb) => {
    onCLS((metric) => {
      cb({
        value: metric.value,
        delta: metric.delta,
      });
    }, { reportAllChanges: true });

    return () => {};
  }
};
