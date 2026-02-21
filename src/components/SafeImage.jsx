import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function SafeImage({ src, alt, style, ...props }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleError = () => {
    setImageError(true);
  };

  const handleLoad = () => {
    setImageLoaded(true);
  };

  if (imageError) {
    return (
      <div
        style={{
          ...style,
          backgroundColor: 'rgba(192, 192, 192, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid rgba(192, 192, 192, 0.4)',
          background: 'linear-gradient(135deg, rgba(192, 192, 192, 0.2) 0%, rgba(192, 192, 192, 0.1) 100%)',
          backdropFilter: 'blur(20px)'
        }}
      >
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '0.75rem',
          color: '#666666',
          textAlign: 'center',
          padding: '20px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase'
        }}>
          Image Loading
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', ...style }}>
      {!imageLoaded && (
        <motion.div
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear'
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, rgba(192, 192, 192, 0.1) 0%, rgba(192, 192, 192, 0.2) 50%, rgba(192, 192, 192, 0.1) 100%)',
            backgroundSize: '200% 100%',
            zIndex: 1
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        onError={handleError}
        onLoad={handleLoad}
        style={{
          ...style,
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.4s ease',
          backgroundColor: 'rgba(192, 192, 192, 0.1)',
          position: 'relative',
          zIndex: 2
        }}
        {...props}
      />
    </div>
  );
}
