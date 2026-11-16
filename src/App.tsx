import { useMemo, useState } from 'react'
import { ArrowUpRight, Atom, AudioLines, Bot, Braces, Check, ChevronDown, Command, Globe2, Image, LockKeyhole, Menu, MessageSquareText, Search, Sparkles, WandSparkles, X, Zap } from 'lucide-react'
import { authConfigured, supabase } from './lib/supabase'

const tools = [
  { name: 'AI Chat', category: 'ASSISTANT', description: 'Think, explore ideas, and get answers with an intelligent chat companion.', icon: MessageSquareText, tone: 'cyan', tag: 'POPULAR' },
  { name: 'AI Writer', category: 'CONTENT', description: 'Turn rough thoughts into sharp copy, stories, and professional content.', icon: WandSparkles, tone: 'violet', tag: 'CREATIVITY' },
  { name: 'Image Studio', category: 'IMAGE', description: 'Bring visual concepts to life with next-generation image creation.', icon: Image, tone: 'pink', tag: 'VISUAL' },
  { name: 'Translator', category: 'LANGUAGE', description: 'Break language barriers and make every conversation feel natural.', icon: Globe2, tone: 'blue', tag: 'GLOBAL' },
  { name: 'Summarizer', category: 'PRODUCTIVITY', description: 'Extract the signal from long documents, articles, and notes.', icon: Atom, tone: 'green', tag: 'FOCUS' },
  { name: 'Code Assistant', category: 'DEVELOPMENT', description: 'Debug, explain, and accelerate your next software project.', icon: Braces, tone: 'orange', tag: 'BUILD' },
  { name: 'Voice Lab', category: 'AUDIO', description: 'Explore speech, transcription, and audio-powered workflows.', icon: AudioLines, tone: 'cyan', tag: 'AUDIO' },
  { name: 'Prompt Lab', category: 'WORKFLOW', description: 'Craft better prompts and get more from every AI model.', icon: Command, tone: 'violet', tag: 'POWER USER' },
]
const filters = ['All tools', 'Assistant', 'Content', 'Image', 'Language', 'Productivity', 'Development', 'Audio', 'Workflow']

