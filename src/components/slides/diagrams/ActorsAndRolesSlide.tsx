import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FadeIn } from '../../TextReveal';
import {
  User, Monitor, Shield, Camera, Server, Settings, 
  Database, Lock, Image
} from 'lucide-react';
import DiagramModal from '../../DiagramModal';

interface Actor {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  role: string;
  responsibilities: string[];
  x: number; // percent
  y: number; // percent
}

interface Step {
  title: string;
  description: string;
  activeActors: string[];
}

const ACTORS: Actor[] = [
  {
    id: 'user',
    name: 'End User',
    icon: User,
    color: '#9d8cff',
    role: 'System Controller',
    responsibilities: [
      'Uses assistant through voice, hotkeys, or UI',
      'Controls privacy (Privacy Mode hotkey)',
      'Enables/disables features (camera, context)',
      'Gives permission approvals when needed'
    ],
    x: 15, y: 25
  },
  {
    id: 'ui',
    name: 'Client UI',
    icon: Monitor,
    color: '#7db3e4',
    role: 'Interface Layer',
    responsibilities: [
      'Displays dashboard, chat, settings',
      'Shows status indicators (mic/camera/privacy)',
      'Sends user actions to orchestrator',
      'Presents results and notifications'
    ],
    x: 35, y: 15
  },
  {
    id: 'orchestrator',
    name: 'Client Orchestrator',
    icon: Shield,
    color: '#4ade80',
    role: 'Decision Authority',
    responsibilities: [
      'Decides when to listen, speak, stay quiet',
      'Enforces permissions and privacy rules',
      'Manages cooldowns and DND rules',
      'Executes approved actions locally'
    ],
    x: 55, y: 25
  },
  {
    id: 'emotion',
    name: 'Emotion Engine',
    icon: Camera,
    color: '#f59e0b',
    role: 'Context Provider',
    responsibilities: [
      'Runs only if camera enabled + privacy OFF',
      'Reads camera locally for emotion signals',
      'Produces lightweight emotion data',
      'No raw video sharing'
    ],
    x: 35, y: 45
  },
  {
    id: 'llm',
    name: 'Remote LLM Server',
    icon: Server,
    color: '#c084fc',
    role: 'AI Reasoning',
    responsibilities: [
      'Receives HTTPS + auth requests',
      'Generates response text',
      'Suggests actions from allowed tools',
      'No direct OS access'
    ],
    x: 85, y: 25
  },
  {
    id: 'os',
    name: 'Operating System',
    icon: Settings,
    color: '#94a3b8',
    role: 'Action Executor',
    responsibilities: [
      'Performs system actions after approval',
      'Opens apps, sends notifications',
      'File/system utilities',
      'Returns success/failure results'
    ],
    x: 75, y: 45
  },
  {
    id: 'storage',
    name: 'Local Storage',
    icon: Database,
    color: '#a78bfa',
    role: 'Data Persistence',
    responsibilities: [
      'Stores settings and preferences',
      'Hotkey configurations',
      'Optional logs/history',
      'Supports clear data/retention rules'
    ],
    x: 15, y: 55
  },
  {
    id: 'auth',
    name: 'Auth/Security',
    icon: Lock,
    color: '#f87171',
    role: 'Server Gatekeeper',
    responsibilities: [
      'Validates client access (API key/token)',
      'Rate limiting to prevent abuse',
      'Server authentication',
      'Security enforcement'
    ],
    x: 85, y: 55
  }
];

const STEPS: Step[] = [
  {
    title: 'User-Facing Actors',
    description: 'The End User interacts with the system through the Client UI, which provides the dashboard, chat interface, and settings. The user controls privacy, enables features, and gives approvals.',
    activeActors: ['user', 'ui']
  },
  {
    title: 'Core Decision Layer',
    description: 'The Client Orchestrator acts as the decision authority, enforcing permissions, privacy rules, cooldowns, and determining when the assistant should listen, speak, or stay quiet.',
    activeActors: ['orchestrator']
  },
  {
    title: 'Context & Intelligence',
    description: 'The Emotion Engine provides optional context (only when camera enabled + privacy OFF), while the Remote LLM Server handles AI reasoning and generates responses with suggested actions.',
    activeActors: ['emotion', 'llm']
  },
  {
    title: 'Execution & Storage',
    description: 'The Operating System executes approved actions (open apps, notifications), while Local Storage persists settings, configurations, and optional logs with retention control.',
    activeActors: ['os', 'storage']
  },
  {
    title: 'Security Layer',
    description: 'Authentication/Security mechanism validates client access to the LLM server using API keys/tokens and applies rate limiting to prevent abuse.',
    activeActors: ['auth']
  },
  {
    title: 'Complete System',
    description: 'All actors work together: User controls → UI displays → Orchestrator decides → LLM reasons → OS executes → Storage persists, with Security protecting server access.',
    activeActors: ['user', 'ui', 'orchestrator', 'emotion', 'llm', 'os', 'storage', 'auth']
  }
];

