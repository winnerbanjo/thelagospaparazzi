import { useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const categories = [
  'All',
  'Celebrity & Public Figures',
  'Fashion & Luxury',
  'Events & Nightlife',
  'Editorial / Cultural Moments'
];

// Map images to categories - using a sample of images from public folder
const portfolioImages = [
  // Celebrity & Public Figures
  { id: 1, src: '/02D6FFD8-E62C-47B9-A0B7-F2AE3FF544D9.jpg', category: 'Celebrity & Public Figures', title: 'Red Carpet Moment' },
  { id: 2, src: '/0B5D3E0D-4F03-42DC-9E1D-FD6605D27770.jpg', category: 'Celebrity & Public Figures', title: 'Exclusive Event' },
  { id: 3, src: '/0B7AA0EC-0892-4121-8C4A-A8275A16C7E1.jpg', category: 'Celebrity & Public Figures', title: 'Star Portrait' },
  { id: 4, src: '/117933C1-C9C3-4717-A8B7-3DB6BE1EE101.jpg', category: 'Celebrity & Public Figures', title: 'Public Figure' },
  
  // Fashion & Luxury
  { id: 5, src: '/1704EB25-496B-4102-B50A-BCC428B50971.jpg', category: 'Fashion & Luxury', title: 'Fashion Editorial' },
  { id: 6, src: '/18159F60-2BF1-4375-9C72-12766E9052DF.jpg', category: 'Fashion & Luxury', title: 'Luxury Brand' },
  { id: 7, src: '/1B2D81C6-A2B2-4F87-9A68-FBC08B8D725B.jpg', category: 'Fashion & Luxury', title: 'High Fashion' },
  { id: 8, src: '/206553AE-0B20-4957-A936-51CE7C54A857.jpg', category: 'Fashion & Luxury', title: 'Editorial Shoot' },
  { id: 9, src: '/22F5320E-6BF3-41C4-B284-6CB0C5C204D3.jpg', category: 'Fashion & Luxury', title: 'Luxury Collection' },
  
  // Events & Nightlife
  { id: 10, src: '/26C94BB0-DD82-4878-9609-15F113058D36.jpg', category: 'Events & Nightlife', title: 'Nightlife Scene' },
  { id: 11, src: '/28EC5BD0-A857-4799-A690-E048F27566C3.jpg', category: 'Events & Nightlife', title: 'Music Event' },
  { id: 12, src: '/29BAD852-653A-45DA-99FF-2D19167B01C2.jpg', category: 'Events & Nightlife', title: 'Festival Coverage' },
  { id: 13, src: '/2BBC510D-0046-4F91-93BA-D8E4B5627656.jpg', category: 'Events & Nightlife', title: 'Party Scene' },
  { id: 14, src: '/2ED53718-4B96-4D6D-A124-573F118BD492.jpg', category: 'Events & Nightlife', title: 'Concert Moment' },
  
  // Editorial / Cultural Moments
  { id: 15, src: '/44ACBAB4-1971-4650-B3F6-C878D12E2D4D.png', category: 'Editorial / Cultural Moments', title: 'Cultural Story' },
  { id: 16, src: '/45E47949-3016-4AF0-BD49-32A6C5D2FA63.jpg', category: 'Editorial / Cultural Moments', title: 'Editorial Feature' },
  { id: 17, src: '/4A0500BC-7863-475A-81B0-8C4352C8FB09.jpg', category: 'Editorial / Cultural Moments', title: 'Cultural Moment' },
  { id: 18, src: '/4ECD3B14-322D-4108-A4CF-1D21C07F8515.jpg', category: 'Editorial / Cultural Moments', title: 'Editorial Narrative' },
  { id: 19, src: '/550CB12B-2AB0-45B5-8127-1D350533A13A.jpg', category: 'Editorial / Cultural Moments', title: 'Storytelling' },
];

// Bento grid layout - asymmetric pattern
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

function BentoCard({ item, index, layout }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className={`${layout.colSpan} ${layout.rowSpan} group relative overflow-hidden cursor-pointer`}
      style={{
        willChange: 'transform',
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={{ scale: 1.02, y: -5 }}
    >
      <div className="relative w-full h-full min-h-[300px]">
        <motion.img
          src={item.src}
          alt={item.title}
          className="w-full h-full object-cover"
          loading="lazy"
          initial={{ scale: 1.1 }}
          animate={isInView ? { scale: 1 } : { scale: 1.1 }}
          transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
          style={{ willChange: 'transform' }}
        />
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        <div 
          className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"
          style={{
            backdropFilter: 'blur(16px) saturate(180%)',
            WebkitBackdropFilter: 'blur(16px) saturate(180%)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <h3 
            className="text-xl font-bold mb-1"
            style={{ 
              fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
              color: '#C0C0C0'
            }}
          >
            {item.title}
          </h3>
          <p 
            className="text-sm"
            style={{ color: '#4B0082' }}
          >
            {item.category}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default function BentoGrid() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredImages = selectedCategory === 'All' 
    ? portfolioImages 
    : portfolioImages.filter(img => img.category === selectedCategory);

  return (
    <div id="portfolio" className="px-8 md:px-16 pb-32" style={{ backgroundColor: '#000000' }}>
      {/* Category Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-16 pt-8">
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category)}
            className="px-6 py-3 text-sm md:text-base font-medium transition-all rounded-full"
            style={{
              backgroundColor: selectedCategory === category 
                ? 'rgba(75, 0, 130, 0.3)' 
                : 'rgba(255, 255, 255, 0.05)',
              color: '#C0C0C0',
              border: `1px solid ${selectedCategory === category ? 'rgba(75, 0, 130, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`,
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              willChange: 'transform'
            }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredImages.map((item, index) => {
          const layout = bentoLayouts[index % bentoLayouts.length];
          return (
            <BentoCard 
              key={item.id} 
              item={item} 
              index={index} 
              layout={layout}
            />
          );
        })}
      </div>

      {filteredImages.length === 0 && (
        <div className="text-center py-20">
          <p style={{ color: 'rgba(192, 192, 192, 0.6)' }}>No items found in this category.</p>
        </div>
      )}
    </div>
  );
}
