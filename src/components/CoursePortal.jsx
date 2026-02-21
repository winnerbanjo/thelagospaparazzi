import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Play } from 'lucide-react';

const courses = [
  {
    id: 1,
    title: 'Master Portrait Photography',
    description: 'Learn the art of capturing stunning portraits with professional techniques',
    duration: '8 weeks',
    level: 'Intermediate',
    thumbnail: '/45E47949-3016-4AF0-BD49-32A6C5D2FA63.jpg',
    videoCount: 12
  },
  {
    id: 2,
    title: 'Fashion Editorial Masterclass',
    description: 'Create editorial-worthy fashion photography that tells compelling stories',
    duration: '10 weeks',
    level: 'Advanced',
    thumbnail: '/4A0500BC-7863-475A-81B0-8C4352C8FB09.jpg',
    videoCount: 15
  },
  {
    id: 3,
    title: 'Event Photography Essentials',
    description: 'Master the skills needed to capture dynamic events and nightlife',
    duration: '6 weeks',
    level: 'Beginner',
    thumbnail: '/4ECD3B14-322D-4108-A4CF-1D21C07F8515.jpg',
    videoCount: 10
  },
];

function CourseCard({ course, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className="group relative overflow-hidden cursor-pointer"
      style={{
        borderRadius: '24px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        willChange: 'transform',
        minHeight: '500px'
      }}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.95 }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={{ scale: 1.02, y: -8 }}
    >
      <div className="relative w-full h-full">
        <div className="relative h-64 overflow-hidden">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover"
            loading="lazy"
            style={{ willChange: 'transform' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div 
            className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ backgroundColor: 'rgba(75, 0, 130, 0.3)' }}
          >
            <div 
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)' }}
            >
              <Play size={32} style={{ color: '#C0C0C0', marginLeft: '4px' }} />
            </div>
          </div>
        </div>
        
        <div className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <span 
              className="text-xs uppercase tracking-widest px-3 py-1 rounded-full"
              style={{ 
                backgroundColor: 'rgba(75, 0, 130, 0.2)',
                color: '#4B0082',
                letterSpacing: '0.1em'
              }}
            >
              {course.level}
            </span>
            <span 
              className="text-xs"
              style={{ color: 'rgba(192, 192, 192, 0.5)' }}
            >
              {course.duration}
            </span>
          </div>
          
          <h3 
            className="text-2xl md:text-3xl font-bold mb-4"
            style={{ 
              fontFamily: "'Cormorant Garamond', serif",
              color: '#C0C0C0',
              fontWeight: 700
            }}
          >
            {course.title}
          </h3>
          
          <p 
            className="text-base mb-6"
            style={{ color: 'rgba(192, 192, 192, 0.7)', lineHeight: 1.7 }}
          >
            {course.description}
          </p>
          
          <div className="flex items-center justify-between">
            <span 
              className="text-sm"
              style={{ color: 'rgba(192, 192, 192, 0.6)' }}
            >
              {course.videoCount} Pre-recorded Videos
            </span>
            <motion.button
              className="px-6 py-2 text-sm uppercase tracking-wider transition-all"
              style={{ 
                backgroundColor: '#4B0082',
                color: '#C0C0C0',
                border: 'none',
                borderRadius: '2px',
                cursor: 'pointer'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Enroll
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CoursePortal() {
  return (
    <section id="courses" className="py-32 md:py-48" style={{ backgroundColor: '#000000' }}>
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
            EDUCATION
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
            Courses
          </h2>
          <div className="w-24 h-px mx-auto" style={{ backgroundColor: 'rgba(192, 192, 192, 0.3)' }} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
