import { TextReveal, FadeIn } from '../TextReveal';
import { motion } from 'framer-motion';

const tools = [
  { name: 'Microsoft Copilot', focus: 'Chat-focused', limitation: 'Limited real-time screen awareness', score: 35 },
  { name: 'Voice Assistants', focus: 'Command-based', limitation: 'Not reasoning-based, no context', score: 25 },
  { name: 'Automation Tools', focus: 'Rule-based', limitation: 'Not adaptive, no intelligence', score: 20 },
  { name: 'AYO', focus: 'Context + Reasoning + Privacy', limitation: 'Full stack solution', score: 95 },
];

const RelatedWorkSlide = ({ animate }: { animate: boolean }) => {
  return (
    <div className="flex flex-col h-full w-full max-w-6xl mx-auto px-16 py-14 justify-center">
      <FadeIn delay={0.1} animate={animate}>
        <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(157,140,255,0.6)' }}>
          05 / Related Work
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
        How we compare
      </TextReveal>

      <div className="space-y-5">
        {tools.map((t, i) => {
          const isAyo = t.name === 'AYO';
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              animate={animate ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-6 py-5 px-6 rounded-xl"
              style={{
                background: isAyo ? 'rgba(157,140,255,0.06)' : 'rgba(31,29,41,0.3)',
                border: isAyo ? '1px solid rgba(157,140,255,0.2)' : '1px solid rgba(157,140,255,0.05)',
              }}
            >
              <span className={`text-lg font-semibold w-48 shrink-0 ${isAyo ? 'text-purple-300' : 'text-white/80'}`}>
                {t.name}
              </span>
              <span className="text-sm w-48 shrink-0" style={{ color: 'rgba(197,197,210,0.5)' }}>{t.focus}</span>
              <span className="text-sm flex-1" style={{ color: 'rgba(197,197,210,0.35)' }}>{t.limitation}</span>

              {/* Score bar */}
              <div className="w-32 shrink-0">
                <div className="w-full h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={animate ? { width: `${t.score}%` } : { width: 0 }}
                    transition={{ duration: 0.8, delay: 1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full"
                    style={{
                      background: isAyo
                        ? 'linear-gradient(90deg, #7c6bc4, #9d8cff)'
                        : 'rgba(197,197,210,0.15)',
                      boxShadow: isAyo ? '0 0 10px rgba(157,140,255,0.3)' : 'none',
                    }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default RelatedWorkSlide;
