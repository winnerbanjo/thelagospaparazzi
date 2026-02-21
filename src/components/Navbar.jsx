import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/academy', label: 'Academy' },
    { path: '/stories', label: 'Stories' },
    { path: '/booking', label: 'Booking' }
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: '16px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '90%',
        maxWidth: '1000px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(48px) saturate(180%)',
        WebkitBackdropFilter: 'blur(48px) saturate(180%)',
        border: '1px solid rgba(0, 0, 0, 0.05)',
        borderRadius: '9999px',
        padding: '12px 24px',
        zIndex: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.6s ease',
        boxShadow: '0 2px 16px rgba(0, 0, 0, 0.04)'
      }}
    >
      <Link
        to="/"
        style={{
          fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
          color: '#000000',
          fontSize: '1rem',
          fontWeight: 700,
          textDecoration: 'none',
          letterSpacing: '0.02em'
        }}
      >
        The Lagos Paparazzi
      </Link>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                color: '#000000',
                fontSize: '0.75rem',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                opacity: isActive ? 1 : 0.7,
                fontWeight: isActive ? 600 : 500,
                transition: 'opacity 0.3s ease',
                fontFamily: "'Inter', sans-serif"
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.target.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.target.style.opacity = '0.7';
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
