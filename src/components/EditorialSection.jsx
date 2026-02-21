import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const editorialContent = [
  {
    id: 1,
    title: 'Cultural Moments',
    subtitle: 'Documenting the Essence of Lagos',
    image: '/26C94BB0-DD82-4878-9609-15F113058D36.jpg',
    text: 'Through the lens, we capture the vibrant pulse of Nigeria\'s cultural capital, preserving moments that define our generation.',
    large: true
  },
  {
    id: 2,
    title: 'Fashion Forward',
    subtitle: 'Editorial Excellence',
    image: '/28EC5BD0-A857-4799-A690-E048F27566C3.jpg',
    text: 'Where style meets storytelling, creating visual narratives that transcend trends.',
    large: false
  },
  {
    id: 3,
    title: 'Nightlife Chronicles',
    subtitle: 'The After Hours',
    image: '/29BAD852-653A-45DA-99FF-2D19167B01C2.jpg',
    text: 'Capturing the energy and elegance of Lagos after dark.',
    large: false
  },
];

function EditorialCard({ item, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  if (item.large) {
    return (
      <motion.div
        ref={ref}
        className="md:col-span-2 md:row-span-2 group relative overflow-hidden"
        style={{
          borderRadius: '24px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          minHeight: '600px',
          willChange: 'transform'
        }}
        initial={{ opacity: 0, x: -60 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
        transition={{ duration: 1, delay: index * 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="relative w-full h-full p-12 md:p-16 flex flex-col justify-between">
          <div>
            <motion.p
              className="text-sm uppercase tracking-widest mb-4"
              style={{ color: '#4B0082', letterSpacing: '0.2em' }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: index * 0.2 + 0.3 }}
            >
              {item.subtitle}
            </motion.p>
            <motion.h3
              className="text-5xl md:text-7xl font-bold mb-6"
              style={{ 
                fontFamily: "'Cormorant Garamond', serif",
                color: '#C0C0C0',
                fontWeight: 700,
                lineHeight: 1.1
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.2 + 0.4 }}
            >
              {item.title}
            </motion.h3>
          </div>
          <motion.p
            className="text-lg md:text-xl max-w-xl"
            style={{ color: 'rgba(192, 192, 192, 0.7)', lineHeight: 1.8 }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.2 + 0.5 }}
          >
            {item.text}
          </motion.p>
        </div>
        <div 
          className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
          style={{
            backgroundImage: `url(${item.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'overlay'
          }}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className="group relative overflow-hidden"
      style={{
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        minHeight: '400px',
        willChange: 'transform'
      }}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay: index * 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -8 }}
    >
      <div className="relative w-full h-full p-8 md:p-12">
        <motion.p
          className="text-xs uppercase tracking-widest mb-4"
          style={{ color: '#4B0082', letterSpacing: '0.2em' }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.2 + 0.2 }}
        >
          {item.subtitle}
        </motion.p>
        <motion.h3
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ 
            fontFamily: "'Cormorant Garamond', serif",
            color: '#C0C0C0',
            fontWeight: 700
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: index * 0.2 + 0.3 }}
        >
          {item.title}
        </motion.h3>
        <motion.p
          className="text-base"
          style={{ color: 'rgba(192, 192, 192, 0.7)', lineHeight: 1.8 }}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: index * 0.2 + 0.4 }}
        >
          {item.text}
        </motion.p>
      </div>
      <div 
        className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500 -z-10"
        style={{
          backgroundImage: `url(${item.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
    </motion.div>
  );
}

export default function EditorialSection() {
  return (
    <section id="editorial" className="py-32 md:py-48" style={{ backgroundColor: '#000000' }}>
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <p 
            className="text-sm uppercase tracking-widest mb-6"
            style={{ color: '#4B0082', letterSpacing: '0.2em' }}
          >
            EDITORIAL
          </p>
          <h2 
            className="text-7xl md:text-8xl lg:text-9xl font-bold mb-8"
            style={{ 
              fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
              color: '#C0C0C0',
              fontWeight: 700,
              letterSpacing: '-0.03em'
            }}
          >
            Stories
          </h2>
          <div className="w-24 h-px mx-auto" style={{ backgroundColor: 'rgba(192, 192, 192, 0.3)' }} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {editorialContent.map((item, index) => (
            <EditorialCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
