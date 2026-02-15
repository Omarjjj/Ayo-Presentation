import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '../../TextReveal';
import {
  Power, Settings, CheckCircle, Mic, MessageSquare, Brain, 
  Shield, Wrench, AlertTriangle, Clock, Eye, Lock, Image
} from 'lucide-react';
import DiagramModal from '../../DiagramModal';

interface State {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  type: 'start' | 'normal' | 'decision' | 'end' | 'override';
  x: number; // percent
  y: number; // percent
}

interface Transition {
  from: string;
  to: string;
  label: string;
  condition?: string;
  type?: 'normal' | 'error' | 'override' | 'background';
}

interface Step {
  title: string;
  description: string;
  activeStates: string[];
  activeTransitions: number[];
}

const STATES: State[] = [
  // Main flow states
  { id: 'closed', name: 'App Closed', icon: Power, color: '#6b7280', type: 'start', x: 5, y: 15 },
  { id: 'init', name: 'Initializing', icon: Settings, color: '#f59e0b', type: 'normal', x: 25, y: 15 },
  { id: 'ready', name: 'Ready (Idle)', icon: CheckCircle, color: '#10b981', type: 'normal', x: 50, y: 15 },
  
  // Input capture flow
  { id: 'capturing', name: 'Capturing Input', icon: Mic, color: '#3b82f6', type: 'normal', x: 75, y: 15 },
  { id: 'transcribing', name: 'Transcribing', icon: MessageSquare, color: '#8b5cf6', type: 'normal', x: 90, y: 30 },
  { id: 'precheck', name: 'Pre-Policy Checks', icon: Shield, color: '#f59e0b', type: 'normal', x: 75, y: 45 },
  { id: 'context', name: 'Build Context', icon: Eye, color: '#06b6d4', type: 'normal', x: 50, y: 45 },
  { id: 'waiting', name: 'Waiting for LLM', icon: Brain, color: '#8b5cf6', type: 'normal', x: 25, y: 45 },
  { id: 'validate', name: 'Validate Plan', icon: Shield, color: '#ef4444', type: 'decision', x: 25, y: 65 },
  
  // Execution outcomes
  { id: 'responding', name: 'Responding', icon: MessageSquare, color: '#10b981', type: 'normal', x: 5, y: 80 },
  { id: 'executing', name: 'Executing Tool', icon: Wrench, color: '#f59e0b', type: 'normal', x: 25, y: 80 },
  { id: 'confirming', name: 'Awaiting Confirmation', icon: AlertTriangle, color: '#ef4444', type: 'normal', x: 45, y: 80 },
  
  // Background states
  { id: 'scheduled', name: 'Scheduled Execution', icon: Clock, color: '#f59e0b', type: 'normal', x: 75, y: 65 },
  { id: 'proactive', name: 'Proactive Evaluation', icon: Eye, color: '#06b6d4', type: 'normal', x: 90, y: 65 },
  
  // Override and error states
  { id: 'privacy', name: 'Privacy Mode Active', icon: Lock, color: '#ef4444', type: 'override', x: 50, y: 5 },
  { id: 'fallback', name: 'Fallback Mode', icon: AlertTriangle, color: '#f59e0b', type: 'normal', x: 5, y: 50 },
  { id: 'unauthorized', name: 'Unauthorized', icon: Lock, color: '#ef4444', type: 'normal', x: 5, y: 65 },
  { id: 'shutdown', name: 'Shutting Down', icon: Power, color: '#6b7280', type: 'end', x: 95, y: 85 },
];

