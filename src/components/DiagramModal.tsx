import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import { useState, useCallback, useEffect } from 'react';

interface DiagramModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
}

const DiagramModal = ({ isOpen, onClose, imageSrc, title }: DiagramModalProps) => {
  const [zoom, setZoom] = useState(1);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown, true);
      return () => window.removeEventListener('keydown', handleKeyDown, true);
    }
  }, [isOpen, handleKeyDown]);

  // Reset zoom when opening
  useEffect(() => {
    if (isOpen) setZoom(1);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={onClose}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="absolute top-4 left-0 right-0 flex items-center justify-between px-6 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-sm font-medium tracking-wide" style={{ color: 'rgba(157,140,255,0.7)' }}>
              {title}
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                style={{ background: 'rgba(157,140,255,0.1)', border: '1px solid rgba(157,140,255,0.15)' }}
              >
                <ZoomOut size={14} style={{ color: 'rgba(157,140,255,0.6)' }} />
              </button>
              <span className="text-xs font-mono" style={{ color: 'rgba(157,140,255,0.4)' }}>
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={() => setZoom((z) => Math.min(1.8, z + 0.1))}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
                style={{ background: 'rgba(157,140,255,0.1)', border: '1px solid rgba(157,140,255,0.15)' }}
              >
                <ZoomIn size={14} style={{ color: 'rgba(157,140,255,0.6)' }} />
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors ml-2"
                style={{ background: 'rgba(232,123,123,0.1)', border: '1px solid rgba(232,123,123,0.15)' }}
              >
                <X size={14} style={{ color: 'rgba(232,123,123,0.7)' }} />
              </button>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="max-w-[90vw] max-h-[85vh] overflow-auto rounded-lg"
            onClick={(e) => e.stopPropagation()}
            style={{ marginTop: '40px' }}
          >
            <img
              src={imageSrc}
              alt={title}
              className="block rounded-lg"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: 'center center',
                transition: 'transform 0.2s ease',
                maxWidth: zoom <= 1 ? '85vw' : 'none',
                maxHeight: zoom <= 1 ? '80vh' : 'none',
                background: 'white',
              }}
            />
          </motion.div>

          {/* Hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-4 text-[10px] tracking-widest uppercase"
            style={{ color: 'rgba(107,104,128,0.4)' }}
          >
            Press ESC to close
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DiagramModal;
