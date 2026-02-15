import { motion } from 'framer-motion';
import DemoApp from '../../demo/App';

const DemoSlide = ({ animate }: { animate: boolean }) => {
  return (
    <div className="flex flex-col h-full w-full relative">
      {/* Back hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={animate ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1 }}
        className="absolute top-3 left-4 z-50 px-3 py-1.5 rounded-lg text-xs"
        style={{
          background: 'rgba(17,16,23,0.8)',
          border: '1px solid rgba(157,140,255,0.15)',
          color: 'rgba(197,197,210,0.5)',
        }}
      >
        Left Arrow to return
      </motion.div>

      {/* Demo container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={animate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 overflow-hidden rounded-lg m-4"
        style={{
          border: '1px solid rgba(157,140,255,0.1)',
          boxShadow: '0 0 60px rgba(157,140,255,0.05)',
        }}
      >
        <DemoApp />
      </motion.div>
    </div>
  );
};

export default DemoSlide;
