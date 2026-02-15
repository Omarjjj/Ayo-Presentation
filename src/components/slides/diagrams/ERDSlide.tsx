import { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '../../TextReveal';
import { User, Settings, Keyboard, Shield, MessageSquare, Eye, Brain, Server, Wrench, AlertTriangle, Image } from 'lucide-react';
import DiagramModal from '../../DiagramModal';

interface Entity {
  name: string;
  icon: typeof User;
  color: string;
  fields: string[];
  x: number;
  y: number;
}

const entities: Entity[] = [
  { name: 'User', icon: User, color: '#9d8cff', fields: ['user_id (PK)', 'display_name', 'created_at'], x: 50, y: 3 },
  { name: 'Setting', icon: Settings, color: '#e4c07a', fields: ['key', 'value', 'updated_at'], x: 15, y: 22 },
  { name: 'Hotkey', icon: Keyboard, color: '#7db3e4', fields: ['action', 'key_combo', 'enabled'], x: 38, y: 22 },
  { name: 'PermissionState', icon: Shield, color: '#e87b7b', fields: ['type', 'status', 'last_checked'], x: 62, y: 22 },
  { name: 'InteractionSession', icon: MessageSquare, color: '#9d8cff', fields: ['trigger_type', 'privacy_mode', 'result_status'], x: 85, y: 22 },
  { name: 'Message', icon: MessageSquare, color: '#7db3e4', fields: ['sender', 'text', 'created_at'], x: 15, y: 48 },
  { name: 'ContextSnapshot', icon: Eye, color: '#7dd3a8', fields: ['active_app', 'idle_seconds', 'screen_summary'], x: 38, y: 48 },
  { name: 'EmotionSignal', icon: Brain, color: '#7dd3a8', fields: ['state', 'confidence', 'timestamp'], x: 62, y: 48 },
  { name: 'LLMRequest', icon: Server, color: '#b8a9ff', fields: ['request_summary', 'model_name', 'status'], x: 85, y: 48 },
  { name: 'LLMResponse', icon: Server, color: '#b8a9ff', fields: ['response_text', 'suggested_tool'], x: 85, y: 72 },
  { name: 'ToolExecution', icon: Wrench, color: '#e4c07a', fields: ['tool_name', 'approved', 'outcome'], x: 50, y: 72 },
  { name: 'ErrorLog', icon: AlertTriangle, color: '#e87b7b', fields: ['component', 'error_type', 'message'], x: 15, y: 72 },
];

const relationships = [
  { from: 0, to: 1, label: '1:N' }, { from: 0, to: 2, label: '1:N' },
  { from: 0, to: 3, label: '1:N' }, { from: 0, to: 4, label: '1:N' },
  { from: 4, to: 5, label: '1:N' }, { from: 4, to: 6, label: '1:N' },
  { from: 4, to: 7, label: '0:N' }, { from: 4, to: 8, label: '0:N' },
  { from: 8, to: 9, label: '1:1' }, { from: 4, to: 10, label: '0:N' },
  { from: 4, to: 11, label: '0:N' },
];

const ERDSlide = ({ animate }: { animate: boolean }) => {
  const [showOriginal, setShowOriginal] = useState(false);
  return (
    <div className="relative flex flex-col h-full w-full max-w-7xl mx-auto px-10 py-8">
      <FadeIn delay={0.1} animate={animate}>
        <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: 'rgba(157,140,255,0.6)' }}>Entity Relationship Diagram</p>
      </FadeIn>
      <FadeIn delay={0.2} animate={animate}>
        <h2 className="text-3xl font-bold text-white/90 mb-2">Data Model</h2>
        <p className="text-sm mb-5" style={{ color: 'rgba(197,197,210,0.4)' }}>12 entities aligned with the class diagram. No raw camera frames or screenshots stored.</p>
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

      <div className="relative flex-1 min-h-0">
        {/* Relationship lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
          {relationships.map((r, i) => {
            const f = entities[r.from];
            const t = entities[r.to];
            return (
              <g key={i}>
                <motion.line
                  x1={`${f.x}%`} y1={`${f.y + 8}%`}
                  x2={`${t.x}%`} y2={`${t.y}%`}
                  stroke="rgba(157,140,255,0.1)"
                  strokeWidth={1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 + i * 0.05 }}
                />
                <motion.text
                  x={`${(f.x + t.x) / 2}%`}
                  y={`${(f.y + 8 + t.y) / 2}%`}
                  textAnchor="middle"
                  fill="rgba(157,140,255,0.3)"
                  fontSize={8}
                  initial={{ opacity: 0 }}
                  animate={animate ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 1.2 + i * 0.03 }}
                >
                  {r.label}
                </motion.text>
              </g>
            );
          })}
        </svg>

        {/* Entity boxes */}
        {entities.map((ent, i) => {
          const Icon = ent.icon;
          return (
            <motion.div
              key={ent.name}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={animate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="absolute"
              style={{ left: `${ent.x}%`, top: `${ent.y}%`, transform: 'translate(-50%, 0)', zIndex: 1 }}
            >
              <div className="flex flex-col rounded-lg overflow-hidden" style={{ border: `1px solid ${ent.color}20`, minWidth: 120 }}>
                <div className="flex items-center gap-1.5 px-2 py-1.5" style={{ background: `${ent.color}12` }}>
                  <Icon size={10} style={{ color: ent.color }} strokeWidth={1.5} />
                  <span className="text-[9px] font-bold" style={{ color: ent.color }}>{ent.name}</span>
                </div>
                <div className="px-2 py-1" style={{ background: 'rgba(17,16,23,0.7)' }}>
                  {ent.fields.map((f, fi) => (
                    <div key={fi} className="text-[8px]" style={{ color: 'rgba(197,197,210,0.3)' }}>{f}</div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <DiagramModal
        isOpen={showOriginal}
        onClose={() => setShowOriginal(false)}
        imageSrc="/umlDiagrams/erd.png"
        title="Original ERD"
      />
    </div>
  );
};

export default ERDSlide;
