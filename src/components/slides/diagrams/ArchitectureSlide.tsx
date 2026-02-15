import { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '../../TextReveal';
import {
  User, LayoutDashboard, MessageSquare, Settings, AlertCircle,
  Keyboard, MousePointer, ShieldCheck, Lock, Eye, Play,
  Database as DatabaseIcon, Brain, Camera, Server,
  HardDrive, FileText, CheckCircle, Layers, Image,
} from 'lucide-react';
import DiagramModal from '../../DiagramModal';

/* ─── Shared animation wrapper ─── */
const A = ({
  children, delay, animate, className = '', style = {},
}: {
  children: React.ReactNode; delay: number; animate: boolean;
  className?: string; style?: React.CSSProperties;
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={animate ? { opacity: 1, scale: 1 } : {}}
    transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className} style={style}
  >
    {children}
  </motion.div>
);

/* ─── Icon chip (large style like the reference) ─── */
const IconChip = ({
  icon: Icon, label, color, size = 28, labelSize = '9px',
}: {
  icon: React.ElementType; label: string; color: string; size?: number; labelSize?: string;
}) => (
  <div className="flex flex-col items-center gap-1">
    <div
      className="rounded-lg flex items-center justify-center"
      style={{
        width: size + 16, height: size + 16,
        background: `${color}0c`, border: `1px solid ${color}20`,
      }}
    >
      <Icon size={size} style={{ color }} strokeWidth={1.2} />
    </div>
    <span className="font-medium text-center leading-tight" style={{ color: `${color}bb`, fontSize: labelSize }}>
      {label}
    </span>
  </div>
);

/* ─── Orchestration row item ─── */
const OrchItem = ({
  icon: Icon, label, color, delay, animate,
}: {
  icon: React.ElementType; label: string; color: string; delay: number; animate: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={animate ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.4, delay }}
    className="flex items-center gap-2"
  >
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
      style={{ background: `${color}10`, border: `1px solid ${color}20` }}
    >
      <Icon size={15} style={{ color }} strokeWidth={1.5} />
    </div>
    <span className="text-[10px] font-semibold whitespace-nowrap" style={{ color: `${color}cc` }}>
      {label}
    </span>
  </motion.div>
);

/* ─── colors ─── */
const C = {
  pres: '#60a5fa',
  view: '#a78bfa',
  ctrl: '#f87171',
  model: '#facc15',
  orch: '#4ade80',
  ai: '#c084fc',
  tools: '#fb923c',
  user: '#9d8cff',
};

const ArchitectureSlide = ({ animate }: { animate: boolean }) => {
  const [showOriginal, setShowOriginal] = useState(false);
  return (
    <div className="relative flex flex-col h-full w-full max-w-[1280px] mx-auto px-6 py-4">
      {/* Header */}
      <FadeIn delay={0.1} animate={animate}>
        <p className="text-xs tracking-[0.4em] uppercase mb-1" style={{ color: 'rgba(157,140,255,0.6)' }}>
          Overall Architecture
        </p>
      </FadeIn>
      <FadeIn delay={0.2} animate={animate}>
        <h2 className="text-2xl font-bold text-white/90 mb-3">Layered Client–Server Hybrid Architecture</h2>
      </FadeIn>

      {/* View Original button */}
      <button
        onClick={() => setShowOriginal(true)}
        className="absolute top-1 right-3 z-[5] flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-medium tracking-wide transition-all"
        style={{
          background: 'rgba(157,140,255,0.08)',
          border: '1px solid rgba(157,140,255,0.15)',
          color: 'rgba(157,140,255,0.5)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(157,140,255,0.15)';
          e.currentTarget.style.color = 'rgba(157,140,255,0.8)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(157,140,255,0.08)';
          e.currentTarget.style.color = 'rgba(157,140,255,0.5)';
        }}
      >
        <Image size={12} />
        VIEW ORIGINAL
      </button>

      {/* ═══ DIAGRAM AREA (absolute positioning) ═══ */}
      <div className="relative flex-1 min-h-0">

        {/* ─── USER ACTOR ─── */}
        <A delay={0.3} animate={animate} className="absolute flex flex-col items-center gap-1"
           style={{ left: '0%', top: '38%' }}>
          <div className="w-12 h-12 rounded-full flex items-center justify-center"
               style={{ background: `${C.user}12`, border: `1px solid ${C.user}30` }}>
            <User size={22} style={{ color: C.user }} strokeWidth={1.5} />
          </div>
          <span className="text-[10px] font-semibold" style={{ color: `${C.user}99` }}>User</span>
        </A>

        {/* ─── PRESENTATION / INTERACTION LAYER ─── */}
        <A delay={0.35} animate={animate} className="absolute rounded-xl border"
           style={{
             left: '6%', top: '0%', width: '34%', height: '100%',
             borderColor: `${C.pres}20`, background: `${C.pres}05`,
           }}>
          <div className="flex items-center gap-1.5 px-3 pt-2.5 pb-1">
            <Layers size={10} style={{ color: C.pres }} strokeWidth={2} />
            <span className="text-[9px] font-bold tracking-[0.15em] uppercase" style={{ color: C.pres }}>
              Presentation / Interaction Layer
            </span>
          </div>

          {/* MVC wrapper */}
          <div className="mx-2.5 mt-1 p-2 rounded-lg border border-dashed flex flex-col h-[calc(100%-36px)]"
               style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
            <span className="text-[7px] font-bold tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(255,255,255,0.2)' }}>
              MVC (UI Separation)
            </span>

            {/* VIEW */}
            <A delay={0.5} animate={animate} className="rounded-lg border p-3 mb-2"
               style={{ borderColor: `${C.view}18`, background: `${C.view}06` }}>
              <div className="flex items-center gap-1 mb-2.5">
                <Eye size={9} style={{ color: C.view }} strokeWidth={2} />
                <span className="text-[8px] font-bold tracking-[0.15em] uppercase" style={{ color: C.view }}>
                  View (React Components)
                </span>
              </div>
              <div className="flex justify-center gap-6">
                <IconChip icon={LayoutDashboard} label="Dashboard" color={C.view} />
                <IconChip icon={MessageSquare} label={'Chat /\nHistory'} color={C.view} />
              </div>
            </A>

            {/* CONTROLLER */}
            <A delay={0.6} animate={animate} className="rounded-lg border p-3 mb-2"
               style={{ borderColor: `${C.ctrl}18`, background: `${C.ctrl}06` }}>
              <div className="flex items-center gap-1 mb-2.5">
                <Keyboard size={9} style={{ color: C.ctrl }} strokeWidth={2} />
                <span className="text-[8px] font-bold tracking-[0.15em] uppercase" style={{ color: C.ctrl }}>
                  Controller (Event Handlers & IPC)
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 place-items-center">
                <IconChip icon={Settings} label="Settings" color={C.ctrl} size={22} labelSize="8px" />
                <IconChip icon={AlertCircle} label="Feedback" color={C.ctrl} size={22} labelSize="8px" />
                <IconChip icon={Keyboard} label="Hotkeys" color={C.ctrl} size={22} labelSize="8px" />
                <IconChip icon={MousePointer} label="Buttons" color={C.ctrl} size={22} labelSize="8px" />
              </div>
            </A>

            {/* MODEL */}
            <A delay={0.7} animate={animate} className="rounded-lg border p-2.5 mt-auto"
               style={{ borderColor: `${C.model}18`, background: `${C.model}06` }}>
              <div className="flex items-center gap-1 mb-1">
                <DatabaseIcon size={9} style={{ color: C.model }} strokeWidth={2} />
                <span className="text-[8px] font-bold tracking-[0.15em] uppercase" style={{ color: C.model }}>
                  Model (UI State & Settings)
                </span>
              </div>
              <p className="text-[8px] leading-relaxed" style={{ color: `${C.model}66` }}>
                Privacy state, camera state, cooldowns, server status
              </p>
            </A>
          </div>
        </A>

        {/* ─── APPLICATION / POLICY & ORCHESTRATION LAYER ─── */}
        <A delay={0.45} animate={animate} className="absolute rounded-xl border"
           style={{
             left: '42%', top: '0%', width: '18%', height: '100%',
             borderColor: `${C.orch}20`, background: `${C.orch}05`,
           }}>
          <div className="flex items-center gap-1.5 px-3 pt-2.5 pb-1">
            <ShieldCheck size={10} style={{ color: C.orch }} strokeWidth={2} />
            <span className="text-[8px] font-bold tracking-[0.1em] uppercase leading-tight" style={{ color: C.orch }}>
              Application / Policy & Orchestration Layer
            </span>
          </div>

          <div className="flex flex-col gap-3 px-3 mt-3 justify-center h-[calc(100%-60px)]">
            <OrchItem icon={CheckCircle} label="AI Validator" color={C.orch} delay={0.9} animate={animate} />
            <OrchItem icon={Lock} label="Permission Enforcer" color={C.orch} delay={1.0} animate={animate} />
            <OrchItem icon={ShieldCheck} label="Policy Engine" color={C.orch} delay={1.1} animate={animate} />
            <OrchItem icon={Eye} label="Context Collector" color={C.orch} delay={1.2} animate={animate} />
            <OrchItem icon={Play} label="Tool Trigger" color={C.orch} delay={1.3} animate={animate} />
          </div>
        </A>

        {/* ─── AI SERVICES LAYER (top right) ─── */}
        <A delay={0.55} animate={animate} className="absolute rounded-xl border"
           style={{
             left: '62%', top: '0%', width: '38%', height: '42%',
             borderColor: `${C.ai}20`, background: `${C.ai}05`,
           }}>
          <div className="flex items-center gap-1.5 px-3 pt-2.5 pb-1">
            <Brain size={10} style={{ color: C.ai }} strokeWidth={2} />
            <span className="text-[9px] font-bold tracking-[0.15em] uppercase" style={{ color: C.ai }}>
              AI Services Layer
            </span>
          </div>

          <div className="flex flex-col gap-3 px-3 mt-3">
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={animate ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.4 }}
              className="flex items-center gap-3 p-2.5 rounded-lg"
              style={{ background: `${C.ai}08`, border: `1px solid ${C.ai}15` }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                   style={{ background: `${C.ai}10`, border: `1px solid ${C.ai}20` }}>
                <Camera size={18} style={{ color: C.ai }} strokeWidth={1.3} />
              </div>
              <div>
                <p className="text-[10px] font-semibold" style={{ color: `${C.ai}cc` }}>Python Emotion Engine</p>
                <p className="text-[8px]" style={{ color: `${C.ai}55` }}>Optional &middot; Local camera processing</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={animate ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.5 }}
              className="flex items-center gap-3 p-2.5 rounded-lg"
              style={{ background: `${C.ai}08`, border: `1px solid ${C.ai}15` }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                   style={{ background: `${C.ai}10`, border: `1px solid ${C.ai}20` }}>
                <Server size={18} style={{ color: C.ai }} strokeWidth={1.3} />
              </div>
              <div>
                <p className="text-[10px] font-semibold" style={{ color: `${C.ai}cc` }}>Remote LLM Inference Server</p>
                <p className="text-[8px]" style={{ color: `${C.ai}55` }}>GTX 1650 &middot; HTTPS + Auth</p>
              </div>
            </motion.div>
          </div>
        </A>

        {/* ─── SYSTEM TOOLS & DATA LAYER (bottom right) ─── */}
        <A delay={0.65} animate={animate} className="absolute rounded-xl border"
           style={{
             left: '62%', top: '46%', width: '38%', height: '54%',
             borderColor: `${C.tools}20`, background: `${C.tools}05`,
           }}>
          <div className="flex items-center gap-1.5 px-3 pt-2.5 pb-1">
            <HardDrive size={10} style={{ color: C.tools }} strokeWidth={2} />
            <span className="text-[9px] font-bold tracking-[0.15em] uppercase" style={{ color: C.tools }}>
              System Tools & Data Layer
            </span>
          </div>

          <div className="flex flex-col gap-3 px-3 mt-3">
            {/* Tool Executor */}
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              animate={animate ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1.6 }}
              className="flex items-center gap-3 p-2.5 rounded-lg"
              style={{ background: `${C.tools}08`, border: `1px solid ${C.tools}15` }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                   style={{ background: `${C.tools}10`, border: `1px solid ${C.tools}20` }}>
                <Play size={18} style={{ color: C.tools }} strokeWidth={1.3} />
              </div>
              <div>
                <p className="text-[10px] font-semibold" style={{ color: `${C.tools}cc` }}>Tool Executor</p>
                <p className="text-[8px]" style={{ color: `${C.tools}55` }}>Open apps, notifications, focus windows</p>
              </div>
            </motion.div>

            {/* Storage row */}
            <div className="flex gap-3">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={animate ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.7 }}
                className="flex-1 flex items-center gap-2 p-2.5 rounded-lg"
                style={{ background: `${C.tools}08`, border: `1px solid ${C.tools}15` }}
              >
                <DatabaseIcon size={16} style={{ color: C.tools }} strokeWidth={1.3} />
                <div>
                  <p className="text-[9px] font-semibold" style={{ color: `${C.tools}cc` }}>Local Storage</p>
                  <p className="text-[7px]" style={{ color: `${C.tools}55` }}>Settings &middot; Logs</p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={animate ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.8 }}
                className="flex-1 flex items-center gap-2 p-2.5 rounded-lg"
                style={{ background: `${C.tools}08`, border: `1px solid ${C.tools}15` }}
              >
                <FileText size={16} style={{ color: C.tools }} strokeWidth={1.3} />
                <div>
                  <p className="text-[9px] font-semibold" style={{ color: `${C.tools}cc` }}>Logs / History</p>
                  <p className="text-[7px]" style={{ color: `${C.tools}55` }}>Retention policy</p>
                </div>
              </motion.div>
            </div>
          </div>
        </A>

        {/* ═══ SVG ARROWS ═══ */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 20 }}>
          <defs>
            <marker id="a-arr" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
              <path d="M0,0.5 L6,2.5 L0,4.5" fill="none" stroke="rgba(157,140,255,0.6)" strokeWidth="1" />
            </marker>
            <marker id="a-arr-g" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
              <path d="M0,0.5 L6,2.5 L0,4.5" fill="none" stroke="rgba(74,222,128,0.6)" strokeWidth="1" />
            </marker>
            <marker id="a-arr-p" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
              <path d="M0,0.5 L6,2.5 L0,4.5" fill="none" stroke="rgba(192,132,252,0.6)" strokeWidth="1" />
            </marker>
            <marker id="a-arr-o" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
              <path d="M0,0.5 L6,2.5 L0,4.5" fill="none" stroke="rgba(251,146,60,0.6)" strokeWidth="1" />
            </marker>
            <marker id="a-arr-y" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
              <path d="M0,0.5 L6,2.5 L0,4.5" fill="none" stroke="rgba(250,204,21,0.5)" strokeWidth="1" />
            </marker>
          </defs>

          {/* User → Presentation */}
          <motion.line
            x1="4.5%" y1="42%" x2="6%" y2="42%"
            stroke="rgba(157,140,255,0.35)" strokeWidth={1.5} markerEnd="url(#a-arr)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={animate ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 1.0 }}
          />

          {/* Presentation → Orchestration (IPC/Event) */}
          <motion.line
            x1="40%" y1="30%" x2="42%" y2="30%"
            stroke="rgba(74,222,128,0.3)" strokeWidth={1.5} markerEnd="url(#a-arr-g)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={animate ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 1.2 }}
          />
          <motion.text
            x="41%" y="28%" textAnchor="middle"
            fill="rgba(74,222,128,0.5)" fontSize="8" fontFamily="monospace" fontStyle="italic"
            initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}} transition={{ delay: 1.4 }}
          >
            IPC/Event
          </motion.text>

          {/* Orchestration → Presentation (update status — dashed, below) */}
          <motion.line
            x1="42%" y1="55%" x2="40%" y2="55%"
            stroke="rgba(157,140,255,0.2)" strokeWidth={1} strokeDasharray="5,3" markerEnd="url(#a-arr)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={animate ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 1.4 }}
          />
          <motion.text
            x="41%" y="58%" textAnchor="middle"
            fill="rgba(157,140,255,0.35)" fontSize="7" fontFamily="monospace" fontStyle="italic"
            initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}} transition={{ delay: 1.6 }}
          >
            update status
          </motion.text>

          {/* Orchestration → AI Services (HTTPS + Auth) */}
          <motion.line
            x1="60%" y1="20%" x2="62%" y2="20%"
            stroke="rgba(192,132,252,0.3)" strokeWidth={1.5} markerEnd="url(#a-arr-p)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={animate ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 1.6 }}
          />
          <motion.text
            x="61%" y="18%" textAnchor="middle"
            fill="rgba(192,132,252,0.5)" fontSize="8" fontFamily="monospace" fontStyle="italic"
            initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}} transition={{ delay: 1.8 }}
          >
            HTTPS + Auth
          </motion.text>

          {/* Orchestration → System Tools & Data */}
          <motion.line
            x1="60%" y1="75%" x2="62%" y2="75%"
            stroke="rgba(251,146,60,0.3)" strokeWidth={1.5} markerEnd="url(#a-arr-o)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={animate ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 1.8 }}
          />

          {/* Tool Executor → Local Storage (store settings/logs) */}
          <motion.line
            x1="76%" y1="62%" x2="76%" y2="68%"
            stroke="rgba(251,146,60,0.15)" strokeWidth={0.8} strokeDasharray="3,2" markerEnd="url(#a-arr-o)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={animate ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.3, delay: 2.0 }}
          />
          <motion.text
            x="78%" y="65.5%" textAnchor="start"
            fill="rgba(251,146,60,0.4)" fontSize="7" fontFamily="monospace" fontStyle="italic"
            initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}} transition={{ delay: 2.1 }}
          >
            store settings/logs
          </motion.text>

          {/* Bottom update state path: System Tools → Model */}
          <motion.path
            d="M 62% 98% L 23% 98% L 23% 93%"
            fill="none" stroke="rgba(250,204,21,0.2)" strokeWidth={1} strokeDasharray="5,3"
            markerEnd="url(#a-arr-y)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={animate ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 2.2 }}
          />
          <motion.text
            x="42%" y="97%" textAnchor="middle"
            fill="rgba(250,204,21,0.4)" fontSize="8" fontFamily="monospace" fontStyle="italic"
            initial={{ opacity: 0 }} animate={animate ? { opacity: 1 } : {}} transition={{ delay: 2.5 }}
          >
            update state
          </motion.text>
        </svg>
      </div>

      <DiagramModal
        isOpen={showOriginal}
        onClose={() => setShowOriginal(false)}
        imageSrc="/umlDiagrams/overallArch.png"
        title="Original Architecture Diagram"
      />
    </div>
  );
};

export default ArchitectureSlide;
