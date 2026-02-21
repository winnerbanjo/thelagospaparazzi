import { motion } from 'framer-motion';

export default function GrandFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      style={{
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
        padding: '80px 48px 48px',
        marginTop: '120px'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '64px',
          marginBottom: '64px'
        }}>
          {/* Newsletter */}
          <div>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#000000',
              marginBottom: '24px',
              letterSpacing: '-0.02em'
            }}>
              Newsletter
            </h3>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '0.875rem',
              color: '#666666',
              marginBottom: '24px',
              lineHeight: 1.6
            }}>
              Stay updated with our latest editorial work and exclusive content.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for subscribing!');
              }}
              style={{ display: 'flex', gap: '12px' }}
            >
              <input
                type="email"
                placeholder="Your email"
                required
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '0.875rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(10px)',
                  outline: 'none'
                }}
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  border: 'none',
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer'
                }}
              >
                Subscribe
              </motion.button>
            </form>
          </div>

          {/* Instagram */}
          <div>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#000000',
              marginBottom: '24px',
              letterSpacing: '-0.02em'
            }}>
              Connect
            </h3>
            <a
              href="https://instagram.com/thelagospaparazzi"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1rem',
                color: '#000000',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'opacity 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.6'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              @thelagospaparazzi
            </a>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(0, 0, 0, 0.05)',
          paddingTop: '32px',
          textAlign: 'center'
        }}>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '0.75rem',
            color: '#999999',
            letterSpacing: '0.1em',
            textTransform: 'uppercase'
          }}>
            © {new Date().getFullYear()} The Lagos Paparazzi. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
