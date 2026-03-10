# react-perf-hud

A plug-and-play React component for capturing live **Core Web Vitals** and diagnostic metrics directly inside any application.

[![npm version](https://img.shields.io/npm/v/react-perf-hud.svg)](https://www.npmjs.com/package/react-perf-hud)
[![license](https://img.shields.io/npm/l/react-perf-hud.svg)](https://github.com/MonaSweataSK/performanceHUD/blob/main/LICENSE)

## Development Setup

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install & Run

```bash
git clone https://github.com/MonaSweataSK/performanceHUD.git
cd performanceHUD
npm install
npm run dev          # Start the demo app at localhost:5173
```

---

## Project Structure

```
performanceHUD/
├── src/
│   ├── lib/react-perf-hud/    # 📦 Library source (published to npm)
│   │   ├── components/        # PerfHud, MetricTile, Sparkline
│   │   ├── core/              # PerfEngine, metric observers, types
│   │   ├── styles.css         # Library styles
│   │   └── index.ts           # Public API exports
│   ├── App.tsx                # Demo app
│   └── main.tsx               # Demo entry point
├── dist-lib/                  # Library build output (git-ignored)
├── lib-package.json           # package.json template for npm publishes
├── vite.config.ts             # Demo app Vite config
├── vite.config.lib.ts         # Library build Vite config
├── scripts/
│   └── bump-version.js        # Version bump + commit + tag script
└── .github/workflows/
    └── publish.yml            # CI/CD: auto-publish to npm on version tags
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the demo app with HMR |
| `npm run build:app` | Build the demo app for production |
| `npm run build:lib` | Build the library → `dist-lib/` |
| `npm run publish:lib` | Build + publish to npm |
| `npm run release -- patch` | Bump patch version (bug fix: `1.0.1 → 1.0.2`) |
| `npm run release -- minor` | Bump minor version (feature: `1.0.2 → 1.1.0`) |
| `npm run release -- major` | Bump major version (breaking: `1.1.0 → 2.0.0`) |
| `npm run lint` | Run ESLint |

---

## Release Workflow

### 1. Make your changes and commit

```bash
git add -A && git commit -m "feat: add new metric"
```

### 2. Bump version (creates commit + tag automatically)

```bash
npm run release -- patch     # or minor / major
```

### 3. Push to GitHub (triggers auto-publish via GitHub Actions)

```bash
git push origin main --tags
```

The **GitHub Actions workflow** handles the rest — builds the library and publishes to npm automatically.

### Manual publish (without CI)

```bash
npm run publish:lib
```

---

## Configuration

### Two Vite configs

- **`vite.config.ts`** — Demo app config (standard React + Vite)
- **`vite.config.lib.ts`** — Library build config (outputs ES + CJS bundles, generates `.d.ts` types, externalizes React/ReactDOM)

### Two package.json files

- **`package.json`** — Root project (dev dependencies, scripts)
- **`lib-package.json`** — Template copied into `dist-lib/` during build (this is what gets published to npm)

> **Important:** When bumping versions, update `lib-package.json` (or use `npm run release`). The bump script keeps both files in sync.

---

## License

MIT © [MonaSweataSK](https://github.com/MonaSweataSK)
