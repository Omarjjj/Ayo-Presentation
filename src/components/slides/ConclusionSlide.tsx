import { TextReveal, FadeIn } from '../TextReveal';
import { motion } from 'framer-motion';

const ConclusionSlide = ({ animate }: { animate: boolean }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-8 text-center">
      <FadeIn delay={0.2} animate={animate}>
        <p className="text-xs tracking-[0.4em] uppercase mb-8" style={{ color: 'rgba(157,140,255,0.5)' }}>
          Conclusion
        </p>
      </FadeIn>

      <TextReveal
        tag="h1"
        className="text-8xl font-bold mb-6"
        type="chars"
        delay={0.3}
        stagger={0.05}
        duration={0.8}
        animate={animate}
      >
        AYO
      </TextReveal>

      {/* Glowing line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={animate ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="h-[2px] w-40 mb-8"
        style={{
          background: 'linear-gradient(90deg, transparent, #9d8cff, transparent)',
          boxShadow: '0 0 20px rgba(157,140,255,0.4)',
        }}
      />

      <FadeIn delay={1.0} animate={animate}>
        <p className="text-3xl font-light max-w-3xl leading-relaxed" style={{ color: 'rgba(197,197,210,0.7)' }}>
          A privacy-first AI companion that understands context, reasons intelligently, and keeps you in full control.
        </p>
      </FadeIn>

      <FadeIn delay={1.5} animate={animate}>
        <p className="text-lg mt-10 tracking-[0.2em] uppercase" style={{ color: 'rgba(157,140,255,0.4)' }}>
          Thank you
        </p>
      </FadeIn>

      {/* Decorative bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-12"
      >
        <p className="text-xs tracking-widest" style={{ color: 'rgba(107,104,128,0.4)' }}>
          Senior Project 2026
        </p>
      </motion.div>
    </div>
  );
};

export default ConclusionSlide;
