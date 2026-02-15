import { motion } from 'framer-motion';

interface SlideProps {
  children: React.ReactNode;
  direction: number;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.92,
    filter: 'blur(10px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    zIndex: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.92,
    filter: 'blur(10px)',
    zIndex: 0,
  }),
};

const Slide = ({ children, direction }: SlideProps) => {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-center items-center"
      custom={direction}
      variants={slideVariants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: 'spring', stiffness: 200, damping: 30 },
        opacity: { duration: 0.4, ease: 'easeInOut' },
        scale: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        filter: { duration: 0.4 },
      }}
    >
      {children}
    </motion.div>
  );
};

export default Slide;
