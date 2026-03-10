# react-perf-hud

A plug-and-play React component for capturing live **Core Web Vitals** and diagnostic metrics directly inside any application.

[![npm version](https://img.shields.io/npm/v/react-perf-hud.svg)](https://www.npmjs.com/package/react-perf-hud)

## Features

- 📊 **Live metrics** — LCP, INP, CLS, FCP, TTFB, TBT, Memory
- 🎨 **Themes** — Dark, Light, Auto (follows system preference)
- 📌 **Draggable & collapsible** — Position anywhere, minimize to icon
- 📈 **Sparkline charts** — Inline history visualization
- 🎯 **Performance budgets** — Visual alerts when thresholds are exceeded
- 🌐 **Browser-aware** — Shows available metrics per browser
- 🪵 **Callbacks & reporting** — Hook into metric data via `onVital`

## Installation

```bash
npm install react-perf-hud
```

## Quick Start

```jsx
import { PerfHud } from 'react-perf-hud';
import 'react-perf-hud/styles.css';

function App() {
  return (
    <div>
      <PerfHud />
      {/* Your app content */}
    </div>
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `metrics` | `MetricId[]` | `['LCP','INP','CLS','FCP','TTFB']` | Metrics to display |
| `position` | `'top-left' \| 'top-right' \| 'bottom-left' \| 'bottom-right'` | `'bottom-right'` | Initial position |
| `theme` | `'dark' \| 'light' \| 'auto'` | `'dark'` | Color theme |
| `budgets` | `Record<MetricId, number>` | — | Performance budget thresholds |
| `onVital` | `(payload: VitalPayload) => void` | — | Callback on each metric update |
| `reportTo` | `string \| ((payload) => void)` | — | Endpoint URL or function for reporting |
| `sampleRate` | `number` | `1.0` | Sampling rate (0–1) |
| `defaultExpanded` | `boolean` | `true` | Start expanded or minimized |

### Available Metrics

`LCP` · `INP` · `CLS` · `FCP` · `TTFB` · `TBT` · `Memory`

## Examples

### With performance budgets

```jsx
<PerfHud
  metrics={['LCP', 'INP', 'CLS', 'FCP', 'TTFB', 'TBT', 'Memory']}
  budgets={{ LCP: 2500, CLS: 0.1, INP: 200 }}
  theme="dark"
  position="bottom-right"
/>
```

### With metric callback

```jsx
<PerfHud
  onVital={(payload) => {
    console.log(`${payload.metric}: ${payload.value} (${payload.rating})`);
  }}
/>
```

### Light theme, top-left

```jsx
<PerfHud theme="light" position="top-left" />
```

## TypeScript

The package ships with full type declarations. Key exported types:

```ts
import type { VitalPayload, MetricId, Rating } from 'react-perf-hud';
```

## License

MIT © [MonaSweataSK](https://github.com/MonaSweataSK)
