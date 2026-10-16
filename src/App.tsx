import { useCallback, useEffect, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Code2,
  Copy,
  FileText,
  FolderGit2,
  GraduationCap,
  Menu,
  Network,
  Phone,
  ShieldCheck,
  TerminalSquare,
  Users,
  Workflow,
  X,
} from 'lucide-react';
import {
  BrowserRouter,
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import ProjectModal, { type ProjectEntry } from './components/ProjectModal';
import ResumeModal from './components/ResumeModal';
import { DiscordMark, GitHubMark, LinkedInMark } from './components/SocialMarks';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Leadership', to: '/leadership' },
  { label: 'Contact', to: '/contact' },
];

const projectEntries: ProjectEntry[] = [
  {
    id: 'discord',
    category: 'Backend & Bots',
    number: '01',
    name: 'Syntax Bot',
    summary: 'Modular Discord engine with administrative control, live telemetry, and automated community moderation.',
    architecture: ['TypeScript', 'Discord.js / Next.js', 'Prisma ORM', 'PostgreSQL'],
    specs: [
      'Administrative lifecycle control: dynamic slash-command sync, modular extension reloads, graceful shutdowns',
      'Built-in status heartbeat diagnostics and server uptime monitoring',
      'AutoMod enforcement, invite tracking, and automated reaction roles',
    ],
    status: 'Active & Maintained',
    href: 'https://github.com/SaujanPdl/syntax-bot',
    icon: ShieldCheck,
    tone: 'emerald',
  },
  {
    id: 'jarvis',
    category: 'Python Automation',
    number: '02',
    name: 'Jarvis AI Assistant',
    summary: 'Python-powered personal desktop assistant designed for workflow automation, voice/text command parsing, and system operations.',
    architecture: ['Python 3', 'SpeechRecognition / Pyttsx3', 'OS Automation', 'API Integrations'],
    specs: [
      'Automated desktop application control, file management, and quick web searches',
      'Voice-enabled query processing and real-time task automation pipelines',
      'Modular script architecture for rapid command expansion',
    ],
    status: 'Production / Open Source',
    href: 'https://github.com/SaujanPdl/Jarvis_Project',
    icon: TerminalSquare,
    tone: 'blue',
  },
  {
    id: 'automation',
    category: 'Python Automation',
    number: '03',
    name: '15-Day Python Automation & File Triage Engine',
    summary: 'Automated filesystem hygiene pipeline and structured web scraping engine.',
    architecture: ['Python 3.12', 'pathlib', 'shutil', 'BeautifulSoup4', 'Requests'],
    specs: [
      'Automated directory sorting, file extension classification, and batch filesystem cleanup',
      'Resilient web scrapers with error handling and CSV / JSON export pipelines',
      'Modular utility scripts built to eliminate repetitive local OS tasks',
    ],
    status: 'Completed Sprint',
    href: 'https://github.com/SaujanPdl/15day-automation-sprint',
    icon: FolderGit2,
    tone: 'violet',
  },
  {
    id: 'student-os',
    category: 'Productivity Systems',
    number: '04',
    name: 'Student OS & Notion Workspace Architecture',
    summary: 'A connected academic workspace for tracking study, reviews, and student operations in one system.',
    architecture: ['Notion Formulas 2.0', 'Relational databases', 'Digital product design'],
    specs: ['Academic tracking dashboard', 'Automated study scheduling', 'Reusable workspace architecture'],
    status: 'Concept & Architecture',
    href: 'https://github.com/SaujanPdl',
    icon: GraduationCap,
    tone: 'amber',
  },
  {
    id: 'sagarmatha',
    category: 'Community & Gaming',
    number: '05',
    name: 'Sagarmatha Gaming Platform',
    summary: 'Interactive community hub and gaming resource architecture built for regional players and creators.',
    architecture: ['Full-Stack Architecture', 'TypeScript / React', 'Community API Integrations'],
    specs: ['Custom gaming community platform and event tracking', 'Active architecture and backend pipeline setup'],
    status: 'In Development • GitHub',
    href: 'https://github.com/SaujanPdl/SagarmathaGaming',
    icon: Network,
    tone: 'amber',
  },
];

