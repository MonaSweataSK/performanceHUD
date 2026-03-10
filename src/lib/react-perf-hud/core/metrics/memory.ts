import type { MetricDefinition } from '../types';

export const MemoryDefinition: MetricDefinition = {
  id: 'Memory',
  name: 'JS Heap Usage (MB)',
  thresholds: { good: 50, poor: 150 }, // Arbitrary thresholds for memory
  supportedBrowsers: { chrome: true },
  observe: (cb) => {
    let intervalId: number;

    const checkMemory = () => {
      if (performance && (performance as any).memory) {
        // performance.memory is Chrome only
        const memory = (performance as any).memory;
        const usedJSHeapSizeMB = Math.round(memory.usedJSHeapSize / (1024 * 1024));
        cb({ value: usedJSHeapSizeMB, delta: 0 }); // Delta is harder to track for memory without state
      }
    };

    if (performance && (performance as any).memory) {
      intervalId = window.setInterval(checkMemory, 1000);
      checkMemory(); // Initial check
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }
};
