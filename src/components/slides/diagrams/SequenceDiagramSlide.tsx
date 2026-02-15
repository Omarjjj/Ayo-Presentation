import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image } from 'lucide-react';
import { gsap } from 'gsap';
import { FadeIn } from '../../TextReveal';
import DiagramModal from '../../DiagramModal';

// Lifelines
const LIFELINES = [
  { id: 'user', label: 'User', color: '#9d8cff', short: 'USR' },
  { id: 'ui', label: 'Client UI', color: '#7db3e4', short: 'UI' },
  { id: 'orch', label: 'Orchestrator', color: '#e4c07a', short: 'ORCH' },
  { id: 'policy', label: 'Policy Engine', color: '#e87b7b', short: 'POL' },
  { id: 'services', label: 'Local Services', color: '#7dd3a8', short: 'SVC' },
  { id: 'llm', label: 'LLM Server', color: '#b8a9ff', short: 'LLM' },
  { id: 'tools', label: 'Tool Executor', color: '#e4c07a', short: 'TOOL' },
  { id: 'storage', label: 'Storage', color: '#6b6880', short: 'DB' },
];

interface MessageArrow {
  from: number;
  to: number;
  label: string;
  type: 'solid' | 'dashed' | 'return';
  color?: string;
}

interface Step {
  title: string;
  description: string;
  messages: MessageArrow[];
  activeLifelines: number[];
}

const STEPS: Step[] = [
  {
    title: 'Startup & Initialization',
    description: 'User launches the app. The UI loads and asks the Orchestrator for current state. Settings, permissions, and hotkeys are loaded from storage. Background services start.',
    messages: [
      { from: 0, to: 1, label: 'Launch App', type: 'solid' },
      { from: 1, to: 2, label: 'Get State', type: 'solid' },
      { from: 2, to: 7, label: 'Load Settings', type: 'solid' },
      { from: 7, to: 2, label: 'Settings Data', type: 'return' },
      { from: 2, to: 4, label: 'Start Services', type: 'solid' },
    ],
    activeLifelines: [0, 1, 2, 4, 7],
  },
  {
    title: 'User Sends Request',
    description: 'User triggers the assistant via text, voice, or hotkey. If voice, STT converts speech to text. The Orchestrator receives the input and begins processing.',
    messages: [
      { from: 0, to: 1, label: 'Text / Voice Input', type: 'solid' },
      { from: 1, to: 2, label: 'Forward Request', type: 'solid' },
      { from: 2, to: 4, label: 'STT (if voice)', type: 'dashed' },
      { from: 4, to: 2, label: 'Transcript', type: 'return' },
    ],
    activeLifelines: [0, 1, 2, 4],
  },
  {
    title: 'Policy Pre-Checks',
    description: 'Before contacting the LLM, the Orchestrator consults the Policy Engine. It checks privacy mode, permissions, cooldowns, and DND rules. Context is built (active app, idle time, optional screen/emotion data).',
    messages: [
      { from: 2, to: 3, label: 'Check Permissions', type: 'solid' },
      { from: 3, to: 2, label: 'Approved', type: 'return' },
      { from: 2, to: 4, label: 'Collect Context', type: 'solid' },
      { from: 4, to: 2, label: 'Context Package', type: 'return' },
    ],
    activeLifelines: [2, 3, 4],
  },
  {
    title: 'LLM Reasoning',
    description: 'The Orchestrator sends the user input, context summary, allowed tools list, and policy constraints to the Remote LLM Server over HTTPS with authentication. The LLM returns response text and an optional structured action plan.',
    messages: [
      { from: 2, to: 5, label: 'HTTPS Request + Auth', type: 'solid', color: '#b8a9ff' },
      { from: 5, to: 5, label: 'Run Inference', type: 'solid', color: '#b8a9ff' },
      { from: 5, to: 2, label: 'Response + Plan', type: 'return', color: '#b8a9ff' },
    ],
    activeLifelines: [2, 5],
  },
  {
    title: 'Plan Validation',
    description: 'The Policy Engine validates the LLM\'s suggested plan. It checks the tool allowlist, permission requirements, privacy constraints, and classifies the risk level (low vs high impact).',
    messages: [
      { from: 2, to: 3, label: 'Validate Plan', type: 'solid' },
      { from: 3, to: 3, label: 'Check Allowlist', type: 'solid' },
      { from: 3, to: 3, label: 'Classify Risk', type: 'solid' },
      { from: 3, to: 2, label: 'Validation Result', type: 'return' },
    ],
    activeLifelines: [2, 3],
  },
  {
    title: 'Tool Execution',
    description: 'If approved, the Orchestrator sends the action to the Tool Executor. Low-impact actions execute immediately. High-impact actions (email, purchases) require explicit user confirmation first.',
    messages: [
      { from: 2, to: 6, label: 'Execute Action', type: 'solid' },
      { from: 6, to: 6, label: 'Run OS Action', type: 'solid' },
      { from: 6, to: 2, label: 'Success / Failure', type: 'return' },
    ],
    activeLifelines: [2, 6],
  },
  {
    title: 'Response & Logging',
    description: 'The result is sent back to the UI. The user sees the response and optional TTS speaks it. Session metadata is logged to local storage if enabled. The system returns to idle.',
    messages: [
      { from: 2, to: 1, label: 'Display Result', type: 'solid' },
      { from: 1, to: 0, label: 'Show Response + TTS', type: 'solid' },
      { from: 2, to: 7, label: 'Log Session', type: 'dashed' },
    ],
    activeLifelines: [0, 1, 2, 7],
  },
  {
    title: 'Failure & Fallback Paths',
    description: 'If the LLM server is unreachable, auth fails, or a tool execution errors out, the system gracefully degrades. Privacy mode toggled mid-flow discards sensitive context. The system never crashes.',
    messages: [
      { from: 5, to: 2, label: 'Server Offline!', type: 'dashed', color: '#e87b7b' },
      { from: 2, to: 1, label: 'Fallback Response', type: 'solid', color: '#e87b7b' },
      { from: 0, to: 3, label: 'Privacy Toggle!', type: 'solid', color: '#e4c07a' },
      { from: 3, to: 2, label: 'Discard Context', type: 'solid', color: '#e4c07a' },
    ],
    activeLifelines: [0, 1, 2, 3, 5],
  },
];

