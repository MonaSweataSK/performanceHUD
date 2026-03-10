# react-perf-hud

A plug-and-play React component for capturing live Core Web Vitals and diagnostic metrics directly inside any application — where Lighthouse cannot reach.

## Installation

```bash
npm install react-perf-hud
```

## Usage

Drop the HUD directly into your React application's root component.

```tsx
import { PerfHud } from 'react-perf-hud';
import 'react-perf-hud/styles.css';

function App() {
  return (
    <div>
      <PerfHud 
        position="bottom-right" 
        theme="dark" 
      />
      {/* Your app content here */}
    </div>
  );
}
```

## Features
* **Real-time Vitals**: Tracks LCP, INP, CLS natively using PerformanceObserver and web-vitals.
* **Secondary Diagnostics**: Tracks FCP, TTFB, TBT, and JS Memory.
* **Production Safe**: Automatically bypassed when `NODE_ENV === 'production'`.

## Reporting

You can beacon data seamlessly:

```tsx
<PerfHud reportTo="https://your-analytics-endpoint.com/ingest" />
```
