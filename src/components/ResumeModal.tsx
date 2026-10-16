import { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Braces,
  Database,
  FileText,
  GraduationCap,
  MapPin,
  Network,
  Phone,
  Printer,
  X,
} from 'lucide-react';

type ResumeModalProps = {
  open: boolean;
  onClose: () => void;
};

const resumeSections = [
  {
    title: 'Technical Stack',
    icon: Braces,
    items: [
      { label: 'Languages', description: 'Python (primary), JavaScript, HTML5 / CSS3, introductory C / C++.' },
      { label: 'AI & Data', description: 'Data analysis, Python libraries, scraping pipelines, and structured data manipulation.' },
      { label: 'Frameworks & Tools', description: 'React (basics), Discord API / Discord.js, Linux, Git, and GitHub.' },
      { label: 'Community Management', description: 'Discord server architecture, role hierarchy, permission security, and bot automation.' },
    ],
  },
  {
    title: 'Projects Breakdown',
    icon: FileText,
    items: [
      { label: 'Syntax Bot', description: 'Discord management bot with admin cogs, command lifecycle, AutoMod, and uptime telemetry.', href: 'https://github.com/SaujanPdl/syntax-bot', action: 'View repository' },
      { label: 'Jarvis AI Assistant', description: 'Python desktop assistant for voice / text commands, workflow automation, and system operations.', href: 'https://github.com/SaujanPdl/Jarvis_Project', action: 'View repository' },
      { label: 'Automation Sprint', description: 'Filesystem triage utilities and resilient web scraping with structured data exports.', href: 'https://github.com/SaujanPdl/15day-automation-sprint', action: 'View repository' },
      { label: 'Sagarmatha Gaming', description: 'Community gaming platform architecture in active development.', href: 'https://github.com/SaujanPdl/SagarmathaGaming', action: 'View repository · Work in Progress' },
    ],
  },
  {
    title: 'Experience & Leadership',
    icon: Network,
    items: [
      { label: 'Code for Change Kathmandu', description: 'Current member and college representative.' },
      { label: 'Syntax & Discord Community Server', description: 'Community manager and bot developer.', href: 'https://discord.gg/myBBbxVChR', action: 'Join community' },
    ],
  },
  {
    title: 'Education',
    icon: GraduationCap,
    items: [
      { label: 'Bachelor in AI and DS (Artificial Intelligence and Data Science)', description: 'Shramik Shanti Campus, Pokhara University (Constituent Campus), Kathmandu Valley, Nepal. Relevant coursework: Data Structures & Algorithms, Computer Networks, AI Systems, and Database Management.' },
    ],
  },
];

export default function ResumeModal({ open, onClose }: ResumeModalProps) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : 'unset';
    if (open) {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = 'unset';
        window.removeEventListener('keydown', handleKeyDown);
      };
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-title"
      className="resume-sheet"
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <div className="resume-windowbar">
        <div className="flex items-center gap-2">
          <span className="window-dot bg-rose-400" />
          <span className="window-dot bg-amber-300" />
          <span className="window-dot bg-emerald-400" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-500">PERSONAL DOSSIER · 2026</span>
        <button className="resume-close" onClick={onClose} aria-label="Close resume" title="Close (Esc)">
          <X size={16} /><span>ESC</span>
        </button>
      </div>

      <div className="resume-scroll">
        <header className="resume-header">
          <div>
            <p className="eyebrow">CURRICULUM VITAE <span>/</span> 001</p>
            <h2 id="resume-title">Saujan Paudel</h2>
            <p className="mt-1 text-sm text-zinc-400">Bachelor in AI and DS <span className="px-1 text-zinc-600">·</span> Shramik Shanti Campus, Pokhara University</p>
          </div>
          <button type="button" onClick={() => window.print()} className="resume-action">
            <Printer size={15} /> Save / Print PDF
          </button>
        </header>

        <div className="resume-contact-row">
          <span><MapPin size={14} /> Kathmandu Valley, Nepal</span>
          <a href="mailto:saujanpaudel12@gmail.com">saujanpaudel12@gmail.com</a>
          <a href="tel:+9779745985171"><Phone size={13} /> +977 9745985171</a>
        </div>

        <div className="resume-actions-row">
          <span><span className="telemetry-dot" /> Artificial Intelligence &amp; Data Science</span>
          <button onClick={() => window.print()} className="resume-print"><Printer size={14} /> Print Resume</button>
        </div>

        <div className="resume-content-grid">
          {resumeSections.map((section, index) => {
            const SectionIcon = section.icon;
            return (
              <section key={section.title} className={`resume-section ${index === 0 || index === 1 ? 'resume-section-wide' : ''}`}>
                <div className="resume-section-title">
                  <span><SectionIcon size={16} /></span>
                  <h3>{section.title}</h3>
                  <span className="font-mono text-[10px] text-zinc-600">0{index + 1}</span>
                </div>
                <div className="resume-list">
                  {section.items.map(({ label, description, href, action }) => (
                    <div key={label} className="resume-list-item">
                      <p>{label}</p>
                      <span>{description}{href && <> <a href={href} target="_blank" rel="noreferrer" className="resume-community-link">{action ?? 'Open link'}</a></>}</span>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        <div className="resume-bottomline">
          <span><Database size={13} /> Built around useful systems</span>
          <span>NEPAL <span className="px-1 text-zinc-700">·</span> UTC+5:45</span>
        </div>
      </div>
    </motion.div>
  );
}
