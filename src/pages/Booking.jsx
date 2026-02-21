import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import SafeImage from '../components/SafeImage';
import { BOOKING_HERO_IMAGE } from '../utils/images';

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

export default function Booking() {
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', eventType: '', date: '', budgetRange: '' });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your request. We will contact you shortly.');
    setFormData({ name: '', email: '', eventType: '', date: '', budgetRange: '' });
  };

  const words = ['THE', 'LAGOS', 'PAPARAZZI'];

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '120px 24px 60px' : '140px 48px',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden'
      }}>
        {/* Hero Image Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0
        }}>
          <SafeImage
            src={BOOKING_HERO_IMAGE}
            alt="Booking Hero"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.4) contrast(1.1)'
            }}
          />
        </div>

        {/* Hero Text Overlay */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          width: '100%',
          maxWidth: '1200px'
        }}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: isMobile ? 'clamp(2.5rem, 10vw, 5rem)' : 'clamp(5rem, 10vw, 12rem)',
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
            margin: 0,
            textAlign: 'center',
            whiteSpace: 'nowrap',
            wordBreak: 'keep-all',
            hyphens: 'none',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
          }}>
            {words.map((word, wordIndex) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: wordIndex * 0.15
                }}
                style={{ display: 'block' }}
              >
                {word.split('').map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 200,
                      damping: 20,
                      delay: (wordIndex * 0.15) + (letterIndex * 0.03)
                    }}
                    style={{ display: 'inline-block' }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.span>
            ))}
          </h1>
        </div>
      </section>

      {/* Booking Form Section */}
      <section style={{ 
        padding: isMobile ? '80px 24px' : '120px 48px', 
        maxWidth: '1200px', 
        margin: '0 auto' 
      }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? 'clamp(2rem, 6vw, 4rem)' : 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 900,
            color: '#000000',
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
            marginBottom: '48px',
            textAlign: 'center'
          }}
        >
          BOOKING
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? 'clamp(1rem, 2vw, 1.25rem)' : 'clamp(1.125rem, 2vw, 1.5rem)',
            color: '#666666',
            lineHeight: 1.8,
            marginBottom: '48px',
            maxWidth: '800px',
            margin: '0 auto 48px',
            textAlign: 'center'
          }}
        >
          Ready to capture your story? Let's create something extraordinary together. 
          Book your editorial photography session today.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          onSubmit={handleSubmit}
          style={{
            backdropFilter: 'blur(64px)',
            WebkitBackdropFilter: 'blur(64px)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            borderRadius: '4px',
            padding: isMobile ? '40px' : '80px',
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '32px' : '40px',
            maxWidth: '600px',
            margin: '0 auto'
          }}
        >
          <div>
            <label style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? '0.625rem' : '0.75rem',
              fontWeight: 700,
              color: '#000000',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '16px'
            }}>
              Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{
                width: '100%',
                padding: '18px',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                fontFamily: "'Playfair Display', serif",
                fontSize: isMobile ? '0.875rem' : '1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                outline: 'none',
                transition: 'border-color 0.3s ease',
                backdropFilter: 'blur(20px)',
                borderRadius: '4px'
              }}
              onFocus={(e) => e.target.style.borderColor = '#000000'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)'}
            />
          </div>
          <div>
            <label style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? '0.625rem' : '0.75rem',
              fontWeight: 700,
              color: '#000000',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '16px'
            }}>
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{
                width: '100%',
                padding: '18px',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                fontFamily: "'Playfair Display', serif",
                fontSize: isMobile ? '0.875rem' : '1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                outline: 'none',
                transition: 'border-color 0.3s ease',
                backdropFilter: 'blur(20px)',
                borderRadius: '4px'
              }}
              onFocus={(e) => e.target.style.borderColor = '#000000'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)'}
            />
          </div>
          <div>
            <label style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? '0.625rem' : '0.75rem',
              fontWeight: 700,
              color: '#000000',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '16px'
            }}>
              Event Type
            </label>
            <select
              required
              value={formData.eventType}
              onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
              style={{
                width: '100%',
                padding: '18px',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                fontFamily: "'Playfair Display', serif",
                fontSize: isMobile ? '0.875rem' : '1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                outline: 'none',
                transition: 'border-color 0.3s ease',
                backdropFilter: 'blur(20px)',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              onFocus={(e) => e.target.style.borderColor = '#000000'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)'}
            >
              <option value="">Select Event Type</option>
              <option value="red-carpet">Red Carpet Event</option>
              <option value="private-party">Private Party</option>
              <option value="corporate">Corporate Event</option>
              <option value="wedding">Wedding</option>
              <option value="editorial">Editorial Shoot</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? '0.625rem' : '0.75rem',
              fontWeight: 700,
              color: '#000000',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '16px'
            }}>
              Date
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              style={{
                width: '100%',
                padding: '18px',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                fontFamily: "'Playfair Display', serif",
                fontSize: isMobile ? '0.875rem' : '1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                outline: 'none',
                transition: 'border-color 0.3s ease',
                backdropFilter: 'blur(20px)',
                borderRadius: '4px'
              }}
              onFocus={(e) => e.target.style.borderColor = '#000000'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)'}
            />
          </div>
          <div>
            <label style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? '0.625rem' : '0.75rem',
              fontWeight: 700,
              color: '#000000',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '16px'
            }}>
              Budget Range
            </label>
            <select
              required
              value={formData.budgetRange}
              onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
              style={{
                width: '100%',
                padding: '18px',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                fontFamily: "'Playfair Display', serif",
                fontSize: isMobile ? '0.875rem' : '1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                outline: 'none',
                transition: 'border-color 0.3s ease',
                backdropFilter: 'blur(20px)',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              onFocus={(e) => e.target.style.borderColor = '#000000'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)'}
            >
              <option value="">Select Budget Range</option>
              <option value="under-10k">Under $10,000</option>
              <option value="10k-25k">$10,000 - $25,000</option>
              <option value="25k-50k">$25,000 - $50,000</option>
              <option value="50k-100k">$50,000 - $100,000</option>
              <option value="over-100k">Over $100,000</option>
            </select>
          </div>
          <MagneticButton
            type="submit"
            whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(192, 192, 192, 0.4)' }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: '18px 40px',
              background: 'linear-gradient(135deg, rgba(192, 192, 192, 0.9) 0%, rgba(192, 192, 192, 0.7) 100%)',
              color: '#000000',
              border: '1px solid rgba(192, 192, 192, 0.3)',
              fontFamily: "'Playfair Display', serif",
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'none',
              alignSelf: 'flex-start',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 4px 20px rgba(192, 192, 192, 0.2)',
              marginTop: '8px',
              borderRadius: '4px'
            }}
          >
            Request Access
          </MagneticButton>
        </motion.form>
      </section>
    </div>
  );
}
