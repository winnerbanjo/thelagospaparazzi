export default function Footer() {
  return (
    <footer
      style={{
        padding: '64px 32px 32px',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid rgba(0, 0, 0, 0.1)',
        marginTop: '80px'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '32px'
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: '#000000',
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}
            >
              THE LAGOS PAPARAZZI
            </h3>
            <p
              style={{
                color: 'rgba(0, 0, 0, 0.5)',
                fontSize: '0.75rem',
                fontFamily: "'Inter', sans-serif",
                textTransform: 'uppercase',
                letterSpacing: '0.1em'
              }}
            >
              © 2026 ALL RIGHTS RESERVED
            </p>
          </div>
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href="https://instagram.com/thelagospaparazzi"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'rgba(0, 0, 0, 0.7)',
                  fontSize: '0.75rem',
                  textDecoration: 'none',
                  fontFamily: "'Inter', sans-serif",
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  transition: 'opacity 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.opacity = '0.5'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                @THELAGOSPAPARAZZI
              </a>
              <a
                href="mailto:contact@thelagospaparazzi.com"
                style={{
                  color: 'rgba(0, 0, 0, 0.7)',
                  fontSize: '0.75rem',
                  textDecoration: 'none',
                  fontFamily: "'Inter', sans-serif",
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  transition: 'opacity 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.opacity = '0.5'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                CONTACT@THELAGOSPAPARAZZI.COM
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
