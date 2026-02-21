import { useState, useRef } from 'react';

export default function LiquidText({ children, style }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const letters = children.split('').map((char, index) => {
    if (char === ' ') return <span key={index}>&nbsp;</span>;
    
    const distance = Math.sqrt(
      Math.pow(mousePosition.x - (index * 20), 2) +
      Math.pow(mousePosition.y - 50, 2)
    );
    const intensity = Math.max(0, 1 - distance / 200);
    
    return (
      <span
        key={index}
        style={{
          display: 'inline-block',
          transform: isHovering ? `translate(${Math.cos(distance / 10) * intensity * 3}px, ${Math.sin(distance / 10) * intensity * 5}px)` : 'none',
          textShadow: isHovering ? `0 0 ${intensity * 20}px rgba(192, 192, 192, ${intensity * 0.8})` : 'none',
          background: isHovering ? `linear-gradient(135deg, rgba(192, 192, 192, ${intensity}) 0%, rgba(255, 255, 255, ${intensity * 0.5}) 100%)` : 'none',
          WebkitBackgroundClip: isHovering ? 'text' : 'none',
          WebkitTextFillColor: isHovering ? 'transparent' : 'inherit',
          backgroundClip: isHovering ? 'text' : 'none',
          transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)'
        }}
      >
        {char}
      </span>
    );
  });

  return (
    <h1
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{
        fontFamily: "'Cormorant Garamond', 'Playfair Display', serif",
        cursor: 'none',
        ...style
      }}
    >
      {letters}
    </h1>
  );
}
