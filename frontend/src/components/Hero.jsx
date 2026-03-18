export default function Hero({ onChatClick }) {
  const litCells = [1, 3, 5, 8, 9]

  return (
    <section className="hero" id="hero">
      {/* ── Left: Copy ── */}
      <div>
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-dot" />
          RAG-powered Solar Intelligence
        </div>

        <h1 className="hero-title">
          Smart Solar Assistant<br />
          for <span className="accent">Installers</span>
        </h1>

        <p className="hero-sub">
          Get accurate answers on NEC electrical codes, Wattmonk services, and
          solar energy — powered by Gemini AI with retrieval-augmented generation.
        </p>

        <div className="hero-actions">
          <button className="btn-primary" onClick={onChatClick}>
            Start chatting
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <a href="#features" className="btn-secondary">
            See how it works
          </a>
        </div>

        <div className="hero-stats">
          <div>
            <span className="hero-stat-num">20K+</span>
            <span className="hero-stat-label">Homes served / month</span>
          </div>
          <div>
            <span className="hero-stat-num">6,500+</span>
            <span className="hero-stat-label">AHJs in database</span>
          </div>
          <div>
            <span className="hero-stat-num">50</span>
            <span className="hero-stat-label">US states covered</span>
          </div>
        </div>
      </div>

      {/* ── Right: Dashboard visual ── */}
      <div className="hero-visual">
        <div className="dashboard-card">
          <div className="dashboard-header">
            <span className="dashboard-title">System Monitor</span>
            <span className="status-pill">
              <span className="status-dot" />
              Online
            </span>
          </div>

          <div className="panel-grid">
            {Array.from({ length: 12 }, (_, i) => (
              <div key={i} className={`panel-cell${litCells.includes(i) ? ' lit' : ''}`} />
            ))}
          </div>

          <div className="metrics-grid">
            <div className="metric-item">
              <div className="metric-label">Peak Output</div>
              <div className="metric-value amber">8.4 kW</div>
            </div>
            <div className="metric-item">
              <div className="metric-label">Efficiency</div>
              <div className="metric-value">98.2%</div>
            </div>
            <div className="metric-item">
              <div className="metric-label">Array Size</div>
              <div className="metric-value">24 panels</div>
            </div>
            <div className="metric-item">
              <div className="metric-label">Cost Savings</div>
              <div className="metric-value amber">30%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
