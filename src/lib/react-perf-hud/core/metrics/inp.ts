import { onINP } from 'web-vitals';
import type { MetricDefinition } from '../types';

export const INPDefinition: MetricDefinition = {
  id: 'INP',
  name: 'Interaction to Next Paint',
  thresholds: { good: 200, poor: 500 },
  supportedBrowsers: { chrome: true },
  observe: (cb) => {
    onINP((metric) => {
      cb({
        value: metric.value,
        delta: metric.delta,
      });
    }, { reportAllChanges: true });

    return () => {};
  }
};
