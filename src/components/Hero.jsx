import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Countdown from './Countdown';

export default function Hero({ onBookingClick, onContactClick }) {
  return (
    <section 
      className="h-screen flex flex-col justify-center items-center relative overflow-hidden"
      style={{ backgroundColor: '#000000' }}
    >
      {/* Background gradient overlay with fade-in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(75, 0, 130, 0.15), transparent 40%, #000000 100%)'
        }}
      />
      
      {/* Subtle animated background pulse */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.15, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        className="absolute inset-0"
        style={{ backgroundColor: 'rgba(75, 0, 130, 0.1)' }}
      />

      {/* Main content container */}
      <div className="relative z-10 text-center px-8 max-w-6xl mx-auto">
        {/* Title with smooth fade-in and scale */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1.2, 
            delay: 0.3,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          <motion.h1 
            className="text-7xl md:text-9xl lg:text-[12rem] font-bold mb-8 leading-[0.9] tracking-tight"
            style={{ 
              fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
              color: '#C0C0C0',
              fontWeight: 700
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
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
        </motion.div>

        {/* Subtitle with fade-in */}
        <motion.p 
          className="text-xl md:text-2xl lg:text-3xl mb-16 max-w-3xl mx-auto font-light"
          style={{ color: 'rgba(192, 192, 192, 0.85)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          Capturing moments of elegance, one frame at a time
        </motion.p>
        
        {/* Countdown Timer with fade-in */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <Countdown />
        </motion.div>
        
        {/* CTA Buttons with staggered fade-in */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(75, 0, 130, 0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onBookingClick}
            className="px-12 py-5 text-lg font-bold transition-all duration-300 flex items-center gap-3 group"
            style={{ 
              backgroundColor: '#4B0082', 
              color: '#C0C0C0',
              borderRadius: '2px'
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#5a0a9a';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#4B0082';
            }}
          >
            Book a Session
            <ArrowRight 
              size={20} 
              className="group-hover:translate-x-1 transition-transform duration-300" 
            />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onContactClick}
            className="border-2 px-12 py-5 text-lg font-semibold transition-all duration-300"
            style={{ 
              borderColor: 'rgba(192, 192, 192, 0.3)',
              color: '#C0C0C0',
              backgroundColor: 'transparent',
              borderRadius: '2px'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = '#4B0082';
              e.target.style.color = '#C0C0C0';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'rgba(192, 192, 192, 0.3)';
            }}
          >
            Get in Touch
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll indicator with fade-in */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 cursor-pointer"
          style={{ color: 'rgba(192, 192, 192, 0.6)' }}
        >
          <span className="text-sm uppercase tracking-wider font-medium">Scroll</span>
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
