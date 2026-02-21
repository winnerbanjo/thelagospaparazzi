import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Sidebar() {
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Show sidebar when mouse is within 50px of left edge
      if (e.clientX < 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const menuItems = [
    { path: '/', label: 'Home' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/academy', label: 'Academy' },
    { path: '/stories', label: 'Cultural Moments' },
    { path: '/booking', label: 'Concierge' }
  ];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ type: 'spring', stiffness: 150, damping: 20 }}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            height: '100vh',
            width: '280px',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(48px) saturate(180%)',
            WebkitBackdropFilter: 'blur(48px) saturate(180%)',
            borderRight: '1px solid rgba(0, 0, 0, 0.05)',
            zIndex: 100,
            padding: '80px 32px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}
          onMouseEnter={() => setIsVisible(true)}
          onMouseLeave={() => setIsVisible(false)}
        >
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: '#000000',
              fontSize: '1.5rem',
              fontWeight: 700,
              marginBottom: '32px',
              letterSpacing: '0.02em'
            }}
          >
            Navigation
          </h2>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  color: location.pathname === item.path ? '#000000' : 'rgba(0, 0, 0, 0.6)',
                  fontSize: '0.875rem',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: location.pathname === item.path ? 600 : 400,
                  padding: '8px 0',
                  borderBottom: location.pathname === item.path ? '1px solid rgba(0, 0, 0, 0.2)' : 'none',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== item.path) {
                    e.target.style.color = '#000000';
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== item.path) {
                    e.target.style.color = 'rgba(0, 0, 0, 0.6)';
                  }
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
