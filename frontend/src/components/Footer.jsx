export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="footer-mark">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="2.2" fill="#0F172A" />
            <line x1="6" y1="1" x2="6" y2="2.5" stroke="#0F172A" strokeWidth="1.3" strokeLinecap="round" />
            <line x1="6" y1="9.5" x2="6" y2="11" stroke="#0F172A" strokeWidth="1.3" strokeLinecap="round" />
            <line x1="1" y1="6" x2="2.5" y2="6" stroke="#0F172A" strokeWidth="1.3" strokeLinecap="round" />
            <line x1="9.5" y1="6" x2="11" y2="6" stroke="#0F172A" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
        </div>
        SolarSage by Wattmonk
      </div>
      <div className="footer-right">
        Gemini AI + RAG Architecture + FAISS &nbsp;|&nbsp; 2025 Wattmonk
      </div>
    </footer>
  )
}