const skillGroups = [
  {
    title: 'Python Engineering',
    icon: Code2,
    color: 'violet',
    level: 'PRIMARY',
    skills: ['Python 3.x', 'pathlib', 'shutil', 'Requests', 'BeautifulSoup4', 'SpeechRecognition', 'Pyttsx3', 'Data handling'],
  },
  {
    title: 'AI & Data Science',
    icon: Network,
    color: 'emerald',
    level: 'FOUNDATIONS',
    skills: ['AI algorithms', 'Data pipelines', 'Statistical analysis', 'Model workflows', 'Pokhara University curriculum'],
  },
  {
    title: 'Web & Frontend',
    icon: Workflow,
    color: 'blue',
    level: 'PRACTICAL',
    skills: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'Component-driven UI', 'Hooks'],
  },
  {
    title: 'Discord Engineering',
    icon: ShieldCheck,
    color: 'emerald',
    level: 'BUILT & MANAGED',
    skills: ['Custom bot architecture', 'Slash commands', 'Admin lifecycle', 'Modular cogs', 'AutoMod', 'Uptime telemetry', 'Server management', 'Moderation setup'],
  },
  {
    title: 'Developer Tools & Systems',
    icon: TerminalSquare,
    color: 'violet',
    level: 'DAILY TOOLING',
    skills: ['Linux / Bash', 'Git', 'GitHub workflows', 'VS Code', 'Cursor'],
  },
];

const terminalTabs = {
  'automation.py': [
    'from pathlib import Path',
    'import shutil',
    '',
    'def organize(root: str) -> None:',
    '    workspace = Path(root)',
    '    for item in workspace.iterdir():',
    '        if not item.is_file():',
    '            continue',
    '        folder = item.suffix[1:].upper()',
    '        target = workspace / folder',
    '        target.mkdir(exist_ok=True)',
    '        shutil.move(str(item), target / item.name)',
  ],
  'bot_engine.ts': [
    'const client = new Client({ intents: [Guilds, Messages] });',
    'client.on("messageCreate", async (message) => {',
    '  if (message.author.bot) return;',
    '  await autoModEngine.inspect(message);',
    '  telemetry.logEvent("packet_received", { author: message.author.id });',
    '});',
  ],
  'telemetry.sh': [
    '#!/usr/bin/env bash',
    'set -euo pipefail',
    '',
    'service="community-bot"',
    'uptime=$(uptime -p)',
    'latency_ms=18',
    '',
    'printf "[system: ready] %s\\n" "$service"',
    'printf "uptime: %s\\n" "$uptime"',
    'printf "latency: %sms\\n" "$latency_ms"',
    'printf "git commit: live\\n"',
  ],
};

type TerminalTab = keyof typeof terminalTabs;
type CopyKind = 'email' | 'phone';
type CopyStatus = { kind: CopyKind; result: 'copied' | 'error' } | null;

const reveal = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 260, damping: 20, staggerChildren: 0.12 },
  },
};
const revealItem = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 260, damping: 20 } },
};

function spotlight(event: MouseEvent<HTMLElement>): CSSProperties {
  const bounds = event.currentTarget.getBoundingClientRect();
  return {
    '--spot-x': `${event.clientX - bounds.left}px`,
    '--spot-y': `${event.clientY - bounds.top}px`,
  } as CSSProperties;
}

function trackSpotlight(event: MouseEvent<HTMLElement>) {
  Object.assign(event.currentTarget.style, spotlight(event));
  event.currentTarget.querySelectorAll<HTMLElement>('.spotlight-card').forEach((card) => {
    const bounds = card.getBoundingClientRect();
    card.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`);
    card.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`);
  });
}

function Magnetic({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.span
      className={`magnetic ${className}`}
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      {children}
    </motion.span>
  );
}

