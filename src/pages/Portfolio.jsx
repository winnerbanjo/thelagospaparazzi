import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import SafeImage from '../components/SafeImage';
import { PORTFOLIO_ARCHIVE_IMAGES } from '../utils/images';

// Soft Magnetic Image - Floating in water feel (max 5 degrees)
function SoftMagneticImage({ src, alt, style, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 150 };
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
    const strength = 8;
    const tiltStrength = 2.5; // Max 5 degrees total
    
    x.set((distanceX / maxDistance) * strength);
    y.set((distanceY / maxDistance) * strength);
    rotateX.set((distanceY / maxDistance) * tiltStrength);
    rotateY.set((distanceX / maxDistance) * -tiltStrength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-magnetic
      style={{
        x: smoothX,
        y: smoothY,
        rotateX: smoothRotateX,
        rotateY: smoothRotateY,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        ...style
      }}
    >
      <SafeImage
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block'
        }}
        {...props}
      />
    </motion.div>
  );
}

export default function Portfolio() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Full Archive - All remaining images
  const portfolioImages = PORTFOLIO_ARCHIVE_IMAGES;

  // Assign sizes for masonry layout
  const portfolioItems = portfolioImages.map((src, index) => {
    const sizeIndex = index % 3;
    return {
      src,
      size: sizeIndex === 0 ? 'large' : sizeIndex === 1 ? 'medium' : 'small'
    };
  });

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', paddingTop: '120px' }}>
      <section style={{
        padding: isMobile ? '100px 24px' : '140px 48px',
        maxWidth: '1600px',
        margin: '0 auto',
        backgroundColor: '#FFFFFF'
      }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? '0.625rem' : '0.75rem',
            fontWeight: 700,
            color: '#000000',
            letterSpacing: '0.25em',
            marginBottom: isMobile ? '60px' : '80px',
            textAlign: 'center',
            textTransform: 'uppercase'
          }}
        >
          P O R T F O L I O  A R C H I V E
        </motion.h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
          gridAutoRows: '10px'
        }}>
          {portfolioItems.map((item, index) => {
            const rowSpan = item.size === 'large' ? 40 : item.size === 'medium' ? 30 : 20;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ 
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: index * 0.03
                }}
                whileHover={{ 
                  y: -4,
                  transition: { duration: 0.3 }
                }}
                style={{
                  gridRowEnd: `span ${rowSpan}`,
                  overflow: 'hidden',
                  borderRadius: '8px',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(0, 0, 0, 0.05)'
                }}
              >
                <motion.div
                  whileInView={{ scale: 1.05 }}
                  viewport={{ once: false, margin: '-100px' }}
                  transition={{ duration: 0.6 }}
                  whileHover={{
                    boxShadow: 'inset 0 0 60px rgba(255, 255, 255, 0.3)'
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative'
                  }}
                >
                  <SoftMagneticImage
                    src={item.src}
                    alt={`Portfolio ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