const TRANSITIONS: Transition[] = [
  // Main initialization flow
  { from: 'closed', to: 'init', label: 'Launch App' },
  { from: 'init', to: 'ready', label: 'Setup Complete' },
  
  // User interaction flow
  { from: 'ready', to: 'capturing', label: 'User Input' },
  { from: 'capturing', to: 'transcribing', label: 'Voice Input', condition: 'voice' },
  { from: 'capturing', to: 'precheck', label: 'Text Input', condition: 'text' },
  { from: 'transcribing', to: 'precheck', label: 'STT Success' },
  { from: 'transcribing', to: 'ready', label: 'STT Fail', type: 'error' },
  { from: 'precheck', to: 'context', label: 'Checks Pass' },
  { from: 'context', to: 'waiting', label: 'Context Built' },
  { from: 'waiting', to: 'validate', label: 'LLM Response' },
  
  // Validation outcomes
  { from: 'validate', to: 'responding', label: 'Text Only' },
  { from: 'validate', to: 'executing', label: 'Low Impact' },
  { from: 'validate', to: 'confirming', label: 'High Impact' },
  { from: 'confirming', to: 'executing', label: 'User Confirms' },
  { from: 'confirming', to: 'responding', label: 'User Cancels' },
  
  // Return to ready
  { from: 'responding', to: 'ready', label: 'Complete' },
  { from: 'executing', to: 'ready', label: 'Complete' },
  
  // Background flows
  { from: 'ready', to: 'scheduled', label: 'Timer Due', type: 'background' },
  { from: 'ready', to: 'proactive', label: 'Trigger Detected', type: 'background' },
  { from: 'scheduled', to: 'validate', label: 'Re-check Policy' },
  { from: 'proactive', to: 'ready', label: 'Suggestion Shown' },
  
  // Privacy override (can happen from anywhere)
  { from: 'ready', to: 'privacy', label: 'Privacy Hotkey', type: 'override' },
  { from: 'capturing', to: 'privacy', label: 'Privacy Hotkey', type: 'override' },
  { from: 'waiting', to: 'privacy', label: 'Privacy Hotkey', type: 'override' },
  { from: 'privacy', to: 'ready', label: 'Privacy Off', type: 'override' },
  
  // Error states
  { from: 'waiting', to: 'fallback', label: 'LLM Offline', type: 'error' },
  { from: 'waiting', to: 'unauthorized', label: 'Auth Failed', type: 'error' },
  { from: 'fallback', to: 'ready', label: 'Fallback Response' },
  { from: 'unauthorized', to: 'ready', label: 'Credentials Fixed' },
  
  // Shutdown
  { from: 'ready', to: 'shutdown', label: 'User Exit' },
  { from: 'shutdown', to: 'closed', label: 'Services Stopped' },
];

const STEPS: Step[] = [
  {
    title: 'App Lifecycle',
    description: 'AYO starts from App Closed, goes through Initializing (loading settings, checking permissions, starting services), and reaches the Ready state where it waits for user interaction.',
    activeStates: ['closed', 'init', 'ready'],
    activeTransitions: [0, 1]
  },
  {
    title: 'User Interaction Flow',
    description: 'When the user provides input (voice or text), AYO captures it, optionally transcribes speech, performs pre-policy checks (privacy, permissions, cooldowns), and builds context before sending to the LLM.',
    activeStates: ['ready', 'capturing', 'transcribing', 'precheck', 'context', 'waiting'],
    activeTransitions: [2, 3, 4, 5, 6, 7, 8, 9]
  },
  {
    title: 'Plan Validation & Execution',
    description: 'The LLM response goes through policy validation. Based on risk level, AYO either responds with text only, executes low-impact tools automatically, or requests user confirmation for high-impact actions.',
    activeStates: ['validate', 'responding', 'executing', 'confirming'],
    activeTransitions: [10, 11, 12, 13, 14, 15, 16]
  },
  {
    title: 'Background Intelligence',
    description: 'While in Ready state, AYO can handle scheduled executions (when timers fire) and proactive suggestions (when triggers are detected). Scheduled actions go through policy re-validation.',
    activeStates: ['ready', 'scheduled', 'proactive'],
    activeTransitions: [17, 18, 19, 20]
  },
  {
    title: 'Privacy Override',
    description: 'Privacy Mode can be activated from any state via hotkey. It immediately stops sensitive features (camera, context capture) and can return to Ready when disabled. This is the highest priority control.',
    activeStates: ['privacy', 'ready', 'capturing', 'waiting'],
    activeTransitions: [21, 22, 23, 24]
  },
  {
    title: 'Error Handling & Recovery',
    description: 'When the LLM server is offline, AYO enters Fallback Mode. Authentication failures lead to Unauthorized state. Both can recover to Ready when issues are resolved. Clean shutdown stops all services.',
    activeStates: ['fallback', 'unauthorized', 'shutdown', 'closed'],
    activeTransitions: [25, 26, 27, 28, 29, 30]
  }
];

