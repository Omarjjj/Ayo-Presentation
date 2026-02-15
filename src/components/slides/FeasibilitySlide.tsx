import { TextReveal, FadeIn, CountUp } from '../TextReveal';
import GlowCard from '../GlowCard';
import { Cpu, Users, DollarSign } from 'lucide-react';

const FeasibilitySlide = ({ animate }: { animate: boolean }) => {
  return (
    <div className="flex flex-col h-full w-full max-w-6xl mx-auto px-16 py-14 justify-center">
      <FadeIn delay={0.1} animate={animate}>
        <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(157,140,255,0.6)' }}>
          09 / Feasibility Study
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
        Practically achievable
      </TextReveal>

      <div className="grid grid-cols-3 gap-6">
        <GlowCard className="p-8 flex flex-col items-center text-center gap-5" glowColor="rgba(125,211,168,0.12)" delay={0.5}>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
               style={{ background: 'rgba(125,211,168,0.1)', border: '1px solid rgba(125,211,168,0.2)' }}>
            <Cpu size={24} style={{ color: '#7dd3a8' }} strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-semibold text-white/90">Technical</h3>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(197,197,210,0.45)' }}>
            Built with Electron, React, Python ML libraries, and self-hosted LLMs. Reduced external dependency.
          </p>
          <div className="flex items-baseline gap-1 mt-2">
            <CountUp end={100} suffix="%" className="text-3xl font-bold" style={{ color: '#7dd3a8' }} animate={animate} delay={0.8} />
            <span className="text-xs" style={{ color: 'rgba(125,211,168,0.5)' }}>local capable</span>
          </div>
        </GlowCard>

        <GlowCard className="p-8 flex flex-col items-center text-center gap-5" glowColor="rgba(125,179,228,0.12)" delay={0.65}>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
               style={{ background: 'rgba(125,179,228,0.1)', border: '1px solid rgba(125,179,228,0.2)' }}>
            <Users size={24} style={{ color: '#7db3e4' }} strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-semibold text-white/90">Operational</h3>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(197,197,210,0.45)' }}>
            Integrates naturally into desktop workflows. Predictable, non-intrusive behavior with full user control.
          </p>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-3xl font-bold" style={{ color: '#7db3e4' }}>Seamless</span>
          </div>
        </GlowCard>

        <GlowCard className="p-8 flex flex-col items-center text-center gap-5" glowColor="rgba(228,192,122,0.12)" delay={0.8}>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
               style={{ background: 'rgba(228,192,122,0.1)', border: '1px solid rgba(228,192,122,0.2)' }}>
            <DollarSign size={24} style={{ color: '#e4c07a' }} strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-semibold text-white/90">Economic</h3>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(197,197,210,0.45)' }}>
            Open-source stack with local hosting eliminates recurring API costs. Scalable for future cloud deployment.
          </p>
          <div className="flex items-baseline gap-1 mt-2">
            <CountUp end={0} prefix="$" suffix="/mo" className="text-3xl font-bold" style={{ color: '#e4c07a' }} animate={animate} delay={1.0} />
            <span className="text-xs" style={{ color: 'rgba(228,192,122,0.5)' }}>API costs</span>
          </div>
        </GlowCard>
      </div>
    </div>
  );
};

export default FeasibilitySlide;
