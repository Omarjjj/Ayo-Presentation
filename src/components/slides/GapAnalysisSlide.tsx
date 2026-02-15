import { TextReveal, FadeIn } from '../TextReveal';
import { motion } from 'framer-motion';
import { X, Check } from 'lucide-react';

const gaps = [
  "Don't understand user context",
  "Operate only reactively",
  "Rely on cloud-based processing",
  "No structured AI reasoning",
  "No deterministic execution control",
  "Privacy is an afterthought",
];

const fills = [
  "Context awareness built-in",
  "Proactive and reactive modes",
  "Self-hosted, local processing",
  "Structured LLM reasoning",
  "Deterministic policy engine",
  "Privacy by design",
];

const GapAnalysisSlide = ({ animate }: { animate: boolean }) => {
  return (
    <div className="flex flex-col h-full w-full max-w-6xl mx-auto px-16 py-14 justify-center">
      <FadeIn delay={0.1} animate={animate}>
        <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(157,140,255,0.6)' }}>
          05 / Gap Analysis
        </p>
      </FadeIn>

      <TextReveal
        tag="h2"
        className="text-6xl font-bold mb-12"
        type="words"
        delay={0.2}
        stagger={0.08}
        animate={animate}
      >
        Filling the void
      </TextReveal>

      <div className="grid grid-cols-2 gap-16">
        {/* Current assistants */}
        <div>
          <FadeIn delay={0.5} animate={animate}>
            <h3 className="text-sm tracking-[0.3em] uppercase mb-6" style={{ color: 'rgba(232,123,123,0.7)' }}>
              Current Assistants
            </h3>
          </FadeIn>
          <div className="space-y-3">
            {gaps.map((g, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -30 }}
                animate={animate ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                className="flex items-center gap-3 py-3 px-4 rounded-lg"
                style={{ background: 'rgba(232,123,123,0.05)', border: '1px solid rgba(232,123,123,0.08)' }}
              >
                <X size={16} style={{ color: 'rgba(232,123,123,0.5)' }} strokeWidth={2} />
                <span className="text-sm" style={{ color: 'rgba(197,197,210,0.5)' }}>{g}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* AYO */}
        <div>
          <FadeIn delay={0.5} animate={animate}>
            <h3 className="text-sm tracking-[0.3em] uppercase mb-6" style={{ color: 'rgba(125,211,168,0.7)' }}>
              AYO
            </h3>
          </FadeIn>
          <div className="space-y-3">
            {fills.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                animate={animate ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.08 }}
                className="flex items-center gap-3 py-3 px-4 rounded-lg"
                style={{ background: 'rgba(125,211,168,0.05)', border: '1px solid rgba(125,211,168,0.08)' }}
              >
                <Check size={16} style={{ color: 'rgba(125,211,168,0.6)' }} strokeWidth={2} />
                <span className="text-sm text-white/80">{f}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GapAnalysisSlide;
