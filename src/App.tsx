
import { useState } from 'react'
import CatMap from './components/CatMap'
import { useSimulatedCat } from './hooks/useSimulatedCat'

export default function App() {
  const [running, setRunning] = useState(true)
  const [speed, setSpeed] = useState(1000)
  // Center on Kathmandu
  const { point, trail, stats } = useSimulatedCat({
    start: { lat: 27.7172, lng: 85.3240 },
    intervalMs: speed,
    running
  })

  return (
    <div className="app">
      <header>
        <div>
          <h1>CAT‑TAG Real‑Time Tracker Demo</h1>
          <div className="sub" role="status" aria-live="polite">
            Live location updates • {running ? "Streaming" : "Paused"}
          </div>
        </div>
        <div className="controls">
          <button className="btn" onClick={() => setRunning(v => !v)} aria-pressed={running}>
            {running ? "Pause" : "Resume"}
          </button>
          <button className="btn" onClick={() => setSpeed(250)} aria-pressed={speed===250}>4× speed</button>
          <button className="btn" onClick={() => setSpeed(1000)} aria-pressed={speed===1000}>1× speed</button>
          <button className="btn" onClick={() => setSpeed(2000)} aria-pressed={speed===2000}>0.5× speed</button>
        </div>
      </header>

      <section className="panel" aria-label="Status panel">
        <div className="card">
          <div className="label">Last Seen</div>
          <div className="value">{stats.lastSeen.toLocaleTimeString()}</div>
        </div>
        <div className="card">
          <div className="label">Speed</div>
          <div className="value">{stats.speedKmh.toFixed(1)} km/h</div>
        </div>
        <div className="card">
          <div className="label">GPS Accuracy</div>
          <div className="value">±{Math.round(stats.accuracyM)} m</div>
        </div>
        <div className="card">
          <div className="label">Collar Battery</div>
          <div className="value">{Math.round(stats.batteryPct)}%</div>
        </div>
        <div className="card">
          <div className="label">Trail Points</div>
          <div className="value">{stats.totalPoints}</div>
        </div>
        <div className="card">
          <div className="label">Mode</div>
          <div className="value"><span className="badge" aria-label="Demo mode">Simulation</span></div>
        </div>
      </section>

      <CatMap point={point} trail={trail} />

      <footer>
        <div>Built with React + Leaflet • WCAG-friendly controls</div>
        <a href="https://github.com/meetprateek" target="_blank" rel="noreferrer">GitHub</a>
      </footer>
    </div>
  )
}
