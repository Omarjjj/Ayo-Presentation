import { TextReveal, FadeIn } from '../TextReveal';
import { motion } from 'framer-motion';
import { Zap, ArrowRight } from 'lucide-react';

const solutions = [
  { before: 'Developer stuck debugging', after: 'AYO identifies the bug and suggests fixes' },
  { before: 'Designer lost in tools', after: 'AYO recommends the right apps and workflows' },
  { before: 'Excel formula confusion', after: 'AYO generates the formula instantly' },
  { before: 'Student drowning in PDFs', after: 'AYO summarizes all documents at once' },
  { before: 'User bored and idle', after: 'AYO proactively suggests activities' },
];

const SolutionSlide = ({ animate }: { animate: boolean }) => {
  return (
    <div className="flex flex-col h-full w-full max-w-6xl mx-auto px-16 py-16 justify-center">
      <FadeIn delay={0.1} animate={animate}>
        <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(157,140,255,0.6)' }}>
          02 / The Solution
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
        AYO steps in
      </TextReveal>

      <FadeIn delay={0.5} animate={animate}>
        <p className="text-xl mb-12" style={{ color: 'rgba(197,197,210,0.6)' }}>
          Every frustration has a resolution. AYO transforms how you interact with your desktop.
        </p>
      </FadeIn>

      <div className="space-y-4">
        {solutions.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -40 }}
            animate={animate ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
            transition={{ duration: 0.5, delay: 0.7 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-6 py-4 px-6 rounded-xl"
            style={{
              background: 'rgba(31,29,41,0.3)',
              border: '1px solid rgba(157,140,255,0.06)',
            }}
          >
            <span className="text-sm flex-1" style={{ color: 'rgba(197,197,210,0.4)' }}>
              {s.before}
            </span>

            <div className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-[1px]" style={{ background: 'rgba(157,140,255,0.2)' }} />
              <Zap size={16} style={{ color: '#9d8cff' }} />
              <div className="w-8 h-[1px]" style={{ background: 'rgba(157,140,255,0.2)' }} />
            </div>

            <span className="text-sm font-medium flex-1 text-white/90">
              {s.after}
            </span>

            <ArrowRight size={14} style={{ color: 'rgba(157,140,255,0.4)' }} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SolutionSlide;
