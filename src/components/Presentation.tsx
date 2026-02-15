import { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Slide from './Slide';
import AnimatedBackground from './AnimatedBackground';
import ChromaKeyVideo from './ChromaKeyVideo';

  // Content slides
import TitleSlide from './slides/TitleSlide';
import ProblemsSlide from './slides/ProblemsSlide';
import SolutionSlide from './slides/SolutionSlide';
import ProblemStatementSlide from './slides/ProblemStatementSlide';
import KeyFeaturesSlide from './slides/KeyFeaturesSlide';
import RelatedWorkSlide from './slides/RelatedWorkSlide';
import GapAnalysisSlide from './slides/GapAnalysisSlide';
import PrivacySlide from './slides/PrivacySlide';
import AIIntegrationSlide from './slides/AIIntegrationSlide';
import MethodologySlide from './slides/MethodologySlide';
import FeasibilitySlide from './slides/FeasibilitySlide';
import PreDemoSlide from './slides/PreDemoSlide';
import DemoSlide from './slides/DemoSlide';
import ConclusionSlide from './slides/ConclusionSlide';

// Diagram slides
import SequenceDiagramSlide, { SEQUENCE_STEPS } from './slides/diagrams/SequenceDiagramSlide';
import ActivityDiagramSlide, { ACTIVITY_STEPS } from './slides/diagrams/ActivityDiagramSlide';
import ClassDiagramSlide from './slides/diagrams/ClassDiagramSlide';
import UseCaseDiagramSlide from './slides/diagrams/UseCaseDiagramSlide';
import DeploymentDiagramSlide from './slides/diagrams/DeploymentDiagramSlide';
import ERDSlide from './slides/diagrams/ERDSlide';
import ArchitectureSlide from './slides/diagrams/ArchitectureSlide';
import SubsystemSlide from './slides/diagrams/SubsystemSlide';
import ActorsAndRolesSlide, { ACTORS_STEPS } from './slides/diagrams/ActorsAndRolesSlide';
import StateMachineSlide, { STATE_MACHINE_STEPS } from './slides/diagrams/StateMachineSlide';

type SlideType = 'normal' | 'interactive' | 'demo';

interface SlideConfig {
  id: string;
  type: SlideType;
  render: (animate: boolean, step?: number) => React.ReactNode;
  totalSteps?: number; // for interactive slides
}

const SLIDES: SlideConfig[] = [
  // Content slides
  { id: 'title', type: 'normal', render: (a) => <TitleSlide animate={a} /> },
  { id: 'problems', type: 'normal', render: (a) => <ProblemsSlide animate={a} /> },
  { id: 'solution', type: 'normal', render: (a) => <SolutionSlide animate={a} /> },
  { id: 'problem-statement', type: 'normal', render: (a) => <ProblemStatementSlide animate={a} /> },
  { id: 'key-features', type: 'normal', render: (a) => <KeyFeaturesSlide animate={a} /> },
  { id: 'related-work', type: 'normal', render: (a) => <RelatedWorkSlide animate={a} /> },
  { id: 'gap-analysis', type: 'normal', render: (a) => <GapAnalysisSlide animate={a} /> },
  { id: 'privacy', type: 'normal', render: (a) => <PrivacySlide animate={a} /> },
  { id: 'ai-integration', type: 'normal', render: (a) => <AIIntegrationSlide animate={a} /> },
  { id: 'methodology', type: 'normal', render: (a) => <MethodologySlide animate={a} /> },
  { id: 'feasibility', type: 'normal', render: (a) => <FeasibilitySlide animate={a} /> },

  // Diagram slides
  { id: 'architecture', type: 'normal', render: (a) => <ArchitectureSlide animate={a} /> },
  { id: 'subsystem', type: 'normal', render: (a) => <SubsystemSlide animate={a} /> },
  {
    id: 'actors-roles',
    type: 'interactive',
    totalSteps: ACTORS_STEPS.length,
    render: (a, step = 0) => <ActorsAndRolesSlide animate={a} currentStep={step} />,
  },
  {
    id: 'sequence-diagram',
    type: 'interactive',
    totalSteps: SEQUENCE_STEPS.length,
    render: (a, step = 0) => <SequenceDiagramSlide animate={a} currentStep={step} />,
  },
  {
    id: 'activity-diagram',
    type: 'interactive',
    totalSteps: ACTIVITY_STEPS.length,
    render: (a, step = 0) => <ActivityDiagramSlide animate={a} currentStep={step} />,
  },
  { id: 'use-case', type: 'normal', render: (a) => <UseCaseDiagramSlide animate={a} /> },
  { id: 'class-diagram', type: 'normal', render: (a) => <ClassDiagramSlide animate={a} /> },
  { id: 'deployment', type: 'normal', render: (a) => <DeploymentDiagramSlide animate={a} /> },
  { id: 'erd', type: 'normal', render: (a) => <ERDSlide animate={a} /> },
  {
    id: 'state-machine',
    type: 'interactive',
    totalSteps: STATE_MACHINE_STEPS.length,
    render: (a, step = 0) => <StateMachineSlide animate={a} currentStep={step} />,
  },

  // Pre-Demo, Demo & Conclusion
  { id: 'pre-demo', type: 'normal', render: (a) => <PreDemoSlide animate={a} /> },
  { id: 'demo', type: 'demo', render: (a) => <DemoSlide animate={a} /> },
  { id: 'conclusion', type: 'normal', render: (a) => <ConclusionSlide animate={a} /> },
];

const Presentation = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  const [showCornerLogo, setShowCornerLogo] = useState(false);
  const [interactiveStep, setInteractiveStep] = useState(0);

  const slide = SLIDES[currentSlide];

  const goNext = useCallback(() => {
    // If on an interactive slide and there are more steps, advance the step
    if (slide.type === 'interactive' && slide.totalSteps && interactiveStep < slide.totalSteps - 1) {
      setInteractiveStep((p) => p + 1);
      return;
    }

    // Otherwise go to next slide
    if (currentSlide < SLIDES.length - 1) {
      setDirection(1);
      setCurrentSlide((p) => p + 1);
      setInteractiveStep(0); // Reset interactive step
    }
  }, [currentSlide, slide, interactiveStep]);

  const goPrev = useCallback(() => {
    // If on an interactive slide and step > 0, go back a step
    if (slide.type === 'interactive' && interactiveStep > 0) {
      setInteractiveStep((p) => p - 1);
      return;
    }

    // Otherwise go to prev slide
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide((p) => p - 1);
      // If going back to an interactive slide, set to its last step
      const prevSlide = SLIDES[currentSlide - 1];
      if (prevSlide?.type === 'interactive' && prevSlide.totalSteps) {
        setInteractiveStep(prevSlide.totalSteps - 1);
      } else {
        setInteractiveStep(0);
      }
    }
  }, [currentSlide, slide, interactiveStep]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showIntro) return;

      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      // Demo slide: allow both forward and back navigation
      if (slide.type === 'demo') {
        if (e.key === 'ArrowLeft') {
          goPrev();
        } else if (e.code === 'Space' || e.key === 'ArrowRight') {
          e.preventDefault();
          goNext();
        }
        return;
      }

      if (e.code === 'Space' || e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft') {
        goPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showIntro, slide, goNext, goPrev]);

  // Tap/click navigation for phones and tablets: left 25% = prev, rest = next (like Space / Arrow keys)
  const handleScreenTap = useCallback(
    (e: React.MouseEvent) => {
      if (showIntro) return;
      const target = e.target as HTMLElement;
      if (target.closest('button, a, input, textarea, [role="button"], [data-no-nav]')) return;

      const width = window.innerWidth;
      const leftZone = width * 0.25;
      if (e.clientX < leftZone) {
        goPrev();
      } else {
        goNext();
      }
    },
    [showIntro, goNext, goPrev]
  );

  const handleIntroEnd = () => {
    setShowIntro(false);
    setShowCornerLogo(true);
  };

  const progress = ((currentSlide + 1) / SLIDES.length) * 100;

  return (
    <div
      className="relative w-screen h-screen overflow-hidden cursor-pointer touch-manipulation"
      style={{ background: '#111017' }}
      onClick={handleScreenTap}
    >
      <AnimatedBackground />

      {/* Intro Video */}
      <AnimatePresence>
        {showIntro && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-50 flex items-center justify-center"
            style={{ background: '#000' }}
          >
            <ChromaKeyVideo
              src="/LogoVideos/blinkingLogo.mp4"
              className="max-h-full max-w-full"
              style={{ aspectRatio: '1/1', maxHeight: '100vh', maxWidth: '100vh' }}
              onEnded={handleIntroEnd}
              threshold={25}
              width={1080}
              height={1080}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Corner Logo */}
      {showCornerLogo && !showIntro && slide.type !== 'demo' && (
        <div className="absolute top-5 right-5 z-40 w-16 h-16 opacity-70">
          <ChromaKeyVideo
            src="/LogoVideos/LoopGlowLogo.mp4"
            className="w-full h-full"
            loop
            threshold={25}
            width={160}
            height={160}
          />
        </div>
      )}

      {/* Progress Bar */}
      {!showIntro && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute top-0 left-0 right-0 z-30 h-[2px]"
          style={{ background: 'rgba(157,140,255,0.08)' }}
        >
          <motion.div
            className="h-full"
            style={{
              background: 'linear-gradient(90deg, #7c6bc4, #9d8cff)',
              boxShadow: '0 0 10px rgba(157,140,255,0.4)',
            }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      )}

      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        {!showIntro && (
          <Slide key={slide.id} direction={direction}>
            {slide.render(true, interactiveStep)}
          </Slide>
        )}
      </AnimatePresence>

      {/* Bottom nav */}
      {!showIntro && slide.type !== 'demo' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-6"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(107,104,128,0.4)' }}>
            {currentSlide + 1} / {SLIDES.length}
          </span>
        </motion.div>
      )}

      {!showIntro && slide.type !== 'demo' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-5 left-6 z-30"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'rgba(107,104,128,0.3)' }}>
            Space / Arrows · Tap right = next, left = back
          </span>
        </motion.div>
      )}
    </div>
  );
};

export default Presentation;
