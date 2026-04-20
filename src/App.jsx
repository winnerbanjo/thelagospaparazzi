import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import SafeImage from './components/SafeImage';
import { HOME_PORTFOLIO_IMAGES, STORIES_IMAGES, SERVICES_IMAGES } from './utils/images';
import Portfolio from './pages/Portfolio';
import Academy from './pages/Academy';
import Stories from './pages/Stories';
import Booking from './pages/Booking';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Refund from './pages/Refund';
import Admin from './pages/Admin';

// Scroll to Top on Route Change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return null;
}

// Cursor Component - Disabled, using system cursor only
function CleanCursor() {
  useEffect(() => {
    // Force cursor to always be visible
    document.body.style.cursor = 'auto';
    document.documentElement.style.cursor = 'auto';
    
    // Ensure all interactive elements have proper cursor
    const style = document.createElement('style');
    style.textContent = `
      * {
        cursor: auto !important;
      }
      a, button, [role="button"], input, select, textarea {
        cursor: pointer !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.body.style.cursor = 'auto';
      document.documentElement.style.cursor = 'auto';
    };
  }, []);

  return null;
}

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

// Glassmorphic Navbar - Nearly transparent until hitting a section
function GlassNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const syncViewport = () => setIsMobile(window.innerWidth < 900);
    syncViewport();
    window.addEventListener('resize', syncViewport);
    return () => window.removeEventListener('resize', syncViewport);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // On the home page: float over the iframe with blur always on.
  // On other pages: same treatment but scrolled state drives intensity.
  const onHero = isHome && !scrolled;
  const textColor = onHero ? '#FFFFFF' : '#000000';
  const borderColor = onHero ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.2)';

  const navItems = [
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/academy', label: 'Academy' },
    { path: '/stories', label: 'Stories' },
    { path: '/booking', label: 'Booking' }
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: 'spring', damping: 25 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: isMobile ? '14px 14px' : '28px 48px',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        backgroundColor: isMobile
          ? onHero
            ? 'rgba(0,0,0,0.28)'
            : 'rgba(255,255,255,0.92)'
          : onHero
            ? 'rgba(0,0,0,0.18)'
            : 'rgba(255,255,255,0.72)',
        borderBottom: `1px solid ${borderColor}`,
        transition: 'background-color 0.4s ease, color 0.4s ease'
      }}
    >
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        maxWidth: '1600px',
        margin: '0 auto',
        minHeight: isMobile ? '44px' : 'auto'
      }}>
        {isMobile ? (
          <>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              style={{
                background: 'transparent',
                border: 'none',
                color: textColor,
                padding: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Menu size={24} />
            </button>

            <Link to="/" style={{ textDecoration: 'none', flex: 1, display: 'flex', justifyContent: 'center' }}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: '0.95rem',
                  fontWeight: 800,
                  color: textColor,
                  letterSpacing: '0.12em',
                  lineHeight: 1,
                  transition: 'color 0.4s ease',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  whiteSpace: 'nowrap'
                }}
              >
                TLP
              </motion.div>
            </Link>

            <div style={{ width: '40px' }} />

            <AnimatePresence>
              {menuOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      position: 'fixed',
                      inset: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.28)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      zIndex: 1100
                    }}
                  />
                  <motion.aside
                    initial={{ x: '-100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '-100%' }}
                    transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                    style={{
                      position: 'fixed',
                      top: 0,
                      left: 0,
                      bottom: 0,
                      width: '82vw',
                      maxWidth: '320px',
                      backgroundColor: '#ffffff',
                      padding: '24px 22px 32px',
                      zIndex: 1101,
                      display: 'flex',
                      flexDirection: 'column',
                      boxShadow: '12px 0 50px rgba(0,0,0,0.12)'
                    }}
                  >
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '28px'
                    }}>
                      <div style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '1.45rem',
                        fontWeight: 800,
                        color: '#000000'
                      }}>
                        Menu
                      </div>
                      <button
                        type="button"
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close navigation menu"
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#000000',
                          padding: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <X size={22} />
                      </button>
                    </div>

                    <nav style={{ display: 'grid', gap: '8px' }}>
                      {navItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                          style={{
                            textDecoration: 'none',
                            color: '#000000',
                            padding: '14px 0',
                            borderBottom: '1px solid rgba(0,0,0,0.08)',
                            fontFamily: "'Playfair Display', serif",
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            letterSpacing: '0.18em',
                            textTransform: 'uppercase'
                          }}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </nav>
                  </motion.aside>
                </>
              )}
            </AnimatePresence>
          </>
        ) : (
          <>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontWeight: 900,
                  color: textColor,
                  letterSpacing: '-0.03em',
                  lineHeight: 1,
                  transition: 'color 0.4s ease'
                }}
              >
                THE LAGOS PAPARAZZI
              </motion.div>
            </Link>
            <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
                  style={{ textDecoration: 'none' }}
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      color: textColor,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      transition: 'opacity 0.3s ease, color 0.4s ease',
                      borderBottom: '1px solid transparent',
                      paddingBottom: '4px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.6';
                      e.currentTarget.style.borderBottomColor = textColor;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.borderBottomColor = 'transparent';
                    }}
                  >
                    {item.label}
                  </motion.div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </motion.nav>
  );
}

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

// Interactive Hero — Full-viewport iframe canvas with stacked text overlay
// Interactive Hero — pure iframe canvas, no overlays
function HeroSection() {
  return (
    <section style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      display: 'block'
    }}>
      <iframe
        src="https://yfa2pyji5ilae.ok.kimi.link"
        title="Interactive Background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block'
        }}
        loading="eager"
        allowFullScreen
      />
    </section>
  );
}

// Portfolio - Masonry Layout with Progressive Loading
const INITIAL_COUNT = 6;

function BentoPortfolio() {
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // IntersectionObserver — load more as the sentinel enters the viewport
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 4, HOME_PORTFOLIO_IMAGES.length));
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  const portfolioItems = HOME_PORTFOLIO_IMAGES.slice(0, visibleCount).map((src, index) => {
    const sizeIndex = index % 3;
    return {
      src,
      size: sizeIndex === 0 ? 'large' : sizeIndex === 1 ? 'medium' : 'small'
    };
  });

  return (
    <section id="portfolio" style={{
      padding: isMobile ? '100px 16px' : '140px 48px',
      maxWidth: '1600px',
      margin: '0 auto',
      backgroundColor: '#FFFFFF'
    }}>
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.9, type: 'spring', damping: 25 }}
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
        P O R T F O L I O
      </motion.h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: isMobile ? '8px' : '16px',
        gridAutoRows: '10px'
      }}>
        {portfolioItems.map((item, index) => {
          const rowSpan = item.size === 'large' ? 40 : item.size === 'medium' ? 30 : 20;
          return (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.55,
                ease: 'easeOut',
                delay: Math.min(index, 5) * 0.06
              }}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              style={{
                gridRowEnd: `span ${rowSpan}`,
                overflow: 'hidden',
                borderRadius: '8px',
                backgroundColor: 'rgba(220,220,220,0.12)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
                border: '1px solid rgba(0,0,0,0.05)',
                willChange: 'transform'
              }}
            >
              <SoftMagneticImage
                src={item.src}
                alt={`Portfolio ${index + 1}`}
                loading={index < INITIAL_COUNT ? 'eager' : 'lazy'}
                decoding="async"
                style={{ width: '100%', height: '100%' }}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Invisible sentinel that triggers loading more images */}
      {visibleCount < HOME_PORTFOLIO_IMAGES.length && (
        <div ref={sentinelRef} style={{ height: '1px', marginTop: '40px' }} />
      )}
    </section>
  );
}

// Stories Section - Film Strip horizontal scroll (Zero Repetition)
function StoriesSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const storiesImages = STORIES_IMAGES;

  return (
    <section id="stories" style={{
      padding: isMobile ? '100px 16px' : '140px 0',
      backgroundColor: '#FFFFFF',
      overflow: 'hidden'
    }}>
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, type: 'spring', damping: 25 }}
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
        S T O R I E S
      </motion.h2>
      
      <div style={{
        display: 'flex',
        gap: '24px',
        padding: '0 48px',
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch'
      }}>
        {storiesImages.map((src, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            style={{
              flex: '0 0 ' + (isMobile ? '300px' : '400px'),
              scrollSnapAlign: 'start',
              height: isMobile ? '400px' : '500px',
              backgroundColor: '#FFFFFF',
              border: '12px solid #FFFFFF',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)'
            }}
          >
            <SafeImage
              src={src}
              alt={`Story ${index + 1}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Services Section (Zero Repetition)
function ServicesSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const services = [
    {
      title: 'Social Currency Consulting',
      description: 'Strategic consulting for building and maintaining social currency in the digital age.',
      image: SERVICES_IMAGES[0]
    },
    {
      title: 'Editorial Photography',
      description: 'High-end editorial photography for fashion brands and publications.',
      image: SERVICES_IMAGES[1]
    },
    {
      title: 'Media House Production',
      description: 'Professional media production services for brands and campaigns.',
      image: SERVICES_IMAGES[2]
    }
  ];

  return (
    <section id="services" style={{
      padding: isMobile ? '100px 16px' : '140px 48px',
      maxWidth: '1600px',
      margin: '0 auto',
      backgroundColor: '#FFFFFF'
    }}>
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, type: 'spring', damping: 25 }}
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
        S E R V I C E S
      </motion.h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: isMobile ? '24px' : '32px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1, type: 'spring', damping: 25 }}
            whileHover={{ 
              scale: 1.02,
              y: -8
            }}
            style={{
              backdropFilter: 'blur(64px)',
              WebkitBackdropFilter: 'blur(64px)',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '4px',
              padding: '48px',
              minHeight: '400px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <div style={{
              width: '100%',
              height: '200px',
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '2px'
            }}>
              <SafeImage
                src={service.image}
                alt={service.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: isMobile ? 'clamp(1.5rem, 4vw, 2rem)' : 'clamp(1.75rem, 3vw, 2.25rem)',
              fontWeight: 900,
              color: '#000000',
              marginBottom: '16px',
              letterSpacing: '-0.03em',
              lineHeight: 1.2
            }}>
              {service.title}
            </h3>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? '0.875rem' : '0.9375rem',
              color: '#333333',
              lineHeight: 1.9,
              letterSpacing: '0.02em'
            }}>
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Academy Section - Pure White Style
function AcademySection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const masterclasses = [
    {
      title: 'Photography Masterclass',
      description: 'Master professional photography techniques for high-end editorial work and visual storytelling.'
    },
    {
      title: 'Lighting & Composition',
      description: 'Learn advanced lighting techniques and composition principles for stunning visual narratives.'
    },
    {
      title: 'Digital Media Strategy',
      description: 'Understand the business and strategy behind successful media houses and editorial operations.'
    }
  ];

  return (
    <section id="academy" style={{
      padding: isMobile ? '100px 16px' : '140px 48px',
      maxWidth: '1600px',
      margin: '0 auto',
      backgroundColor: '#FFFFFF'
    }}>
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, type: 'spring', damping: 25 }}
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
        A C A D E M Y
      </motion.h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
        gap: isMobile ? '24px' : '32px',
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
              minHeight: isMobile ? '320px' : '380px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: isMobile ? 'clamp(1.5rem, 5vw, 2.5rem)' : 'clamp(2rem, 4vw, 3rem)',
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
                color: '#000000',
                lineHeight: 1.9,
                letterSpacing: '0.02em'
              }}>
                {item.description}
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
                cursor: 'none',
                alignSelf: 'flex-start',
                marginTop: '40px',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 4px 20px rgba(192, 192, 192, 0.2)'
              }}
            >
              Join
            </MagneticButton>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// Concierge Booking Section - With thumbnail
