import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export default function LiquidTransition({ children }) {
  const location = useLocation();

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
          animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
          exit={{ opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' }}
          transition={{
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1]
          }}
          style={{
            position: 'relative',
            width: '100%',
            minHeight: '100vh'
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      
      {/* Liquid gradient overlay on route change */}
      <AnimatePresence>
        {location.pathname && (
          <motion.div
            key={`transition-${location.pathname}`}
            initial={{ 
              clipPath: 'polygon(0 0, 100% 0, 100% 0%, 0 0%)',
              opacity: 0.8
            }}
            animate={{ 
              clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
              opacity: 0
            }}
            exit={{ 
              clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
              opacity: 0
            }}
            transition={{
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(135deg, rgba(192, 192, 192, 0.9) 0%, rgba(75, 0, 130, 0.9) 100%)',
              pointerEvents: 'none',
              zIndex: 9999
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
