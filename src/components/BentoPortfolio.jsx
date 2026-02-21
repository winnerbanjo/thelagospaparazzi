import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const portfolioImages = [
  '/0B5D3E0D-4F03-42DC-9E1D-FD6605D27770.jpg',
  '/44ACBAB4-1971-4650-B3F6-C878D12E2D4D.png',
  '/IMG_3419.JPG',
  '/IMG_3420.JPG',
  '/0B7AA0EC-0892-4121-8C4A-A8275A16C7E1.jpg',
  '/1B2D81C6-A2B2-4F87-9A68-FBC08B8D725B.jpg',
  '/02D6FFD8-E62C-47B9-A0B7-F2AE3FF544D9.jpg',
  '/117933C1-C9C3-4717-A8B7-3DB6BE1EE101.jpg',
  '/1704EB25-496B-4102-B50A-BCC428B50971.jpg',
  '/18159F60-2BF1-4375-9C72-12766E9052DF.jpg',
  '/206553AE-0B20-4957-A936-51CE7C54A857.jpg',
  '/22F5320E-6BF3-41C4-B284-6CB0C5C204D3.jpg',
];

const bentoLayouts = [
  { colSpan: 'md:col-span-2', rowSpan: 'md:row-span-2' },
  { colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
  { colSpan: 'md:col-span-1', rowSpan: 'md:row-span-2' },
  { colSpan: 'md:col-span-2', rowSpan: 'md:row-span-1' },
  { colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
  { colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
  { colSpan: 'md:col-span-2', rowSpan: 'md:row-span-2' },
  { colSpan: 'md:col-span-1', rowSpan: 'md:row-span-1' },
];

function BentoCard({ imageSrc, index, layout }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-150px' });

  return (
    <motion.div
      ref={ref}
      className={`${layout.colSpan} ${layout.rowSpan} group relative overflow-hidden cursor-pointer`}
      style={{
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        willChange: 'transform',
        overflow: 'hidden'
      }}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.95 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={{ scale: 1.02, y: -8 }}
    >
      <div className="relative w-full h-full min-h-[400px]">
        <motion.img
          src={imageSrc}
          alt={`Portfolio ${index + 1}`}
          className="w-full h-full object-cover"
          loading="lazy"
          initial={{ scale: 1.15 }}
          animate={isInView ? { scale: 1 } : { scale: 1.15 }}
          transition={{ duration: 1.2, delay: index * 0.1 + 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          style={{ willChange: 'transform' }}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        <div 
          className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"
          style={{
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
          }}
        >
          <h3 
            className="text-2xl font-bold mb-2"
            style={{ 
              fontFamily: "'Cormorant Garamond', serif",
              color: '#C0C0C0',
              fontWeight: 600
            }}
          >
            Portfolio {index + 1}
          </h3>
          <p 
            className="text-sm uppercase tracking-wider"
            style={{ color: '#4B0082', letterSpacing: '0.1em' }}
          >
            View Details
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function BentoPortfolio() {
  return (
    <section id="portfolio" className="py-32 md:py-48" style={{ backgroundColor: '#000000' }}>
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 
            className="text-7xl md:text-8xl lg:text-9xl font-bold mb-8"
            style={{ 
              fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
              color: '#C0C0C0',
              fontWeight: 700,
              letterSpacing: '-0.03em'
            }}
          >
            Portfolio
          </h2>
          <div className="w-24 h-px mx-auto mb-8" style={{ backgroundColor: 'rgba(192, 192, 192, 0.3)' }} />
          <p 
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{ color: 'rgba(192, 192, 192, 0.6)', letterSpacing: '0.05em' }}
          >
            A CURATED SELECTION OF OUR FINEST WORK
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {portfolioImages.map((imageSrc, index) => {
            const layout = bentoLayouts[index % bentoLayouts.length];
            return (
              <BentoCard 
                key={`portfolio-${index}`}
                imageSrc={imageSrc}
                index={index}
                layout={layout}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