const StateMachineSlide = ({ animate, currentStep }: { animate: boolean; currentStep: number }) => {
  const [showOriginal, setShowOriginal] = useState(false);
  const step = STEPS[currentStep] || STEPS[0];

  const getStateById = (id: string) => STATES.find(s => s.id === id);

  return (
    <div className="relative flex h-full w-full max-w-7xl mx-auto px-6 py-5 gap-5">
      {/* View Original button */}
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
      <div className="flex-[1.5] flex flex-col min-w-0">
        <FadeIn delay={0.1} animate={animate}>
          <p className="text-xs tracking-[0.4em] uppercase mb-3" style={{ color: 'rgba(157,140,255,0.6)' }}>
            State Machine Diagram &middot; Step {currentStep + 1} / {STEPS.length}
          </p>
        </FadeIn>

        {/* State diagram */}
        <div className="relative flex-1 min-h-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              {/* Transitions (arrows) */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                <defs>
                  <marker id="state-arrow" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
                    <path d="M0,0.5 L5,2.5 L0,4.5" fill="none" stroke="rgba(157,140,255,0.3)" strokeWidth="0.8" />
                  </marker>
                  <marker id="state-arrow-error" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
                    <path d="M0,0.5 L5,2.5 L0,4.5" fill="none" stroke="rgba(239,68,68,0.5)" strokeWidth="0.8" />
                  </marker>
                  <marker id="state-arrow-override" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
                    <path d="M0,0.5 L5,2.5 L0,4.5" fill="none" stroke="rgba(239,68,68,0.7)" strokeWidth="1" />
                  </marker>
                  <marker id="state-arrow-bg" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
                    <path d="M0,0.5 L5,2.5 L0,4.5" fill="none" stroke="rgba(6,182,212,0.4)" strokeWidth="0.8" />
                  </marker>
                </defs>

                {TRANSITIONS.map((trans, i) => {
                  const fromState = getStateById(trans.from);
                  const toState = getStateById(trans.to);
                  if (!fromState || !toState) return null;

                  const isActive = step.activeTransitions.includes(i);
                  const isError = trans.type === 'error';
                  const isOverride = trans.type === 'override';
                  const isBackground = trans.type === 'background';
                  
                  let strokeColor = 'rgba(157,140,255,0.1)';
                  let markerEnd = 'url(#state-arrow)';
                  let strokeWidth = 1;
                  let strokeDasharray = undefined;

                  if (isActive) {
                    if (isError) {
                      strokeColor = 'rgba(239,68,68,0.5)';
                      markerEnd = 'url(#state-arrow-error)';
                    } else if (isOverride) {
                      strokeColor = 'rgba(239,68,68,0.7)';
                      markerEnd = 'url(#state-arrow-override)';
                      strokeWidth = 1.5;
                    } else if (isBackground) {
                      strokeColor = 'rgba(6,182,212,0.4)';
                      markerEnd = 'url(#state-arrow-bg)';
                      strokeDasharray = '5,3';
                    } else {
                      strokeColor = 'rgba(157,140,255,0.3)';
                    }
                  }

                  // Calculate path
                  const x1 = fromState.x;
                  const y1 = fromState.y;
                  const x2 = toState.x;
                  const y2 = toState.y;
                  
                  // Simple curved path for better visibility
                  const midX = (x1 + x2) / 2;
                  const midY = (y1 + y2) / 2 - 3; // slight curve up
                  const path = `M ${x1}% ${y1}% Q ${midX}% ${midY}% ${x2}% ${y2}%`;

                  return (
                    <g key={i}>
                      <motion.path
                        d={path}
                        fill="none"
                        stroke={strokeColor}
                        strokeWidth={strokeWidth}
                        strokeDasharray={strokeDasharray}
                        markerEnd={markerEnd}
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: isActive ? 1 : 0.3, opacity: isActive ? 1 : 0.15 }}
                        transition={{ duration: 0.4, delay: 0.3 + i * 0.02 }}
                      />
                      {isActive && trans.label && (
                        <motion.text
                          x={`${midX}%`}
                          y={`${midY - 1}%`}
                          textAnchor="middle"
                          fill={isError ? 'rgba(239,68,68,0.6)' : isOverride ? 'rgba(239,68,68,0.8)' : isBackground ? 'rgba(6,182,212,0.5)' : 'rgba(157,140,255,0.4)'}
                          fontSize="6"
                          fontFamily="monospace"
                          fontStyle="italic"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 + i * 0.02 }}
                        >
                          {trans.label}
                        </motion.text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* State nodes */}
              {STATES.map((state, i) => {
                const Icon = state.icon;
                const isActive = step.activeStates.includes(state.id);
                const isStart = state.type === 'start';
                const isEnd = state.type === 'end';
                const isDecision = state.type === 'decision';
                const isOverride = state.type === 'override';

                return (
                  <motion.div
                    key={state.id}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ 
                      opacity: isActive ? 1 : 0.3, 
                      scale: isActive ? 1 : 0.85,
                    }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.03 }}
                    className="absolute"
                    style={{ left: `${state.x}%`, top: `${state.y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    {/* State shape */}
                    <div
                      className={`relative flex items-center justify-center ${
                        isStart || isEnd ? 'w-12 h-12 rounded-full' :
                        isDecision ? 'w-14 h-14' :
                        isOverride ? 'w-16 h-10 rounded-lg' :
                        'w-14 h-10 rounded-lg'
                      }`}
                      style={{
                        background: isActive ? `${state.color}15` : `${state.color}08`,
                        border: `2px solid ${isActive ? `${state.color}40` : `${state.color}20`}`,
                        boxShadow: isActive ? `0 0 15px ${state.color}20` : 'none',
                        clipPath: isDecision ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' : undefined,
                        transform: isOverride ? 'skewX(-10deg)' : undefined,
                      }}
                    >
                      <Icon size={isStart || isEnd ? 14 : 12} 
                            style={{ color: isActive ? state.color : `${state.color}60` }} 
                            strokeWidth={1.5} />
                    </div>
                    
                    {/* State name */}
                    <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 text-center">
                      <p className="text-[8px] font-semibold whitespace-nowrap leading-tight" 
                         style={{ color: isActive ? state.color : `${state.color}50` }}>
                        {state.name}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Right: Description */}
      <div className="w-[300px] shrink-0 flex flex-col justify-center gap-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-bold text-white/90 leading-tight">{step.title}</h3>
            <div className="w-10 h-[1px]" style={{ background: 'rgba(157,140,255,0.3)' }} />
            <p className="text-[12px] leading-relaxed" style={{ color: 'rgba(197,197,210,0.55)' }}>
              {step.description}
            </p>

            {/* Legend */}
            <div className="space-y-2 mt-6 p-3 rounded-lg" style={{ background: 'rgba(157,140,255,0.05)' }}>
              <p className="text-[9px] font-semibold uppercase tracking-wide" style={{ color: 'rgba(157,140,255,0.6)' }}>
                State Types
              </p>
              <div className="grid grid-cols-2 gap-2 text-[8px]">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(16,185,129,0.3)', border: '1px solid rgba(16,185,129,0.5)' }} />
                  <span style={{ color: 'rgba(197,197,210,0.4)' }}>Normal</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3" style={{ background: 'rgba(239,68,68,0.3)', border: '1px solid rgba(239,68,68,0.5)', clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
                  <span style={{ color: 'rgba(197,197,210,0.4)' }}>Decision</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-2 rounded-sm" style={{ background: 'rgba(239,68,68,0.3)', border: '1px solid rgba(239,68,68,0.5)', transform: 'skewX(-10deg)' }} />
                  <span style={{ color: 'rgba(197,197,210,0.4)' }}>Override</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ background: 'rgba(107,114,128,0.3)', border: '1px solid rgba(107,114,128,0.5)' }} />
                  <span style={{ color: 'rgba(197,197,210,0.4)' }}>Start/End</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Step indicators */}
        <div className="flex gap-1.5 mt-4">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className="h-1 rounded-full transition-all duration-300"
              style={{
                width: i === currentStep ? 20 : 6,
                background: i === currentStep ? '#9d8cff' : i < currentStep ? 'rgba(157,140,255,0.3)' : 'rgba(157,140,255,0.1)',
                boxShadow: i === currentStep ? '0 0 8px rgba(157,140,255,0.4)' : 'none',
              }}
            />
          ))}
        </div>

        <p className="text-[9px] tracking-widest uppercase" style={{ color: 'rgba(107,104,128,0.4)' }}>
          Press Space to advance
        </p>
      </div>

      <DiagramModal
        isOpen={showOriginal}
        onClose={() => setShowOriginal(false)}
        imageSrc="/umlDiagrams/stateMechineDiagram.png"
        title="Original State Machine Diagram"
      />
    </div>
  );
};

export { STEPS as STATE_MACHINE_STEPS };
export default StateMachineSlide;