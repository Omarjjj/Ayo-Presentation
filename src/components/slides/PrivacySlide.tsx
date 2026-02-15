import { TextReveal, FadeIn } from '../TextReveal';
import GlowCard from '../GlowCard';
import { Shield, Lock, Server, Eye, KeyRound, Database } from 'lucide-react';

const layers = [
  { icon: Shield, title: 'Privacy Mode', desc: 'One hotkey instantly disables camera, screen capture, and context collection. A global override.', color: '#9d8cff' },
  { icon: Lock, title: 'Policy Engine', desc: 'Every AI suggestion is validated against permissions, risk levels, and whitelisted tools before execution.', color: '#e4c07a' },
  { icon: Server, title: 'Secure Comms', desc: 'HTTPS encrypted communication. Controlled API endpoints. No direct OS access from the server.', color: '#7db3e4' },
  { icon: Eye, title: 'No Raw Data', desc: 'Camera and screen data never leave the device. Only structured summaries are shared with the AI.', color: '#7dd3a8' },
  { icon: KeyRound, title: 'Auth & Rate Limit', desc: 'Even if the server is compromised, it has no direct control. Only structured responses through a policy layer.', color: '#e87b7b' },
  { icon: Database, title: 'Local Storage', desc: 'All data stored locally. User controls log retention. Clear data at any time.', color: '#b8a9ff' },
];

const PrivacySlide = ({ animate }: { animate: boolean }) => {
  return (
    <div className="flex flex-col h-full w-full max-w-7xl mx-auto px-16 py-14 justify-center">
      <FadeIn delay={0.1} animate={animate}>
        <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(157,140,255,0.6)' }}>
          06 / Privacy & Security
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
        Privacy by design
      </TextReveal>

      <FadeIn delay={0.5} animate={animate}>
        <p className="text-xl mb-10" style={{ color: 'rgba(197,197,210,0.5)' }}>
          The AI is intelligent but never autonomous. Every action passes through strict validation.
        </p>
      </FadeIn>

      <div className="grid grid-cols-3 gap-4">
        {layers.map((l, i) => (
          <GlowCard key={i} className="p-6 flex flex-col gap-3" glowColor={`${l.color}15`} delay={0.6 + i * 0.08}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                   style={{ background: `${l.color}12`, border: `1px solid ${l.color}20` }}>
                <l.icon size={18} style={{ color: l.color }} strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-semibold text-white/90">{l.title}</h3>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(197,197,210,0.45)' }}>{l.desc}</p>
          </GlowCard>
        ))}
      </div>
    </div>
  );
};

export default PrivacySlide;
