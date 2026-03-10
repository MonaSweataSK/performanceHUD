import type { MetricDefinition } from '../types';

export const FCPDefinition: MetricDefinition = {
  id: 'FCP',
  name: 'First Contentful Paint',
  thresholds: { good: 1800, poor: 3000 },
  supportedBrowsers: { chrome: true, firefox: true, safari: true },
  observe: (cb) => {
    let fired = false;
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      for (const entry of entries) {
        if (entry.name === 'first-contentful-paint' && !fired) {
          fired = true;
          cb({ value: entry.startTime });
          observer.disconnect();
        }
      }
    });
    observer.observe({ type: 'paint', buffered: true });

    return () => observer.disconnect();
  }
};
