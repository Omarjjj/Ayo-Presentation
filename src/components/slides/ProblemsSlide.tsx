import { TextReveal, FadeIn, StaggerChildren } from '../TextReveal';
import GlowCard from '../GlowCard';
import { Code, Palette, Table, BookOpen, Coffee } from 'lucide-react';

const problems = [
  { icon: Code, title: 'Developer', desc: 'Stuck debugging code, manually searching online for solutions.' },
  { icon: Palette, title: 'Designer', desc: 'Juggling multiple design applications with no unified workflow.' },
  { icon: Table, title: 'Excel User', desc: 'Struggling to build complex formulas without guidance.' },
  { icon: BookOpen, title: 'Student', desc: 'Reading through multiple PDFs to summarize each one manually.' },
  { icon: Coffee, title: 'Idle User', desc: 'Sitting at their computer bored, not knowing what to do.' },
];

const ProblemsSlide = ({ animate }: { animate: boolean }) => {
  return (
    <div className="flex flex-col h-full w-full max-w-7xl mx-auto px-16 py-16 justify-center">
      {/* Section label */}
      <FadeIn delay={0.1} animate={animate}>
        <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(157,140,255,0.6)' }}>
          01 / Identifying the Problem
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
        Everyday frustrations
      </TextReveal>

      <FadeIn delay={0.5} animate={animate}>
        <p className="text-xl mb-12 max-w-2xl" style={{ color: 'rgba(197,197,210,0.6)' }}>
          Real scenarios where users waste time on tasks that should be effortless.
        </p>
      </FadeIn>

      <StaggerChildren className="grid grid-cols-5 gap-4" delay={0.6} stagger={0.1} animate={animate}>
        {problems.map((p, i) => (
          <GlowCard key={i} className="p-6 flex flex-col items-start gap-4" delay={0.6 + i * 0.1}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                 style={{ background: 'rgba(157,140,255,0.1)', border: '1px solid rgba(157,140,255,0.15)' }}>
              <p.icon size={22} style={{ color: '#9d8cff' }} strokeWidth={1.5} />
            </div>
            <h3 className="text-base font-semibold text-white/90">{p.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(197,197,210,0.5)' }}>{p.desc}</p>
          </GlowCard>
        ))}
      </StaggerChildren>
    </div>
  );
};

export default ProblemsSlide;
