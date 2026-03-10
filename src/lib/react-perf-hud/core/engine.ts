import { getMetricDefinition } from './registry';
import type { MetricId, VitalPayload } from './types';
import { getRating, getSessionId, getNavigationType } from './utils';

type ObserverCleanup = () => void;

interface EngineConfig {
  metrics: MetricId[];
  onVital?: (payload: VitalPayload) => void;
  reportTo?: string | ((payload: VitalPayload) => void);
  sampleRate?: number;
}

export class PerfEngine {
  private config: EngineConfig;
  private cleanups: ObserverCleanup[] = [];

  constructor(config: EngineConfig) {
    this.config = Object.assign({
      sampleRate: 1.0,
      metrics: ['LCP', 'INP', 'CLS', 'FCP', 'TTFB']
    }, config);
  }

  public start() {
    // Only start if we clear the sample rate
    if (Math.random() > (this.config.sampleRate || 1.0)) {
      return;
    }

    this.config.metrics.forEach(metricId => {
      const def = getMetricDefinition(metricId);
      if (!def) return;

      const cleanup = def.observe((partialPayload) => {
        const value = partialPayload.value ?? 0;
        const delta = partialPayload.delta ?? 0;
        const rating = getRating(value, def.thresholds);

        const payload: VitalPayload = {
          metric: metricId,
          value,
          delta,
          rating,
          navigationType: getNavigationType(),
          sessionId: getSessionId(),
          url: window.location.href,
          timestamp: performance.timeOrigin + performance.now()
        };

        if (this.config.onVital) {
          this.config.onVital(payload);
        }

        this.report(payload);
      });

      this.cleanups.push(cleanup);
    });
  }

  public stop() {
    this.cleanups.forEach(cleanup => cleanup());
    this.cleanups = [];
  }

  private report(payload: VitalPayload) {
    if (!this.config.reportTo) return;

    if (typeof this.config.reportTo === 'function') {
      this.config.reportTo(payload);
    } else if (typeof this.config.reportTo === 'string') {
      const body = JSON.stringify(payload);
      if (navigator.sendBeacon) {
        navigator.sendBeacon(this.config.reportTo, body);
      } else {
        fetch(this.config.reportTo, {
          body,
          method: 'POST',
          keepalive: true,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
  }
}
