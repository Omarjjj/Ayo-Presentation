import { TextReveal, FadeIn } from '../TextReveal';
import { motion } from 'framer-motion';
import { Heart, Mic, Brain, Eye, Shield, Settings, Database } from 'lucide-react';

const phases = [
  { icon: Heart, label: 'Emotion Detection', desc: 'External Python module for emotional state signals' },
  { icon: Mic, label: 'Wake Word', desc: 'Voice activation and speech recognition' },
  { icon: Brain, label: 'LLM AI Integration', desc: 'Self-hosted large language model reasoning' },
  { icon: Eye, label: 'Context Awareness', desc: 'Active window detection and activity monitoring' },
  { icon: Shield, label: 'Policy Engine', desc: 'Permission validation and safety rules' },
  { icon: Settings, label: 'System Orchestration', desc: 'Coordination and tool execution' },
  { icon: Database, label: 'Data Processing', desc: 'Local storage and logging' },
];

const MethodologySlide = ({ animate }: { animate: boolean }) => {
  return (
    <div className="flex flex-col h-full w-full max-w-6xl mx-auto px-16 py-14 justify-center">
      <FadeIn delay={0.1} animate={animate}>
        <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(157,140,255,0.6)' }}>
          08 / Methodology
        </p>
      </FadeIn>

      <TextReveal
        tag="h2"
        className="text-6xl font-bold mb-4"
        type="words"
        delay={0.2}
        stagger={0.08}
        animate={animate}
      >
        Agile development
      </TextReveal>

      <FadeIn delay={0.5} animate={animate}>
        <p className="text-xl mb-16" style={{ color: 'rgba(197,197,210,0.5)' }}>
          Iterative cycles with continuous testing, early feedback, and progressive enhancement.
        </p>
      </FadeIn>

      {/* Timeline */}
      <div className="relative">
        {/* Connecting line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={animate ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-8 left-8 right-8 h-[1px]"
          style={{ background: 'rgba(157,140,255,0.15)', transformOrigin: 'left' }}
        />

        <div className="grid grid-cols-4 gap-6">
          {phases.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={animate ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: 0.8 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
            >
              {/* Phase number */}
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 relative z-10"
                   style={{
                     background: 'linear-gradient(135deg, rgba(31,29,41,0.8), rgba(20,19,26,0.9))',
                     border: '1px solid rgba(157,140,255,0.15)',
                     boxShadow: '0 0 20px rgba(157,140,255,0.08)',
                   }}>
                <p.icon size={22} style={{ color: '#9d8cff' }} strokeWidth={1.5} />
              </div>

              <span className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(157,140,255,0.5)' }}>
                Phase {i + 1}
              </span>
              <h4 className="text-base font-semibold text-white/90 mb-2">{p.label}</h4>
              <p className="text-sm" style={{ color: 'rgba(197,197,210,0.4)' }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MethodologySlide;
