import { TextReveal, FadeIn } from '../TextReveal';
import GlowCard from '../GlowCard';
import { Eye, Mic, Shield, Lock, Brain, Heart } from 'lucide-react';

const features = [
  {
    icon: Eye,
    title: 'Context Aware',
    desc: 'Understands your active apps, monitors interaction patterns, and extracts summaries from what you are working on.',
    color: '#9d8cff',
  },
  {
    icon: Mic,
    title: 'Multimodal Interaction',
    desc: 'Text, voice input, and hotkeys for instant activation. Interact naturally in the way that suits you.',
    color: '#7db3e4',
  },
  {
    icon: Shield,
    title: 'Policy Engine',
    desc: 'AI suggests actions, the deterministic policy engine validates permissions and risk before execution.',
    color: '#e4c07a',
  },
  {
    icon: Lock,
    title: 'Self-Hosted LLM',
    desc: 'Completely local AI model. No cloud dependency. Encrypted communication. Full data sovereignty.',
    color: '#7dd3a8',
  },
  {
    icon: Heart,
    title: 'Emotional Awareness',
    desc: 'Optional camera-based emotional detection. Fully local processing. Automatically disabled in privacy mode.',
    color: '#e87b7b',
  },
  {
    icon: Brain,
    title: 'Privacy First',
    desc: 'One hotkey activates full privacy mode. Camera off, context off, prompt-only interaction.',
    color: '#b8a9ff',
  },
];

const KeyFeaturesSlide = ({ animate }: { animate: boolean }) => {
  return (
    <div className="flex flex-col h-full w-full max-w-7xl mx-auto px-16 py-14 justify-center">
      <FadeIn delay={0.1} animate={animate}>
        <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(157,140,255,0.6)' }}>
          04 / Key Features
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
        Built different
      </TextReveal>

      <div className="grid grid-cols-3 gap-5">
        {features.map((f, i) => (
          <GlowCard
            key={i}
            className="p-7 flex flex-col gap-4"
            glowColor={`${f.color}20`}
            delay={0.5 + i * 0.08}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${f.color}15`, border: `1px solid ${f.color}25` }}
              >
                <f.icon size={20} style={{ color: f.color }} strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-semibold text-white/90">{f.title}</h3>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(197,197,210,0.5)' }}>
              {f.desc}
            </p>
          </GlowCard>
        ))}
      </div>
    </div>
  );
};

export default KeyFeaturesSlide;
