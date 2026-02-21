import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RevealOnScroll from './RevealOnScroll';
import api from '../utils/api';

const categories = [
  'All',
  'Celebrity & Public Figures',
  'Fashion & Luxury',
  'Events & Nightlife',
  'Editorial / Cultural Moments'
];

const gridLayouts = [
  { colSpan: 'col-span-2', rowSpan: 'row-span-2' },
  { colSpan: 'col-span-1', rowSpan: 'row-span-1' },
  { colSpan: 'col-span-1', rowSpan: 'row-span-2' },
  { colSpan: 'col-span-2', rowSpan: 'row-span-1' },
  { colSpan: 'col-span-1', rowSpan: 'row-span-1' },
  { colSpan: 'col-span-1', rowSpan: 'row-span-1' },
  { colSpan: 'col-span-2', rowSpan: 'row-span-2' },
  { colSpan: 'col-span-1', rowSpan: 'row-span-1' },
];

export default function PortfolioGrid() {
  const [portfolio, setPortfolio] = useState([]);
  const [filteredPortfolio, setFilteredPortfolio] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await api.get('/portfolio');
        const data = response.data.data || response.data;
        setPortfolio(data);
        setFilteredPortfolio(data);
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        // Fallback placeholder images for development
        const sampleData = [
          {
            _id: '1',
            title: 'Celebrity Portrait',
            category: 'Celebrity & Public Figures',
            cloudinaryUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&q=80',
            optimizedUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&q=80',
            featured: true,
            description: 'Elegant portrait session'
          },
          {
            _id: '2',
            title: 'Fashion Editorial',
            category: 'Fashion & Luxury',
            cloudinaryUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80',
            optimizedUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80',
            featured: true,
            description: 'High-fashion editorial shoot'
          },
          {
            _id: '3',
            title: 'Nightlife Event',
            category: 'Events & Nightlife',
            cloudinaryUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80',
            optimizedUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80',
            featured: false,
            description: 'Vibrant nightlife photography'
          },
          {
            _id: '4',
            title: 'Cultural Moment',
            category: 'Editorial / Cultural Moments',
            cloudinaryUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&q=80',
            optimizedUrl: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&q=80',
            featured: true,
            description: 'Capturing cultural essence'
          },
          {
            _id: '5',
            title: 'Red Carpet Event',
            category: 'Celebrity & Public Figures',
            cloudinaryUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80',
            optimizedUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&q=80',
            featured: true,
            description: 'Exclusive red carpet coverage'
          },
          {
            _id: '6',
            title: 'Luxury Brand Shoot',
            category: 'Fashion & Luxury',
            cloudinaryUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80',
            optimizedUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1200&q=80',
            featured: false,
            description: 'Premium brand photography'
          },
          {
            _id: '7',
            title: 'Music Festival',
            category: 'Events & Nightlife',
            cloudinaryUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80',
            optimizedUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80',
            featured: true,
            description: 'Dynamic festival coverage'
          },
          {
            _id: '8',
            title: 'Editorial Story',
            category: 'Editorial / Cultural Moments',
            cloudinaryUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
            optimizedUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
            featured: false,
            description: 'Compelling editorial narrative'
          },
        ];
        setPortfolio(sampleData);
        setFilteredPortfolio(sampleData);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredPortfolio(portfolio);
    } else {
      setFilteredPortfolio(portfolio.filter(item => item.category === selectedCategory));
    }
  }, [selectedCategory, portfolio]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-void-black">
        <div className="text-luxury-silver text-xl">Loading portfolio...</div>
      </div>
    );
  }

  return (
    <div className="px-8 md:px-16 bg-void-black pb-32">
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-3 text-sm md:text-base font-medium transition-all ${
              selectedCategory === category
                ? 'bg-regal-purple text-luxury-silver border-2 border-regal-purple'
                : 'bg-void-black border-2 border-luxury-silver/20 text-luxury-silver/70 hover:border-luxury-silver/40'
            }`}
          >
            {category}
          </motion.button>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {filteredPortfolio.map((item, index) => {
          const layout = gridLayouts[index % gridLayouts.length];
          return (
            <RevealOnScroll key={item._id} delay={index * 0.1}>
              <motion.div
                className={`${layout.colSpan} ${layout.rowSpan} group relative overflow-hidden cursor-pointer bg-void-black`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="relative w-full h-full min-h-[300px]">
                  <motion.img
                    src={item.optimizedUrl || item.cloudinaryUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-gradient-to-t from-black/90 to-transparent">
                    <h3 className="text-luxury-silver text-xl font-royalty font-bold mb-1">{item.title}</h3>
                    <p className="text-regal-purple text-sm mb-2">{item.category}</p>
                    {item.description && (
                      <p className="text-luxury-silver/80 text-sm">{item.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            </RevealOnScroll>
          );
        })}
      </div>

      {filteredPortfolio.length === 0 && (
        <div className="text-center py-20">
          <p className="text-luxury-silver/60 text-xl">No items found in this category.</p>
        </div>
      )}
    </div>
  );
}