function AmbientCursor() {
  const x = useMotionValue(-500);
  const y = useMotionValue(-500);
  const smoothX = useSpring(x, { stiffness: 80, damping: 24, mass: 0.8 });
  const smoothY = useSpring(y, { stiffness: 80, damping: 24, mass: 0.8 });

  useEffect(() => {
    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [x, y]);

  return (
    <motion.div
      className="ambient-cursor"
      style={{ x: smoothX, y: smoothY }}
      aria-hidden="true"
    />
  );
}

function CopyButton({ kind, onCopy, status }: { kind: CopyKind; onCopy: (kind: CopyKind) => void; status: CopyStatus }) {
  const value = kind === 'email' ? 'saujanpaudel12@gmail.com' : '+977 9745985171';
  return (
    <button type="button" className="contact-copy-button" onClick={() => onCopy(kind)}>
      {status?.kind === kind && status.result === 'copied' ? <Check size={15} className="text-emerald-300" /> : <Copy size={14} />}
      <span>{status?.kind === kind && status.result === 'copied' ? 'Copied!' : `Copy ${kind}`}</span>
      <span className="copy-value">{value}</span>
    </button>
  );
}

function ProjectCard({
  project,
  onSelect,
}: {
  project: ProjectEntry;
  onSelect?: (project: ProjectEntry) => void;
}) {
  const Icon = project.icon;
  return (
    <motion.article
      variants={revealItem}
      layout
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      }}
      onClick={() => onSelect?.(project)}
      className={`project-route-card group relative overflow-hidden bg-[#0a0a10]/60 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] rounded-2xl p-6 transition-all duration-300 hover:border-violet-500/40 cursor-pointer spotlight-card tone-${project.tone}`}
    >
      {/* Interactive Cursor Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: 'radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(139, 92, 246, 0.15), transparent 80%)',
        }}
        aria-hidden="true"
      />

      <div className="project-card-top relative z-10">
        <span className="project-icon"><Icon size={18} /></span>
        <span className="eyebrow">{project.category.toUpperCase()}</span>
        <span className="project-count">{project.number} / 05</span>
      </div>
      <h2 className="relative z-10">{project.name}</h2>
      <p className="project-summary relative z-10">{project.summary}</p>
      <div className="project-detail-block relative z-10">
        <p className="detail-label">ARCHITECTURE</p>
        <div className="tech-list">
          {project.architecture.map((tech) => <span className="tech-pill" key={tech}>{tech}</span>)}
        </div>
      </div>
      <div className="project-detail-block relative z-10">
        <p className="detail-label">SYSTEM SPECS</p>
        <ul className="project-specs">
          {project.specs.map((spec) => <li key={spec}><span />{spec}</li>)}
        </ul>
      </div>
      <div className="project-card-bottom relative z-10">
        <a
          href={project.href}
          target="_blank"
          rel="noreferrer"
          className="repo-link"
          onClick={(e) => e.stopPropagation()}
        >
          <GitHubMark /> View Code <ArrowUpRight size={14} />
        </a>
        <span className={`project-status ${project.status.includes('Development') ? 'project-status-wip' : ''}`}>
          {project.status.includes('Development') && '🚧 '}{project.status}
        </span>
      </div>
    </motion.article>
  );
}

function HomePage({
  onCopy,
  copyStatus,
  onOpenResume,
}: {
  onCopy: (kind: CopyKind) => void;
  copyStatus: CopyStatus;
  onOpenResume?: () => void;
}) {
  const [tab, setTab] = useState<TerminalTab>('automation.py');
  const tabs = Object.keys(terminalTabs) as TerminalTab[];

  return (
    <motion.section className="route-page home-route" variants={reveal} initial="hidden" animate="show" exit={{ opacity: 0, y: -12 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
      <div className="home-copy">
        <motion.p variants={revealItem} className="text-zinc-400 font-mono text-sm mb-3">Saujan Paudel</motion.p>
        <motion.div variants={revealItem} className="flex flex-wrap items-center gap-2 mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/20 text-emerald-400 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Active · AI and DS Undergrad · Shramik Shanti Campus (PU)</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-violet-500/30 bg-violet-950/20 text-violet-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
            <span>Discord Bot Architect &amp; Community Mod</span>
          </div>
        </motion.div>
        <motion.p variants={revealItem} className="text-xs font-mono tracking-widest uppercase text-indigo-400/80 mb-3">AI &amp; DATA SCIENCE / DISCORD SYSTEMS / AUTOMATION</motion.p>
        <motion.h1 variants={revealItem} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
          Engineering AI &amp; Data Pipelines, Python Automation &amp; Discord Systems.
        </motion.h1>
        <motion.p variants={revealItem} className="text-zinc-400 text-base leading-relaxed max-w-xl mb-8">
          AI and Data Science undergraduate at Shramik Shanti Campus (Pokhara University) in Kathmandu. Active Discord moderator and bot developer engineering scalable community bots, automation pipelines, and Python backend services.
        </motion.p>
        <motion.div variants={revealItem} className="home-actions flex flex-wrap items-center gap-3 mb-8">
          <Magnetic>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-medium text-sm transition-all duration-200 shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] hover:-translate-y-0.5"
            >
              View Projects <ArrowUpRight size={16} />
            </Link>
          </Magnetic>
          <Magnetic>
            <button
              type="button"
              onClick={onOpenResume}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/[0.12] bg-[#0a0a10]/60 hover:bg-white/[0.06] text-zinc-200 font-medium text-sm backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5"
            >
              <FileText size={15} /> Download Resume <ArrowRight size={14} className="rotate-90" />
            </button>
          </Magnetic>
          <Magnetic>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-zinc-400 hover:text-white font-medium text-sm transition-colors duration-200 group"
            >
              Get in Touch <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </Magnetic>
        </motion.div>
        <motion.div variants={revealItem} className="home-social-links">
          <a href="https://github.com/SaujanPdl" target="_blank" rel="noreferrer" aria-label="GitHub profile" title="GitHub" className="home-social-link"><GitHubMark /><span>GitHub</span><ArrowUpRight size={12} /></a>
          <a href="https://www.linkedin.com/in/saujanpaudel/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile" title="LinkedIn" className="home-social-link"><LinkedInMark /><span>LinkedIn</span><ArrowUpRight size={12} /></a>
          <a href="https://discord.gg/myBBbxVChR" target="_blank" rel="noreferrer" aria-label="Discord community" title="Discord Community" className="home-social-link home-discord-link"><DiscordMark /><span>Discord</span><ArrowUpRight size={12} /></a>
        </motion.div>
        <motion.div variants={revealItem} className="home-system-line">
          <span><span className="telemetry-dot" /> [system: ready]</span>
          <span>git commit: live</span>
          <span>latency: 18ms</span>
        </motion.div>
      </div>

      <motion.div
        variants={revealItem}
        className="hero-visual"
        onMouseMove={trackSpotlight}
      >
        <span className="portrait-backglow" />
        <div className="portrait-frame spotlight-card">
          <svg className="portrait-radar" viewBox="0 0 500 500" aria-hidden="true">
            <circle cx="250" cy="250" r="95" />
            <circle cx="250" cy="250" r="155" />
            <circle cx="250" cy="250" r="215" />
            <path d="M35 250h430M250 35v430M98 98l304 304M402 98 98 402" />
          </svg>
          <div className="portrait-corner portrait-corner-top-left">[system: active]</div>
          <div className="portrait-corner portrait-corner-top-right">Kathmandu, Nepal (GMT+5:45)</div>
          <div className="portrait-image-wrap">
            <img
              src="/assets/saujan-portrait.png"
              alt="Saujan Paudel"
              className="hero-portrait"
              width="400"
              height="400"
            />
          </div>
          <div className="portrait-label"><span className="telemetry-dot" /> sh@saujan:~$ <span>profile --live</span></div>
          <div className="portrait-coordinate">AI &amp; DS // SHRAMIK SHANTI CAMPUS</div>
        </div>
        <div className="portrait-terminal spotlight-card">
          <div className="terminal-topbar">
            <div className="terminal-dots"><i /><i /><i /></div>
            <span><TerminalSquare size={13} /> LIVE WORKSPACE</span>
            <span className="terminal-status"><i /> READY</span>
          </div>
          <div className="terminal-tabs portrait-terminal-tabs" role="tablist" aria-label="Code preview">
            {tabs.map((item) => (
              <button
                key={item}
                role="tab"
                aria-selected={tab === item}
                className={`terminal-tab ${tab === item ? 'terminal-tab-active' : ''}`}
                onClick={() => setTab(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="terminal-code portrait-terminal-code" role="tabpanel">
            <div className="terminal-prompt"><span>saujan@systems</span>:<b>~/portfolio</b>$ <i>{tab}</i></div>
            {terminalTabs[tab].slice(0, 6).map((line, index) => (
              <div className="code-row" key={`${tab}-${index}`}>
                <span className="line-number">{String(index + 1).padStart(2, '0')}</span>
                <code className={line.startsWith('#') || line.startsWith('import ') || line.startsWith('from ') ? 'code-accent' : line.includes('def ') || line.includes('async ') || line.includes('const ') || line.includes('for ') || line.includes('if ') ? 'code-keyword' : ''}>{line || ' '}</code>
              </div>
            ))}
            <div className="terminal-output">
              <span className="telemetry-dot" />
              {tab === 'automation.py' ? 'workspace pipeline initialized' : tab === 'bot_engine.ts' ? 'gateway online · automod active' : 'uptime stable · diagnostics green'}
              <span className="blinking-cursor">▍</span>
            </div>
          </div>
          <div className="terminal-foot"><span>LIVE CODE</span><span>{tab.endsWith('.py') ? 'Python' : tab.endsWith('.ts') ? 'TypeScript' : 'Shell'}</span><span>{tab}</span></div>
        </div>
      </motion.div>
    </motion.section>
  );
}

function AboutPage() {
  return (
    <motion.section className="route-page inner-route" variants={reveal} initial="hidden" animate="show" exit={{ opacity: 0, y: -12 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
      <motion.header variants={revealItem} className="route-heading">
        <p className="eyebrow">ABOUT <span>/</span> UNDER THE HOOD</p>
        <h1 className="route-title">Curious about how the pieces fit together.</h1>
        <p>I’m Saujan, a Bachelor in AI and DS undergraduate at Shramik Shanti Campus, a constituent campus of Pokhara University in Kathmandu Valley. I focus on practical Python engineering, AI and data foundations, Discord bot architecture, automation pipelines, and developer tooling.</p>
      </motion.header>
      <div className="about-grid">
        <motion.article
          variants={revealItem}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
          }}
          className="philosophy-card group relative overflow-hidden bg-[#0a0a10]/60 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] rounded-2xl"
        >
          <div
            className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: 'radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(139, 92, 246, 0.15), transparent 80%)',
            }}
            aria-hidden="true"
          />
          <div className="relative z-10">
            <span className="section-icon"><TerminalSquare size={18} /></span>
            <p className="eyebrow mt-5">ENGINEERING PHILOSOPHY</p>
            <h2>Make the boring parts reliable.</h2>
            <p>I’m drawn to the quiet engineering: scripts that safely handle messy files, backend services that report their own health, and tools that make people’s workflows easier to trust.</p>
            <div className="philosophy-tags"><span>Understand the problem</span><ChevronRight size={13} /><span>Build the smallest useful system</span><ChevronRight size={13} /><span>Measure and improve</span></div>
          </div>
        </motion.article>
        <motion.aside variants={revealItem} className="about-aside">
          <div
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
              e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
            }}
            className="aside-stat group relative overflow-hidden bg-[#0a0a10]/60 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] rounded-2xl"
          >
            <div
              className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: 'radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(139, 92, 246, 0.15), transparent 80%)',
              }}
              aria-hidden="true"
            />
            <div className="relative z-10">
              <span className="aside-stat-value">Bachelor in AI and DS</span><span>Academic program</span><b>Shramik Shanti Campus, Pokhara University (Constituent Campus)</b>
            </div>
          </div>
          <div
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
              e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
            }}
            className="aside-stat group relative overflow-hidden bg-[#0a0a10]/60 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] rounded-2xl"
          >
            <div
              className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{
                background: 'radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(139, 92, 246, 0.15), transparent 80%)',
              }}
              aria-hidden="true"
            />
            <div className="relative z-10">
              <span className="aside-stat-value">NP</span><span>Based in</span><b>Kathmandu Valley, Nepal · UTC+5:45</b>
            </div>
          </div>
        </motion.aside>
      </div>
      <motion.div variants={revealItem} className="skills-matrix-heading">
        <div><p className="eyebrow">INTERACTIVE SKILL MATRIX</p><h2>The tools behind the work.</h2></div>
        <span className="matrix-status"><span className="telemetry-dot" /> SKILL INVENTORY: ACTIVE</span>
      </motion.div>
      <div className="skills-matrix">
        {skillGroups.map((group, index) => {
          const Icon = group.icon;
          return (
            <motion.article
              variants={revealItem}
              key={group.title}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
              }}
              className={`skill-matrix-card group relative overflow-hidden bg-[#0a0a10]/60 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] rounded-2xl p-5 transition-all duration-300 hover:border-violet-500/40 skill-${group.color}`}
            >
              {/* Interactive Cursor Spotlight */}
              <div
                className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background: 'radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(139, 92, 246, 0.15), transparent 80%)',
                }}
                aria-hidden="true"
              />

              <div className="skill-matrix-top relative z-10"><span className="project-icon"><Icon size={17} /></span><span className="eyebrow">DOMAIN 0{index + 1}</span></div>
              <h3 className="relative z-10">{group.title}</h3>
              <div className="skill-level-label relative z-10"><span>Experience context</span><span>{group.level}</span></div>
              <div className="tech-list relative z-10">{group.skills.map((skill) => <span key={skill} className="tech-pill">{skill}</span>)}</div>
            </motion.article>
          );
        })}
      </div>
      <motion.div variants={revealItem} className="academic-strip bg-[#0a0a10]/60 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] rounded-xl">
        <GraduationCap size={18} /><span>AI &amp; Data Science foundations</span><b>Foundational AI algorithms</b><i /><b>Statistical analysis</b><i /><b>Model workflows</b>
      </motion.div>
    </motion.section>
  );
}

