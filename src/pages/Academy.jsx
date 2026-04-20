import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';

const flyers = [
  '/masterclass/million-dollar-photo-2.jpeg',
  '/masterclass/million-dollar-photo-4.jpeg',
  '/masterclass/million-dollar-photo-5.jpeg'
];

const initialFormData = {
  fullName: '',
  email: '',
  phone: '',
  instagramHandle: '',
  currentLevel: 'Beginner',
  deviceInUse: '',
  attractionReason: '',
  currentLimitation: '',
  expectedResult: '',
  commitmentStatus: 'Yes',
  transferReference: '',
  paymentConfirmed: false
};

const sectionWidth = {
  maxWidth: '1240px',
  margin: '0 auto',
  padding: '0 24px'
};

function Label({ children }) {
  return (
    <label style={{
      display: 'block',
      fontFamily: "'Playfair Display', serif",
      fontSize: '0.76rem',
      fontWeight: 700,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color: '#111111',
      marginBottom: '12px'
    }}>
      {children}
    </label>
  );
}

function InputBase({ as = 'input', style, ...props }) {
  const Component = as;
  return (
    <Component
      {...props}
      style={{
        width: '100%',
        padding: '16px 18px',
        border: '1px solid rgba(0, 0, 0, 0.12)',
        borderRadius: '4px',
        backgroundColor: 'rgba(255, 255, 255, 0.88)',
        color: '#111111',
        fontFamily: "'Playfair Display', serif",
        fontSize: '1rem',
        lineHeight: 1.6,
        outline: 'none',
        resize: as === 'textarea' ? 'vertical' : 'none',
        minHeight: as === 'textarea' ? '140px' : undefined,
        ...style
      }}
    />
  );
}

function TextAction({ children, onClick, style }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        background: 'transparent',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
        fontFamily: "'Playfair Display', serif",
        fontSize: '0.9rem',
        color: '#111111',
        textDecoration: 'underline',
        textUnderlineOffset: '6px',
        ...style
      }}
    >
      {children}
    </button>
  );
}

