import { TextReveal, FadeIn } from '../TextReveal';
import { motion } from 'framer-motion';

const ProblemStatementSlide = ({ animate }: { animate: boolean }) => {
  return (
    <div className="flex flex-col h-full w-full max-w-5xl mx-auto px-16 justify-center items-center text-center">
      <FadeIn delay={0.1} animate={animate}>
        <p className="text-xs tracking-[0.4em] uppercase mb-6" style={{ color: 'rgba(157,140,255,0.6)' }}>
          03 / Problem Statement
        </p>
      </FadeIn>

      {/* Big quote style */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={animate ? { scale: 1, opacity: 0.15 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-[12rem] font-serif leading-none absolute top-16 left-16"
        style={{ color: '#9d8cff' }}
      >
        &ldquo;
      </motion.div>

      <TextReveal
        tag="h2"
        className="text-5xl font-light leading-snug mb-8"
        type="words"
        delay={0.3}
        stagger={0.06}
        duration={0.7}
        animate={animate}
      >
        Computers are powerful but not intelligent
      </TextReveal>

      <FadeIn delay={0.9} animate={animate}>
        <p className="text-xl leading-relaxed max-w-3xl" style={{ color: 'rgba(197,197,210,0.5)' }}>
          Navigating systems still requires manual effort. Existing assistants are reactive tools, not companions.
          They lack context awareness, cannot reason about your needs, and offer no real-time adaptability.
        </p>
      </FadeIn>

      {/* Separator */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={animate ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-32 h-[1px] my-10"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(157,140,255,0.4), transparent)' }}
      />

      <FadeIn delay={1.4} animate={animate}>
        <p className="text-2xl font-medium max-w-3xl" style={{ color: '#9d8cff' }}>
          What if your computer could truly understand you, help proactively, and keep you in full control?
        </p>
      </FadeIn>
    </div>
  );
};

export default ProblemStatementSlide;
