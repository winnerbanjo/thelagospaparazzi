import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeImage from '../components/SafeImage';

export default function Terms() {
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
          Terms of Service
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
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using The Lagos Paparazzi website and services, you accept and agree 
              to be bound by the terms and provision of this agreement. If you do not agree to abide 
              by the above, please do not use this service.
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
              2. Services
            </h2>
            <p>
              The Lagos Paparazzi provides editorial photography, media production, and consulting 
              services. All services are subject to availability and are provided in accordance with 
              the terms agreed upon in individual service contracts.
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
              3. Intellectual Property
            </h2>
            <p>
              All content, images, and materials on this website are the exclusive property of 
              The Lagos Paparazzi and are protected by copyright and other intellectual property laws. 
              Unauthorized use, reproduction, or distribution of any content is strictly prohibited.
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
              4. Client Responsibilities
            </h2>
            <p>
              Clients are responsible for providing accurate information, timely payments, and 
              cooperation necessary for service delivery. Failure to meet these responsibilities 
              may result in service delays or cancellation.
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
              5. Limitation of Liability
            </h2>
            <p>
              The Lagos Paparazzi shall not be liable for any indirect, incidental, special, or 
              consequential damages arising from the use of our services. Our total liability 
              shall not exceed the amount paid for the specific service in question.
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
              6. Modifications
            </h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of our services 
              after such modifications constitutes acceptance of the updated terms.
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
