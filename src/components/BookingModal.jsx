import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: 'Portrait Session',
    eventDate: '',
    location: '',
    message: ''
  });

  useEffect(() => {
    const handleOpenBooking = () => setIsOpen(true);
    window.addEventListener('openBooking', handleOpenBooking);
    return () => window.removeEventListener('openBooking', handleOpenBooking);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking submitted:', formData);
    // Add API call here
    setIsOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)'
            }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              style={{
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(40px) saturate(180%)',
                WebkitBackdropFilter: 'blur(40px) saturate(180%)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-12 md:p-16">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 transition-opacity hover:opacity-70"
                  style={{ color: '#C0C0C0' }}
                >
                  <X size={24} />
                </button>

                <div className="mb-12">
                  <h2 
                    className="text-4xl md:text-5xl font-bold mb-4"
                    style={{ 
                      fontFamily: "'Cormorant Garamond', serif",
                      color: '#C0C0C0',
                      fontWeight: 700
                    }}
                  >
                    Book Your Session
                  </h2>
                  <p 
                    className="text-lg"
                    style={{ color: 'rgba(192, 192, 192, 0.7)' }}
                  >
                    Experience the luxury of professional photography. Our concierge team will handle every detail.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label 
                        className="block text-sm uppercase tracking-wider mb-3"
                        style={{ color: '#C0C0C0', letterSpacing: '0.1em' }}
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 transition-all"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          color: '#C0C0C0',
                          outline: 'none'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#4B0082'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                      />
                    </div>
                    <div>
                      <label 
                        className="block text-sm uppercase tracking-wider mb-3"
                        style={{ color: '#C0C0C0', letterSpacing: '0.1em' }}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 transition-all"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          color: '#C0C0C0',
                          outline: 'none'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#4B0082'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label 
                        className="block text-sm uppercase tracking-wider mb-3"
                        style={{ color: '#C0C0C0', letterSpacing: '0.1em' }}
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 transition-all"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          color: '#C0C0C0',
                          outline: 'none'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#4B0082'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                      />
                    </div>
                    <div>
                      <label 
                        className="block text-sm uppercase tracking-wider mb-3"
                        style={{ color: '#C0C0C0', letterSpacing: '0.1em' }}
                      >
                        Event Type
                      </label>
                      <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 transition-all"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          color: '#C0C0C0',
                          outline: 'none'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#4B0082'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                      >
                        <option value="Portrait Session">Portrait Session</option>
                        <option value="Fashion Shoot">Fashion Shoot</option>
                        <option value="Event Coverage">Event Coverage</option>
                        <option value="Editorial">Editorial</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label 
                        className="block text-sm uppercase tracking-wider mb-3"
                        style={{ color: '#C0C0C0', letterSpacing: '0.1em' }}
                      >
                        Event Date
                      </label>
                      <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 transition-all"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          color: '#C0C0C0',
                          outline: 'none'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#4B0082'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                      />
                    </div>
                    <div>
                      <label 
                        className="block text-sm uppercase tracking-wider mb-3"
                        style={{ color: '#C0C0C0', letterSpacing: '0.1em' }}
                      >
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 transition-all"
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          color: '#C0C0C0',
                          outline: 'none'
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#4B0082'}
                        onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                      />
                    </div>
                  </div>

                  <div>
                    <label 
                      className="block text-sm uppercase tracking-wider mb-3"
                      style={{ color: '#C0C0C0', letterSpacing: '0.1em' }}
                    >
                      Additional Details
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 transition-all resize-none"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px',
                        color: '#C0C0C0',
                        outline: 'none'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#4B0082'}
                      onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full py-4 text-lg uppercase tracking-wider transition-all"
                    style={{ 
                      backgroundColor: '#4B0082',
                      color: '#C0C0C0',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Submit Request
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}