interface Props {
  animate: boolean;
  currentStep: number;
}

const SequenceDiagramSlide = ({ animate, currentStep }: Props) => {
  const [showOriginal, setShowOriginal] = useState(false);
  const step = STEPS[currentStep] || STEPS[0];
  const containerRef = useRef<HTMLDivElement>(null);

  // Animate messages when step changes
  useEffect(() => {
    if (!animate || !containerRef.current) return;
    const arrows = containerRef.current.querySelectorAll('.msg-arrow');
    gsap.set(arrows, { opacity: 0, scaleX: 0 });
    gsap.to(arrows, {
      opacity: 1,
      scaleX: 1,
      duration: 0.4,
      stagger: 0.15,
      ease: 'power2.out',
      delay: 0.3,
    });
  }, [currentStep, animate]);

  const lifelineWidth = 100 / LIFELINES.length;

  return (
    <div className="relative flex h-full w-full max-w-7xl mx-auto px-8 py-8 gap-6">
      {/* View Original button — positioned top-right of entire slide */}
      <button
        onClick={() => setShowOriginal(true)}
        className="absolute top-2 right-8 z-[5] flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[10px] font-medium tracking-wide transition-all"
        style={{
          background: 'rgba(157,140,255,0.08)',
          border: '1px solid rgba(157,140,255,0.15)',
          color: 'rgba(157,140,255,0.5)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(157,140,255,0.15)';
          e.currentTarget.style.color = 'rgba(157,140,255,0.8)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(157,140,255,0.08)';
          e.currentTarget.style.color = 'rgba(157,140,255,0.5)';
        }}
      >
        <Image size={12} />
        VIEW ORIGINAL
      </button>
      {/* Left: Diagram */}
      <div className="relative flex-[1.6] flex flex-col" ref={containerRef}>
        <FadeIn delay={0.1} animate={animate}>
          <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: 'rgba(157,140,255,0.6)' }}>
            Sequence Diagram &middot; Step {currentStep + 1}/{STEPS.length}
          </p>
        </FadeIn>

        {/* Lifeline headers */}
        <div className="flex mb-2">
          {LIFELINES.map((ll, i) => (
            <motion.div
              key={ll.id}
              initial={{ opacity: 0, y: -20 }}
              animate={animate ? {
                opacity: step.activeLifelines.includes(i) ? 1 : 0.25,
                y: 0,
              } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="flex flex-col items-center"
              style={{ width: `${lifelineWidth}%` }}
            >
              <div
                className="px-2 py-1.5 rounded-lg text-[10px] font-semibold tracking-wider text-center"
                style={{
                  background: `${ll.color}15`,
                  border: `1px solid ${ll.color}30`,
                  color: ll.color,
                  minWidth: 70,
                }}
              >
                {ll.short}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lifeline vertical lines */}
        <div className="relative flex-1 min-h-0">
          {/* Vertical dashed lines */}
          {LIFELINES.map((ll, i) => (
            <motion.div
              key={`line-${ll.id}`}
              initial={{ scaleY: 0 }}
              animate={animate ? { scaleY: 1, opacity: step.activeLifelines.includes(i) ? 0.4 : 0.08 } : { scaleY: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute top-0 bottom-0 w-[1px]"
              style={{
                left: `${(i + 0.5) * lifelineWidth}%`,
                background: `repeating-linear-gradient(to bottom, ${ll.color}40 0, ${ll.color}40 4px, transparent 4px, transparent 8px)`,
                transformOrigin: 'top',
              }}
            />
          ))}

          {/* Message arrows */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              {step.messages.map((msg, mi) => {
                const fromX = (msg.from + 0.5) * lifelineWidth;
                const toX = (msg.to + 0.5) * lifelineWidth;
                const yPos = 15 + mi * (70 / Math.max(step.messages.length, 1));
                const isSelfCall = msg.from === msg.to;
                const arrowColor = msg.color || LIFELINES[msg.from]?.color || '#9d8cff';
                const isReturn = msg.type === 'return';

                if (isSelfCall) {
                  return (
                    <motion.div
                      key={mi}
                      className="msg-arrow absolute flex items-center"
                      style={{ top: `${yPos}%`, left: `${fromX}%`, transform: 'translateX(-50%)' }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 + mi * 0.15 }}
                    >
                      <div
                        className="px-2 py-1 rounded text-[9px] whitespace-nowrap"
                        style={{
                          background: `${arrowColor}15`,
                          border: `1px solid ${arrowColor}25`,
                          color: arrowColor,
                          marginLeft: 20,
                        }}
                      >
                        {msg.label}
                      </div>
                    </motion.div>
                  );
                }

                const leftX = Math.min(fromX, toX);
                const width = Math.abs(toX - fromX);
                const goingRight = toX > fromX;

                return (
                  <motion.div
                    key={mi}
                    className="msg-arrow absolute"
                    style={{
                      top: `${yPos}%`,
                      left: `${leftX}%`,
                      width: `${width}%`,
                    }}
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.3 + mi * 0.15, duration: 0.4 }}
                  >
                    {/* Arrow line */}
                    <div
                      className="h-[1.5px] w-full relative"
                      style={{
                        background: isReturn
                          ? `repeating-linear-gradient(to right, ${arrowColor}60 0, ${arrowColor}60 4px, transparent 4px, transparent 8px)`
                          : `${arrowColor}80`,
                        transformOrigin: goingRight ? 'left' : 'right',
                      }}
                    >
                      {/* Arrowhead */}
                      <div
                        className="absolute top-1/2 -translate-y-1/2"
                        style={{
                          [goingRight ? 'right' : 'left']: -1,
                          width: 0,
                          height: 0,
                          borderTop: '4px solid transparent',
                          borderBottom: '4px solid transparent',
                          [goingRight ? 'borderLeft' : 'borderRight']: `6px solid ${arrowColor}80`,
                        }}
                      />
                    </div>
                    {/* Label */}
                    <div
                      className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] whitespace-nowrap px-1.5 py-0.5 rounded"
                      style={{ color: `${arrowColor}cc`, background: 'rgba(17,16,23,0.8)' }}
                    >
                      {msg.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right: Description */}
      <div className="flex-[0.5] flex flex-col justify-center gap-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-2xl font-bold text-white/90">{step.title}</h3>
            <div className="w-12 h-[1px]" style={{ background: 'rgba(157,140,255,0.3)' }} />
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(197,197,210,0.55)' }}>
              {step.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Step indicators */}
        <div className="flex gap-1.5 mt-4">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: i === currentStep ? 24 : 6,
                background: i === currentStep ? '#9d8cff' : i < currentStep ? 'rgba(157,140,255,0.3)' : 'rgba(157,140,255,0.1)',
                boxShadow: i === currentStep ? '0 0 8px rgba(157,140,255,0.4)' : 'none',
              }}
            />
          ))}
        </div>

        <p className="text-[10px] tracking-widest uppercase mt-2" style={{ color: 'rgba(107,104,128,0.4)' }}>
          Press Space to advance
        </p>
      </div>
      <DiagramModal
        isOpen={showOriginal}
        onClose={() => setShowOriginal(false)}
        imageSrc="/umlDiagrams/newSequanceDiagram (1).png"
        title="Original Sequence Diagram"
      />
    </div>
  );
};

export { STEPS as SEQUENCE_STEPS };
export default SequenceDiagramSlide;
