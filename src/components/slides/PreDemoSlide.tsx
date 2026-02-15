import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { TextReveal, FadeIn } from '../TextReveal';
import { Play, MousePointer, Keyboard, Eye, Sparkles } from 'lucide-react';

interface PreDemoSlideProps {
  animate: boolean;
}

const PreDemoSlide = ({ animate }: PreDemoSlideProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!animate || !containerRef.current) return;

    const tl = gsap.timeline();
    
    // Animated orbs around the play icon
    if (orbsRef.current) {
      const orbs = orbsRef.current.children;
      gsap.set(orbs, { scale: 0, opacity: 0 });
      
      tl.to(orbs, {
        scale: 1,
        opacity: 0.8,
        duration: 1.2,
        stagger: 0.2,
        ease: "back.out(1.7)",
        delay: 2
      });

      // Continuous floating animation for orbs
      gsap.to(orbs, {
        y: "random(-20, 20)",
        x: "random(-10, 10)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3,
        delay: 3
      });
    }

    // Pulsing effect for the main icon
    if (pulseRef.current) {
      gsap.to(pulseRef.current, {
        scale: 1.1,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.5
      });
    }

    return () => {
      tl.kill();
    };
  }, [animate]);

  const interactionItems = [
    { icon: MousePointer, label: "Click & Navigate", desc: "Explore the interface naturally" },
    { icon: Keyboard, label: "Type & Input", desc: "Enter commands and queries" },
    { icon: Eye, label: "Visual Feedback", desc: "Watch real-time responses" },
    { icon: Sparkles, label: "AI Interactions", desc: "Experience intelligent assistance" }
  ];

  return (
    <div ref={containerRef} className="relative w-full h-full flex flex-col items-center justify-center px-8">
      {/* Background glow effect */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(157,140,255,0.08) 0%, transparent 70%)' }} />
      
      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl">
        {/* Animated title */}
        <div className="mb-8">
          <TextReveal 
            className="text-6xl font-bold"
            delay={0.3}
            type="chars"
            animate={animate}
          >
            LIVE DEMONSTRATION
          </TextReveal>
        </div>

        {/* Central play icon with floating orbs */}
        <div className="relative mb-12 flex items-center justify-center">
          {/* Floating orbs */}
          <div ref={orbsRef} className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full"
                style={{
                  left: `${50 + 25 * Math.cos((i * Math.PI * 2) / 8)}%`,
                  top: `${50 + 25 * Math.sin((i * Math.PI * 2) / 8)}%`,
                  transform: 'translate(-50%, -50%)',
                  background: 'linear-gradient(135deg, #7c6bc4, #9d8cff)',
                }}
              />
            ))}
          </div>

          {/* Main play icon */}
          <motion.div
            ref={pulseRef}
            className="relative w-32 h-32 rounded-full flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #4a3f6b, #7c6bc4)',
              boxShadow: '0 0 50px rgba(157,140,255,0.25), 0 0 100px rgba(157,140,255,0.1)',
            }}
            initial={{ scale: 0, rotate: -180 }}
            animate={animate ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 1.5 }}
          >
            <Play className="w-12 h-12 text-white ml-1" fill="currentColor" />
            
            {/* Glow rings */}
            <div className="absolute inset-0 rounded-full animate-ping opacity-15"
                 style={{ background: 'rgba(157,140,255,0.3)' }} />
            <div className="absolute inset-0 rounded-full opacity-20"
                 style={{ background: 'rgba(124,107,196,0.3)', animation: 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite' }} />
          </motion.div>
        </div>

        {/* Description */}
        <FadeIn delay={2.8} direction="up">
          <div className="mb-12 space-y-4">
            <p className="text-xl leading-relaxed" style={{ color: 'rgba(197,197,210,0.8)' }}>
              You are about to experience the <span style={{ color: '#9d8cff' }} className="font-semibold">AYO Assistant</span> in action.
            </p>
            <p className="text-lg" style={{ color: 'rgba(197,197,210,0.45)' }}>
              This is a fully interactive prototype showcasing real-time AI assistance,
              <br />
              context awareness, and intelligent system orchestration.
            </p>
          </div>
        </FadeIn>

        {/* Interaction guide */}
        <FadeIn delay={3.5} direction="up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {interactionItems.map((item, index) => (
              <motion.div
                key={item.label}
                className="flex flex-col items-center p-4 rounded-xl backdrop-blur-sm"
                style={{
                  background: 'rgba(19,16,28,0.6)',
                  border: '1px solid rgba(157,140,255,0.12)',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={animate ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 3.8 + index * 0.2, duration: 0.6 }}
                whileHover={{ scale: 1.05, borderColor: 'rgba(157,140,255,0.35)' }}
              >
                <item.icon className="w-8 h-8 mb-2" style={{ color: '#9d8cff' }} />
                <h3 className="text-sm font-semibold text-white mb-1">{item.label}</h3>
                <p className="text-xs text-center" style={{ color: 'rgba(197,197,210,0.4)' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* Call to action */}
        <FadeIn delay={4.5} direction="up">
          <div className="space-y-3">
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-white font-medium"
              style={{
                background: 'linear-gradient(135deg, #4a3f6b, #7c6bc4)',
                boxShadow: '0 0 20px rgba(157,140,255,0.2)',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={animate ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 4.8, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className="w-5 h-5" />
              Ready to Experience AYO
              <Sparkles className="w-5 h-5" />
            </motion.div>
            
            <motion.p
              className="text-sm tracking-wide"
              style={{ color: 'rgba(107,104,128,0.5)' }}
              initial={{ opacity: 0 }}
              animate={animate ? { opacity: 1 } : {}}
              transition={{ delay: 5.2, duration: 0.8 }}
            >
              Press <span style={{ color: '#9d8cff' }} className="font-mono">SPACE</span> to enter the demonstration
            </motion.p>
          </div>
        </FadeIn>
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: 'rgba(157,140,255,0.3)',
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PreDemoSlide;
