import { FadeIn } from '../TextReveal';
import { motion } from 'framer-motion';

interface DiagramViewSlideProps {
  animate: boolean;
  sectionNumber: string;
  title: string;
  imageSrc: string;
  description: string;
  stepInfo?: { current: number; total: number };
}

const DiagramViewSlide = ({ animate, sectionNumber, title, imageSrc, description, stepInfo }: DiagramViewSlideProps) => {
  return (
    <div className="flex h-full w-full max-w-7xl mx-auto px-12 py-10 gap-8">
      {/* Left: Image */}
      <div className="flex-[1.4] flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={animate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-full flex items-center justify-center rounded-2xl overflow-hidden p-4"
          style={{
            background: 'rgba(17,16,23,0.6)',
            border: '1px solid rgba(157,140,255,0.08)',
          }}
        >
          <img
            src={imageSrc}
            alt={title}
            className="max-w-full max-h-full object-contain rounded-lg"
            style={{ filter: 'brightness(0.95) contrast(1.05)' }}
          />

          {/* Subtle overlay glow */}
          <div className="absolute inset-0 pointer-events-none"
               style={{ background: 'radial-gradient(ellipse at center, rgba(157,140,255,0.03), transparent 70%)' }} />
        </motion.div>
      </div>

      {/* Right: Info */}
      <div className="flex-[0.6] flex flex-col justify-center gap-6">
        <FadeIn delay={0.2} animate={animate}>
          <p className="text-xs tracking-[0.4em] uppercase" style={{ color: 'rgba(157,140,255,0.6)' }}>
            {sectionNumber}
          </p>
        </FadeIn>

        <FadeIn delay={0.3} animate={animate}>
          <h2 className="text-4xl font-bold text-white/90">{title}</h2>
        </FadeIn>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={animate ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-16 h-[1px]"
          style={{ background: 'rgba(157,140,255,0.3)', transformOrigin: 'left' }}
        />

        <FadeIn delay={0.6} animate={animate}>
          <p className="text-base leading-relaxed" style={{ color: 'rgba(197,197,210,0.55)' }}>
            {description}
          </p>
        </FadeIn>

        {stepInfo && (
          <FadeIn delay={0.8} animate={animate}>
            <div className="flex items-center gap-2 mt-4">
              {Array.from({ length: stepInfo.total }).map((_, i) => (
                <div
                  key={i}
                  className="h-1 rounded-full transition-all duration-300"
                  style={{
                    width: i === stepInfo.current ? 32 : 8,
                    background: i === stepInfo.current ? '#9d8cff' : 'rgba(157,140,255,0.15)',
                    boxShadow: i === stepInfo.current ? '0 0 8px rgba(157,140,255,0.4)' : 'none',
                  }}
                />
              ))}
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
};

export default DiagramViewSlide;
