import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DiagramSlideProps {
  imageSrc: string;
  description: string[];
  title: string;
  isInteractive?: boolean; // True for Sequence/Activity
  onComplete?: () => void;
}

const DiagramSlide: React.FC<DiagramSlideProps> = ({ 
  imageSrc, 
  description, 
  title, 
  isInteractive = false,
  onComplete 
}) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isInteractive) {
      // Auto-advance for non-interactive diagrams
      const timer = setInterval(() => {
        setStep(prev => {
          if (prev < description.length - 1) return prev + 1;
          clearInterval(timer);
          if (onComplete) onComplete();
          return prev;
        });
      }, 3000); // 3 seconds per step
      return () => clearInterval(timer);
    }
  }, [isInteractive, description.length, onComplete]);

  // Handle manual advance for interactive diagrams
  useEffect(() => {
    if (!isInteractive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.key === 'ArrowRight') {
        setStep(prev => {
          if (prev < description.length - 1) {
            return prev + 1;
          } else {
            if (onComplete) onComplete();
            return prev;
          }
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isInteractive, description.length, onComplete]);

  return (
    <div className="flex flex-col h-full w-full p-8 space-y-4">
      <h2 className="text-4xl font-bold text-purple-400">{title}</h2>
      <div className="flex flex-1 gap-8 overflow-hidden">
        {/* Image Container */}
        <div className="flex-1 relative flex items-center justify-center bg-black/30 rounded-xl p-4 border border-purple-500/20">
          <motion.img 
            src={imageSrc} 
            alt={title} 
            className="max-h-full max-w-full object-contain"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Description Container */}
        <div className="flex-1 flex flex-col justify-center space-y-4 overflow-y-auto pr-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="text-xl text-gray-200 leading-relaxed bg-black/40 p-6 rounded-lg border-l-4 border-purple-500"
            >
              {description[step]}
            </motion.div>
          </AnimatePresence>
          
          {/* Progress Indicator */}
          <div className="flex space-x-2 mt-4">
            {description.map((_, i) => (
              <div 
                key={i} 
                className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-purple-500' : 'w-2 bg-gray-600'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagramSlide;
