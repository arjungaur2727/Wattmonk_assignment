export default function Navbar({ onChatClick }) {
  return (
    <nav className="navbar">
      <a href="#" className="navbar-logo">
        <div className="logo-mark">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="3" fill="#F59E0B" />
            <line x1="8" y1="1" x2="8" y2="3" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="8" y1="13" x2="8" y2="15" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="1" y1="8" x2="3" y2="8" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="13" y1="8" x2="15" y2="8" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="2.93" y1="2.93" x2="4.34" y2="4.34" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="11.66" y1="11.66" x2="13.07" y2="13.07" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="13.07" y1="2.93" x2="11.66" y2="4.34" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="4.34" y1="11.66" x2="2.93" y2="13.07" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
        <span className="logo-text">Solar<span>Sage</span></span>
      </a>

      <ul className="nav-links">
        <li><a href="#hero">Home</a></li>
        <li><a href="#chat">Chat</a></li>
        <li><a href="#features">Features</a></li>
        <li>
          <a href="#chat" className="nav-cta" onClick={onChatClick}>
            Try the Assistant
          </a>
        </li>
      </ul>
    </nav>
  )
}
