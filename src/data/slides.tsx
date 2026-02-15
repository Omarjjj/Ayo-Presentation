import type { SlideData } from '../types';

export const slides: SlideData[] = [
  // 1. Title Slide
  {
    id: 'title',
    layout: 'TITLE',
    title: 'AYO',
    subtitle: 'The Privacy-First AI Desktop Assistant',
    content: 'Think, Decide, Act - Securely.',
  },

  // 2. Problems
  {
    id: 'problems',
    layout: 'CONTENT',
    title: 'The Problem',
    content: (
      <ul className="list-disc space-y-4 text-left text-xl">
        <li>Developers debugging code manually searching online.</li>
        <li>Designers juggling multiple applications.</li>
        <li>Users struggling with complex Excel formulas.</li>
        <li>Students summarizing multiple PDFs manually.</li>
        <li>Bored users looking for suggestions.</li>
      </ul>
    ),
  },

  // 3. Solutions
  {
    id: 'solutions',
    layout: 'CONTENT',
    title: 'The Solution: AYO',
    content: (
      <div className="space-y-6 text-xl">
        <p>AYO jumps in to help:</p>
        <ul className="list-disc pl-8 space-y-2">
          <li>Debugs code instantly.</li>
          <li>Suggests design tools and workflows.</li>
          <li>Generates Excel formulas on demand.</li>
          <li>Summarizes documents automatically.</li>
          <li>Recommends activities based on context.</li>
        </ul>
      </div>
    ),
  },

  // 4. Problem Statement
  {
    id: 'problem-statement',
    layout: 'CONTENT',
    title: 'Problem Statement',
    content: (
      <div className="text-xl leading-relaxed">
        <p>Computers are powerful tools, but they lack intelligence.</p>
        <p className="mt-4">
          Navigating systems requires manual effort. Existing assistants are reactive tools, not companions.
        </p>
        <p className="mt-4 font-semibold text-purple-300">
          We need a unified system that combines intelligence with control—a true companion that understands context, adapts to you, and respects your privacy.
        </p>
      </div>
    ),
  },

  // 5. Key Features
  {
    id: 'key-features',
    layout: 'CONTENT',
    title: 'Key Features',
    content: (
      <div className="grid grid-cols-2 gap-8 text-lg">
        <div className="p-4 bg-white/5 rounded-lg border border-purple-500/30">
          <h3 className="font-bold text-purple-300 mb-2">Context Aware</h3>
          <p>Understands active apps and monitors interaction patterns.</p>
        </div>
        <div className="p-4 bg-white/5 rounded-lg border border-purple-500/30">
          <h3 className="font-bold text-purple-300 mb-2">Multimodal Interaction</h3>
          <p>Voice, text, and hotkeys for seamless control.</p>
        </div>
        <div className="p-4 bg-white/5 rounded-lg border border-purple-500/30">
          <h3 className="font-bold text-purple-300 mb-2">Deterministic Policy Engine</h3>
          <p>Validates AI actions before execution for safety.</p>
        </div>
        <div className="p-4 bg-white/5 rounded-lg border border-purple-500/30">
          <h3 className="font-bold text-purple-300 mb-2">Privacy First</h3>
          <p>Local processing, privacy mode, and full data control.</p>
        </div>
        <div className="p-4 bg-white/5 rounded-lg border border-purple-500/30">
          <h3 className="font-bold text-purple-300 mb-2">Self-Hosted LLM</h3>
          <p>Completely local model ensuring data sovereignty.</p>
        </div>
        <div className="p-4 bg-white/5 rounded-lg border border-purple-500/30">
          <h3 className="font-bold text-purple-300 mb-2">Emotional Awareness</h3>
          <p>Adapts to user's emotional state (Optional & Local).</p>
        </div>
      </div>
    ),
  },

  // 6. Related Work
  {
    id: 'related-work',
    layout: 'CONTENT',
    title: 'Related Work',
    content: (
      <ul className="space-y-4 text-xl">
        <li><strong className="text-purple-300">Microsoft Copilot:</strong> Chat-focused, limited real-time awareness.</li>
        <li><strong className="text-purple-300">Voice Assistants:</strong> Command-based, not reasoning-based.</li>
        <li><strong className="text-purple-300">Automation Tools:</strong> Rule-based, not adaptive.</li>
      </ul>
    ),
  },

  // 7. Gap Analysis
  {
    id: 'gap-analysis',
    layout: 'CONTENT',
    title: 'Gap Analysis',
    content: (
      <div className="space-y-6 text-xl">
        <p>Current assistants lack:</p>
        <ul className="list-disc pl-8 space-y-2">
          <li>Deep context understanding.</li>
          <li>Proactive behavior.</li>
          <li>Local processing (reliance on cloud).</li>
        </ul>
        <p className="mt-4 font-semibold text-purple-300">
          AYO fills this gap by integrating context awareness, structured reasoning, and privacy by design.
        </p>
      </div>
    ),
  },

  // 8. Privacy and Security
  {
    id: 'privacy',
    layout: 'CONTENT',
    title: 'Privacy & Security',
    content: (
      <div className="space-y-4 text-lg">
        <p><strong className="text-purple-300">Privacy by Design:</strong> All sensitive processing is local. No raw data transmission.</p>
        <p><strong className="text-purple-300">Global Privacy Mode:</strong> Instantly disables sensors and context collection.</p>
        <p><strong className="text-purple-300">Policy Engine:</strong> Validates every AI suggestion against permissions and risk levels.</p>
        <p><strong className="text-purple-300">Secure Communication:</strong> HTTPS encryption, controlled API endpoints, no direct OS access from server.</p>
      </div>
    ),
  },

  // 9. AI Integration
  {
    id: 'ai-integration',
    layout: 'CONTENT',
    title: 'AI Integration',
    content: (
      <div className="space-y-4 text-lg">
        <p><strong className="text-purple-300">Why LLM?</strong> Natural understanding and reasoning superior to rule-based systems.</p>
        <p><strong className="text-purple-300">Architecture:</strong> User {'→'} Client {'→'} Policy Engine {'→'} LLM Server {'→'} Structured Response {'→'} Policy Validation {'→'} Execution.</p>
        <p><strong className="text-purple-300">Safety:</strong> LLM suggests, Policy Engine decides. High-impact actions require user approval.</p>
      </div>
    ),
  },

  // 10. Methodology
  {
    id: 'methodology',
    layout: 'CONTENT',
    title: 'Methodology: Agile Development',
    content: (
      <div className="text-xl">
        <p>Iterative development cycles focusing on:</p>
        <ul className="list-disc pl-8 mt-4 space-y-2">
          <li>Voice Interaction</li>
          <li>Context Awareness</li>
          <li>Emotion Detection</li>
          <li>System Orchestration</li>
        </ul>
        <p className="mt-4">Allows for continuous testing and feedback integration.</p>
      </div>
    ),
  },

  // 11. Feasibility
  {
    id: 'feasibility',
    layout: 'CONTENT',
    title: 'Feasibility Study',
    content: (
      <ul className="space-y-4 text-lg">
        <li><strong className="text-purple-300">Technical:</strong> Achievable with Electron, React, Python, and Local LLMs.</li>
        <li><strong className="text-purple-300">Operational:</strong> Integrates naturally into workflows.</li>
        <li><strong className="text-purple-300">Economic:</strong> Open-source and local hosting reduce costs.</li>
      </ul>
    ),
  },

  // 12. Diagrams - Sequence (Interactive)
  {
    id: 'sequence-diagram',
    layout: 'DIAGRAM',
    title: 'Sequence Diagram',
    imageSrc: '/umlDiagrams/sequence-diagram.png',
    diagramStep: {
      text: "User initiates a request via UI or Voice. The Orchestrator receives it.",
      index: 0,
      total: 5
    }
  },
  {
    id: 'sequence-diagram-2',
    layout: 'DIAGRAM',
    title: 'Sequence Diagram',
    imageSrc: '/umlDiagrams/sequence-diagram.png',
    diagramStep: {
      text: "Orchestrator gathers context and sends a secure request to the Remote LLM Server.",
      index: 1,
      total: 5
    }
  },
  {
    id: 'sequence-diagram-3',
    layout: 'DIAGRAM',
    title: 'Sequence Diagram',
    imageSrc: '/umlDiagrams/sequence-diagram.png',
    diagramStep: {
      text: "LLM returns a structured plan. Policy Engine validates the plan against permissions and rules.",
      index: 2,
      total: 5
    }
  },
  {
    id: 'sequence-diagram-4',
    layout: 'DIAGRAM',
    title: 'Sequence Diagram',
    imageSrc: '/umlDiagrams/sequence-diagram.png',
    diagramStep: {
      text: "If approved, Tool Executor performs the action (e.g., open app). High-impact actions require user confirmation.",
      index: 3,
      total: 5
    }
  },
  {
    id: 'sequence-diagram-5',
    layout: 'DIAGRAM',
    title: 'Sequence Diagram',
    imageSrc: '/umlDiagrams/sequence-diagram.png',
    diagramStep: {
      text: "Result is returned to UI and logged if enabled.",
      index: 4,
      total: 5
    }
  },

  // 13. Diagrams - Activity (Interactive)
  {
    id: 'activity-diagram',
    layout: 'DIAGRAM',
    title: 'Activity Diagram',
    imageSrc: '/umlDiagrams/activity-diagram.png',
    diagramStep: {
      text: "System Initialization: Load settings, check permissions, start background services.",
      index: 0,
      total: 4
    }
  },
  {
    id: 'activity-diagram-2',
    layout: 'DIAGRAM',
    title: 'Activity Diagram',
    imageSrc: '/umlDiagrams/activity-diagram.png',
    diagramStep: {
      text: "Main Loop: Wait for user input or proactive triggers. Handle global interrupts (Privacy Mode).",
      index: 1,
      total: 4
    }
  },
  {
    id: 'activity-diagram-3',
    layout: 'DIAGRAM',
    title: 'Activity Diagram',
    imageSrc: '/umlDiagrams/activity-diagram.png',
    diagramStep: {
      text: "Processing: Input -> Policy Check -> Context Build -> LLM Request -> Response Validation.",
      index: 2,
      total: 4
    }
  },
  {
    id: 'activity-diagram-4',
    layout: 'DIAGRAM',
    title: 'Activity Diagram',
    imageSrc: '/umlDiagrams/activity-diagram.png',
    diagramStep: {
      text: "Execution: Run tool or show response. Log result. Return to Idle.",
      index: 3,
      total: 4
    }
  },

  // 14. Other Diagrams (Auto-advance handled by user pressing space quickly or just one slide)
  // User said "for all other diagrams it should just go through them with the animation without stopping"
  
  {
    id: 'use-case-diagram',
    layout: 'DIAGRAM',
    title: 'Use Case Diagram',
    imageSrc: '/umlDiagrams/use-case-diagram.png',
    diagramStep: {
      text: "Shows interactions between User, System, and External Actors.",
      index: 0,
      total: 1
    },
    autoAdvance: true,
    autoAdvanceDelay: 5000
  },
  {
    id: 'class-diagram',
    layout: 'DIAGRAM',
    title: 'Class Diagram',
    imageSrc: '/umlDiagrams/class-diagram.png',
    diagramStep: {
      text: "System structure: Client App, Policy Engine, Orchestrator, and LLM Client.",
      index: 0,
      total: 1
    },
    autoAdvance: true,
    autoAdvanceDelay: 5000
  },
  {
    id: 'deployment-diagram',
    layout: 'DIAGRAM',
    title: 'Deployment Diagram',
    imageSrc: '/umlDiagrams/deployment-diagram.png', 
    diagramStep: {
      text: "Deployment nodes: Client Device and Remote LLM Server.",
      index: 0,
      total: 1
    },
    autoAdvance: true,
    autoAdvanceDelay: 5000
  },
   {
    id: 'erd',
    layout: 'DIAGRAM',
    title: 'Entity Relationship Diagram',
    imageSrc: '/umlDiagrams/erd.png',
    diagramStep: {
      text: "Database schema: Users, Settings, Logs, and Interaction History.",
      index: 0,
      total: 1
    },
    autoAdvance: true,
    autoAdvanceDelay: 5000
  },

  // 15. Prototype / UI Demo
  {
    id: 'demo',
    layout: 'DEMO',
    title: 'Live Demo',
    content: null
  },

  // 16. Conclusion
  {
    id: 'conclusion',
    layout: 'TITLE',
    title: 'Conclusion',
    subtitle: 'AYO: The Future of Privacy-First AI Assistance',
    content: 'Thank you for your attention.',
  }
];
