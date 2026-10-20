import { useState } from 'react';
import { GALLERY_IMAGES } from '../constants/data';
import { MenuImage } from '../components/MenuImage';

export default function Gallery() {
  const [active, setActive] = useState(null);

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <p className="text-brand-gold text-xs uppercase tracking-[0.4em] font-bold">Gallery</p>
      <h1 className="font-serif italic text-5xl mt-3 mb-10">Nights on Makamba Road</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {GALLERY_IMAGES.map((img) => (
          <button
            type="button"
            key={img.id}
            onClick={() => setActive(img)}
            className="h-72 overflow-hidden rounded-3xl group relative border border-white/5"
          >
            <MenuImage
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              width={1000}
              height={800}
            />
            <span className="absolute inset-0 bg-brand-gold/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>

      {active && (
        <div className="fixed inset-0 z-[70] bg-black/80 flex items-center justify-center p-6" onClick={() => setActive(null)}>
          <img src={active.src} alt={active.alt} className="max-h-[85vh] max-w-full rounded-2xl" />
        </div>
      )}
    </div>
  );
}
