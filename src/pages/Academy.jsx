import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import SafeImage from '../components/SafeImage';

// Magnetic Button Component
function MagneticButton({ children, ...props }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    const strength = 8;
    x.set(distanceX * 0.1 * strength);
    y.set(distanceY * 0.1 * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: smoothX,
        y: smoothY,
        ...props.style
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default function Academy() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const masterclasses = [
    {
      title: 'The Art of the Paparazzi',
      description: 'Master the craft of capturing candid moments with editorial precision. Learn the techniques used by top photographers to document high-profile events, red carpets, and exclusive gatherings. Understand timing, positioning, and the psychology of capturing authentic moments.',
      details: '6-week intensive course • Live sessions • Portfolio review'
    },
    {
      title: 'Lighting for Luxury',
      description: 'Elevate your photography with advanced lighting techniques designed for luxury editorial work. Explore natural light manipulation, studio setups, and the art of creating mood through strategic illumination. Perfect for fashion, portraiture, and high-end commercial work.',
      details: '4-week masterclass • Hands-on workshops • Equipment included'
    },
    {
      title: 'Social Currency Strategy',
      description: 'Understand the business and strategy behind building a powerful media presence. Learn how to leverage your work for maximum impact, build relationships with clients and publications, and create a brand that commands attention in the digital age.',
      details: '8-week program • Business mentorship • Networking events'
    }
  ];

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', paddingTop: '120px' }}>
      {/* Hero Section - Pure White */}
      <section style={{
        minHeight: '50vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '120px 16px 60px' : '140px 48px',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden'
      }}>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, type: 'spring', damping: 25 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: isMobile ? 'clamp(2.5rem, 10vw, 4rem)' : 'clamp(5rem, 10vw, 12rem)',
            fontWeight: 900,
            color: '#000000',
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
            margin: 0,
            textAlign: 'center',
            whiteSpace: 'nowrap',
            wordBreak: 'keep-all',
            hyphens: 'none'
          }}
        >
          ACADEMY
        </motion.h1>
      </section>

      {/* Masterclass Cards Section */}
      <section style={{ 
        padding: isMobile ? '80px 16px' : '120px 48px', 
        maxWidth: '1400px', 
        margin: '0 auto'
      }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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
          M A S T E R C L A S S E S
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: isMobile ? '32px' : '48px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {masterclasses.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.15, type: 'spring', damping: 25 }}
              whileHover={{ 
                scale: 1.02,
                y: -8
              }}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '0',
                padding: isMobile ? '40px' : '64px',
                minHeight: isMobile ? '400px' : '500px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div>
                <h3 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: isMobile ? 'clamp(1.75rem, 5vw, 2.5rem)' : 'clamp(2rem, 4vw, 3rem)',
                  fontWeight: 900,
                  color: '#000000',
                  marginBottom: '24px',
                  letterSpacing: '-0.04em',
                  lineHeight: 1.1
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: isMobile ? '0.875rem' : '1rem',
                  color: '#333333',
                  lineHeight: 1.9,
                  letterSpacing: '0.02em',
                  marginBottom: '24px'
                }}>
                  {item.description}
                </p>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: isMobile ? '0.75rem' : '0.875rem',
                  color: '#666666',
                  lineHeight: 1.8,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  fontWeight: 600
                }}>
                  {item.details}
                </p>
              </div>
              <MagneticButton
                whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(192, 192, 192, 0.4)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  padding: '16px 36px',
                  background: 'linear-gradient(135deg, rgba(192, 192, 192, 0.9) 0%, rgba(192, 192, 192, 0.7) 100%)',
                  color: '#000000',
                  border: '1px solid rgba(192, 192, 192, 0.3)',
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  alignSelf: 'flex-start',
                  marginTop: '40px',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 4px 20px rgba(192, 192, 192, 0.2)',
                  borderRadius: '4px'
                }}
              >
                Join
              </MagneticButton>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