export default function Academy() {
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitState, setSubmitState] = useState({ type: '', message: '' });

  useEffect(() => {
    const syncViewport = () => setIsMobile(window.innerWidth < 900);
    syncViewport();
    window.addEventListener('resize', syncViewport);
    return () => window.removeEventListener('resize', syncViewport);
  }, []);

  const highlights = useMemo(() => ([
    '2 days intense learning & workshops',
    'Flash photography hacks',
    'Continuous lighting techniques',
    'AI tools, apps and workflow shortcuts',
    'TLP preset direction',
    'Retouch and editing guidance',
    'Pose choreography and camera settings'
  ]), []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitState({ type: '', message: '' });

    try {
      await api.post('/masterclass-applications', {
        ...formData,
        paymentMethod: 'Bank Transfer'
      });

      setSubmitState({
        type: 'success',
        message: 'Your application has been received. We will review it and contact you with the next step.'
      });
      setFormData(initialFormData);
    } catch (error) {
      setSubmitState({
        type: 'error',
        message: error.response?.data?.error || 'Something went wrong while sending your application. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToApplication = () => {
    const target = document.getElementById('masterclass-application');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingTop: isMobile ? '96px' : '120px', paddingBottom: isMobile ? '110px' : '0' }}>
      <section style={{ ...sectionWidth, paddingTop: isMobile ? '8px' : '48px', paddingBottom: '72px' }}>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1.05fr) minmax(0, 0.95fr)',
            gap: '48px',
            alignItems: 'start'
          }}
        >
          <div style={{ textAlign: isMobile ? 'center' : 'left' }}>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? '0.72rem' : '0.78rem',
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: 'rgba(0, 0, 0, 0.55)',
              marginBottom: isMobile ? '12px' : '16px'
            }}>
              Private Class Application
            </p>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: isMobile ? 'clamp(2.45rem, 11vw, 3.5rem)' : 'clamp(3rem, 7vw, 6.4rem)',
              lineHeight: isMobile ? 0.9 : 0.9,
              letterSpacing: '-0.05em',
              color: '#000000',
              marginBottom: isMobile ? '16px' : '22px',
              fontWeight: 800,
              maxWidth: isMobile ? '100%' : 'none',
              marginLeft: isMobile ? 'auto' : 0,
              marginRight: isMobile ? 'auto' : 0
            }}>
              {isMobile ? (
                <>
                  The Million Dollar
                  <br />
                  Photo
                  <br />
                  Masterclass
                </>
              ) : (
                'The Million Dollar Photo Masterclass'
              )}
            </h1>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: isMobile ? '0.92rem' : '1.04rem',
              lineHeight: isMobile ? 1.72 : 1.9,
              color: '#353535',
              maxWidth: isMobile ? '31ch' : '650px',
              marginBottom: isMobile ? '22px' : '30px',
              marginLeft: isMobile ? 'auto' : 0,
              marginRight: isMobile ? 'auto' : 0
            }}>
              A focused, high-standard private class for photographers who want magazine-level results, stronger direction, sharper lighting choices, and a more refined creative process.
            </p>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', justifyContent: isMobile ? 'center' : 'flex-start', flexWrap: 'wrap', marginBottom: isMobile ? '26px' : '34px' }}>
              <button
                type="button"
                onClick={scrollToApplication}
                style={{
                  padding: isMobile ? '15px 22px' : '17px 28px',
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '999px',
                  fontFamily: "'Playfair Display', serif",
                  fontSize: isMobile ? '0.74rem' : '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  cursor: 'pointer'
                }}
              >
                Register Now
              </button>
              <TextAction
                onClick={scrollToApplication}
                style={{
                  fontSize: isMobile ? '0.82rem' : '0.9rem'
                }}
              >
                Go straight to application
              </TextAction>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))',
              gap: '16px',
              marginBottom: '28px'
            }}>
              <div style={{ borderTop: '1px solid rgba(0, 0, 0, 0.14)', paddingTop: '14px' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(0,0,0,0.5)', marginBottom: '8px' }}>Date</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 700, color: '#000' }}>May 4th - May 5th 2026</div>
              </div>
              <div style={{ borderTop: '1px solid rgba(0, 0, 0, 0.14)', paddingTop: '14px' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(0,0,0,0.5)', marginBottom: '8px' }}>Investment</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', fontWeight: 700, color: '#000' }}>₦500,000</div>
              </div>
            </div>

            <div style={{
              border: '1px solid rgba(0, 0, 0, 0.1)',
              padding: '28px',
              background: 'linear-gradient(180deg, rgba(250,250,250,0.95) 0%, rgba(255,255,255,1) 100%)'
            }}>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '0.78rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(0, 0, 0, 0.55)',
                marginBottom: '18px'
              }}>
                What You’ll Walk Away With
              </p>
              <div style={{ display: 'grid', gap: '12px' }}>
                {highlights.map((item) => (
                  <div
                    key={item}
                    style={{
                      paddingBottom: '12px',
                      borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '0.98rem',
                      color: '#1f1f1f'
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))',
              gap: '16px'
            }}>
              {flyers.map((flyer, index) => (
                <motion.div
                  key={flyer}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.12 }}
                  style={{
                    gridColumn: index === 0 ? '1 / -1' : 'auto',
                    overflow: 'hidden',
                    border: '1px solid rgba(0,0,0,0.08)',
                    backgroundColor: '#f6f6f4'
                  }}
                >
                  <img
                    src={flyer}
                    alt="Million Dollar Photo Masterclass flyer"
                    style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </motion.div>
              ))}
            </div>
            {!isMobile ? (
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '18px' }}>
                <TextAction onClick={scrollToApplication} style={{ letterSpacing: '0.12em', textTransform: 'uppercase', fontSize: '0.74rem' }}>
                  Register for the class
                </TextAction>
              </div>
            ) : null}
          </div>
        </motion.div>
      </section>

      <section style={{ ...sectionWidth, paddingBottom: '88px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 0.9fr) minmax(0, 1.1fr)',
          gap: '32px',
          alignItems: 'start'
        }}>
          <div style={{
            position: isMobile ? 'static' : 'sticky',
            top: isMobile ? 'auto' : '140px',
            border: '1px solid rgba(0, 0, 0, 0.1)',
            padding: '32px',
            backgroundColor: '#fafaf8'
          }}>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '0.78rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(0, 0, 0, 0.55)',
              marginBottom: '14px'
            }}>
              Payment by Transfer
            </p>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2.2rem', fontWeight: 700, color: '#000', marginBottom: '14px' }}>
              Secure Your Place
            </div>
            <p style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '0.98rem',
              color: '#333',
              lineHeight: 1.8,
              marginBottom: '24px'
            }}>
              Complete payment by transfer, then submit your application with the transfer reference or sender name so the team can confirm your seat.
            </p>

            <div style={{ display: 'grid', gap: '14px', marginBottom: '22px' }}>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.16em', color: 'rgba(0,0,0,0.5)', marginBottom: '6px' }}>Account Number</div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 700, color: '#000' }}>5403496157</div>
              </div>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.16em', color: 'rgba(0,0,0,0.5)', marginBottom: '6px' }}>Account Name</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', color: '#111' }}>The Lagos Paparazzi</div>
              </div>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.16em', color: 'rgba(0,0,0,0.5)', marginBottom: '6px' }}>Bank</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', color: '#111' }}>Providus Bank</div>
              </div>
            </div>

            <div style={{
              borderTop: '1px solid rgba(0, 0, 0, 0.08)',
              paddingTop: '18px',
              fontFamily: "'Playfair Display', serif",
              fontSize: '0.95rem',
              lineHeight: 1.8,
              color: '#444'
            }}>
              <div style={{ marginBottom: '16px' }}>
                Only 20 seats are available. Applications are reviewed carefully to maintain the standard of the room.
              </div>
              <TextAction onClick={scrollToApplication} style={{ fontSize: '0.82rem', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
                Fill the application form
              </TextAction>
            </div>
          </div>

          <div id="masterclass-application" style={{
            border: '1px solid rgba(0, 0, 0, 0.1)',
            padding: isMobile ? '28px 22px' : '36px',
            backgroundColor: '#ffffff'
          }}>
            <div style={{ marginBottom: '28px' }}>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '0.78rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(0, 0, 0, 0.55)',
                marginBottom: '14px'
              }}>
                Application Form
              </p>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                lineHeight: 0.95,
                margin: 0,
                color: '#000',
                fontWeight: 800
              }}>
                Private Class Application
              </h2>
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '0.98rem',
                lineHeight: 1.8,
                color: '#4a4a4a',
                maxWidth: '620px',
                marginTop: '12px',
                marginBottom: 0
              }}>
                Complete the form below to apply. After payment, include your transfer reference so your seat can be reviewed quickly.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))', gap: '18px' }}>
                <div>
                  <Label>1. Full Name</Label>
                  <InputBase name="fullName" value={formData.fullName} onChange={handleChange} required />
                </div>
                <div>
                  <Label>2. Email Address</Label>
                  <InputBase type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))', gap: '18px' }}>
                <div>
                  <Label>3. Phone Number (WhatsApp)</Label>
                  <InputBase name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
                <div>
                  <Label>4. Instagram Handle</Label>
                  <InputBase name="instagramHandle" value={formData.instagramHandle} onChange={handleChange} required placeholder="@yourhandle" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))', gap: '18px' }}>
                <div>
                  <Label>5. Current Level</Label>
                  <InputBase as="select" name="currentLevel" value={formData.currentLevel} onChange={handleChange} required>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </InputBase>
                </div>
                <div>
                  <Label>6. Current Device/Gadget in Use</Label>
                  <InputBase name="deviceInUse" value={formData.deviceInUse} onChange={handleChange} required placeholder="Camera, lens, phone, laptop, lighting..." />
                </div>
              </div>

              <div>
                <Label>7. What drew you to this class?</Label>
                <InputBase as="textarea" name="attractionReason" value={formData.attractionReason} onChange={handleChange} required />
              </div>

              <div>
                <Label>8. What is the one limitation currently holding your work back?</Label>
                <InputBase as="textarea" name="currentLimitation" value={formData.currentLimitation} onChange={handleChange} required />
              </div>

              <div>
                <Label>9. What specific result would make this experience exceptional for you?</Label>
                <InputBase as="textarea" name="expectedResult" value={formData.expectedResult} onChange={handleChange} required />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, minmax(0, 1fr))', gap: '18px' }}>
                <div>
                  <Label>10. Are you prepared to commit fully and secure your place?</Label>
                  <InputBase as="select" name="commitmentStatus" value={formData.commitmentStatus} onChange={handleChange} required>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </InputBase>
                </div>
                <div>
                  <Label>Transfer Reference / Sender Name</Label>
                  <InputBase name="transferReference" value={formData.transferReference} onChange={handleChange} placeholder="Optional but recommended" />
                </div>
              </div>

              <label style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '16px 18px',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                backgroundColor: '#fafaf8',
                fontFamily: "'Playfair Display', serif",
                color: '#222',
                lineHeight: 1.7
              }}>
                <input
                  type="checkbox"
                  name="paymentConfirmed"
                  checked={formData.paymentConfirmed}
                  onChange={handleChange}
                  required
                  style={{ marginTop: '4px' }}
                />
                <span>I understand payment is by transfer to the account above, and I have either paid already or I am ready to secure my place immediately.</span>
              </label>

              {submitState.message ? (
                <div style={{
                  padding: '16px 18px',
                  border: `1px solid ${submitState.type === 'success' ? 'rgba(38, 119, 62, 0.16)' : 'rgba(154, 38, 38, 0.16)'}`,
                  backgroundColor: submitState.type === 'success' ? '#f4fbf5' : '#fff5f5',
                  color: submitState.type === 'success' ? '#235534' : '#8d2b2b',
                  fontFamily: "'Playfair Display', serif"
                }}>
                  {submitState.message}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: '18px 28px',
                  backgroundColor: '#000000',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  opacity: isSubmitting ? 0.7 : 1
                }}
              >
                {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {isMobile ? (
        <div style={{
          position: 'fixed',
          left: '16px',
          right: '16px',
          bottom: '16px',
          zIndex: 40,
          padding: '10px',
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: '999px',
          backgroundColor: 'rgba(255,255,255,0.94)',
          boxShadow: '0 14px 35px rgba(0,0,0,0.08)',
          backdropFilter: 'blur(16px)'
        }}>
          <button
            type="button"
            onClick={scrollToApplication}
            style={{
              width: '100%',
              padding: '16px 18px',
              border: 'none',
              borderRadius: '999px',
              backgroundColor: '#000000',
              color: '#ffffff',
              fontFamily: "'Playfair Display', serif",
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'pointer'
            }}
          >
            Register for Masterclass
          </button>
        </div>
      ) : null}
    </div>
  );
}
