import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="text-2xl font-serif italic font-bold text-brand-amber">Will-mar’s</div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 text-xs uppercase tracking-widest font-bold">
          {['home', 'about', 'menu', 'gallery', 'contact'].map((item) => (
            <a key={item} href={`#${item}`} className="hover:text-brand-amber transition-colors">{item}</a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-brand-amber" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-zinc-900 border-b border-white/10 p-6 flex flex-col gap-4 uppercase text-xs font-bold tracking-widest">
          {['home', 'about', 'menu', 'gallery', 'contact'].map((item) => (
            <a key={item} href={`#${item}`} onClick={() => setIsOpen(false)}>{item}</a>
          ))}
        </div>
      )}
    </nav>
  );
};