const ActorsAndRolesSlide = ({ animate, currentStep }: { animate: boolean; currentStep: number }) => {
  const [showOriginal, setShowOriginal] = useState(false);
  const step = STEPS[currentStep] || STEPS[0];

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
            Actors & Roles &middot; Step {currentStep + 1} / {STEPS.length}
          </p>
        </FadeIn>

        {/* Actor diagram */}
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
              {/* Connection lines between related actors */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                <defs>
                  <marker id="actor-arrow" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
                    <path d="M0,0.5 L5,2.5 L0,4.5" fill="none" stroke="rgba(157,140,255,0.15)" strokeWidth="0.8" />
                  </marker>
                </defs>
                
                {/* User → UI */}
                <motion.line
                  x1="20%" y1="27%" x2="30%" y2="17%"
                  stroke="rgba(157,140,255,0.1)" strokeWidth={1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={animate ? { pathLength: 1, opacity: step.activeActors.includes('user') && step.activeActors.includes('ui') ? 1 : 0.3 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 }}
                />
                
                {/* UI → Orchestrator */}
                <motion.line
                  x1="40%" y1="17%" x2="50%" y2="27%"
                  stroke="rgba(157,140,255,0.1)" strokeWidth={1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={animate ? { pathLength: 1, opacity: step.activeActors.includes('ui') && step.activeActors.includes('orchestrator') ? 1 : 0.3 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 }}
                />
                
                {/* Orchestrator → LLM */}
                <motion.line
                  x1="60%" y1="27%" x2="80%" y2="27%"
                  stroke="rgba(157,140,255,0.1)" strokeWidth={1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={animate ? { pathLength: 1, opacity: step.activeActors.includes('orchestrator') && step.activeActors.includes('llm') ? 1 : 0.3 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 }}
                />
                
                {/* Orchestrator → OS */}
                <motion.line
                  x1="60%" y1="30%" x2="70%" y2="42%"
                  stroke="rgba(157,140,255,0.1)" strokeWidth={1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={animate ? { pathLength: 1, opacity: step.activeActors.includes('orchestrator') && step.activeActors.includes('os') ? 1 : 0.3 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 }}
                />
                
                {/* Emotion → Orchestrator */}
                <motion.line
                  x1="40%" y1="42%" x2="50%" y2="30%"
                  stroke="rgba(157,140,255,0.1)" strokeWidth={1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={animate ? { pathLength: 1, opacity: step.activeActors.includes('emotion') && step.activeActors.includes('orchestrator') ? 1 : 0.3 } : {}}
                  transition={{ duration: 0.4, delay: 0.7 }}
                />
              </svg>

              {/* Actor nodes */}
              {ACTORS.map((actor, i) => {
                const Icon = actor.icon;
                const isActive = step.activeActors.includes(actor.id);
                
                return (
                  <motion.div
                    key={actor.id}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ 
                      opacity: isActive ? 1 : 0.3, 
                      scale: isActive ? 1 : 0.85,
                    }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
                    className="absolute"
                    style={{ left: `${actor.x}%`, top: `${actor.y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    {/* Actor circle */}
                    <div
                      className="relative w-16 h-16 rounded-full flex items-center justify-center mb-2"
                      style={{
                        background: isActive ? `${actor.color}15` : `${actor.color}08`,
                        border: `2px solid ${isActive ? `${actor.color}40` : `${actor.color}20`}`,
                        boxShadow: isActive ? `0 0 20px ${actor.color}20` : 'none',
                      }}
                    >
                      <Icon size={20} style={{ color: isActive ? actor.color : `${actor.color}80` }} strokeWidth={1.5} />
                    </div>
                    
                    {/* Actor name */}
                    <div className="text-center">
                      <p className="text-[10px] font-semibold whitespace-nowrap" 
                         style={{ color: isActive ? actor.color : `${actor.color}60` }}>
                        {actor.name}
                      </p>
                      <p className="text-[8px] whitespace-nowrap mt-0.5" 
                         style={{ color: isActive ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.25)' }}>
                        {actor.role}
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

            {/* Active actors details */}
            <div className="space-y-3 mt-6">
              {step.activeActors.map((actorId) => {
                const actor = ACTORS.find(a => a.id === actorId);
                if (!actor) return null;
                const Icon = actor.icon;
                
                return (
                  <motion.div
                    key={actorId}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-start gap-2 p-2 rounded-lg"
                    style={{ background: `${actor.color}08`, border: `1px solid ${actor.color}15` }}
                  >
                    <Icon size={14} style={{ color: actor.color }} strokeWidth={1.5} className="mt-0.5 shrink-0" />
                    <div>
                      <p className="text-[10px] font-semibold mb-1" style={{ color: actor.color }}>
                        {actor.name}
                      </p>
                      <ul className="space-y-0.5">
                        {actor.responsibilities.slice(0, 2).map((resp, i) => (
                          <li key={i} className="text-[9px] leading-tight" style={{ color: 'rgba(197,197,210,0.4)' }}>
                            • {resp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                );
              })}
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
        imageSrc="/umlDiagrams/actors and their rules.png"
        title="Original Actors and Roles Diagram"
      />
    </div>
  );
};

export { STEPS as ACTORS_STEPS };
export default ActorsAndRolesSlide;