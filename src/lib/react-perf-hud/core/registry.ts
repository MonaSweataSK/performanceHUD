import { LCPDefinition } from './metrics/lcp';
import { INPDefinition } from './metrics/inp';
import { CLSDefinition } from './metrics/cls';
import { FCPDefinition } from './metrics/fcp';
import { TTFBDefinition } from './metrics/ttfb';
import { TBTDefinition } from './metrics/tbt';
import { MemoryDefinition } from './metrics/memory';
import type { MetricDefinition, MetricId } from './types';

export const metricRegistry: Record<MetricId, MetricDefinition> = {
  LCP: LCPDefinition,
  INP: INPDefinition,
  CLS: CLSDefinition,
  FCP: FCPDefinition,
  TTFB: TTFBDefinition,
  TBT: TBTDefinition,
  Memory: MemoryDefinition,
};

export function getMetricDefinition(id: MetricId): MetricDefinition {
  return metricRegistry[id];
}
