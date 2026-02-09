// src/sections/Gallery.jsx
import React from 'react';
import { GALLERY_IMAGES } from '../constants/data';

export const Gallery = () => {
  const fallbackImage = "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80";

  const handleImageError = (e) => {
    // Prevents infinite loops if fallback also fails
    e.target.onerror = null; 
    e.target.src = fallbackImage; 
  };

  return (
    <section id="gallery" className="py-24 bg-zinc-950 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_IMAGES.map((img) => (
            <div key={img.id} className="h-72 overflow-hidden rounded-3xl group relative border border-white/5">
              <img 
                src={img.src} 
                alt="Will-mar's Gallery" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                onError={handleImageError} // Automatically handles broken links
              />
              <div className="absolute inset-0 bg-brand-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};