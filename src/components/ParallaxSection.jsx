'use client';

import { useEffect, useState } from 'react';

export default function ParallaxSection({ 
  children, 
  backgroundImage, 
  height = 'h-screen', 
  speed = 0.5,
  overlay = 'bg-black/40',
  className = ''
}) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={`relative ${height} overflow-hidden ${className}`}>
      {/* Background com parallax */}
      {backgroundImage && (
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax-smooth"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            transform: `translateY(${scrollY * speed}px)`,
          }}
        />
      )}
      
      {/* Overlay */}
      {overlay && <div className={`absolute inset-0 ${overlay}`} />}
      
      {/* Conteúdo */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </section>
  );
}