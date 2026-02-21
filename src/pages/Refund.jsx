import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Refund() {
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
          Refund Policy
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
              1. Cancellation Policy
            </h2>
            <p>
              Cancellations must be made at least 14 days before the scheduled event date to be 
              eligible for a full refund. Cancellations made between 7-14 days before the event 
              will receive a 50% refund. Cancellations made less than 7 days before the event 
              are not eligible for a refund.
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
              2. Refund Processing
            </h2>
            <p>
              Refunds will be processed to the original payment method within 10-14 business days 
              after approval. Please allow additional time for your bank or credit card company 
              to process the refund.
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
              3. Service Modifications
            </h2>
            <p>
              If we are unable to provide the agreed-upon services due to circumstances beyond our 
              control, we will offer a full refund or reschedule the service at no additional cost, 
              at your discretion.
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
              4. Non-Refundable Items
            </h2>
            <p>
              Deposits and retainer fees are non-refundable. Additionally, any custom work or 
              deliverables that have been completed and delivered are not eligible for refund.
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
              5. Contact for Refunds
            </h2>
            <p>
              To request a refund, please contact us at info@thelagospaparazzi.com with your 
              booking reference number and reason for cancellation. All refund requests will be 
              reviewed within 5 business days.
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
