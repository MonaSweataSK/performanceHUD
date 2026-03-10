import type { MetricDefinition } from '../types';

export const TBTDefinition: MetricDefinition = {
  id: 'TBT',
  name: 'Total Blocking Time',
  thresholds: { good: 200, poor: 600 },
  supportedBrowsers: { chrome: true },
  observe: (cb) => {
    let tbtValue = 0;
    
    // TBT is sum of all long tasks between FCP and TTI.
    // In a real-time HUD, it's easier to just accumulate long tasks over the session
    // since TTI is deprecating and hard to measure accurately in SPAs.
    // For HUD purposes, we track a rolling TBT or session TBT.

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      for (const entry of entries) {
        // A long task is any task > 50ms. The blocking time is duration - 50ms.
        tbtValue += entry.duration - 50;
        cb({ value: tbtValue, delta: entry.duration - 50 });
      }
    });

    try {
      observer.observe({ type: 'longtask', buffered: true });
    } catch (e) {
      // Browser doesn't support longtask
    }

    return () => observer.disconnect();
  }
};
