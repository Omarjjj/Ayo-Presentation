import { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '../../TextReveal';
import { Monitor, Shield, Mic, Eye, Heart, Brain, Wrench, Database, AlertTriangle, Image } from 'lucide-react';
import DiagramModal from '../../DiagramModal';

const subsystems = [
  { name: 'UI Subsystem', role: 'Interaction & feedback', icon: Monitor, color: '#7db3e4' },
  { name: 'Policy & Orchestrator', role: 'Decision authority', icon: Shield, color: '#e4c07a' },
  { name: 'Voice Subsystem', role: 'Speech I/O', icon: Mic, color: '#7db3e4' },
  { name: 'Context & Proactivity', role: 'Situational awareness', icon: Eye, color: '#7dd3a8' },
  { name: 'Emotion Engine', role: 'Optional emotion signals', icon: Heart, color: '#e87b7b' },
  { name: 'AI Reasoning (LLM)', role: 'Language reasoning only', icon: Brain, color: '#b8a9ff' },
  { name: 'Tool Execution', role: 'Local OS actions', icon: Wrench, color: '#e4c07a' },
  { name: 'Data Storage', role: 'Settings & history', icon: Database, color: '#6b6880' },
  { name: 'Error Handling', role: 'Stability & recovery', icon: AlertTriangle, color: '#e87b7b' },
];

const SubsystemSlide = ({ animate }: { animate: boolean }) => {
  const [showOriginal, setShowOriginal] = useState(false);
  return (
    <div className="relative flex flex-col h-full w-full max-w-6xl mx-auto px-12 py-8">
      <FadeIn delay={0.1} animate={animate}>
        <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: 'rgba(157,140,255,0.6)' }}>Subsystem Diagram</p>
      </FadeIn>
      <FadeIn delay={0.2} animate={animate}>
        <h2 className="text-3xl font-bold text-white/90 mb-2">Cooperating Subsystems</h2>
        <p className="text-sm mb-8" style={{ color: 'rgba(197,197,210,0.4)' }}>
          Each subsystem has a clearly defined responsibility. The Policy & Orchestrator is the central authority.
        </p>
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

      <div className="flex-1 flex items-center justify-center">
        <div className="relative w-full max-w-[700px] aspect-square">
          {/* Center hub */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={animate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full flex flex-col items-center justify-center z-10"
            style={{
              background: 'radial-gradient(circle, rgba(228,192,122,0.15), rgba(228,192,122,0.05))',
              border: '1px solid rgba(228,192,122,0.3)',
              boxShadow: '0 0 40px rgba(228,192,122,0.1)',
            }}
          >
            <Shield size={20} style={{ color: '#e4c07a' }} strokeWidth={1.5} />
            <span className="text-[9px] font-bold mt-1" style={{ color: '#e4c07a' }}>Orchestrator</span>
            <span className="text-[7px]" style={{ color: 'rgba(228,192,122,0.6)' }}>Decision Hub</span>
          </motion.div>

          {/* Satellite subsystems */}
          {subsystems.filter(s => s.name !== 'Policy & Orchestrator').map((sub, i) => {
            const total = subsystems.length - 1;
            const angle = (i / total) * Math.PI * 2 - Math.PI / 2;
            const radius = 42; // percentage from center
            const x = 50 + radius * Math.cos(angle);
            const y = 50 + radius * Math.sin(angle);
            const Icon = sub.icon;

            return (
              <motion.div key={sub.name}>
                {/* Connection line to center */}
                <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                  <motion.line
                    x1="50%" y1="50%"
                    x2={`${x}%`} y2={`${y}%`}
                    stroke={`${sub.color}20`}
                    strokeWidth={1}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
                  />
                </svg>

                {/* Node */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={animate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute flex flex-col items-center gap-1"
                  style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)', zIndex: 1 }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                       style={{ background: `${sub.color}12`, border: `1px solid ${sub.color}25` }}>
                    <Icon size={16} style={{ color: sub.color }} strokeWidth={1.5} />
                  </div>
                  <span className="text-[9px] font-semibold whitespace-nowrap" style={{ color: sub.color }}>{sub.name}</span>
                  <span className="text-[7px]" style={{ color: 'rgba(197,197,210,0.35)' }}>{sub.role}</span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <DiagramModal
        isOpen={showOriginal}
        onClose={() => setShowOriginal(false)}
        imageSrc="/umlDiagrams/subsystemDigram.png"
        title="Original Subsystem Diagram"
      />
    </div>
  );
};

export default SubsystemSlide;