function ProjectsPage() {
  const filters = ['All', 'Backend & Bots', 'Python Automation', 'Productivity Systems', 'Community & Gaming'];
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<ProjectEntry | null>(null);
  const visibleProjects = projectEntries.filter((project) => filter === 'All' || project.category === filter);
  return (
    <motion.section className="route-page inner-route" variants={reveal} initial="hidden" animate="show" exit={{ opacity: 0, y: -12 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
      <motion.header variants={revealItem} className="route-heading projects-heading">
        <p className="eyebrow">PROJECT ARCHIVE <span>/</span> SELECTED SYSTEMS</p>
        <h1 className="route-title">Ideas, translated into working systems.</h1>
        <p>Case studies from automation, community infrastructure, and personal knowledge systems. Click any card to inspect architecture specifications and direct GitHub links.</p>
      </motion.header>
      <motion.div variants={revealItem} className="project-filters" role="group" aria-label="Filter projects">
        {filters.map((item) => (
          <button key={item} className={`filter-button ${filter === item ? 'filter-active' : ''}`} onClick={() => setFilter(item)}>
            {filter === item && <motion.span layoutId="projectFilter" className="filter-indicator" />}
            <span>{item}</span>
            <small>{item === 'All' ? projectEntries.length : projectEntries.filter((project) => project.category === item).length}</small>
          </button>
        ))}
      </motion.div>
      <motion.div layout variants={reveal} initial="hidden" animate="show" className="project-route-grid">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={(p) => setSelectedProject(p)}
            />
          ))}
        </AnimatePresence>
      </motion.div>
      <motion.div variants={revealItem} className="archive-note"><span className="telemetry-dot" /> More experiments live in the <a href="https://github.com/SaujanPdl" target="_blank" rel="noreferrer">GitHub archive <ArrowUpRight size={13} /></a></motion.div>

      {/* Centered Glassmorphic Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </motion.section>
  );
}

function LeadershipPage() {
  return (
    <motion.section className="route-page inner-route leadership-route" variants={reveal} initial="hidden" animate="show" exit={{ opacity: 0, y: -12 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
      <motion.header variants={revealItem} className="route-heading">
        <p className="eyebrow">COMMUNITY <span>/</span> TIMELINE</p>
        <h1 className="route-title">Communities &amp; initiatives.</h1>
      </motion.header>
      <motion.a
        variants={revealItem}
        whileHover={{ y: -3 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        href="https://discord.gg/myBBbxVChR"
        target="_blank"
        rel="noreferrer"
        className="discord-community-card group relative overflow-hidden bg-[#0a0a10]/60 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] rounded-2xl"
      >
        <span className="discord-community-icon"><DiscordMark /></span>
        <span className="discord-community-copy">
          <span className="eyebrow">🟢 ONLINE COMMUNITY</span>
          <strong>Join our Discord Community</strong>
          <span>Meet developers, gamers, and makers from the community.</span>
        </span>
        <ArrowUpRight size={18} className="discord-community-arrow" />
      </motion.a>
      <motion.article
        variants={revealItem}
        whileHover={{ y: -3 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="discord-community-card cfc-community-card group relative overflow-hidden bg-[#0a0a10]/60 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] rounded-2xl"
      >
        <span className="discord-community-icon cfc-community-icon"><Users size={23} /></span>
        <span className="discord-community-copy">
          <span className="eyebrow">🟢 NON-PROFIT TECH INITIATIVE</span>
          <strong>Code for Change Kathmandu</strong>
          <span>Member &amp; Representative • Supporting technical events, developer workshops &amp; youth initiatives.</span>
        </span>
        <ArrowUpRight size={18} className="discord-community-arrow cfc-community-arrow" aria-hidden="true" />
      </motion.article>
    </motion.section>
  );
}

function ContactPage({ onCopy, status }: { onCopy: (kind: CopyKind) => void; status: CopyStatus }) {
  return (
    <motion.section className="route-page inner-route contact-route" variants={reveal} initial="hidden" animate="show" exit={{ opacity: 0, y: -12 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
      <motion.header variants={revealItem} className="route-heading">
        <p className="eyebrow">CONTACT <span>/</span> OPEN CHANNEL</p>
        <h1 className="route-title">Have a useful problem in mind?</h1>
        <p>Tell me what you’re trying to make easier. I’m open to meaningful projects, internships, and collaborations.</p>
      </motion.header>
      <motion.div variants={revealItem} className="contact-terminal group relative overflow-hidden bg-[#0a0a10]/60 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] rounded-2xl spotlight-card" onMouseMove={(event) => Object.assign(event.currentTarget.style, spotlight(event))}>
        <div className="terminal-topbar">
          <div className="terminal-dots"><i /><i /><i /></div>
          <span><TerminalSquare size={14} /> CONTACT.SHELL</span>
          <span className="terminal-status"><i /> CONNECTED</span>
        </div>
        <div className="contact-shell-body">
          <div className="shell-line"><span className="shell-green">saujan@nepal</span>:<span className="shell-violet">~</span>$ ./initiate_contact.sh</div>
          <div className="shell-line shell-muted">[system: ready] secure channel initialized</div>
          <div className="shell-line shell-muted">Select a direct channel:</div>
          <div className="contact-channel-list">
            <div className="contact-channel"><span className="channel-number">01</span><span className="channel-kind">EMAIL</span><strong>saujanpaudel12@gmail.com</strong><CopyButton kind="email" onCopy={onCopy} status={status} /></div>
            <div className="contact-channel"><span className="channel-number">02</span><span className="channel-kind">PHONE</span><a href="tel:+9779745985171" className="channel-phone">+977 9745985171 <Phone size={14} /></a><CopyButton kind="phone" onCopy={onCopy} status={status} /></div>
          </div>
          <div className="shell-social-label"># profiles</div>
          <div className="contact-socials">
            <a href="https://github.com/SaujanPdl" target="_blank" rel="noreferrer" className="social-pill"><GitHubMark /> GitHub <ArrowUpRight size={15} /></a>
            <a href="https://www.linkedin.com/in/saujanpaudel/" target="_blank" rel="noreferrer" className="social-pill"><LinkedInMark /> LinkedIn <ArrowUpRight size={15} /></a>
          </div>
          <div className="shell-final-line"><span className="telemetry-dot" /> awaiting input<span className="blinking-cursor">▍</span></div>
        </div>
        <div className="terminal-foot"><span>CHANNEL: DIRECT</span><span>LOCATION: KATHMANDU, NP</span><span>UTC+5:45</span></div>
      </motion.div>
      <motion.a
        variants={revealItem}
        whileHover={{ y: -3 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        href="https://discord.gg/myBBbxVChR"
        target="_blank"
        rel="noreferrer"
        className="discord-community-card contact-discord-card"
      >
        <span className="discord-community-icon"><DiscordMark /></span>
        <span className="discord-community-copy">
          <span className="eyebrow">🟢 ONLINE COMMUNITY</span>
          <strong>Join our Discord Community</strong>
          <span>Chat with developers and gamers in the community server.</span>
        </span>
        <ArrowUpRight size={18} className="discord-community-arrow" />
      </motion.a>
      <motion.div variants={revealItem} className="contact-response-note"><span>01—24h</span><p>I try to respond to thoughtful messages within a day. Include a little context about the project or problem and we’ll take it from there.</p></motion.div>
    </motion.section>
  );
}

function NotFoundPage() {
  return (
    <motion.section className="route-page not-found" variants={reveal} initial="hidden" animate="show" exit={{ opacity: 0, y: -12 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
      <motion.p variants={revealItem} className="eyebrow">404 <span>/</span> ROUTE NOT FOUND</motion.p>
      <motion.h1 variants={revealItem} className="route-title">This path doesn’t exist.</motion.h1>
      <motion.div variants={revealItem}><Link to="/" className="button-primary">Back to command center <ArrowRight size={15} /></Link></motion.div>
    </motion.section>
  );
}

function SiteFrame() {
  const location = useLocation();
  const [resumeOpen, setResumeOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copyStatus, setCopyStatus] = useState<CopyStatus>(null);
  const closeResume = useCallback(() => {
    document.body.style.overflow = 'unset';
    setResumeOpen(false);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  const copyValue = async (kind: CopyKind) => {
    const value = kind === 'email' ? 'saujanpaudel12@gmail.com' : '+977 9745985171';
    try {
      await navigator.clipboard.writeText(value);
      setCopyStatus({ kind, result: 'copied' });
    } catch (error) {
      console.error(`Unable to copy ${kind}`, error);
      setCopyStatus({ kind, result: 'error' });
    }
    window.setTimeout(() => setCopyStatus(null), 2000);
  };

  return (
    <div className="site-shell min-h-screen overflow-x-hidden bg-[#050508] text-zinc-100">
      <div className="dot-grid" aria-hidden="true" />
      <div className="ambient-glow" aria-hidden="true" />
      <AmbientCursor />

      <header className="site-header">
        <nav className="floating-nav bg-[#0a0a10]/60 backdrop-blur-xl border border-white/[0.08] shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]" aria-label="Main navigation">
          <Link to="/" className="nav-brand" aria-label="Saujan Paudel home"><img src="/assets/saujan-portrait.png" alt="" className="nav-avatar" width="36" height="36" /><span>saujan.pdl</span></Link>
          <div className="desktop-nav-links">
            {links.map((item) => (
              <NavLink key={item.to} to={item.to} end={item.to === '/'} className="route-nav-link">
                {({ isActive }) => <>{isActive && <motion.span layoutId="activeNav" className="active-nav-pill" transition={{ type: 'spring', stiffness: 260, damping: 20 }} />}<span>{item.label}</span></>}
              </NavLink>
            ))}
          </div>
          <div className="nav-actions">
            <a href="https://github.com/SaujanPdl" target="_blank" rel="noreferrer" aria-label="GitHub" className="nav-social"><GitHubMark /></a>
            <a href="https://www.linkedin.com/in/saujanpaudel/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="nav-social"><LinkedInMark /></a>
            <a href="https://discord.gg/myBBbxVChR" target="_blank" rel="noreferrer" aria-label="Join our Discord Community" className="nav-social nav-discord"><DiscordMark /></a>
            <button className="resume-nav-button" onClick={() => setResumeOpen(true)}><FileText size={15} /><span>Resume</span></button>
          </div>
          <button className="mobile-menu-button" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={mobileOpen}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div className="mobile-nav-sheet" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
              {links.map((item) => <NavLink key={item.to} to={item.to} end={item.to === '/'} className={({ isActive }) => `mobile-nav-link ${isActive ? 'mobile-nav-active' : ''}`}>{item.label}<ArrowUpRight size={14} /></NavLink>)}
              <a href="https://discord.gg/myBBbxVChR" target="_blank" rel="noreferrer" className="mobile-discord-link"><DiscordMark /> Join our Discord Community <ArrowUpRight size={14} /></a>
              <button onClick={() => { setMobileOpen(false); setResumeOpen(true); }} className="mobile-resume-button"><FileText size={16} /> Open Resume <ArrowRight size={15} /></button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage onCopy={copyValue} copyStatus={copyStatus} onOpenResume={() => setResumeOpen(true)} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/leadership" element={<LeadershipPage />} />
          <Route path="/contact" element={<ContactPage onCopy={copyValue} status={copyStatus} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>

      <footer className="site-footer">
        <Link to="/" className="footer-brand"><img src="/assets/saujan-portrait.png" alt="Saujan Paudel" className="footer-avatar" width="32" height="32" /> SAUJAN.PDL</Link>
        <span className="footer-meta">Kathmandu Valley, Nepal • Shramik Shanti Campus • Pokhara University • Bachelor in AI and DS • Python • Data</span>
        <span className="footer-state"><span className="telemetry-dot" /> [system: ready]</span>
      </footer>

      <AnimatePresence>
        {copyStatus && (
          <motion.div className={`copy-toast ${copyStatus.result === 'error' ? 'copy-toast-error' : ''}`} role="status" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
              {copyStatus.result === 'copied' ? <Check size={15} /> : <Copy size={15} />}
              {copyStatus.result === 'copied' ? 'Copied to clipboard' : 'Copy unavailable — please use the visible contact link'}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {resumeOpen && (
          <motion.div
            key="resume-modal"
            className="resume-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(event) => {
              if (event.target === event.currentTarget) closeResume();
            }}
          >
            <ResumeModal open={resumeOpen} onClose={closeResume} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return <BrowserRouter><SiteFrame /></BrowserRouter>;
}
