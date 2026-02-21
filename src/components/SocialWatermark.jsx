import { useEffect, useState } from 'react';

let motion = null;
let useMotionValue = null;
let useSpring = null;

try {
  const fm = require('framer-motion');
  motion = fm.motion;
  useMotionValue = fm.useMotionValue;
  useSpring = fm.useSpring;
} catch (e) {
  console.warn('Framer Motion not available for SocialWatermark');
}

export default function SocialWatermark() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let timeoutId;
    const handleMouseMove = (e) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setMousePosition({ x: e.clientX + 30, y: e.clientY + 30 });
      }, 500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeoutId);
    };
  }, []);

  if (!motion || !useMotionValue || !useSpring) {
    return (
      <div
        style={{
          position: 'fixed',
          left: mousePosition.x,
          top: mousePosition.y,
          pointerEvents: 'none',
          zIndex: 9997,
          transform: 'translate(-50%, -50%)',
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '0.75rem',
          color: 'rgba(0, 0, 0, 0.15)',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          fontWeight: 600,
          whiteSpace: 'nowrap',
          transition: 'all 0.5s ease'
        }}
      >
        @thelagospaparazzi
      </div>
    );
  }

  const MotionDiv = motion.div;
  const watermarkX = useMotionValue(mousePosition.x);
  const watermarkY = useMotionValue(mousePosition.y);

  const springConfig = { stiffness: 50, damping: 20 };
  const watermarkXSpring = useSpring(watermarkX, springConfig);
  const watermarkYSpring = useSpring(watermarkY, springConfig);

  useEffect(() => {
    watermarkX.set(mousePosition.x);
    watermarkY.set(mousePosition.y);
  }, [mousePosition, watermarkX, watermarkY]);

  return (
    <MotionDiv
      style={{
        position: 'fixed',
        left: watermarkXSpring,
        top: watermarkYSpring,
        pointerEvents: 'none',
        zIndex: 9997,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '0.75rem',
          color: 'rgba(0, 0, 0, 0.15)',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          fontWeight: 600,
          whiteSpace: 'nowrap'
        }}
      >
        @thelagospaparazzi
      </div>
    </MotionDiv>
  );
}
