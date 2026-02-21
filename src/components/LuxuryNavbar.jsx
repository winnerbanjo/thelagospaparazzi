import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LuxuryNavbar() {
  const location = useLocation();

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
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '24px 48px',
        backdropFilter: 'blur(40px)',
        WebkitBackdropFilter: 'blur(40px)',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Link
        to="/"
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.25rem',
          fontWeight: 900,
          color: '#000000',
          textDecoration: 'none',
          letterSpacing: '-0.02em'
        }}
      >
        THE LAGOS PAPARAZZI
      </Link>

      <div style={{ display: 'flex', gap: '48px', alignItems: 'center' }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '0.875rem',
                fontWeight: isActive ? 700 : 500,
                color: '#000000',
                textDecoration: 'none',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                position: 'relative',
                paddingBottom: '4px',
                transition: 'opacity 0.3s ease'
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
