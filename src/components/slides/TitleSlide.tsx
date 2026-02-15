import { TextReveal, FadeIn } from '../TextReveal';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen } from 'lucide-react';

const team = [
  { name: 'Omar Jaber', id: '202216219' },
  { name: 'Ayman Arafat', id: '202226030' },
  { name: 'Yazan Aydi', id: '202216180' },
];

const TitleSlide = ({ animate }: { animate: boolean }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full px-8">
      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={animate ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-24 h-[1px] mb-6"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(157,140,255,0.6), transparent)' }}
      />

      {/* University */}
      <FadeIn delay={0.2} duration={0.8} animate={animate}>
        <div className="flex items-center gap-2 mb-5">
          <GraduationCap size={16} style={{ color: 'rgba(157,140,255,0.5)' }} strokeWidth={1.5} />
          <p className="text-sm tracking-[0.25em] uppercase font-medium" style={{ color: 'rgba(157,140,255,0.5)' }}>
            Arab American University
          </p>
          <GraduationCap size={16} style={{ color: 'rgba(157,140,255,0.5)' }} strokeWidth={1.5} />
        </div>
      </FadeIn>

      {/* Main title */}
      <TextReveal
        tag="h1"
        className="text-[10rem] font-bold tracking-tighter leading-none"
        type="chars"
        delay={0.3}
        stagger={0.06}
        duration={1}
        animate={animate}
      >
        AYO
      </TextReveal>

      {/* Glowing underline */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={animate ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="h-[2px] w-48 mt-4 mb-8"
        style={{
          background: 'linear-gradient(90deg, transparent, #9d8cff, transparent)',
          boxShadow: '0 0 20px rgba(157,140,255,0.5)',
        }}
      />

      {/* Subtitle */}
      <FadeIn delay={1.0} duration={0.8} animate={animate}>
        <p className="text-2xl font-light tracking-[0.3em] uppercase"
           style={{ color: 'rgba(157,140,255,0.8)' }}>
          Privacy-First AI Desktop Assistant
        </p>
      </FadeIn>

      {/* Tagline */}
      <FadeIn delay={1.4} duration={0.8} animate={animate}>
        <p className="text-lg mt-4 tracking-widest uppercase"
           style={{ color: 'rgba(197,197,210,0.5)' }}>
          Think &middot; Decide &middot; Act &middot; Securely
        </p>
      </FadeIn>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={animate ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.6, delay: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-16 h-[1px] mt-8 mb-6"
        style={{ background: 'rgba(157,140,255,0.15)' }}
      />

      {/* Team names */}
      <FadeIn delay={2.0} duration={0.8} animate={animate}>
        <div className="flex items-center gap-8">
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 12 }}
              animate={animate ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 2.2 + i * 0.15 }}
              className="flex flex-col items-center"
            >
              <span className="text-sm font-medium tracking-wide" style={{ color: 'rgba(245,245,247,0.75)' }}>
                {member.name}
              </span>
              <span className="text-[10px] font-mono tracking-wider mt-0.5" style={{ color: 'rgba(157,140,255,0.4)' }}>
                {member.id}
              </span>
            </motion.div>
          ))}
        </div>
      </FadeIn>

      {/* Instructor */}
      <FadeIn delay={2.8} duration={0.8} animate={animate}>
        <div className="flex items-center gap-2 mt-5">
          <BookOpen size={12} style={{ color: 'rgba(157,140,255,0.35)' }} strokeWidth={1.5} />
          <p className="text-xs tracking-[0.2em]" style={{ color: 'rgba(157,140,255,0.35)' }}>
            Instructor: <span style={{ color: 'rgba(245,245,247,0.5)' }}>Dr. Ahmad Asaad</span>
          </p>
        </div>
      </FadeIn>

      {/* Bottom decorative */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 3.2 }}
        className="absolute bottom-12 flex flex-col items-center gap-3"
      >
        <p className="text-xs tracking-[0.4em] uppercase" style={{ color: 'rgba(107,104,128,0.6)' }}>
          Press Space to begin
        </p>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border border-white/10 flex items-start justify-center p-1"
        >
          <motion.div className="w-1 h-2 rounded-full" style={{ background: 'rgba(157,140,255,0.5)' }} />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default TitleSlide;
