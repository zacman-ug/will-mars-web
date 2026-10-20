import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { CATEGORIES, SITE } from '../constants/data';

export const Footer = () => {
  return (
    <footer className="relative pt-16 pb-10 px-6 bg-zinc-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-10 text-left">
        <div>
          <p className="font-serif italic text-2xl text-brand-amber mb-3">{SITE.name}</p>
          <p className="text-sm text-zinc-500 leading-relaxed">{SITE.tagline}. Kampala’s hangout on Makamba Road.</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-4">Visit</p>
          <p className="flex gap-2 text-sm text-zinc-300 mb-2"><MapPin size={16} className="text-brand-amber shrink-0" />{SITE.address}</p>
          <p className="flex gap-2 text-sm text-zinc-300 mb-2"><Phone size={16} className="text-brand-amber shrink-0" />{SITE.phoneDisplay}</p>
          <p className="flex gap-2 text-sm text-zinc-300"><Mail size={16} className="text-brand-amber shrink-0" />{SITE.email}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-4">Menu</p>
          <div className="grid grid-cols-1 gap-2 text-sm">
            {CATEGORIES.slice(0, 6).map((cat) => (
              <Link key={cat.id} to={`/menu?cat=${cat.id}`} className="text-zinc-400 hover:text-brand-amber">
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-zinc-500 mb-4">Hours</p>
          <div className="space-y-2 text-sm text-zinc-400">
            {SITE.hours.map((row) => (
              <p key={row.label}>
                <span className="text-white">{row.label}</span>
                <br />
                {row.value}
              </p>
            ))}
          </div>
          <div className="flex gap-4 mt-6 text-zinc-400">
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-brand-amber"><Instagram size={18} /></a>
            <a href="#" aria-label="Facebook" className="hover:text-brand-amber"><Facebook size={18} /></a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-3 text-[10px] uppercase tracking-[0.2em] text-zinc-600">
        <p>© {new Date().getFullYear()} {SITE.fullName}</p>
        <p>Makamba Road, Kampala</p>
      </div>
    </footer>
  );
};