function BookingSection() {
  const [formData, setFormData] = useState({ name: '', email: '', occasion: '', date: '' });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your request. We will contact you shortly.');
    setFormData({ name: '', email: '', occasion: '', date: '' });
  };

  return (
    <section id="booking" style={{
      padding: isMobile ? '100px 16px' : '140px 48px',
      maxWidth: '1200px',
      margin: '0 auto',
      backgroundColor: '#FFFFFF'
    }}>
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, type: 'spring', damping: 25 }}
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
        C O N C I E R G E
      </motion.h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 400px',
        gap: isMobile ? '40px' : '80px',
        alignItems: 'start'
      }}>
        <motion.form
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, type: 'spring', damping: 25 }}
          onSubmit={handleSubmit}
          style={{
            backdropFilter: 'blur(64px)',
            WebkitBackdropFilter: 'blur(64px)',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '4px',
            padding: isMobile ? '40px' : '80px',
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? '32px' : '40px'
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
                backdropFilter: 'blur(20px)'
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
                backdropFilter: 'blur(20px)'
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
              Occasion
            </label>
            <input
              type="text"
              required
              value={formData.occasion}
              onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
              style={{
                width: '100%',
                padding: '18px',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                fontFamily: "'Playfair Display', serif",
                fontSize: isMobile ? '0.875rem' : '1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                outline: 'none',
                transition: 'border-color 0.3s ease',
                backdropFilter: 'blur(20px)'
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
              Preferred Date
            </label>
            <input
              type="date"
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
                backdropFilter: 'blur(20px)'
              }}
              onFocus={(e) => e.target.style.borderColor = '#000000'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(0, 0, 0, 0.1)'}
            />
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3 }}
          style={{
            position: 'sticky',
            top: '120px'
          }}
        >
          <div style={{
            border: '16px solid #FFFFFF',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            backgroundColor: '#FFFFFF'
          }}>
            <SafeImage
              src="/28EC5BD0-A857-4799-A690-E048F27566C3.jpg"
              alt="Daniel's Work"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            />
          </div>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? '0.625rem' : '0.75rem',
            color: '#666666',
            letterSpacing: '0.1em',
            textAlign: 'center',
            marginTop: '24px',
            textTransform: 'uppercase'
          }}>
            Featured Work
          </p>
        </motion.div>
      </div>
    </section>
  );
}

