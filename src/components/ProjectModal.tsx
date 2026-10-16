import { useEffect, type ComponentType } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, ExternalLink, ShieldCheck, TerminalSquare, FolderGit2, GraduationCap, Network, X } from 'lucide-react';
import { GitHubMark } from './SocialMarks';

export interface ProjectEntry {
  id: string;
  category: string;
  number: string;
  name: string;
  summary: string;
  architecture: string[];
  specs: string[];
  status: string;
  href: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  tone: string;
  actionLabel?: string;
  actionType?: 'code' | 'notion' | 'external';
}

interface ProjectModalProps {
  project: ProjectEntry | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const Icon = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} Architecture Details`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ type: 'spring', damping: 26, stiffness: 320 }}
        className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-[#0a0a10]/95 backdrop-blur-2xl border border-white/[0.12] rounded-3xl p-6 sm:p-8 shadow-[0_20px_60px_0_rgba(0,0,0,0.65)]"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full border border-white/10 bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.1] hover:border-white/20 transition-all duration-150"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Header Metadata */}
        <div className="flex items-center gap-3 mb-4">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-violet-500/30 bg-violet-500/10 text-violet-300">
            <Icon size={20} />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-violet-400">
                {project.category}
              </span>
              <span className="text-zinc-600 text-xs">•</span>
              <span className="text-[11px] font-mono text-zinc-400">
                PROJECT {project.number} / 05
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
              {project.name}
            </h2>
          </div>
        </div>

        {/* Project Summary */}
        <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
          {project.summary}
        </p>

        {/* Architecture & Tech Stack */}
        <div className="mb-6 p-4 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
          <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-3">
            ARCHITECTURE &amp; TECH STACK
          </p>
          <div className="flex flex-wrap gap-2">
            {project.architecture.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 rounded-full text-xs font-mono border border-violet-500/25 bg-violet-500/10 text-violet-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* System Specifications */}
        <div className="mb-8">
          <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-3">
            SYSTEM SPECIFICATIONS &amp; ARCHITECTURE HIGHLIGHTS
          </p>
          <ul className="space-y-2.5">
            {project.specs.map((spec) => (
              <li key={spec} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{spec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/[0.08]">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{project.status}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-mono text-zinc-400 hover:text-white border border-transparent hover:border-white/10 transition-colors"
            >
              Close
            </button>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs font-mono transition-all duration-200 shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)]"
            >
              {project.actionType === 'notion' ? (
                <ExternalLink size={14} />
              ) : (
                <GitHubMark />
              )}
              <span>{project.actionLabel || 'View Repository'}</span>
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
