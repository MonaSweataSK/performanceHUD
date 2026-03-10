import React, { useEffect, useState, useCallback, useRef } from 'react';
import { PerfEngine } from '../core/engine';
import type { MetricId, Rating, VitalPayload } from '../core/types';
import { MetricTile } from './MetricTile';
import '../styles.css';

interface PerfHudProps {
  metrics?: MetricId[];
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  theme?: 'dark' | 'light' | 'auto';
  reportTo?: string | ((payload: VitalPayload) => void);
  sampleRate?: number;
  onVital?: (payload: VitalPayload) => void;
  budgets?: Record<MetricId, number>;
  defaultExpanded?: boolean;
}

export const PerfHud: React.FC<PerfHudProps> = ({
  metrics = ['LCP', 'INP', 'CLS', 'FCP', 'TTFB'],
  position = 'bottom-right',
  theme = 'dark',
  reportTo,
  sampleRate = 1.0,
  onVital,
  budgets,
  defaultExpanded = true,
}) => {
  const [metricData, setMetricData] = useState<Record<MetricId, { value: number | null, delta: number, rating: Rating | null, history: number[] }>>(() => {
    const initial: any = {};
    metrics.forEach(m => {
      initial[m] = { value: null, delta: 0, rating: null, history: [] };
    });
    return initial;
  });

  const [isExpanded, setIsExpanded] = useState(() => {
    // Try to restore from sessionStorage
    try {
      const stored = sessionStorage.getItem('react-perf-hud-expanded');
      if (stored !== null) return stored === 'true';
    } catch (e) {}
    return defaultExpanded;
  });

  const [pos, setPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ isDragging: false, startX: 0, startY: 0, initialX: 0, initialY: 0 });

  // Safety check for production (can also be stripped via Babel plugin)
  // @ts-ignore
  if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'production') {
    return null;
  }

  useEffect(() => {
    sessionStorage.setItem('react-perf-hud-expanded', String(isExpanded));
  }, [isExpanded]);

  // Initial positioning based on props, only if not previously dragged
  useEffect(() => {
    try {
      const storedPos = sessionStorage.getItem('react-perf-hud-pos');
      if (storedPos) {
        setPos(JSON.parse(storedPos));
        return;
      }
    } catch (e) {}

    const pad = 20;
    let x = 0, y = 0;
    
    // We need to wait for layout to get accurate width/height, 
    // so we approximate or use generic fixed positioning via CSS if no exact pos.
    // However, since it's draggable, it's better to manage x/y in state completely.
    
    // For simplicity, we just set initial offset from edges
    if (position.includes('right')) x = window.innerWidth - 250 - pad;
    else x = pad;

    if (position.includes('bottom')) y = window.innerHeight - 400 - pad;
    else y = pad;

    // A small timeout to ensure container is rendered and sized
    setTimeout(() => {
      if (containerRef.current) {
         const rect = containerRef.current.getBoundingClientRect();
         if (position.includes('right')) x = window.innerWidth - rect.width - pad;
         if (position.includes('bottom')) y = window.innerHeight - rect.height - pad;
         setPos({ x: Math.max(0, x), y: Math.max(0, y) });
      } else {
         setPos({ x: Math.max(0, x), y: Math.max(0, y) });
      }
    }, 100);

  }, [position]);

  useEffect(() => {
    const handleRecieveVital = (payload: VitalPayload) => {
      setMetricData(prev => {
        const currentData = prev[payload.metric] || { value: null, delta: 0, rating: null, history: [] };
        
        // Keep last 20 history items
        const newHistory = [...currentData.history, payload.value].slice(-20);
        
        return {
          ...prev,
          [payload.metric]: {
            value: payload.value,
            delta: payload.delta,
            rating: payload.rating,
            history: newHistory,
          }
        };
      });

      if (onVital) {
        onVital(payload);
      }
    };

    const engine = new PerfEngine({
      metrics,
      reportTo,
      sampleRate,
      onVital: handleRecieveVital
    });

    engine.start();

    return () => {
      engine.stop();
    };
  }, [metrics, reportTo, sampleRate, onVital]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (dragRef.current.isDragging) return;
    
    // Check if clicked exactly on the drag handle, not on buttons inside it
    if ((e.target as HTMLElement).tagName.toLowerCase() === 'button') return;

    dragRef.current = {
      isDragging: true,
      startX: e.clientX,
      startY: e.clientY,
      initialX: pos.x,
      initialY: pos.y
    };
    
    // Avoid text selection during drag
    e.preventDefault();
    document.body.style.userSelect = 'none';

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const handlePointerMove = useCallback((e: PointerEvent) => {
    if (!dragRef.current.isDragging || !containerRef.current) return;

    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;

    let newX = dragRef.current.initialX + dx;
    let newY = dragRef.current.initialY + dy;

    // Clamp to viewport
    const rect = containerRef.current.getBoundingClientRect();
    newX = Math.max(0, Math.min(window.innerWidth - rect.width, newX));
    newY = Math.max(0, Math.min(window.innerHeight - rect.height, newY));

    setPos({ x: newX, y: newY });
  }, []);

  const handlePointerUp = useCallback(() => {
    dragRef.current.isDragging = false;
    document.body.style.userSelect = '';
    
    // Save position
    try {
      sessionStorage.setItem('react-perf-hud-pos', JSON.stringify(pos));
    } catch(e) {}

    window.removeEventListener('pointermove', handlePointerMove);
    window.removeEventListener('pointerup', handlePointerUp);
  }, [pos, handlePointerMove]);


  const isChromium = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  const isFirefox = /Firefox/.test(navigator.userAgent);
  const isSafari = /Safari/.test(navigator.userAgent) && !isChromium;
  const showBanner = isFirefox || isSafari;

  if (!isExpanded) {
    return (
      <button 
        className={`ph-container ph-theme-${theme} ph-minimized`}
        style={{ left: pos.x, top: pos.y }}
        onClick={() => setIsExpanded(true)}
        title="Open Performance HUD"
      >
        <span className="ph-minimized-icon">⚡</span>
      </button>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`ph-container ph-theme-${theme}`}
      style={{ left: pos.x, top: pos.y }}
    >
      <div 
        className="ph-drag-handle" 
        onPointerDown={handlePointerDown}
      >
        <span>⚡ UX Vitals</span>
        <div className="ph-controls">
          <button className="ph-btn" onClick={() => {
             // Reset history
             setMetricData(prev => {
               const next: any = {};
               Object.keys(prev).forEach(k => {
                 next[k] = { ...prev[k as MetricId], history: [] };
               });
               return next;
             });
          }} title="Clear History">↺</button>
          <button className="ph-btn" onClick={() => setIsExpanded(false)} title="Minimize">−</button>
        </div>
      </div>
      
      {showBanner && (
        <div className="ph-browser-banner">
          Some metrics are Chromium-only. Showing available data.
        </div>
      )}

      <div className="ph-content">
        {metrics.map(metricId => {
          const data = metricData[metricId];
          return (
            <MetricTile
              key={metricId}
              metricId={metricId}
              value={data.value}
              delta={data.delta}
              rating={data.rating}
              history={data.history}
              isExpanded={isExpanded}
              budgets={budgets}
            />
          );
        })}
      </div>
    </div>
  );
};
