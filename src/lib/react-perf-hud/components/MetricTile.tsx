import React, { useMemo } from 'react';
import type { MetricId, Rating } from '../core/types';
import { getMetricDefinition } from '../core/registry';
import { Sparkline } from './Sparkline';

interface MetricTileProps {
  metricId: MetricId;
  value: number | null;
  delta: number;
  rating: Rating | null;
  history: number[];
  isExpanded: boolean;
  budgets?: Record<MetricId, number>;
}

export const MetricTile: React.FC<MetricTileProps> = ({ 
  metricId, value, delta, rating, history, isExpanded, budgets 
}) => {
  const definition = getMetricDefinition(metricId);
  const isChromium = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  const isFirefox = /Firefox/.test(navigator.userAgent);
  const isSafari = /Safari/.test(navigator.userAgent) && !isChromium;

  let isSupported = true;
  if (!definition?.supportedBrowsers.chrome && isChromium) isSupported = false;
  if (!definition?.supportedBrowsers.firefox && isFirefox) isSupported = false;
  if (!definition?.supportedBrowsers.safari && isSafari) isSupported = false;

  const displayValue = value === null || !isSupported 
    ? '--' 
    : metricId === 'CLS' ? value.toFixed(3) : Math.round(value);

  const displayDelta = delta === 0 ? '' : delta > 0 ? `+${Math.round(delta)}` : `${Math.round(delta)}`;
  const metricName = definition?.name || metricId;

  const budgetExceeded = budgets?.[metricId] !== undefined && value !== null && value > budgets[metricId];

  const ratingColor = useMemo(() => {
    switch (rating) {
      case 'good': return '#0cce6b';
      case 'needs-improvement': return '#ffa400';
      case 'poor': return '#ff4e42';
      default: return '#888888';
    }
  }, [rating]);

  if (!isExpanded) {
    if (budgetExceeded || rating === 'poor') {
      return (
        <div className="ph-tile-mini ph-rating-poor" title={`${metricId} is poor or exceeds budget`}>
          <span>{metricId}</span>
        </div>
      );
    }
    return null;
  }

  return (
    <div className={`ph-tile ${budgetExceeded ? 'ph-budget-exceeded' : ''}`} title={!isSupported ? "Metric not supported in this browser" : metricName}>
      <div className="ph-tile-header">
        <span className="ph-metric-id">{metricId}</span>
        {isSupported && rating && (
          <span className={`ph-badge ph-badge-${rating}`} style={{backgroundColor: ratingColor}}>
            {rating.replace('-', ' ')}
          </span>
        )}
      </div>
      <div className="ph-tile-body">
        <span className="ph-metric-value">
          {displayValue} {value !== null && isSupported && metricId !== 'CLS' ? 'ms' : ''}
        </span>
        {isSupported && delta !== 0 && (
          <span className="ph-metric-delta">{displayDelta}</span>
        )}
      </div>
      {isSupported && history.length > 0 && (
        <div className="ph-tile-chart">
          <Sparkline data={history} color={ratingColor} />
        </div>
      )}
    </div>
  );
};
