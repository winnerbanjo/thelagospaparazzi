import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

function MagneticImage({ src, alt, style, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 200 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    const maxDistance = Math.max(rect.width, rect.height);
    const strength = 25;
    
    x.set((distanceX / maxDistance) * strength);
    y.set((distanceY / maxDistance) * strength);
    rotateX.set((distanceY / maxDistance) * 8);
    rotateY.set((distanceX / maxDistance) * -8);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.img
      ref={ref}
      src={src}
      alt={alt}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: smoothX,
        y: smoothY,
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformStyle: 'preserve-3d',
        ...style
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    />
  );
}

function LiquidCursor() {
  const cursorRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    if (cursorRef.current) {
      cursorRef.current.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    if (cursorRef.current) {
      cursorRef.current.style.opacity = '0';
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseLeave, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseLeave, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, []);

  return (
    <motion.div
      ref={cursorRef}
      style={{
        position: 'fixed',
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        background: 'linear-gradient(135deg, #C0C0C0 0%, #E8E8E8 50%, #C0C0C0 100%)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        boxShadow: '0 0 20px rgba(192, 192, 192, 0.5)',
        mixBlendMode: 'difference',
        opacity: 0
      }}
      x={cursorX}
      y={cursorY}
      transformTemplate={({ x, y }) => `translate(${x}px, ${y}px) translate(-50%, -50%)`}
    />
  );
}

export default function Home() {
  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <LiquidCursor />
      
      {/* Hero Section */}
      <section style={{ 
        height: '100vh', 
        position: 'relative', 
        overflow: 'hidden',
        marginTop: '80px'
      }}>
        <MagneticImage
          src="/IMG_3419.JPG"
          alt="The Lagos Paparazzi Hero"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '80px 48px',
          background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)'
        }}>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(4rem, 12vw, 16rem)',
              fontWeight: 900,
              color: '#FFFFFF',
              letterSpacing: '-0.04em',
              lineHeight: 0.85,
              marginBottom: '8px'
            }}
          >
            THE LAGOS
            <br />
            PAPARAZZI
          </motion.h1>
        </div>
      </section>

      {/* Bento Grid */}
      <section style={{ 
        padding: '120px 48px', 
        maxWidth: '1400px', 
        margin: '0 auto' 
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
          borderTop: '1px solid rgba(0, 0, 0, 0.1)',
          borderLeft: '1px solid rgba(0, 0, 0, 0.1)',
          paddingTop: '16px'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              gridColumn: 'span 2',
              gridRow: 'span 1',
              borderRight: '1px solid rgba(0, 0, 0, 0.1)',
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
              paddingRight: '16px',
              paddingBottom: '16px',
              minHeight: '300px',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <MagneticImage
              src="/0B5D3E0D-4F03-42DC-9E1D-FD6605D27770.jpg"
              alt="Portfolio 1"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              gridColumn: 'span 1',
              gridRow: 'span 1',
              borderRight: '1px solid rgba(0, 0, 0, 0.1)',
              borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
              paddingRight: '16px',
              paddingBottom: '16px',
              minHeight: '300px',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <MagneticImage
              src="/44ACBAB4-1971-4650-B3F6-C878D12E2D4D.png"
              alt="Portfolio 2"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
