import { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '../../TextReveal';
import DiagramModal from '../../DiagramModal';
import { Settings, Shield, Brain, Mic, Eye, Wrench, Database, Server, Lock, AlertTriangle, Keyboard, Image } from 'lucide-react';

interface ClassBox {
  name: string;
  icon: typeof Settings;
  color: string;
  group: 'client' | 'server' | 'emotion';
  attrs: string[];
  x: number;
  y: number;
}

const classes: ClassBox[] = [
  { name: 'AppController', icon: Settings, color: '#9d8cff', group: 'client', attrs: ['init()', 'shutdown()'], x: 50, y: 5 },
  { name: 'SettingsManager', icon: Database, color: '#6b6880', group: 'client', attrs: ['load()', 'save()'], x: 15, y: 22 },
  { name: 'PermissionManager', icon: Lock, color: '#e87b7b', group: 'client', attrs: ['check()', 'request()'], x: 38, y: 22 },
  { name: 'PrivacyManager', icon: Shield, color: '#e87b7b', group: 'client', attrs: ['toggleMode()', 'isPrivate()'], x: 62, y: 22 },
  { name: 'HotkeyManager', icon: Keyboard, color: '#7db3e4', group: 'client', attrs: ['register()', 'onPress()'], x: 85, y: 22 },
  { name: 'Orchestrator', icon: Brain, color: '#e4c07a', group: 'client', attrs: ['process()', 'coordinate()'], x: 50, y: 42 },
  { name: 'PolicyEngine', icon: Shield, color: '#e87b7b', group: 'client', attrs: ['validate()', 'classify()'], x: 25, y: 42 },
  { name: 'ContextCollector', icon: Eye, color: '#7dd3a8', group: 'client', attrs: ['collect()', 'summarize()'], x: 15, y: 58 },
  { name: 'VoiceInput', icon: Mic, color: '#7db3e4', group: 'client', attrs: ['startSTT()', 'playTTS()'], x: 38, y: 58 },
  { name: 'ToolExecutor', icon: Wrench, color: '#e4c07a', group: 'client', attrs: ['execute()', 'checkWhitelist()'], x: 62, y: 58 },
  { name: 'LLMClient', icon: Server, color: '#b8a9ff', group: 'client', attrs: ['sendRequest()', 'parseResponse()'], x: 85, y: 58 },
  { name: 'EmotionEngine', icon: Eye, color: '#7dd3a8', group: 'emotion', attrs: ['start()', 'getSignal()'], x: 15, y: 78 },
  { name: 'InferenceServer', icon: Server, color: '#b8a9ff', group: 'server', attrs: ['handleRequest()', 'runModel()'], x: 72, y: 78 },
  { name: 'ErrorHandler', icon: AlertTriangle, color: '#e87b7b', group: 'client', attrs: ['handle()', 'fallback()'], x: 50, y: 78 },
];

const connections = [
  { from: 0, to: 1 }, { from: 0, to: 2 }, { from: 0, to: 3 }, { from: 0, to: 4 },
  { from: 0, to: 5 }, // AppController -> Orchestrator
  { from: 5, to: 6 }, // Orchestrator -> PolicyEngine
  { from: 5, to: 7 }, { from: 5, to: 8 }, { from: 5, to: 9 }, { from: 5, to: 10 },
  { from: 3, to: 11 }, // PrivacyManager -> EmotionEngine
  { from: 10, to: 12 }, // LLMClient -> InferenceServer
  { from: 5, to: 13 }, // Orchestrator -> ErrorHandler
];

const ClassDiagramSlide = ({ animate }: { animate: boolean }) => {
  const [showOriginal, setShowOriginal] = useState(false);
  return (
    <div className="flex flex-col h-full w-full max-w-7xl mx-auto px-10 py-8">
      <FadeIn delay={0.1} animate={animate}>
        <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: 'rgba(157,140,255,0.6)' }}>
          Class Diagram
        </p>
      </FadeIn>
      <FadeIn delay={0.2} animate={animate}>
        <h2 className="text-3xl font-bold text-white/90 mb-2">System Class Structure</h2>
        <p className="text-sm mb-6" style={{ color: 'rgba(197,197,210,0.4)' }}>
          Three groups: Client App, Optional Emotion Engine, Remote LLM Server. The LLM never controls the OS.
        </p>
      </FadeIn>

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
        {/* Group labels */}
        <motion.div initial={{ opacity: 0 }} animate={animate ? { opacity: 0.15 } : { opacity: 0 }} transition={{ delay: 0.4 }}
          className="absolute rounded-2xl border border-dashed" style={{ left: '5%', top: '0%', width: '90%', height: '70%', borderColor: '#9d8cff' }}>
          <span className="absolute top-2 left-3 text-[10px] tracking-widest uppercase" style={{ color: '#9d8cff' }}>Client App</span>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={animate ? { opacity: 0.15 } : { opacity: 0 }} transition={{ delay: 0.5 }}
          className="absolute rounded-2xl border border-dashed" style={{ left: '5%', top: '73%', width: '30%', height: '25%', borderColor: '#7dd3a8' }}>
          <span className="absolute top-2 left-3 text-[10px] tracking-widest uppercase" style={{ color: '#7dd3a8' }}>Emotion (Local)</span>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={animate ? { opacity: 0.15 } : { opacity: 0 }} transition={{ delay: 0.6 }}
          className="absolute rounded-2xl border border-dashed" style={{ left: '58%', top: '73%', width: '38%', height: '25%', borderColor: '#b8a9ff' }}>
          <span className="absolute top-2 left-3 text-[10px] tracking-widest uppercase" style={{ color: '#b8a9ff' }}>LLM Server (Remote)</span>
        </motion.div>

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
          {connections.map((c, i) => {
            const f = classes[c.from];
            const t = classes[c.to];
            return (
              <motion.line
                key={i}
                x1={`${f.x}%`} y1={`${f.y + 5}%`}
                x2={`${t.x}%`} y2={`${t.y}%`}
                stroke="rgba(157,140,255,0.12)"
                strokeWidth={1}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.05 }}
              />
            );
          })}
        </svg>

        {/* Class boxes */}
        {classes.map((cls, i) => {
          const Icon = cls.icon;
          return (
            <motion.div
              key={cls.name}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={animate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="absolute"
              style={{ left: `${cls.x}%`, top: `${cls.y}%`, transform: 'translate(-50%, 0)', zIndex: 1 }}
            >
              <div className="flex flex-col rounded-lg overflow-hidden" style={{ border: `1px solid ${cls.color}25`, minWidth: 110 }}>
                <div className="flex items-center gap-1.5 px-2.5 py-1.5" style={{ background: `${cls.color}15` }}>
                  <Icon size={11} style={{ color: cls.color }} strokeWidth={1.5} />
                  <span className="text-[10px] font-semibold" style={{ color: cls.color }}>{cls.name}</span>
                </div>
                <div className="px-2.5 py-1" style={{ background: 'rgba(17,16,23,0.7)' }}>
                  {cls.attrs.map((a, ai) => (
                    <div key={ai} className="text-[8px]" style={{ color: 'rgba(197,197,210,0.35)' }}>{a}</div>
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
        imageSrc="/umlDiagrams/class diagram.png"
        title="Original Class Diagram"
      />
    </div>
  );
};

export default ClassDiagramSlide;
