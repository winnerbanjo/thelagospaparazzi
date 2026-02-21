import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function ParallaxHero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax effect for the title
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="h-screen flex flex-col justify-center items-center relative overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(75, 0, 130, 0.15) 0%, rgba(0, 0, 0, 0.9) 100%)'
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
          className="text-7xl md:text-9xl lg:text-[12rem] font-bold mb-8 leading-[0.9] tracking-tight"
          style={{ 
            fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
            color: '#C0C0C0',
            fontWeight: 700,
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          The Lagos
          <br />
          <motion.span 
            style={{ color: '#4B0082' }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Paparazzi
          </motion.span>
        </motion.h1>

        <motion.p 
          className="text-xl md:text-2xl lg:text-3xl mb-16 max-w-3xl mx-auto font-light"
          style={{ color: 'rgba(192, 192, 192, 0.85)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Capturing moments of elegance, one frame at a time
        </motion.p>
      </motion.div>
    </section>
  );
}
