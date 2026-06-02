import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Briefcase, Trophy, BookOpen, Award, Sparkles, Flame, ChevronRight } from 'lucide-react';
import { achievementsData } from '../data/achievementsData';
import type { Achievement } from '../data/achievementsData';
import { playClick, playHover } from '../utils/sounds';

export const Timeline: React.FC = () => {
  // Sort achievements chronologically (oldest first or newest first)
  const sortedAchievements = useMemo(() => {
    return [...achievementsData].sort(
      (a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime()
    );
  }, []);

  // Group achievements by year
  const groupedByYear = useMemo(() => {
    const groups: { [key: string]: Achievement[] } = {};
    sortedAchievements.forEach((item) => {
      const year = new Date(item.issueDate).getFullYear().toString();
      if (!groups[year]) {
        groups[year] = [];
      }
      groups[year].push(item);
    });
    return groups;
  }, [sortedAchievements]);

  // Unique years sorted descending
  const years = useMemo(() => {
    return Object.keys(groupedByYear).sort((a, b) => b.localeCompare(a));
  }, [groupedByYear]);

  // Icon mapping
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Internships':
        return <Briefcase size={14} className="text-emerald-400" />;
      case 'Hackathons':
        return <Trophy size={14} className="text-orange-400" />;
      case 'Courses':
        return <BookOpen size={14} className="text-blue-400" />;
      case 'Workshops':
        return <Sparkles size={14} className="text-cyan-400" />;
      case 'Competitions':
        return <Flame size={14} className="text-red-400" />;
      default:
        return <Award size={14} className="text-purple-400" />;
    }
  };

  const getCategoryBorder = (category: string) => {
    switch (category) {
      case 'Internships':
        return 'border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]';
      case 'Hackathons':
        return 'border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.1)]';
      case 'Courses':
        return 'border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]';
      case 'Workshops':
        return 'border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.1)]';
      case 'Competitions':
        return 'border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]';
      default:
        return 'border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1)]';
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-6 min-h-[calc(100vh-140px)] flex flex-col z-10 select-none">
      {/* Header Telemetry */}
      <div className="flex flex-col border-l border-cyan-500/30 pl-4 py-1 mb-12">
        <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">Decryption Console Active</span>
        <h1 className="text-3xl font-extrabold tracking-tight text-white font-sans mt-1">
          ACHIEVEMENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">TIMELINE</span>
        </h1>
        <p className="text-xs text-slate-400 max-w-sm mt-1">
          A retrospective roadmap tracking learning progress, events, and milestone validations.
        </p>
      </div>

      {/* Main Timeline Spine */}
      <div className="relative border-l border-white/10 pl-6 md:pl-10 space-y-12 ml-4">
        {/* Glow node running down the spine */}
        <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-gradient-to-b from-cyan-400 via-purple-500 to-transparent" />

        {years.map((year) => (
          <div key={year} className="relative">
            {/* Year Badge Node */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              className="absolute -left-[54px] md:-left-[70px] top-0 bg-[#030014] border border-cyan-500/40 text-cyan-300 font-mono font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-md shadow-neon-cyan select-none"
            >
              {year}
            </motion.div>

            {/* List of achievements inside this year */}
            <div className="space-y-6 pt-10">
              {groupedByYear[year].map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  onMouseEnter={playHover}
                  className={`bg-glass-card border rounded-xl p-5 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${getCategoryBorder(
                    item.category
                  )}`}
                >
                  {/* Decorative connector node dot */}
                  <div className="absolute -left-[31px] md:-left-[45px] top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-slate-950 border-2 border-cyan-500 shadow-neon-cyan" />

                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono select-none">
                      <span className="flex items-center gap-1 bg-white/2 border border-white/5 rounded px-2 py-0.5 uppercase">
                        {getCategoryIcon(item.category)}
                        <span className="text-[9px] font-bold text-slate-300">{item.category}</span>
                      </span>
                      <span className="text-slate-500">|</span>
                      <span className="text-cyan-400 font-bold">{item.issuer.toUpperCase()}</span>
                      <span className="text-slate-500">|</span>
                      <span className="text-slate-500 flex items-center gap-1"><Calendar size={10} /> {item.issueDate}</span>
                    </div>

                    <h3 className="text-sm font-extrabold text-slate-100 uppercase tracking-wide font-mono">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed max-w-2xl">
                      {item.description}
                    </p>
                  </div>

                  {/* Right hand verify URL link */}
                  {item.url && (
                    <motion.a
                      whileHover={{ scale: 1.05, x: 2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={playClick}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[10px] text-cyan-400 font-mono hover:text-cyan-300 transition-colors uppercase border border-cyan-500/20 bg-cyan-950/20 rounded px-2.5 py-1.5 self-start md:self-auto cursor-pointer"
                    >
                      Verify <ChevronRight size={10} />
                    </motion.a>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
