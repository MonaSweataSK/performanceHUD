import { useState } from 'react'
import { PerfHud } from './lib/react-perf-hud';
import './App.css'

function HeavyComponent() {
  const start = performance.now();
  while (performance.now() - start < 200) {
    // block main thread for 200ms
  }
  return <div className="demo-box p-4 bg-red-100 rounded">Heavy Component (Blocked for 200ms)</div>;
}

function App() {
  const [showHeavy, setShowHeavy] = useState(false);
  const [items, setItems] = useState<number[]>([]);

  const triggerLayoutShift = () => {
    // Add item to top of list, shifting content down
    setItems(prev => [Date.now(), ...prev]);
  };

  const triggerLongTask = () => {
    // Block thread for 500ms
    const start = performance.now();
    while (performance.now() - start < 500) {}
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-8">
      <PerfHud 
        position="bottom-right" 
        theme="dark" 
        metrics={['LCP', 'INP', 'CLS', 'FCP', 'TTFB', 'TBT', 'Memory']}
        budgets={{ LCP: 2000, CLS: 0.1 } as any}
      />
      
      <header className="max-w-4xl mx-auto mb-12 border-b pb-8">
        <h1 className="text-4xl font-bold tracking-tight mb-4">React Performance HUD</h1>
        <p className="text-lg text-gray-600">
          A plug-and-play React component for capturing live Core Web Vitals and diagnostic metrics directly inside any application.
        </p>
      </header>

      <main className="max-w-4xl mx-auto space-y-12">
        <section className="bg-white p-6 rounded-xl shadow-sm border">
          <h2 className="text-2xl font-semibold mb-4">Simulate Performance Events</h2>
          <p className="text-gray-500 mb-6">Use these controls to observe how the HUD reacts to bad performance patterns.</p>
          
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={triggerLayoutShift}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
            >
              Trigger Layout Shift (CLS)
            </button>
            
            <button 
              onClick={() => setShowHeavy(prev => !prev)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
            >
              Toggle Heavy Component (TBT/INP)
            </button>

            <button 
              onClick={triggerLongTask}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium"
            >
              Simulate 500ms Block (TBT/INP)
            </button>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl shadow-sm border min-h-[300px]">
          <h2 className="text-2xl font-semibold mb-4">Test Area</h2>
          <div className="space-y-4">
            {showHeavy && <HeavyComponent />}
            
            <p className="text-gray-600 leading-relaxed">
              This area contains content that will be shifted around when you trigger a layout shift.
              Notice how the CLS metric in the HUD increases as content is pushed down unexpectedly without user interaction.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map(id => (
                <div key={id} className="p-4 bg-blue-50 border border-blue-100 rounded-lg animate-fade-in">
                  Inserted Content Blocks {id}
                </div>
              ))}
            </div>

            <img 
              src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=800&auto=format&fit=crop" 
              alt="Test Image for LCP" 
              className="w-full h-64 object-cover rounded-lg"
              loading="lazy"
            />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
