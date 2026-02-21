import { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export default function SmoothScroll({ children }) {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    // Smooth scroll behavior is handled by CSS
    // This component provides scroll progress tracking
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-regal-purple z-50 origin-left"
        style={{ scaleX: smoothProgress }}
      />
      {children}
    </>
  );
}
