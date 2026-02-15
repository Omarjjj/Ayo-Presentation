import { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '../../TextReveal';
import DiagramModal from '../../DiagramModal';
import { User, Monitor, Server, Music, Timer, Camera, Image } from 'lucide-react';

/* ─── Actors ─── */
const actors = [
  { id: 'user', label: 'End User', icon: User, color: '#9d8cff', x: 2, y: 42 },
  { id: 'os', label: 'Windows OS / System', icon: Monitor, color: '#7db3e4', x: 96, y: 8 },
  { id: 'llm', label: 'Remote LLM Server', icon: Server, color: '#b8a9ff', x: 96, y: 32 },
  { id: 'ext', label: 'External APIs', icon: Music, color: '#7dd3a8', x: 96, y: 56 },
  { id: 'emotion', label: 'Emotion Engine', icon: Camera, color: '#e4c07a', x: 96, y: 74 },
  { id: 'scheduler', label: 'Local Scheduler', icon: Timer, color: '#e87b7b', x: 96, y: 92 },
];

/* ─── Use Cases grouped by category ─── */
interface UseCase {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  category: string;
}

const useCases: UseCase[] = [
  // Core Interaction
  { id: 'uc1', label: 'UC1: Launch Assistant', x: 27, y: 3, color: '#9d8cff', category: 'core' },
  { id: 'uc2', label: 'UC2: Ask Assistant (Text/Voice)', x: 32, y: 10.5, color: '#9d8cff', category: 'core' },
  { id: 'uc3', label: 'UC3: Receive Response (UI/TTS)', x: 27, y: 18, color: '#9d8cff', category: 'core' },

  // AI Agent Behavior
  { id: 'uc4', label: 'UC4: Generate Plan (AI Reasoning)', x: 60, y: 3, color: '#b8a9ff', category: 'ai' },
  { id: 'uc5', label: 'UC5: Validate Plan (Policy Gate)', x: 60, y: 10.5, color: '#e87b7b', category: 'ai' },
  { id: 'uc6', label: 'UC6: Execute Low-Impact Action', x: 60, y: 18, color: '#7dd3a8', category: 'ai' },
  { id: 'uc7', label: 'UC7: Confirm High-Impact Action', x: 60, y: 25.5, color: '#e87b7b', category: 'ai' },

  // Scheduling / Automation
  { id: 'uc8', label: 'UC8: Schedule Delayed Action', x: 32, y: 33.5, color: '#e4c07a', category: 'sched' },
  { id: 'uc9', label: 'UC9: Execute Scheduled Action', x: 60, y: 33.5, color: '#e4c07a', category: 'sched' },

  // Privacy / Control
  { id: 'uc10', label: 'UC10: Toggle Privacy Mode', x: 27, y: 43, color: '#e87b7b', category: 'privacy' },
  { id: 'uc11', label: 'UC11: Toggle Camera / Emotion', x: 32, y: 50.5, color: '#e4c07a', category: 'privacy' },
  { id: 'uc12', label: 'UC12: Manage Permissions', x: 27, y: 58, color: '#e87b7b', category: 'privacy' },

  // Proactivity
  { id: 'uc13', label: 'UC13: Monitor Activity (BG)', x: 60, y: 48, color: '#7dd3a8', category: 'proactive' },
  { id: 'uc14', label: 'UC14: Proactive Suggestion', x: 60, y: 55.5, color: '#b8a9ff', category: 'proactive' },

  // Settings & Reliability
  { id: 'uc15', label: 'UC15: Configure AI Server', x: 27, y: 69, color: '#7db3e4', category: 'settings' },
  { id: 'uc16', label: 'UC16: Fallback (Server Offline)', x: 60, y: 69, color: '#e87b7b', category: 'settings' },
  { id: 'uc17', label: 'UC17: View Logs / Status', x: 32, y: 77, color: '#7db3e4', category: 'settings' },
  { id: 'uc18', label: 'UC18: Clear Local Data', x: 60, y: 77, color: '#e87b7b', category: 'settings' },
];

/* ─── Category labels ─── */
const categories = [
  { label: 'Core Interaction', x: 15, y: 0, w: 78, h: 22.5, color: '#9d8cff' },
  { label: 'AI Agent Behavior', x: 48, y: 0, w: 42, h: 29, color: '#b8a9ff' },
  { label: 'Scheduling', x: 15, y: 30.5, w: 78, h: 8, color: '#e4c07a' },
  { label: 'Privacy / Control', x: 15, y: 40, w: 42, h: 22, color: '#e87b7b' },
  { label: 'Proactivity', x: 48, y: 44.5, w: 42, h: 16, color: '#7dd3a8' },
  { label: 'Settings & Reliability', x: 15, y: 65.5, w: 78, h: 17, color: '#7db3e4' },
];

/* ─── Actor → Use‑Case connections ─── */
const actorConnections: { from: string; to: string }[] = [
  // End User ↔ core
  { from: 'user', to: 'uc1' }, { from: 'user', to: 'uc2' }, { from: 'user', to: 'uc3' },
  // End User ↔ scheduling
  { from: 'user', to: 'uc8' },
  // End User ↔ privacy
  { from: 'user', to: 'uc10' }, { from: 'user', to: 'uc11' }, { from: 'user', to: 'uc12' },
  // End User ↔ settings
  { from: 'user', to: 'uc15' }, { from: 'user', to: 'uc17' }, { from: 'user', to: 'uc18' },
  // End User ↔ high-impact confirm
  { from: 'user', to: 'uc7' },
  // LLM Server
  { from: 'llm', to: 'uc4' },
  // Windows OS
  { from: 'os', to: 'uc6' },
  // External APIs
  { from: 'ext', to: 'uc6' },
  // Emotion Engine
  { from: 'emotion', to: 'uc11' }, { from: 'emotion', to: 'uc13' },
  // Scheduler
  { from: 'scheduler', to: 'uc8' }, { from: 'scheduler', to: 'uc9' },
];

/* ─── Include / Extend relationships ─── */
interface Relationship {
  from: string;
  to: string;
  type: 'include' | 'extend';
}

const relationships: Relationship[] = [
  { from: 'uc2', to: 'uc4', type: 'include' },
  { from: 'uc2', to: 'uc5', type: 'include' },
  { from: 'uc6', to: 'uc2', type: 'extend' },
  { from: 'uc7', to: 'uc6', type: 'extend' },
  { from: 'uc8', to: 'uc2', type: 'extend' },
  { from: 'uc9', to: 'uc5', type: 'include' },
  { from: 'uc14', to: 'uc13', type: 'extend' },
  { from: 'uc16', to: 'uc4', type: 'extend' },
];

/* ─── helpers ─── */
const getActor = (id: string) => actors.find((a) => a.id === id)!;
const getUC = (id: string) => useCases.find((uc) => uc.id === id)!;

const UseCaseDiagramSlide = ({ animate }: { animate: boolean }) => {
  const [showOriginal, setShowOriginal] = useState(false);
  return (
    <div className="flex flex-col h-full w-full max-w-7xl mx-auto px-10 py-6">
      {/* Header */}
      <FadeIn delay={0.1} animate={animate}>
        <p className="text-xs tracking-[0.4em] uppercase mb-1" style={{ color: 'rgba(157,140,255,0.6)' }}>
          Use Case Diagram
        </p>
      </FadeIn>
      <FadeIn delay={0.2} animate={animate}>
        <h2 className="text-2xl font-bold text-white/90 mb-4">
          AYO Desktop AI Assistant — System Interactions
        </h2>
      </FadeIn>

      {/* Diagram area */}
      <div className="relative flex-1 min-h-0">
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
        {/* ── System boundary ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={animate ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute rounded-2xl border border-dashed"
          style={{ left: '12%', top: '0%', width: '74%', height: '97%', borderColor: 'rgba(157,140,255,0.18)' }}
        >
          <span
            className="absolute -top-3 left-4 px-2 text-[10px] tracking-[0.3em] uppercase font-semibold"
            style={{ color: 'rgba(157,140,255,0.45)', background: '#111017' }}
          >
            AYO System Boundary (Client + Policy/Agent Layer)
          </span>
        </motion.div>

        {/* ── Category group boxes ── */}
        {categories.map((cat, i) => (
          <motion.div
            key={cat.label}
            initial={{ opacity: 0 }}
            animate={animate ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.35 + i * 0.06 }}
            className="absolute rounded-lg border border-dashed"
            style={{
              left: `${cat.x}%`,
              top: `${cat.y}%`,
              width: `${cat.w}%`,
              height: `${cat.h}%`,
              borderColor: `${cat.color}12`,
              background: `${cat.color}04`,
            }}
          >
            <span
              className="absolute -top-2 right-3 px-1.5 text-[8px] tracking-[0.2em] uppercase font-medium"
              style={{ color: `${cat.color}55`, background: '#111017' }}
            >
              {cat.label}
            </span>
          </motion.div>
        ))}

        {/* ── SVG layer (connections + relationships) ── */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          <defs>
            <marker id="arrow-include" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
              <path d="M0,0 L6,2 L0,4" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="0.8" />
            </marker>
            <marker id="arrow-extend" markerWidth="6" markerHeight="4" refX="6" refY="2" orient="auto">
              <path d="M0,0 L6,2 L0,4" fill="none" stroke="rgba(232,123,123,0.5)" strokeWidth="0.8" />
            </marker>
          </defs>

          {/* Actor → UC connections */}
          {actorConnections.map((conn, i) => {
            const a = getActor(conn.from);
            const uc = getUC(conn.to);
            const ax = a.id === 'user' ? a.x + 4 : a.x - 2;
            return (
              <motion.line
                key={`ac-${i}`}
                x1={`${ax}%`}
                y1={`${a.y + 2}%`}
                x2={`${uc.x}%`}
                y2={`${uc.y + 2}%`}
                stroke="rgba(157,140,255,0.08)"
                strokeWidth={0.8}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={animate ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.9 + i * 0.03 }}
              />
            );
          })}

          {/* Include / Extend relationships */}
          {relationships.map((rel, i) => {
            const fromUC = getUC(rel.from);
            const toUC = getUC(rel.to);
            const isInclude = rel.type === 'include';
            const strokeColor = isInclude ? 'rgba(255,255,255,0.3)' : 'rgba(232,123,123,0.4)';
            const midX = (fromUC.x + toUC.x) / 2;
            const midY = (fromUC.y + toUC.y) / 2;

            return (
              <g key={`rel-${i}`}>
                <motion.line
                  x1={`${fromUC.x}%`}
                  y1={`${fromUC.y + 2}%`}
                  x2={`${toUC.x}%`}
                  y2={`${toUC.y + 2}%`}
                  stroke={strokeColor}
                  strokeWidth={1}
                  strokeDasharray="5,3"
                  markerEnd={isInclude ? 'url(#arrow-include)' : 'url(#arrow-extend)'}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={animate ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.4 + i * 0.08 }}
                />
                <motion.text
                  x={`${midX}%`}
                  y={`${midY + 1.5}%`}
                  textAnchor="middle"
                  fill={isInclude ? 'rgba(255,255,255,0.4)' : 'rgba(232,123,123,0.5)'}
                  fontSize="7"
                  fontStyle="italic"
                  fontFamily="monospace"
                  initial={{ opacity: 0 }}
                  animate={animate ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: 1.8 + i * 0.08 }}
                >
                  {isInclude ? '«include»' : '«extend»'}
                </motion.text>
              </g>
            );
          })}
        </svg>

        {/* ── Actors ── */}
        {actors.map((a, i) => {
          const Icon = a.icon;
          return (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={animate ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.45, delay: 0.4 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="absolute flex flex-col items-center gap-0.5"
              style={{ left: `${a.x}%`, top: `${a.y}%`, transform: 'translate(-50%, 0)', zIndex: 3 }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: `${a.color}18`, border: `1px solid ${a.color}35`, boxShadow: `0 0 12px ${a.color}15` }}
              >
                <Icon size={15} style={{ color: a.color }} strokeWidth={1.5} />
              </div>
              <span className="text-[8px] font-semibold whitespace-nowrap" style={{ color: `${a.color}aa` }}>
                {a.label}
              </span>
            </motion.div>
          );
        })}

        {/* ── Use-case ellipses ── */}
        {useCases.map((uc, i) => (
          <motion.div
            key={uc.id}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={animate ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.35, delay: 0.55 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
            className="absolute"
            style={{ left: `${uc.x}%`, top: `${uc.y}%`, transform: 'translate(-50%, 0)', zIndex: 2 }}
          >
            <div
              className="px-2.5 py-1 rounded-full text-[8px] font-medium whitespace-nowrap text-center"
              style={{
                background: `${uc.color}0c`,
                border: `1px solid ${uc.color}28`,
                color: `${uc.color}cc`,
                boxShadow: `0 0 10px ${uc.color}08`,
              }}
            >
              {uc.label}
            </div>
          </motion.div>
        ))}

        {/* ── Legend ── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={animate ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 2.4 }}
          className="absolute bottom-1 left-[14%] flex gap-5 text-[7px]"
          style={{ zIndex: 4 }}
        >
          <span className="flex items-center gap-1.5">
            <svg width="20" height="6"><line x1="0" y1="3" x2="20" y2="3" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="4,2" /></svg>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>{'«include»'}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="20" height="6"><line x1="0" y1="3" x2="20" y2="3" stroke="rgba(232,123,123,0.4)" strokeWidth="1" strokeDasharray="4,2" /></svg>
            <span style={{ color: 'rgba(232,123,123,0.5)' }}>{'«extend»'}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <svg width="20" height="6"><line x1="0" y1="3" x2="20" y2="3" stroke="rgba(157,140,255,0.15)" strokeWidth="1" /></svg>
            <span style={{ color: 'rgba(157,140,255,0.4)' }}>actor association</span>
          </span>
        </motion.div>
      </div>
      <DiagramModal
        isOpen={showOriginal}
        onClose={() => setShowOriginal(false)}
        imageSrc="/umlDiagrams/useCaseDiagram.png"
        title="Original Use Case Diagram"
      />
    </div>
  );
};

export default UseCaseDiagramSlide;
