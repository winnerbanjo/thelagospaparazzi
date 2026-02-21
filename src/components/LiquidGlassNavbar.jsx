import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LiquidGlassNavbar() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/academy', label: 'Academy' },
    { path: '/booking', label: 'Booking' }
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: isMobile ? '20px 24px' : '24px 48px',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        backgroundColor: 'rgba(255, 255, 255, 0.4)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: isMobile ? 'wrap' : 'nowrap'
      }}
    >
      <Link
        to="/"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: isMobile ? '1.125rem' : '1.5rem',
          fontWeight: 900,
          color: '#000000',
          textDecoration: 'none',
          letterSpacing: '-0.02em',
          whiteSpace: 'nowrap'
        }}
      >
        THE LAGOS PAPARAZZI
      </Link>

      <div style={{ 
        display: 'flex', 
        gap: isMobile ? '24px' : '48px', 
        alignItems: 'center',
        flexWrap: 'wrap'
      }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: isMobile ? '0.75rem' : '0.875rem',
                fontWeight: isActive ? 700 : 500,
                color: '#000000',
                textDecoration: 'none',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                position: 'relative',
                paddingBottom: '4px',
                transition: 'opacity 0.3s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.6'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              {item.label}
              {isActive && (
                <motion.div
                  layoutId="navbar-indicator"
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: '1px',
                    backgroundColor: '#000000'
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
