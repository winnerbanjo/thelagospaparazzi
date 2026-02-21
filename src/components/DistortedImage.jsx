import { useState, useRef } from 'react';
import SafeImage from './SafeImage';

let motion = null;
let useMotionValue = null;
let useSpring = null;
let useTransform = null;

try {
  const fm = require('framer-motion');
  motion = fm.motion;
  useMotionValue = fm.useMotionValue;
  useSpring = fm.useSpring;
  useTransform = fm.useTransform;
} catch (e) {
  console.warn('Framer Motion not available for DistortedImage');
}

export default function DistortedImage({ src, alt, style, ...props }) {
  const [isHovering, setIsHovering] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const xValue = ((e.clientX - centerX) / rect.width) * 10;
    const yValue = ((e.clientY - centerY) / rect.height) * 10;
    
    setTilt({ x: yValue, y: -xValue });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTilt({ x: 0, y: 0 });
  };

  if (motion && useMotionValue && useSpring && useTransform) {
    const MotionDiv = motion.div;
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 150, damping: 20 };
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [5, -5]), springConfig);
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-5, 5]), springConfig);

    return (
      <MotionDiv
        ref={ref}
        onMouseMove={(e) => {
          if (!ref.current) return;
          const rect = ref.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const xValue = (e.clientX - centerX) / rect.width;
          const yValue = (e.clientY - centerY) / rect.height;
          
          x.set(xValue);
          y.set(yValue);
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          ...style,
          transformStyle: 'preserve-3d'
        }}
        animate={{
          rotateX: isHovering ? rotateX : 0,
          rotateY: isHovering ? rotateY : 0,
          scale: isHovering ? 1.02 : 1
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 20 }}
      >
        <SafeImage
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: 'translateZ(0)'
          }}
          {...props}
        />
      </MotionDiv>
    );
  }

  // CSS fallback
  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        ...style,
        transform: isHovering ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)` : 'perspective(1000px) scale(1)',
        transition: 'transform 0.3s ease'
      }}
    >
      <SafeImage
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
        {...props}
      />
    </div>
  );
}
