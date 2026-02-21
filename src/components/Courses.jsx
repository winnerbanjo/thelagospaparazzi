import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import RevealOnScroll from './RevealOnScroll';
import api from '../utils/api';
import { isAuthenticated } from '../utils/auth';

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    if (!isAuthenticated()) return;

    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        // Fallback sample data
        setCourses([
          {
            _id: '1',
            title: 'Master Portrait Photography',
            description: 'Learn the art of capturing stunning portraits',
            price: 299,
            duration: '8 weeks',
            level: 'Intermediate'
          },
          {
            _id: '2',
            title: 'Fashion Editorial Masterclass',
            description: 'Create editorial-worthy fashion photography',
            price: 399,
            duration: '10 weeks',
            level: 'Advanced'
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-luxury-silver text-xl">Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 md:p-16">
      <RevealOnScroll>
        <h1 className="text-5xl md:text-7xl font-bold text-luxury-silver mb-4">Courses</h1>
        <p className="text-luxury-silver/70 text-xl mb-12">Exclusive photography education</p>
      </RevealOnScroll>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course, index) => (
          <RevealOnScroll key={course._id} delay={index * 0.1}>
            <motion.div
              className="border border-luxury-silver/20 p-6 hover:border-regal-purple transition-colors cursor-pointer"
              whileHover={{ y: -5 }}
              onClick={() => setSelectedCourse(course)}
            >
              <h3 className="text-2xl font-bold text-luxury-silver mb-3">{course.title}</h3>
              <p className="text-luxury-silver/70 mb-4">{course.description}</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-regal-purple font-semibold">${course.price}</p>
                  <p className="text-luxury-silver/60 text-sm">{course.duration} • {course.level}</p>
                </div>
              </div>
            </motion.div>
          </RevealOnScroll>
        ))}
      </div>

      {selectedCourse && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-void-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCourse(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-void-black border border-luxury-silver/20 p-8 max-w-2xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl font-bold text-luxury-silver mb-4">{selectedCourse.title}</h2>
            <p className="text-luxury-silver/70 mb-6">{selectedCourse.description}</p>
            <p className="text-regal-purple text-2xl font-bold mb-4">${selectedCourse.price}</p>
            <button
              onClick={() => setSelectedCourse(null)}
              className="bg-regal-purple hover:bg-[#5a0a9a] text-luxury-silver px-8 py-3 font-bold transition-colors"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
