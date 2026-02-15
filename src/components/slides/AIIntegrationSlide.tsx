import { TextReveal, FadeIn } from '../TextReveal';
import { motion } from 'framer-motion';
import { User, Monitor, Shield, Server, FileCheck, Wrench } from 'lucide-react';

const pipelineSteps = [
  { icon: User, label: 'User', color: '#9d8cff' },
  { icon: Monitor, label: 'Client', color: '#7db3e4' },
  { icon: Shield, label: 'Policy Engine', color: '#e4c07a' },
  { icon: Server, label: 'LLM Server', color: '#7dd3a8' },
  { icon: FileCheck, label: 'Validation', color: '#e4c07a' },
  { icon: Wrench, label: 'Execution', color: '#e87b7b' },
];

const AIIntegrationSlide = ({ animate }: { animate: boolean }) => {
  return (
    <div className="flex flex-col h-full w-full max-w-6xl mx-auto px-16 py-14 justify-center">
      <FadeIn delay={0.1} animate={animate}>
        <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(157,140,255,0.6)' }}>
          07 / AI Integration
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
        Intelligent not autonomous
      </TextReveal>

      <FadeIn delay={0.5} animate={animate}>
        <p className="text-xl mb-16" style={{ color: 'rgba(197,197,210,0.5)' }}>
          The LLM reasons and suggests. It never executes directly. Every action is policy-validated.
        </p>
      </FadeIn>

      {/* Architecture pipeline */}
      <div className="flex items-center justify-between relative">
        {/* Connecting line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={animate ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 right-0 h-[1px] top-1/2"
          style={{ background: 'linear-gradient(90deg, transparent 5%, rgba(157,140,255,0.2) 20%, rgba(157,140,255,0.2) 80%, transparent 95%)', transformOrigin: 'left' }}
        />

        {pipelineSteps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={animate ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.8 }}
            transition={{ duration: 0.5, delay: 0.9 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-3 relative z-10"
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, ${step.color}15, ${step.color}08)`,
                border: `1px solid ${step.color}30`,
                boxShadow: `0 0 30px ${step.color}10`,
              }}
            >
              <step.icon size={24} style={{ color: step.color }} strokeWidth={1.5} />
            </div>
            <span className="text-xs font-medium tracking-wider" style={{ color: `${step.color}cc` }}>
              {step.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Key points */}
      <div className="grid grid-cols-3 gap-8 mt-16">
        {[
          { title: 'Why LLM?', desc: 'Natural understanding and reasoning far superior to rule-based systems.' },
          { title: 'Structured Output', desc: 'LLM returns response text, tool suggestions, and execution arguments.' },
          { title: 'Self-Hosted', desc: 'No cloud dependency. Greater data control. Full sovereignty.' },
        ].map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={animate ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 1.8 + i * 0.1 }}
          >
            <h4 className="text-sm font-semibold mb-2" style={{ color: '#9d8cff' }}>{item.title}</h4>
            <p className="text-sm" style={{ color: 'rgba(197,197,210,0.45)' }}>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AIIntegrationSlide;