// Footer - Grand 4-Column Expansion
function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, type: 'spring', damping: 25 }}
      style={{
        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
        padding: '100px clamp(24px, 5vw, 80px) 64px',
        maxWidth: '1600px',
        margin: '0 auto',
        backgroundColor: '#FFFFFF'
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 'clamp(32px, 6vw, 80px)',
        marginBottom: '80px'
      }}>
        {/* Col 1 - The House */}
        <div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
            fontWeight: 900,
            color: '#000000',
            letterSpacing: '-0.03em',
            marginBottom: '24px',
            lineHeight: 1
          }}>
            THE LAGOS PAPARAZZI
          </div>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '0.625rem',
            fontWeight: 700,
            color: '#666666',
            letterSpacing: '0.2em',
            lineHeight: 1.8,
            textTransform: 'uppercase',
            margin: 0
          }}>
            BUILDING SOCIAL CURRENCY THROUGH VISUAL STORYTELLING. ELEVATING BRANDS AND INDIVIDUALS IN THE DIGITAL AGE.
          </p>
        </div>

        {/* Col 2 - Directory */}
        <div>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '0.625rem',
            fontWeight: 700,
            color: '#000000',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '24px'
          }}>
            DIRECTORY
          </div>
          {[
            { label: 'Portfolio', path: '/portfolio' },
            { label: 'Academy', path: '/academy' },
            { label: 'Stories', path: '/stories' },
            { label: 'Booking', path: '/booking' }
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '0.625rem',
                fontWeight: 700,
                color: '#666666',
                textDecoration: 'none',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '16px',
                transition: 'opacity 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.5'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              {item.label.toUpperCase()}
            </Link>
          ))}
        </div>

        {/* Col 3 - Locations */}
        <div>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '0.625rem',
            fontWeight: 700,
            color: '#000000',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '24px'
          }}>
            LOCATIONS
          </div>
          {['Lagos', 'London', 'Paris'].map((location) => (
            <div
              key={location}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '0.625rem',
                fontWeight: 700,
                color: '#666666',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                marginBottom: '16px'
              }}
            >
              {location.toUpperCase()}
            </div>
          ))}
        </div>

        {/* Col 4 - Connect */}
        <div>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '0.625rem',
            fontWeight: 700,
            color: '#000000',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '24px'
          }}>
            CONNECT
          </div>
          <a
            href="https://instagram.com/thelagospaparazzi"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '0.625rem',
              fontWeight: 700,
              color: '#666666',
              textDecoration: 'none',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '16px',
              transition: 'opacity 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.5'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            INSTAGRAM
          </a>
          <a
            href="https://wa.me/2341234567890"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '0.625rem',
              fontWeight: 700,
              color: '#666666',
              textDecoration: 'none',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '16px',
              transition: 'opacity 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.5'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            WHATSAPP
          </a>
          <a
            href="mailto:info@thelagospaparazzi.com"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '0.625rem',
              fontWeight: 700,
              color: '#666666',
              textDecoration: 'none',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '16px',
              transition: 'opacity 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.5'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            EMAIL
          </a>
        </div>

        {/* Col 5 - Legal */}
        <div>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '0.625rem',
            fontWeight: 700,
            color: '#000000',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '24px'
          }}>
            LEGAL
          </div>
          <Link
            to="/terms"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '0.625rem',
              fontWeight: 700,
              color: '#666666',
              textDecoration: 'none',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '16px',
              transition: 'opacity 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.5'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            TERMS OF SERVICE
          </Link>
          <Link
            to="/privacy"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '0.625rem',
              fontWeight: 700,
              color: '#666666',
              textDecoration: 'none',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '16px',
              transition: 'opacity 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.5'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            PRIVACY POLICY
          </Link>
          <Link
            to="/refund"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '0.625rem',
              fontWeight: 700,
              color: '#666666',
              textDecoration: 'none',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '16px',
              transition: 'opacity 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.opacity = '0.5'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            REFUND POLICY
          </Link>
        </div>
      </div>
      <div style={{
        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
        paddingTop: '40px',
        textAlign: 'center'
      }}>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '0.625rem',
          fontWeight: 700,
          color: '#999999',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <span>© {new Date().getFullYear()} THE LAGOS PAPARAZZI. ALL RIGHTS RESERVED.</span>
          <span style={{ fontSize: '0.625rem', letterSpacing: '0.2em' }}>MADE BY </span>
          <a
            href="https://nile.studio"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '0.625rem',
              fontWeight: 700,
              color: '#999999',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              textShadow: '0 0 0px rgba(192, 192, 192, 0)'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#000000';
              e.target.style.textShadow = '0 0 8px rgba(192, 192, 192, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#999999';
              e.target.style.textShadow = '0 0 0px rgba(192, 192, 192, 0)';
            }}
          >
            NILE
          </a>
        </p>
      </div>
    </motion.footer>
  );
}

// Home Page Component
function Home() {
  return (
    <div>
      <HeroSection />
      <BentoPortfolio />
      <StoriesSection />
      <ServicesSection />
      <AcademySection />
      <BookingSection />
    </div>
  );
}

// Inner app — needs to be inside BrowserRouter so useLocation works
function AppInner() {
  const location = useLocation();
  const isAdminRoute = location.pathname === '/admin' || location.pathname === '/login';

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <CleanCursor />
      {!isAdminRoute && <GlassNavbar />}

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/refund" element={<Refund />} />
            <Route path="/login" element={<Admin />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
          {!isAdminRoute && <Footer />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// Main App Component
function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppInner />
    </BrowserRouter>
  );
}

export default App;
