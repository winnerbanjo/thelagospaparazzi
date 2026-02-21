import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Privacy() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', paddingTop: '120px' }}>
      <section style={{
        padding: isMobile ? '100px 24px' : '140px 48px',
        maxWidth: '900px',
        margin: '0 auto',
        backgroundColor: '#FFFFFF'
      }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: isMobile ? 'clamp(2.5rem, 8vw, 4rem)' : 'clamp(4rem, 8vw, 6rem)',
            fontWeight: 900,
            color: '#000000',
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            marginBottom: '48px'
          }}
        >
          Privacy Policy
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? '0.9375rem' : '1rem',
            color: '#333333',
            lineHeight: 1.9,
            letterSpacing: '0.02em'
          }}
        >
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: isMobile ? '1.75rem' : '2rem',
              fontWeight: 900,
              color: '#000000',
              marginBottom: '16px',
              marginTop: '32px'
            }}>
              1. Information We Collect
            </h2>
            <p>
              We collect information that you provide directly to us, including name, email address, 
              phone number, and event details when you book our services or contact us. We also 
              automatically collect certain information about your device and how you interact with 
              our website.
            </p>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: isMobile ? '1.75rem' : '2rem',
              fontWeight: 900,
              color: '#000000',
              marginBottom: '16px',
              marginTop: '32px'
            }}>
              2. How We Use Your Information
            </h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, 
              process bookings, communicate with you, and comply with legal obligations. We do not 
              sell your personal information to third parties.
            </p>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: isMobile ? '1.75rem' : '2rem',
              fontWeight: 900,
              color: '#000000',
              marginBottom: '16px',
              marginTop: '32px'
            }}>
              3. Data Security
            </h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal 
              information against unauthorized access, alteration, disclosure, or destruction. However, 
              no method of transmission over the internet is 100% secure.
            </p>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: isMobile ? '1.75rem' : '2rem',
              fontWeight: 900,
              color: '#000000',
              marginBottom: '16px',
              marginTop: '32px'
            }}>
              4. Your Rights
            </h2>
            <p>
              You have the right to access, update, or delete your personal information at any time. 
              You may also opt out of certain communications from us. To exercise these rights, 
              please contact us at info@thelagospaparazzi.com.
            </p>
          </div>

          <div style={{ marginBottom: '40px' }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: isMobile ? '1.75rem' : '2rem',
              fontWeight: 900,
              color: '#000000',
              marginBottom: '16px',
              marginTop: '32px'
            }}>
              5. Cookies
            </h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our website and 
              hold certain information. You can instruct your browser to refuse all cookies or to 
              indicate when a cookie is being sent.
            </p>
          </div>

          <p style={{
            marginTop: '48px',
            fontSize: isMobile ? '0.875rem' : '0.9375rem',
            color: '#666666',
            fontStyle: 'italic'
          }}>
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </motion.div>
      </section>
    </div>
  );
}
