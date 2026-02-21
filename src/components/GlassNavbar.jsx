import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

export default function GlassNavbar() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        willChange: 'transform'
      }}
    >
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Camera className="w-6 h-6" style={{ color: '#4B0082' }} />
          <span 
            className="text-xl font-bold"
            style={{ 
              fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
              color: '#C0C0C0'
            }}
          >
            Lagos Paparazzi
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a 
            href="#portfolio" 
            className="transition-opacity hover:opacity-80"
            style={{ color: '#C0C0C0' }}
          >
            Portfolio
          </a>
          <a 
            href="#contact" 
            className="transition-opacity hover:opacity-80"
            style={{ color: '#C0C0C0' }}
          >
            Contact
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
