import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SafeImage({ src, alt, style, loading = 'lazy', decoding = 'async', ...props }) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (imageError) {
    return (
      <div
        style={{
          ...style,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, rgba(192,192,192,0.18) 0%, rgba(192,192,192,0.08) 100%)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(192,192,192,0.3)'
        }}
      >
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '0.625rem',
          color: '#999999',
          textAlign: 'center',
          padding: '20px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase'
        }}>
          Image Unavailable
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', overflow: 'hidden', ...style }}>
      {/* Glass shimmer skeleton — shown until image loads */}
      <AnimatePresence>
        {!imageLoaded && (
          <motion.div
            key="shimmer"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              overflow: 'hidden'
            }}
          >
            <motion.div
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.2 }}
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(90deg, rgba(192,192,192,0.0) 0%, rgba(192,192,192,0.22) 50%, rgba(192,192,192,0.0) 100%)',
                width: '100%',
                height: '100%'
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(220,220,220,0.14)',
              backdropFilter: 'blur(6px)'
            }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actual image — fades in once loaded */}
      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        onError={() => setImageError(true)}
        onLoad={() => setImageLoaded(true)}
        initial={{ opacity: 0 }}
        animate={{ opacity: imageLoaded ? 1 : 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'relative',
          zIndex: 2,
          ...props.imgStyle
        }}
        {...props}
      />
    </div>
  );
}