export default function App() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('All tools')
  const [modal, setModal] = useState<'login' | 'signup' | null>(null)
  const [mobileMenu, setMobileMenu] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState('')
  const [userEmail, setUserEmail] = useState('')

  const visibleTools = useMemo(() => tools.filter(tool => {
    const matchesFilter = filter === 'All tools' || tool.category.toLowerCase() === filter.toLowerCase()
    const matchesQuery = (tool.name + ' ' + tool.description + ' ' + tool.category).toLowerCase().includes(query.toLowerCase())
    return matchesFilter && matchesQuery
  }), [filter, query])

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault()
    if (!supabase) { setNotice('Account access is not connected yet. Add your Supabase keys to enable sign in.'); return }
    setBusy(true); setNotice('')
    const result = modal === 'signup'
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password })
    setBusy(false)
    if (result.error) setNotice(result.error.message)
    else { setUserEmail(email); setNotice(modal === 'signup' ? 'Check your inbox to confirm your account.' : 'You are signed in.') }
  }

  return <div className="app-shell">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <header className="topbar">
      <a className="brand" href="#"><span className="brand-mark"><Zap size={19} fill="currentColor" /></span><span>NEON<span className="brand-accent">MIND</span></span></a>
      <nav className={mobileMenu ? 'nav-links open' : 'nav-links'}>
        <a href="#tools" onClick={() => setMobileMenu(false)}>Explore tools</a><a href="#how" onClick={() => setMobileMenu(false)}>How it works</a><a href="#about" onClick={() => setMobileMenu(false)}>About</a>
      </nav>
      <div className="nav-actions">
        {userEmail ? <span className="user-pill"><span className="online-dot" />{userEmail}</span> : <><button className="btn-quiet" onClick={() => setModal('login')}>Log in</button><button className="btn-primary small" onClick={() => setModal('signup')}>Create account <ArrowUpRight size={15} /></button></>}
      </div>
      <button className="mobile-toggle" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle navigation">{mobileMenu ? <X /> : <Menu />}</button>
    </header>

    <main>
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="eyebrow"><span className="pulse-dot" /> THE AI TOOL UNIVERSE <span className="eyebrow-line" /></div>
          <h1>Intelligence<br />for your <span className="gradient-text">next move.</span></h1>
          <p className="hero-copy">One launchpad. Limitless possibilities. Discover powerful AI tools built to help you create, think, and move faster.</p>
          <div className="hero-actions"><a className="btn-primary" href="#tools">Explore AI tools <ArrowUpRight size={17} /></a><a className="btn-outline" href="#how">See how it works <ChevronDown size={16} /></a></div>
          <div className="hero-meta"><span><span className="online-dot" /> YOUR AI WORKSPACE</span><span className="meta-divider" /><span>BUILT FOR WHAT'S NEXT</span></div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="orbit orbit-c" />
          <div className="core"><div className="core-inner"><Sparkles size={43} /></div></div>
          <div className="float-card card-chat"><MessageSquareText size={17} /><span>AI CHAT</span><i /></div>
          <div className="float-card card-image"><Image size={17} /><span>IMAGE LAB</span><i /></div>
          <div className="float-card card-code"><Braces size={17} /><span>CODE ASSIST</span><i /></div>
          <div className="orbit-label label-top">NEURAL NETWORK / 01</div><div className="orbit-label label-bottom">CONNECT · CREATE · EVOLVE</div>
        </div>
        <div className="hero-bottom"><span>SCROLL TO EXPLORE</span><div className="scroll-line" /><span>01 / 03</span></div>
      </section>

      <section className="tools-section" id="tools">
        <div className="section-heading"><div><div className="section-kicker">THE TOOLKIT</div><h2>Find your <span className="gradient-text">unfair advantage.</span></h2><p>Everything you need to turn your next idea into something real.</p></div><div className="tool-count"><strong>08</strong><span>TOOLS<br />TO EXPLORE</span></div></div>
        <div className="tool-controls"><div className="search-box"><Search size={17} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search tools..." /></div><div className="filter-list">{filters.map(item => <button key={item} className={filter === item ? 'filter-chip active' : 'filter-chip'} onClick={() => setFilter(item)}>{item}</button>)}</div></div>
        <div className="tool-grid">{visibleTools.map((tool, index) => { const Icon = tool.icon; return <article className="tool-card" key={tool.name} style={{ animationDelay: index * 45 + 'ms' }}><div className="tool-card-top"><span className={'tool-icon ' + tool.tone}><Icon size={21} /></span><span className="tool-tag">{tool.tag}</span></div><div className="tool-category">{tool.category}</div><h3>{tool.name}</h3><p>{tool.description}</p><button className="tool-link" onClick={() => setNotice(tool.name + ' is coming soon. Tool integrations are being prepared.')}>Explore tool <ArrowUpRight size={15} /></button><span className="card-index">0{tools.indexOf(tool) + 1}</span></article> })}</div>
        {visibleTools.length === 0 && <div className="empty-state">No tools match that search. Try another keyword.</div>}
      </section>

      <section className="how-section" id="how"><div className="how-visual"><div className="scan-ring" /><div className="how-symbol"><Bot size={54} /></div><span className="visual-caption">HUMAN CURIOSITY × MACHINE INTELLIGENCE</span></div><div className="how-copy"><div className="section-kicker">SIMPLE BY DESIGN</div><h2>Your ideas.<br /><span className="gradient-text">Amplified.</span></h2><p>NEONMIND brings useful AI experiences into one focused space. No endless searching, no clutter — just the tools you need for your next move.</p><div className="steps"><div><span>01</span><p><b>Discover</b><small>Find the right tool for the task ahead.</small></p><Check size={16} /></div><div><span>02</span><p><b>Get access</b><small>Create your account and build your workspace.</small></p><Check size={16} /></div><div><span>03</span><p><b>Make it happen</b><small>Turn ideas into work worth sharing.</small></p><Check size={16} /></div></div></div></section>

      <section className="cta-section" id="about"><div className="cta-glow" /><div className="section-kicker">THE FUTURE IS A WORK IN PROGRESS</div><h2>Make your next move<br /><span className="gradient-text">a smarter one.</span></h2><p>Get ready to explore a new way to work with AI.</p><button className="btn-primary" onClick={() => setModal('signup')}>Join NEONMIND <ArrowUpRight size={17} /></button></section>
    </main>
    <footer><a className="brand footer-brand" href="#"><span className="brand-mark"><Zap size={16} fill="currentColor" /></span><span>NEON<span className="brand-accent">MIND</span></span></a><span>© 2026 NEONMIND. BUILT FOR WHAT'S NEXT.</span><a href="#tools">BACK TO TOP ↑</a></footer>

    {notice && <div className="toast" role="status">{notice}<button onClick={() => setNotice('')} aria-label="Dismiss"><X size={15} /></button></div>}
    {modal && <div className="modal-backdrop" onClick={() => setModal(null)}><div className="auth-modal" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setModal(null)} aria-label="Close"><X /></button><div className="modal-mark"><LockKeyhole size={23} /></div><div className="section-kicker">YOUR SPACE IN THE FUTURE</div><h2>{modal === 'signup' ? 'Create your account.' : 'Welcome back.'}</h2><p>{modal === 'signup' ? 'Get ready to build with NEONMIND.' : 'Sign in to continue your journey.'}</p><form onSubmit={handleAuth}><label>Email address<input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" /></label><label>Password<input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 6 characters" /></label><button className="btn-primary auth-submit" disabled={busy}>{busy ? 'Please wait...' : modal === 'signup' ? 'Create account' : 'Log in'} <ArrowUpRight size={16} /></button></form>{!authConfigured && <div className="auth-note">Authentication setup is ready for Supabase. Add your project keys to activate accounts.</div>}<div className="auth-switch">{modal === 'signup' ? 'Already have an account?' : "Don't have an account?"} <button onClick={() => { setModal(modal === 'signup' ? 'login' : 'signup'); setNotice('') }}>{modal === 'signup' ? 'Log in' : 'Sign up'}</button></div></div></div>}
  </div>
}
