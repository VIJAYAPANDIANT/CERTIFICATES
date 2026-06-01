import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Shield } from 'lucide-react';
import { achievementsData } from '../data/achievementsData';
import { playClick, playScan, setSoundEnabled, getSoundEnabled } from '../utils/sounds';

interface HistoryEntry {
  text: string;
  type: 'input' | 'output' | 'error' | 'success' | 'system';
}

export const TerminalConsole: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([
    { text: 'SECURE LINK DETECTED... VAULT TERMINAL INITIALIZED', type: 'system' },
    { text: 'TYPE "help" TO QUERY VAULT SYSTEM COMMAND MATRIX', type: 'success' }
  ]);
  const [matrixActive, setMatrixActive] = useState(true);
  
  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Matrix Code Rain Background Logic
  useEffect(() => {
    if (!matrixActive) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth;
        height = canvas.height = canvas.parentElement.clientHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    const columns = Math.floor(width / 16);
    const yPositions = Array(columns).fill(0);
    let animationId: number;

    const drawMatrix = () => {
      ctx.fillStyle = 'rgba(5, 4, 15, 0.08)'; // trails
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = 'rgba(6, 182, 212, 0.15)'; // glowing cyan letters
      ctx.font = '11px monospace';

      for (let i = 0; i < yPositions.length; i++) {
        const char = String.fromCharCode(Math.floor(Math.random() * 96) + 33);
        const x = i * 16;
        const y = yPositions[i];

        ctx.fillText(char, x, y);

        if (y > height && Math.random() > 0.985) {
          yPositions[i] = 0;
        } else {
          yPositions[i] = y + 14;
        }
      }
      animationId = requestAnimationFrame(drawMatrix);
    };

    drawMatrix();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, [matrixActive]);

  // Scroll to bottom of console
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const handleCommand = (cmd: string) => {
    const rawCommand = cmd.trim();
    const cleanCommand = rawCommand.toLowerCase();
    
    if (!rawCommand) return;

    const newHistory = [...history];
    newHistory.push({ text: `guest@certivault:~# ${rawCommand}`, type: 'input' });

    const output = (text: string, type: HistoryEntry['type'] = 'output') => {
      newHistory.push({ text, type });
    };

    switch (cleanCommand) {
      case 'help':
        output('AVAILABLE COMMANDS:', 'system');
        output('  help         - Lists all telemetry commands.');
        output('  operator     - Queries developer profile diagnostics.');
        output('  stats        - Reads active counts of achievements.');
        output('  syscheck     - Scans cryptographic vault nodes.');
        output('  matrix       - Toggles matrix background scan lines.');
        output('  sound        - Toggles system synth sound systems.');
        output('  clear        - Clears terminal output logs.');
        break;
      
      case 'operator':
        output('OPERATOR PROFILE SCHEMATICS:', 'system');
        output('  NAME:        Vijayapandian T');
        output('  AGE:         18 (11.07.2007)');
        output('  COLLEGE:     SRM Easwari Engineering College');
        output('  LOCATION:    Chennai, Tamil Nadu, India');
        output('  EMAIL:       vijayapandian112007@gmail.com');
        output('  PHONE:       +91 8610554060');
        output('  STATUS:      Pre-Final Year [B.E. CSE]');
        break;
      
      case 'stats':
        const counts = { Courses: 0, Internships: 0, Hackathons: 0, Workshops: 0, Competitions: 0, Badges: 0 };
        achievementsData.forEach(a => {
          if (counts[a.category as keyof typeof counts] !== undefined) {
            counts[a.category as keyof typeof counts]++;
          }
        });
        output('VAULT STATISTICS:', 'system');
        output(`  TOTAL CREDENTIALS:  ${achievementsData.length}`);
        output(`  COURSES INDEXED:    ${counts.Courses}`);
        output(`  INTERNSHIPS:        ${counts.Internships}`);
        output(`  HACKATHONS WON:     ${counts.Hackathons}`);
        output(`  WORKSHOPS ATTENDED: ${counts.Workshops}`);
        output(`  COMPETITIONS:       ${counts.Competitions}`);
        output(`  BADGES EARNED:      ${counts.Badges}`);
        break;
      
      case 'syscheck':
        playScan();
        output('INITIALIZING DYNAMIC CRYPTO SCAN...', 'system');
        output('[ OK ] Core layout matrix synchronized.');
        output('[ OK ] Sound oscillators calibrated.');
        output(`[ OK ] achievementsData array loaded successfully. [${achievementsData.length} nodes]`);
        output('[ SUCCESS ] All security checkpoints secure. Vault running at 100% integrity.');
        break;
      
      case 'matrix':
        setMatrixActive(!matrixActive);
        output(`Matrix background rain: ${!matrixActive ? 'ENABLED' : 'DISABLED'}`, 'success');
        break;
      
      case 'sound':
        const nextSound = !getSoundEnabled();
        setSoundEnabled(nextSound);
        output(`Vault sound matrix system: ${nextSound ? 'ONLINE' : 'OFFLINE'}`, nextSound ? 'success' : 'error');
        break;

      case 'clear':
        setHistory([
          { text: 'SYSTEM HISTORY RE-INITIALIZED', type: 'system' }
        ]);
        setInput('');
        return;

      default:
        output(`ERR: COMMAND "${rawCommand}" NOT RECOGNIZED IN THIS PORTAL. TYPE "help" FOR SCHEMATICS.`, 'error');
    }

    setHistory(newHistory);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      playClick();
      handleCommand(input);
    }
  };

  const getLogColor = (type: HistoryEntry['type']) => {
    switch (type) {
      case 'system': return 'text-purple-400 font-bold';
      case 'success': return 'text-cyan-400 font-bold';
      case 'error': return 'text-red-400 font-semibold';
      case 'input': return 'text-slate-300';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-6 min-h-[calc(100vh-140px)] flex flex-col justify-between z-10 select-none">
      {/* Header Telemetry */}
      <div className="flex flex-col border-l border-cyan-500/30 pl-4 py-1 mb-8">
        <span className="text-[10px] text-cyan-400 font-mono tracking-widest uppercase">Decryption Console Active</span>
        <h1 className="text-3xl font-extrabold tracking-tight text-white font-sans mt-1">
          CYBER <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">TERMINAL</span>
        </h1>
        <p className="text-xs text-slate-400 max-w-sm mt-1">
          Interact directly with the CertiVault filesystem using raw CLI command queries.
        </p>
      </div>

      {/* Terminal Screen Console */}
      <div 
        onClick={focusInput}
        className="flex-1 w-full min-h-[400px] border border-cyan-500/20 bg-[#05040f]/90 rounded-xl relative overflow-hidden flex flex-col p-5 font-mono text-xs cursor-text shadow-[0_0_30px_rgba(6,182,212,0.06)]"
      >
        {/* Holographic matrix canvas layer */}
        {matrixActive && (
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-35 pointer-events-none" />
        )}

        {/* Scanline CRT glass overlay */}
        <div className="absolute inset-0 scanline pointer-events-none opacity-30" />

        {/* Terminal Header Telemetry */}
        <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-4 text-[10px] text-slate-500 relative z-10 select-none">
          <span className="flex items-center gap-1.5"><Terminal size={12} className="text-cyan-400" /> SECURE CLI PORTAL v1.02</span>
          <span className="flex items-center gap-1.5"><Shield size={12} className="text-purple-400" /> DECRYPT_ACTIVE</span>
        </div>

        {/* History Display logs */}
        <div className="flex-1 overflow-y-auto space-y-1.5 pr-2 mb-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-500/30 relative z-10">
          {history.map((entry, idx) => (
            <div key={idx} className={`${getLogColor(entry.type)} whitespace-pre-wrap leading-relaxed`}>
              {entry.text}
            </div>
          ))}
          <div ref={terminalEndRef} />
        </div>

        {/* Input Prompter panel */}
        <div className="flex items-center gap-1.5 border-t border-white/5 pt-3 relative z-10">
          <span className="text-cyan-400 font-bold">guest@certivault:~#</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-slate-200 border-none outline-none focus:ring-0 focus:outline-none focus:border-none p-0 font-mono text-xs caret-cyan-400"
            autoFocus
            placeholder='Type command e.g. "help"'
          />
        </div>
      </div>
    </div>
  );
};
