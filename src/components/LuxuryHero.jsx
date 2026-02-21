import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function LuxuryHero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const titleY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section 
      ref={containerRef}
      id="home"
      className="h-screen flex flex-col justify-center items-center relative overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Subtle gradient background */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(75, 0, 130, 0.1) 0%, rgba(0, 0, 0, 1) 70%)'
        }}
      />

      {/* Parallax Title */}
      <motion.div
        style={{ 
          y: titleY,
          opacity: titleOpacity,
          willChange: 'transform'
        }}
        className="relative z-10 text-center px-8 max-w-6xl mx-auto"
      >
        <motion.h1 
          className="text-8xl md:text-9xl lg:text-[14rem] font-bold mb-12 leading-[0.85] tracking-tight"
          style={{ 
            fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
            color: '#C0C0C0',
            fontWeight: 700,
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.8)'
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          THE LAGOS
          <br />
          <motion.span 
            style={{ color: '#4B0082' }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            PAPARAZZI
          </motion.span>
        </motion.h1>

        <motion.div
          className="w-32 h-px mx-auto mb-12"
          style={{ backgroundColor: 'rgba(192, 192, 192, 0.3)' }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        />

        <motion.p 
          className="text-xl md:text-2xl lg:text-3xl mb-16 max-w-3xl mx-auto font-light tracking-wide"
          style={{ color: 'rgba(192, 192, 192, 0.8)', letterSpacing: '0.05em' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          CAPTURING MOMENTS OF ELEGANCE, ONE FRAME AT A TIME
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
          style={{ color: 'rgba(192, 192, 192, 0.5)' }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8" style={{ backgroundColor: 'rgba(192, 192, 192, 0.3)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
