import { useState } from 'react';
import { motion } from 'framer-motion';
import { FadeIn } from '../../TextReveal';
import { Monitor, Server, Globe, Shield, Mic, Eye, Database, Wrench, Lock, Cpu, Image } from 'lucide-react';
import DiagramModal from '../../DiagramModal';

const DeploymentDiagramSlide = ({ animate }: { animate: boolean }) => {
  const [showOriginal, setShowOriginal] = useState(false);
  return (
    <div className="relative flex flex-col h-full w-full max-w-7xl mx-auto px-12 py-8">
      <FadeIn delay={0.1} animate={animate}>
        <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: 'rgba(157,140,255,0.6)' }}>Deployment Diagram</p>
      </FadeIn>
      <FadeIn delay={0.2} animate={animate}>
        <h2 className="text-3xl font-bold text-white/90 mb-8">Physical Deployment Architecture</h2>
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

      <div className="flex-1 flex items-center justify-center gap-16 relative">
        {/* Client Device */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={animate ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative rounded-2xl p-6 w-[400px]"
          style={{ background: 'rgba(31,29,41,0.4)', border: '1px solid rgba(157,140,255,0.12)' }}
        >
          <div className="flex items-center gap-2 mb-5">
            <Monitor size={18} style={{ color: '#9d8cff' }} strokeWidth={1.5} />
            <span className="text-sm font-semibold" style={{ color: '#9d8cff' }}>Client Device (User PC)</span>
          </div>

          <div className="space-y-2">
            {[
              { icon: Monitor, label: 'Electron + React UI', color: '#7db3e4' },
              { icon: Shield, label: 'Node.js Policy + Orchestrator', color: '#e4c07a' },
              { icon: Mic, label: 'Voice Subsystem (STT/TTS)', color: '#7db3e4' },
              { icon: Eye, label: 'Context Collection Module', color: '#7dd3a8' },
              { icon: Wrench, label: 'Tool Execution Module', color: '#e4c07a' },
              { icon: Database, label: 'Local Storage', color: '#6b6880' },
              { icon: Eye, label: 'Python Emotion Engine (Optional)', color: '#7dd3a8' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={animate ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                style={{ background: `${item.color}08`, border: `1px solid ${item.color}15` }}
              >
                <item.icon size={12} style={{ color: item.color }} strokeWidth={1.5} />
                <span className="text-[11px]" style={{ color: `${item.color}cc` }}>{item.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Privacy badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={animate ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.2 }}
            className="mt-3 px-3 py-1.5 rounded-lg text-center"
            style={{ background: 'rgba(232,123,123,0.06)', border: '1px solid rgba(232,123,123,0.15)' }}
          >
            <span className="text-[10px]" style={{ color: '#e87b7b' }}>All OS actions happen here only</span>
          </motion.div>
        </motion.div>

        {/* Network Connection */}
        <div className="flex flex-col items-center gap-3 relative">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={animate ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="w-32 h-[2px]"
            style={{ background: 'linear-gradient(90deg, #9d8cff40, #b8a9ff60, #9d8cff40)' }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={animate ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.0 }}
            className="flex flex-col items-center gap-1"
          >
            <Globe size={16} style={{ color: 'rgba(157,140,255,0.5)' }} />
            <span className="text-[9px] tracking-wider" style={{ color: 'rgba(157,140,255,0.4)' }}>HTTPS</span>
            <span className="text-[8px]" style={{ color: 'rgba(157,140,255,0.25)' }}>+ Auth + Rate Limit</span>
          </motion.div>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={animate ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="w-32 h-[2px]"
            style={{ background: 'linear-gradient(90deg, #9d8cff40, #b8a9ff60, #9d8cff40)' }}
          />
        </div>

        {/* LLM Server */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={animate ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="relative rounded-2xl p-6 w-[320px]"
          style={{ background: 'rgba(31,29,41,0.4)', border: '1px solid rgba(184,169,255,0.12)' }}
        >
          <div className="flex items-center gap-2 mb-5">
            <Server size={18} style={{ color: '#b8a9ff' }} strokeWidth={1.5} />
            <span className="text-sm font-semibold" style={{ color: '#b8a9ff' }}>LLM Inference Server</span>
          </div>

          <div className="space-y-2">
            {[
              { icon: Cpu, label: 'Quantized Model Runtime', color: '#b8a9ff' },
              { icon: Server, label: 'Inference API Endpoint', color: '#b8a9ff' },
              { icon: Lock, label: 'HTTPS / TLS', color: '#e4c07a' },
              { icon: Shield, label: 'Authentication Gate', color: '#e87b7b' },
              { icon: Shield, label: 'Rate Limiter', color: '#e87b7b' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={animate ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ delay: 0.7 + i * 0.08 }}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg"
                style={{ background: `${item.color}08`, border: `1px solid ${item.color}15` }}
              >
                <item.icon size={12} style={{ color: item.color }} strokeWidth={1.5} />
                <span className="text-[11px]" style={{ color: `${item.color}cc` }}>{item.label}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={animate ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.3 }}
            className="mt-3 px-3 py-1.5 rounded-lg text-center"
            style={{ background: 'rgba(125,211,168,0.06)', border: '1px solid rgba(125,211,168,0.15)' }}
          >
            <span className="text-[10px]" style={{ color: '#7dd3a8' }}>Advisory only. No OS access.</span>
          </motion.div>
        </motion.div>
      </div>

      <DiagramModal
        isOpen={showOriginal}
        onClose={() => setShowOriginal(false)}
        imageSrc="/umlDiagrams/SystemArchitecture.png"
        title="Original Deployment Diagram"
      />
    </div>
  );
};

export default DeploymentDiagramSlide;
