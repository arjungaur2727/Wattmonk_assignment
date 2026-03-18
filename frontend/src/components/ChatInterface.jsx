import { useState, useRef, useEffect } from 'react'
import { sendChat } from '../api/chat.js'

const SUGGESTIONS = [
  'What does Wattmonk do?',
  'What is the Zippy tool?',
  'Explain NEC Article 690',
  'How fast is plan set delivery?',
  'What is the 120% busbar rule?',
  'What is rapid shutdown?',
]

function SourceBadge({ source }) {
  const map = {
    'NEC Code': 'nec',
    'Wattmonk': 'wattmonk',
    'General Knowledge': 'general',
    'ERROR': 'error',
  }
  const cls = map[source] || 'general'
  return <span className={`source-badge ${cls}`}>{source}</span>
}

function TypingIndicator() {
  return (
    <div className="typing-row">
      <div className="msg-icon ai">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="1" y="3" width="12" height="9" rx="2" stroke="white" strokeWidth="1.2" />
          <path d="M4 8h2M8 8h2M4 6h6" stroke="white" strokeWidth="1" strokeLinecap="round" />
        </svg>
      </div>
      <div className="typing-bubble">
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
      </div>
    </div>
  )
}

const AiIcon = () => (
  <div className="msg-icon ai">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <rect x="1" y="3" width="12" height="9" rx="2" stroke="white" strokeWidth="1.2" />
      <path d="M4 8h2M8 8h2M4 6h6" stroke="white" strokeWidth="1" strokeLinecap="round" />
    </svg>
  </div>
)

const UserIcon = () => (
  <div className="msg-icon user">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="5" r="2.5" stroke="white" strokeWidth="1.2" />
      <path d="M2 12c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  </div>
)

export default function ChatInterface() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const handleSend = async (text) => {
    const query = (text || input).trim()
    if (!query || loading) return

    setInput('')
    const userMsg = { role: 'user', content: query, id: Date.now() }
    setMessages(prev => [...prev, userMsg])
    setLoading(true)

    try {
      const history = messages.slice(-10)
      const data = await sendChat(query, history)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.answer,
        source: data.source,
        confidence: data.confidence,
        id: Date.now() + 1,
      }])
    } catch (err) {
      const msg = err.response?.data?.detail || err.message || 'Connection error — is the backend running?'
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: msg,
        source: 'ERROR',
        id: Date.now() + 1,
      }])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <section className="chat-section" id="chat">
      <div className="section-header" style={{ maxWidth: 860, margin: '0 auto 2rem' }}>
        <span className="section-tag">Live Demo</span>
        <h2 className="section-title">Chat with Solar Sage</h2>
        <p className="section-sub">
          Ask about Wattmonk services, NEC code requirements, or any solar question.
        </p>
      </div>

      <div className="chat-wrapper">
        {/* Header */}
        <div className="chat-header">
          <div className="chat-avatar">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="3.5" fill="#0F172A" />
              <line x1="9" y1="1" x2="9" y2="3.5" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
              <line x1="9" y1="14.5" x2="9" y2="17" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
              <line x1="1" y1="9" x2="3.5" y2="9" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
              <line x1="14.5" y1="9" x2="17" y2="9" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="chat-meta">
            <h3>Solar Sage</h3>
            <p>
              <span className="status-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} />
              Online — Gemini + RAG
            </p>
          </div>
        </div>

        {/* Suggested questions */}
        <div className="suggestions">
          {SUGGESTIONS.map(q => (
            <button
              key={q}
              className="suggestion-chip"
              onClick={() => handleSend(q)}
              disabled={loading}
            >
              {q}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="messages">
          {messages.length === 0 && (
            <div className="welcome-state">
              <div className="welcome-icon-wrap">
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <circle cx="11" cy="11" r="4" stroke="#D97706" strokeWidth="1.5" />
                  <line x1="11" y1="2" x2="11" y2="5" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="11" y1="17" x2="11" y2="20" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="2" y1="11" x2="5" y2="11" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="17" y1="11" x2="20" y2="11" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="15.66" y1="15.66" x2="17.78" y2="17.78" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="17.78" y1="4.22" x2="15.66" y2="6.34" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
                  <line x1="6.34" y1="15.66" x2="4.22" y2="17.78" stroke="#D97706" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <h4>Welcome to Solar Sage</h4>
              <p>
                Ask about NEC electrical codes, Wattmonk services, or general
                solar energy questions. Select a prompt above to get started.
              </p>
            </div>
          )}

          {messages.map(msg => (
            <div key={msg.id} className={`msg-row ${msg.role === 'user' ? 'user' : 'ai'}`}>
              {msg.role === 'user' ? <UserIcon /> : <AiIcon />}
              <div className="msg-body">
                <div className={`bubble ${msg.role === 'user' ? 'user' : 'ai'}`}>
                  {msg.content}
                </div>
                {msg.role === 'assistant' && msg.source && (
                  <SourceBadge source={msg.source} />
                )}
              </div>
            </div>
          ))}

          {loading && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="chat-input-bar">
          <div className="input-box">
            <textarea
              ref={inputRef}
              id="chat-input"
              className="chat-textarea"
              placeholder="Ask about solar, NEC codes, or Wattmonk..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              rows={1}
              disabled={loading}
            />
          </div>
          <button
            id="send-btn"
            className="send-button"
            onClick={() => handleSend()}
            disabled={loading || !input.trim()}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8l12-6-5 6 5 6-12-6z" fill="white" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
