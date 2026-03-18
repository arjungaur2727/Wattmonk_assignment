// Clean SVG icons as components
const IconBolt = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M10 2L4 10h6l-2 6 8-9h-6l2-5z" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const IconDoc = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="3" y="2" width="12" height="14" rx="2" stroke="white" strokeWidth="1.3" />
    <line x1="6" y1="7" x2="12" y2="7" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
    <line x1="6" y1="10" x2="12" y2="10" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
    <line x1="6" y1="13" x2="9" y2="13" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)

const IconBuilding = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <rect x="2" y="4" width="14" height="12" rx="1" stroke="white" strokeWidth="1.3" />
    <line x1="6" y1="4" x2="6" y2="16" stroke="white" strokeWidth="1.3" />
    <line x1="12" y1="4" x2="12" y2="16" stroke="white" strokeWidth="1.3" />
    <line x1="2" y1="9" x2="16" y2="9" stroke="white" strokeWidth="1.3" />
    <rect x="7" y="12" width="4" height="4" stroke="white" strokeWidth="1.2" />
    <path d="M6 1l6 0" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
    <line x1="9" y1="1" x2="9" y2="4" stroke="white" strokeWidth="1.3" />
  </svg>
)

const IconRoute = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="4" cy="9" r="2" stroke="white" strokeWidth="1.3" />
    <circle cx="14" cy="5" r="2" stroke="white" strokeWidth="1.3" />
    <circle cx="14" cy="13" r="2" stroke="white" strokeWidth="1.3" />
    <path d="M6 9h4l1-4M10 9l1 4" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)

const IconTag = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9 2H3a1 1 0 00-1 1v6l7 7 7-7-7-7z" stroke="white" strokeWidth="1.3" strokeLinejoin="round" />
    <circle cx="5.5" cy="6.5" r="1" fill="white" />
  </svg>
)

const IconChat = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M2 4a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2H6l-4 3V4z" stroke="white" strokeWidth="1.3" strokeLinejoin="round" />
  </svg>
)

const FEATURES = [
  {
    Icon: IconBolt,
    title: 'Instant Solar Answers',
    desc: 'Get accurate answers on system sizing, PV concepts, and installation practices in seconds.',
    tag: 'General AI',
  },
  {
    Icon: IconDoc,
    title: 'NEC Code Intelligence',
    desc: 'Query Articles 690, 705, 250 and more — rapid shutdown, grounding, ampacity, and code compliance.',
    tag: 'RAG-Powered',
  },
  {
    Icon: IconBuilding,
    title: 'Wattmonk Knowledge Base',
    desc: 'Plan sets, Zippy tool, PE reviews, PTO applications, and all Wattmonk services from a dedicated index.',
    tag: 'Company RAG',
  },
  {
    Icon: IconRoute,
    title: 'Smart Intent Routing',
    desc: 'Automatically classifies your query and routes it to the correct knowledge source without user input.',
    tag: 'Auto-Routing',
  },
  {
    Icon: IconTag,
    title: 'Source Attribution',
    desc: 'Every response is tagged with its source and a similarity-based confidence score for full transparency.',
    tag: 'Transparency',
  },
  {
    Icon: IconChat,
    title: 'Conversation Memory',
    desc: 'Maintains context across messages for natural multi-turn follow-up questions within a session.',
    tag: 'Session Memory',
  },
]

export default function Features() {
  return (
    <section className="features-section" id="features">
      <div className="section-header">
        <span className="section-tag">Capabilities</span>
        <h2 className="section-title">Built for Solar Professionals</h2>
        <p className="section-sub">
          A multi-context RAG system that dynamically switches knowledge sources
          for factual, traceable answers.
        </p>
      </div>

      <div className="features-grid">
        {FEATURES.map(({ Icon, title, desc, tag }) => (
          <div key={title} className="feature-cell">
            <div className="feature-icon-box">
              <Icon />
            </div>
            <h3>{title}</h3>
            <p>{desc}</p>
            <span className="feature-tag">{tag}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
