import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeImage from '../components/SafeImage';
import { STORIES_HERO_IMAGE } from '../utils/images';

export default function Stories() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const words = ['THE', 'LAGOS', 'PAPARAZZI'];

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '120px 24px 60px' : '140px 48px',
        backgroundColor: '#FFFFFF',
        overflow: 'hidden'
      }}>
        {/* Hero Image Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0
        }}>
          <SafeImage
            src={STORIES_HERO_IMAGE}
            alt="Stories Hero"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.4) contrast(1.1)'
            }}
          />
        </div>

        {/* Hero Text Overlay */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          width: '100%',
          maxWidth: '1200px'
        }}>
          <h1 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: isMobile ? 'clamp(2.5rem, 10vw, 5rem)' : 'clamp(5rem, 10vw, 12rem)',
            fontWeight: 900,
            color: '#FFFFFF',
            letterSpacing: '-0.04em',
            lineHeight: 0.9,
            margin: 0,
            textAlign: 'center',
            whiteSpace: 'nowrap',
            wordBreak: 'keep-all',
            hyphens: 'none',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
          }}>
            {words.map((word, wordIndex) => (
              <motion.span
                key={word}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                  delay: wordIndex * 0.15
                }}
                style={{ display: 'block' }}
              >
                {word.split('').map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 200,
                      damping: 20,
                      delay: (wordIndex * 0.15) + (letterIndex * 0.03)
                    }}
                    style={{ display: 'inline-block' }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.span>
            ))}
          </h1>
        </div>
      </section>

      {/* Vertical Editorial Layout */}
      <section style={{ 
        padding: isMobile ? '80px 24px' : '120px 48px', 
        maxWidth: '900px', 
        margin: '0 auto'
      }}>
        {/* Lead Image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          style={{
            marginBottom: '60px',
            width: '100%'
          }}
        >
          <SafeImage
            src="/44ACBAB4-1971-4650-B3F6-C878D12E2D4D.png"
            alt="The Night in Lagos"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              borderRadius: '4px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)'
            }}
          />
        </motion.div>

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: isMobile ? 'clamp(2.5rem, 8vw, 4rem)' : 'clamp(4rem, 8vw, 6rem)',
            fontWeight: 900,
            color: '#000000',
            letterSpacing: '-0.04em',
            lineHeight: 1.1,
            marginBottom: '24px',
            marginTop: '0'
          }}>
            The Night in Lagos
          </h2>

          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? '0.75rem' : '0.875rem',
            color: '#666666',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '40px',
            fontWeight: 600
          }}>
            Editorial Feature • Lagos, Nigeria • 2026
          </div>

          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? '1rem' : '1.125rem',
            color: '#333333',
            lineHeight: 1.9,
            letterSpacing: '0.02em',
            marginBottom: '32px'
          }}>
            <p style={{ marginBottom: '24px' }}>
              The city never sleeps. Under the cover of darkness, Lagos transforms into a stage where 
              the elite gather, where moments are captured, and where stories unfold in the most 
              unexpected ways. This is the world of The Lagos Paparazzi—a world where timing is 
              everything, and every frame tells a story.
            </p>
            <p style={{ marginBottom: '24px' }}>
              On this particular night, the air was electric. A high-profile event had drawn the 
              city's most influential figures, and our lens was there to document it all. The 
              challenge wasn't just capturing the moment—it was capturing the essence, the emotion, 
              the unspoken narratives that play out in the shadows of luxury.
            </p>
            <p>
              This is editorial photography at its finest. Not just documentation, but artistry. 
              Not just images, but visual narratives that speak to power, prestige, and the 
              relentless pursuit of excellence that defines Lagos.
            </p>
          </div>
        </motion.article>
      </section>
    </div>
  );
}
