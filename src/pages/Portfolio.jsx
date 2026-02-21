import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import SafeImage from '../components/SafeImage';
import { PORTFOLIO_ARCHIVE_IMAGES } from '../utils/images';

const INITIAL_BATCH = 12;
const LOAD_MORE_BATCH = 10;

// Magnetic tilt — disabled on mobile to save frames
function SoftMagneticImage({ src, alt, style, loading, decoding }) {
  const ref = useRef(null);
  const [isMobile] = useState(() => window.innerWidth < 768);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const cfg = { damping: 30, stiffness: 150 };
  const sx = useSpring(x, cfg);
  const sy = useSpring(y, cfg);
  const srx = useSpring(rotateX, cfg);
  const sry = useSpring(rotateY, cfg);

  const onMove = (e) => {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const max = Math.max(rect.width, rect.height);
    x.set((dx / max) * 8);
    y.set((dy / max) * 8);
    rotateX.set((dy / max) * 2.5);
    rotateY.set((dx / max) * -2.5);
  };

  const onLeave = () => {
    x.set(0); y.set(0); rotateX.set(0); rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        x: sx, y: sy, rotateX: srx, rotateY: sry,
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        width: '100%',
        height: '100%'
      }}
    >
      <SafeImage
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </motion.div>
  );
}

export default function Portfolio() {
  const [isMobile, setIsMobile] = useState(false);
  const [visibleCount, setVisibleCount] = useState(INITIAL_BATCH);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Sentinel-based progressive load
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) =>
            Math.min(prev + LOAD_MORE_BATCH, PORTFOLIO_ARCHIVE_IMAGES.length)
          );
        }
      },
      { rootMargin: '300px' }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [visibleCount]); // re-attach when count changes so sentinel moves

  const portfolioItems = PORTFOLIO_ARCHIVE_IMAGES.slice(0, visibleCount).map((src, index) => {
    const sizeIndex = index % 3;
    return {
      src,
      size: sizeIndex === 0 ? 'large' : sizeIndex === 1 ? 'medium' : 'small'
    };
  });

  return (
    <div style={{ backgroundColor: '#FFFFFF', minHeight: '100vh', paddingTop: '120px' }}>
      <section style={{
        padding: isMobile ? '60px 16px 120px' : '80px 48px 160px',
        maxWidth: '1600px',
        margin: '0 auto'
      }}>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: isMobile ? '0.625rem' : '0.75rem',
            fontWeight: 700,
            color: '#000000',
            letterSpacing: '0.25em',
            marginBottom: isMobile ? '48px' : '80px',
            textAlign: 'center',
            textTransform: 'uppercase'
          }}
        >
          P O R T F O L I O &nbsp; A R C H I V E
        </motion.h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: isMobile ? '8px' : '16px',
          gridAutoRows: '10px'
        }}>
          {portfolioItems.map((item, index) => {
            const rowSpan = item.size === 'large' ? 40 : item.size === 'medium' ? 30 : 20;
            return (
              <motion.div
                key={item.src}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.5,
                  ease: 'easeOut',
                  delay: Math.min(index % LOAD_MORE_BATCH, 6) * 0.05
                }}
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                style={{
                  gridRowEnd: `span ${rowSpan}`,
                  overflow: 'hidden',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(220,220,220,0.12)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  willChange: 'transform'
                }}
              >
                <SoftMagneticImage
                  src={item.src}
                  alt={`Portfolio ${index + 1}`}
                  loading={index < INITIAL_BATCH ? 'eager' : 'lazy'}
                  decoding="async"
                  style={{ width: '100%', height: '100%' }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Sentinel — triggers next batch load */}
        {visibleCount < PORTFOLIO_ARCHIVE_IMAGES.length && (
          <div ref={sentinelRef} style={{ height: '1px', marginTop: '60px' }} />
        )}

        {/* End-of-archive label */}
        {visibleCount >= PORTFOLIO_ARCHIVE_IMAGES.length && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '0.625rem',
              color: '#aaaaaa',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textAlign: 'center',
              marginTop: '80px'
            }}
          >
            End of Archive
          </motion.p>
        )}
      </section>
    </div>
  );
}
